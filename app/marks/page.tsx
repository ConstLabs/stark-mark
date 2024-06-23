"use client";
import { subtitle, title } from "@/components/primitives";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  ButtonProps
} from "@nextui-org/react";
import { useLocalStorage } from "react-use";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { AddNoteIcon, BookIcon, IconWrapper } from "@/components/icons";
import { cn } from "@nextui-org/theme";
import { Marks } from "@/app/marks/components/common";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

function CreateCategoryModal({
  onConfirm,
  buttonProps
}: {
  onConfirm: (v: string) => void;
  buttonProps?: ButtonProps;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  const handleConfirm = () => {
    console.log(value);
    onConfirm(value);
    onClose();
  };

  return (
    <>
      <Button color={"secondary"} onPress={onOpen} {...buttonProps}>
        Create Category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Category</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Name"
                  placeholder="Enter category name"
                  value={value}
                  onValueChange={setValue}
                />
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

function CategoryList({
  data,
  onConfirm,
  selectedKeys,
  setSelectedKeys
}: {
  data: string[];
  onConfirm: (v: string) => void;
  selectedKeys: Set<string>;
  setSelectedKeys: (v: any) => void;
}) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {data?.map((it) => (
            <ListboxItem
              key={it}
              startContent={
                <IconWrapper className="bg-danger/10 text-danger dark:text-danger-500">
                  <BookIcon />
                </IconWrapper>
              }
            >
              {it}
            </ListboxItem>
          ))}
        </Listbox>
        <div className={"mt-6 px-4"}>
          <CreateCategoryModal
            onConfirm={onConfirm}
            buttonProps={{
              className: "w-full"
            }}
          />
        </div>
      </ListboxWrapper>
    </div>
  );
}

export default function MarksPage() {
  const { primaryWallet } = useDynamicContext();
  return (
    <div>
      <div>
        <h1 className={cn(title({ color: "pink" }), "lg:text-3xl")}>Marks</h1>
        <h2 className={cn(subtitle())}>Organize your marks</h2>
      </div>
      <div className={"flex mt-6 gap-5"}>
        <Marks address={primaryWallet?.address} />
      </div>
    </div>
  );
}
