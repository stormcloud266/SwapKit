import { Chain, RequestClient, formatBigIntToSafeValue } from "@lastnetwork/helpers";

import type { AddressInfo } from "../types/ethplorer-api-types.ts";

export const ethplorerApi = (apiKey = "freekey", sepolia = false) => ({
  getBalance: async (address: string) => {
    const baseUrl = sepolia ? "https://sepolia-api.ethplorer.io" : "https://api.ethplorer.io";
    const chain = sepolia ? Chain.Sepolia : Chain.Ethereum;

    const { tokens = [] } = await RequestClient.get<AddressInfo>(
      `${baseUrl}/getAddressInfo/${address}`,
      { searchParams: { apiKey } },
    );

    return tokens
      .filter(({ tokenInfo: { symbol }, rawBalance }) => symbol && rawBalance !== "0")
      .map(({ tokenInfo: { symbol, decimals, address: tokenAddress }, rawBalance }) => ({
        chain,
        symbol: tokenAddress ? `${symbol}-${tokenAddress}` : symbol,
        value: formatBigIntToSafeValue({
          value: BigInt(rawBalance),
          decimal: Number.parseInt(decimals),
          bigIntDecimal: Number.parseInt(decimals),
        }),
        decimal: Number.parseInt(decimals),
      }));
  },
});

export type EthplorerApiType = ReturnType<typeof ethplorerApi>;
