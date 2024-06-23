"use client";
import {
  Button,
  ButtonProps,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getLinkData, getShortUrl } from "@/services";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import useSWR from "swr";
import { addMark, getBookMarkByAddress } from "@/services/marks";
import { shortString } from "starknet";
import toast from "react-hot-toast";
import { Copy, CopyCheck, ExternalLink } from "lucide-react";
import { useCopyToClipboard } from "react-use";
import { useRouter } from "next/navigation";

function CreateMarkModal({
  onConfirm,
  buttonProps,
  loading
}: {
  onConfirm: (v: { title: string; url: string; icon: string }) => void;
  buttonProps?: ButtonProps;
  loading?: boolean;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");

  const handleConfirm = async () => {
    await onConfirm({
      title,
      url,
      icon
    });
    onClose();
  };

  const parseUrl = async (url: string) => {
    const res = await getLinkData(url);
    console.log(res);
    setTitle(res.data.title);
    setIcon(res.data.favicon);
  };

  useEffect(() => {
    if (url) {
      parseUrl(url);
    }
  }, [url]);

  return (
    <>
      <Button color={"primary"} onPress={onOpen} {...buttonProps}>
        Create Mark
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Mark</ModalHeader>
              <ModalBody>
                <Input type="text" label="URL" placeholder="Enter mark url" value={url} onValueChange={setUrl} />
                <Input type="text" label="Label" placeholder="Enter mark label" value={title} onValueChange={setTitle} />
                {/* <Input type="text" label="Icon" placeholder="Enter icon url" value={icon} onValueChange={setIcon} /> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirm} isLoading={loading}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const ShareModal = () => {
  const { primaryWallet } = useDynamicContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const url = `${window.location.origin}/share/${primaryWallet?.address}`;

  const [state, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (state.value) {
      toast.success(`Copied ${state.value}`);
    }
    if (state.error) {
      toast.error(`Unable to copy value, ${state.error.message}`);
    }
  }, [state]);

  return (
    <>
      <Button color={"secondary"} onPress={onOpen} >
        Share Mark
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Share Mark</ModalHeader>
              <ModalBody>
                <Input type="text" readOnly label="Share Link" placeholder="Enter mark url" value={url} endContent={
                  <div role="button" className="flex items-center cursor-pointer" onClick={() => {
                    copyToClipboard(url);
                  }}>
                    {state.value ? <CopyCheck size={16} className={'text-success'} /> : <Copy size={16} />}
                  </div>
                } />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export const Marks = ({ address, share }: { address?: string; share?: boolean }) => {
  const { primaryWallet } = useDynamicContext();
  const { data, mutate } = useSWR(address ? ["marks", address] : null, () =>
    getBookMarkByAddress(address!)
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateMarks = async (value: any) => {
    try {
      setLoading(true);
      const provider = await primaryWallet?.connector.getSigner();
      const shortLinkData = await getShortUrl(value.url);
      console.log(value, shortLinkData, "values");
      if (shortLinkData?.errors[0]) {
        toast.error(shortLinkData?.errors[0]);
        return;
      }
      const res = await addMark(provider, {
        label: shortString.encodeShortString(value.title),
        url: shortLinkData?.data?.tiny_url
      });
      console.log(res, "res");
      mutate();
    } catch (error: any) {
      console.log(error, "error");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };



  const list = data?.map((it) => {
    return {
      title: shortString.decodeShortString(it.label),
      url: shortString.decodeShortString(it.url),
    };
  });

  console.log(list, "data");

  return (
    <div className="flex-1">
      {data?.length ? (
        <div>
          <div className={"flex justify-end mb-6 gap-6"}>
            {share ? (<Button onPress={() => {
              router.push("/marks");
            }} color="primary">Create My Marks</Button>) : (
              <>
                <CreateMarkModal onConfirm={handleCreateMarks} loading={loading} />
                <ShareModal />
              </>
            )}
          </div>
          <div className={"grid grid-cols-3 gap-6"}>
            {list?.map((it, i) => {
              return (
                <a rel={"noreferrer"} href={it.url} key={i} target={"_blank"} className={"flex items-center gap-2"}>
                  <div className={"text-center"}>{it.title}</div>
                  <ExternalLink size={16} />
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={"flex flex-col items-center w-full justify-center py-10"}>
          <div className={"text-center"}>
            <h1 className={"text-2xl font-bold"}>No marks found</h1>
            <p className={"text-gray-500 mt-2"}>Create your first mark to get started</p>
          </div>
          <div className={"mt-6"}>
            <CreateMarkModal onConfirm={handleCreateMarks} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};
