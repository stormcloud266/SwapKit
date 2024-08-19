import type { QuoteResponseRoute } from "@stormcloud266/api";
import type { AssetValue, SwapParams } from "@stormcloud266/helpers";

export type WithdrawFeeResponse = {
  egressId: string;
  egressAsset: string;
  egressAmount: string;
  egressFee: string;
  destinationAddress: string;
};

export type DepositChannelRequest = {
  brokerCommissionBPS: number;
  ccmMetadata: ccmMetadata | null;
  maxBoostFeeBps?: number;
};

export type ccmMetadata = {
  message: string;
  gasBudget: string;
};

export type SwapDepositResponse = {
  depositChannelId: string;
  depositAddress: string;
  srcChainExpiryBlock: number;
  sellAsset: AssetValue;
  buyAsset: AssetValue;
  recipient: string;
  brokerCommissionBPS: number;
};

export type RequestSwapDepositAddressParams = Partial<SwapParams<"chainflip", QuoteResponseRoute>> &
  Partial<DepositChannelRequest>;
