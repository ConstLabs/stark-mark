import { Contract, RpcProvider } from "starknet";
import ABI from "./abi.json";

const provider = new RpcProvider({
  nodeUrl: "https://starknet-sepolia.g.alchemy.com/v2/GQYPecngmX2a1VBVYq2V9hL3FIMFqoHk"
});

const CONTRACT_ADDRESS = "0x029b40ecd0660d4fea785cb868b11bbb21d79bf4fde149bf46ac68f4e8095fb9";

interface IMark {
  label: string;
  url: string;
}

export const getBookMarkByAddress = async (address: string): Promise<IMark[]> => {
  const contract = new Contract(ABI, CONTRACT_ADDRESS, provider);

  return await contract.get_bookmark(address);
};

export const addMark = async (account: any, data: IMark) => {
  const contract = new Contract(ABI, CONTRACT_ADDRESS, provider);

  contract.connect(account);

  console.log(data, "data");
  const call = contract.populate("store_bookmark", [data]);
  const res = await contract.store_bookmark(call.calldata);
  console.log(res, "res");
  const result = await provider.waitForTransaction(res.transaction_hash);
  console.log(result);
  return result;
};
