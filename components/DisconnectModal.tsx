import { useAccount, useDisconnect } from "@starknet-react/core";
import { useCopyToClipboard } from "react-use";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ChevronDown, Copy, Unlink, User } from "lucide-react";
import { shortenAddress } from "@/utils/common";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function DisconnectModal() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [state, copyToClipboard] = useCopyToClipboard();

  const addressShort = shortenAddress(address);

  useEffect(() => {
    if (state.value) {
      toast.success(`Copied ${state.value}`);
    }
    if (state.error) {
      toast.error(`Unable to copy value, ${state.error.message}`);
    }
  }, [state]);

  const handleAction = (k: string | number) => {
    if (k === "copy") {
      copyToClipboard(address!);
    }
    if (k === "disconnect") {
      disconnect();
    }
  };

  return (
    <div className="justify-end">
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary">
            {addressShort}
            <ChevronDown size={16} className={"ml-2 opacity-50"} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" onAction={handleAction}>
          <DropdownItem key="copy">
            <div className={"flex items-center gap-2 cursor-pointer"}>
              <Copy size={16} />
              <span>Copy Address</span>
            </div>
          </DropdownItem>
          <DropdownItem key="disconnect">
            <div className={"flex items-center gap-2 cursor-pointer"}>
              <Unlink size={16} />
              <span>Disconnect</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
