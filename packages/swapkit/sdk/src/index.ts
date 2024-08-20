import { SwapKit, type SwapKitParams } from "@lastnetwork/core";
import { ChainflipPlugin } from "@lastnetwork/plugin-chainflip";
import { EVMPlugin } from "@lastnetwork/plugin-evm";
import { MayachainPlugin, ThorchainPlugin } from "@lastnetwork/plugin-thorchain";
import { wallets as defaultWallets } from "@lastnetwork/wallets";

export * from "@lastnetwork/core";
export * from "@lastnetwork/tokens";

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

export { SwapKitApi } from "@lastnetwork/api";
