import { Chain, ChainToRPC, type UTXOChain } from "@lastnetwork/helpers";

import type { BlockchairApiType } from "../api/blockchairApi";
import { blockchairApi } from "../api/blockchairApi";
import { broadcastUTXOTx } from "../api/rpcApi";

import { createBCHToolbox } from "./bitcoinCash";
import { BaseUTXOToolbox } from "./utxo";

type ToolboxFactory = (params: {
  apiKey?: string;
  rpcUrl?: string;
  apiClient?: BlockchairApiType;
}) => ReturnType<typeof BaseUTXOToolbox>;

type ToolboxType = {
  BCH: typeof BCHToolbox;
  BTC: typeof BTCToolbox;
  DOGE: typeof DOGEToolbox;
  LTC: typeof LTCToolbox;
  DASH: typeof DASHToolbox;
};

const createToolbox =
  (chain: UTXOChain): ToolboxFactory =>
  ({ apiKey, rpcUrl = ChainToRPC[chain], apiClient }) => {
    return BaseUTXOToolbox({
      chain,
      broadcastTx: (txHash: string) => broadcastUTXOTx({ txHash, rpcUrl }),
      apiClient: apiClient || blockchairApi({ apiKey, chain }),
    });
  };

export const BCHToolbox = createBCHToolbox;
export const BTCToolbox = createToolbox(Chain.Bitcoin);
export const DASHToolbox = createToolbox(Chain.Dash);
export const DOGEToolbox = createToolbox(Chain.Dogecoin);
export const LTCToolbox = createToolbox(Chain.Litecoin);

export const getToolboxByChain = <T extends keyof ToolboxType>(chain: T): ToolboxType[T] => {
  switch (chain) {
    case Chain.BitcoinCash:
      return BCHToolbox as ToolboxType[T];
    case Chain.Bitcoin:
      return BTCToolbox as ToolboxType[T];
    case Chain.Dogecoin:
      return DOGEToolbox as ToolboxType[T];
    case Chain.Litecoin:
      return LTCToolbox as ToolboxType[T];
    case Chain.Dash:
      return DASHToolbox as ToolboxType[T];
    default:
      throw new Error(`Chain ${chain} is not supported`);
  }
};

export { stripToCashAddress, stripPrefix, validateAddress } from "./bitcoinCash";
