import { BaseDecimal, Chain, type FeeOption } from "@swapkit/helpers";
import type { BrowserProvider, JsonRpcProvider, JsonRpcSigner, Signer } from "ethers";

import type { EthplorerApiType } from "../api/ethplorerApi.ts";
import { ethplorerApi } from "../api/ethplorerApi.ts";
import { type EVMTxBaseParams, estimateTransactionFee, getBalance } from "../index.ts";

import { BaseEVMToolbox } from "./BaseEVMToolbox.ts";

const getNetworkParams = () => ({
  chainId: "0xaa36a7",
  chainName: "Sepolia test network",
  nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: BaseDecimal.SEP },
  // Use external rpc URL so wallets don't throw warning to user
  rpcUrls: ["https://sepolia.infura.io/v3/"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
});

export const SEPToolbox = ({
  api,
  ethplorerApiKey,
  signer,
  provider,
}: {
  api?: EthplorerApiType;
  ethplorerApiKey?: string;
  signer?: Signer | JsonRpcSigner;
  provider: JsonRpcProvider | BrowserProvider;
}) => {
  const sepoliaApi = api || ethplorerApi(ethplorerApiKey, true);
  const baseToolbox = BaseEVMToolbox({ provider, signer });
  const chain = Chain.Sepolia;

  return {
    ...baseToolbox,
    estimateTransactionFee: (txObject: EVMTxBaseParams, feeOptionKey?: FeeOption) =>
      estimateTransactionFee(txObject, feeOptionKey, chain, provider),
    getBalance: (
      address: string,
      potentialScamFilter = true,
      overwriteProvider?: JsonRpcProvider | BrowserProvider,
    ) =>
      getBalance({
        provider: overwriteProvider || provider,
        api: sepoliaApi,
        address,
        chain,
        potentialScamFilter,
      }),
    getNetworkParams,
  };
};
