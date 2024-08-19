import { SwapKit, type SwapKitParams } from "@stormcloud266/core";
import { ChainflipPlugin } from "@stormcloud266/plugin-chainflip";
import { EVMPlugin } from "@stormcloud266/plugin-evm";
import { MayachainPlugin, ThorchainPlugin } from "@stormcloud266/plugin-thorchain";
import { wallets as defaultWallets } from "@stormcloud266/wallets";

export * from "@stormcloud266/core";
export * from "@stormcloud266/tokens";

const defaultPlugins = {
  ...ChainflipPlugin,
  ...EVMPlugin,
  ...MayachainPlugin,
  ...ThorchainPlugin,
};

export const createSwapKit = <P extends typeof defaultPlugins, W extends typeof defaultWallets>({
  plugins,
  wallets,
  ...extendParams
}: SwapKitParams<P, W> = {}) => {
  return SwapKit({
    ...extendParams,
    wallets: wallets || defaultWallets,
    plugins: plugins || defaultPlugins,
  });
};

export { SwapKitApi } from "@stormcloud266/api";
