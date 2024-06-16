'use client';
import {Connector, useConnect} from "@starknet-react/core";
import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

export default function ConnectModal(props: ButtonProps) {
    const { connect, connectors, connector: current } = useConnect();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="flex justify-end">
            <Button {...props} color={'primary'} onPress={onOpen}>Connect Wallet</Button>

            <Modal size={'sm'} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                      <>
                          <ModalHeader className="flex flex-col gap-1">Connect Wallet</ModalHeader>
                          <ModalBody>
                              <div className="flex flex-col gap-4">
                                  {connectors.map((connector: Connector) => (
                                    <Button
                                      variant={"light"}
                                      key={connector.id}
                                      onClick={() => connect({ connector })}
                                      disabled={!connector.available()}
                                    >
                                        <img src={connector.icon.dark} className="w-4 h-4 mr-2"  alt={connector.name}/>
                                        Connect {connector.name}
                                    </Button>
                                  ))}
                              </div>
                          </ModalBody>
                      </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}