import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  base: "/SwapKit",

  // NOTE: Have to be added to fix: Uncaught ReferenceError: process & global is not defined
  define: {
    "process.env": {},
    "process.browser": true,
    global: "globalThis",
  },
  plugins: [
    nodePolyfills({
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
    }),
    react(),
    wasm(),
    topLevelAwait(),
  ],
  resolve: {
    alias: {
      "@lastnetwork/api": resolve("../../packages/swapkit/api/src"),
      "@lastnetwork/core": resolve("../../packages/swapkit/core/src"),
      "@lastnetwork/contracts": resolve("../../packages/swapkit/contracts/src"),
      "@lastnetwork/helpers": resolve("../../packages/swapkit/helpers/src"),
      "@lastnetwork/sdk": resolve("../../packages/swapkit/sdk/src"),
      "@lastnetwork/types": resolve("../../packages/swapkit/types/src"),
      "@lastnetwork/wallets": resolve("../../packages/swapkit/wallets/src"),

      "@lastnetwork/plugin-chainflip": resolve("../../packages/plugins/chainflip/src"),
      "@lastnetwork/plugin-evm": resolve("../../packages/plugins/evm/src"),
      "@lastnetwork/plugin-thorchain": resolve("../../packages/plugins/thorchain/src"),

      "@lastnetwork/toolbox-cosmos": resolve("../../packages/toolboxes/cosmos/src"),
      "@lastnetwork/toolbox-evm": resolve("../../packages/toolboxes/evm/src"),
      "@lastnetwork/toolbox-radix": resolve("../../packages/toolboxes/radix/src"),
      "@lastnetwork/toolbox-solana": resolve("../../packages/toolboxes/solana/src"),
      "@lastnetwork/toolbox-substrate": resolve("../../packages/toolboxes/substrate/src"),
      "@lastnetwork/toolbox-utxo": resolve("../../packages/toolboxes/utxo/src"),

      "@lastnetwork/wallet-coinbase": resolve("../../packages/wallets/coinbase/src"),
      "@lastnetwork/wallet-evm-extensions": resolve("../../packages/wallets/evm-extensions/src"),
      "@lastnetwork/wallet-exodus": resolve("../../packages/wallets/exodus/src"),
      "@lastnetwork/wallet-keepkey": resolve("../../packages/wallets/keepkey/src"),
      "@lastnetwork/wallet-keplr": resolve("../../packages/wallets/keplr/src"),
      "@lastnetwork/wallet-keystore": resolve("../../packages/wallets/keystore/src"),
      "@lastnetwork/wallet-ledger": resolve("../../packages/wallets/ledger/src"),
      "@lastnetwork/wallet-okx": resolve("../../packages/wallets/okx/src"),
      "@lastnetwork/wallet-phantom": resolve("../../packages/wallets/phantom/src"),
      "@lastnetwork/wallet-radix": resolve("../../packages/wallets/radix/src"),
      "@lastnetwork/wallet-talisman": resolve("../../packages/wallets/talisman/src"),
      "@lastnetwork/wallet-trezor": resolve("../../packages/wallets/trezor/src"),
      "@lastnetwork/wallet-wc": resolve("../../packages/wallets/wc/src"),
      "@lastnetwork/wallet-xdefi": resolve("../../packages/wallets/xdefi/src"),

      crypto: "crypto-browserify",
      stream: "stream-browserify",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      path: "path-browserify",
    },
  },

  build: {
    target: "es2022",
    reportCompressedSize: true,
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },

  esbuild: {
    target: "es2022",
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  optimizeDeps: {
    esbuildOptions: {
      // NOTE: Have to be added to fix: Uncaught ReferenceError: global is not defined
      define: { global: "globalThis" },
    },
  },
});
