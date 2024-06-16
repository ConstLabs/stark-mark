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
import { getLinkData } from "@/services";

function CreateMarkModal({
  onConfirm,
  buttonProps
}: {
  onConfirm: (v: { title: string; url: string; icon: string }) => void;
  buttonProps?: ButtonProps;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");

  const handleConfirm = () => {
    onConfirm({
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
                <Input type="text" label="Name" placeholder="Enter link name" value={title} onValueChange={setTitle} />
                <Input type="text" label="Icon" placeholder="Enter icon url" value={icon} onValueChange={setIcon} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirm}>
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

export const Marks = ({ data, addMark }: { data: any[]; addMark: (v: any) => void }) => {
  return (
    <div className="flex-1">
      {data?.length ? (
        <div>
          <div className={"flex justify-end mb-5"}>
            <CreateMarkModal onConfirm={addMark} />
          </div>
          <div className={"grid grid-cols-3 gap-6"}>
            {data?.map((it, i) => {
              return (
                <a rel={"noreferrer"} href={it.url} key={i} target={"_blank"} className={"flex items-center gap-2"}>
                  <img src={it.icon} className={"size-6"} alt="" />
                  <div className={"text-center"}>{it.title}</div>
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
            <CreateMarkModal onConfirm={addMark} />
          </div>
        </div>
      )}
    </div>
  );
};
