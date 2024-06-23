"use client";
import { Connector, useConnect } from "@starknet-react/core";
import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import * as React from "react";

export default function ConnectModal(props: ButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-end">
      <Button {...props} color={"primary"} onPress={onOpen}>
        Connect Wallet
      </Button>

      <Modal size={"sm"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Connect Wallet</ModalHeader>
              <ModalBody></ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
