import { ChainToRPC, type EVMChain } from "@stormcloud266/helpers";
import { JsonRpcProvider } from "ethers/providers";

export const getProvider = (chain: EVMChain, customUrl?: string) => {
  return new JsonRpcProvider(customUrl || ChainToRPC[chain]);
};
