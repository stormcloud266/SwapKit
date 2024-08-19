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
      "@stormcloud266/api": resolve("../../packages/swapkit/api/src"),
      "@stormcloud266/core": resolve("../../packages/swapkit/core/src"),
      "@stormcloud266/contracts": resolve("../../packages/swapkit/contracts/src"),
      "@stormcloud266/helpers": resolve("../../packages/swapkit/helpers/src"),
      "@stormcloud266/sdk": resolve("../../packages/swapkit/sdk/src"),
      "@stormcloud266/types": resolve("../../packages/swapkit/types/src"),
      "@stormcloud266/wallets": resolve("../../packages/swapkit/wallets/src"),

      "@stormcloud266/plugin-chainflip": resolve("../../packages/plugins/chainflip/src"),
      "@stormcloud266/plugin-evm": resolve("../../packages/plugins/evm/src"),
      "@stormcloud266/plugin-thorchain": resolve("../../packages/plugins/thorchain/src"),

      "@stormcloud266/toolbox-cosmos": resolve("../../packages/toolboxes/cosmos/src"),
      "@stormcloud266/toolbox-evm": resolve("../../packages/toolboxes/evm/src"),
      "@stormcloud266/toolbox-radix": resolve("../../packages/toolboxes/radix/src"),
      "@stormcloud266/toolbox-solana": resolve("../../packages/toolboxes/solana/src"),
      "@stormcloud266/toolbox-substrate": resolve("../../packages/toolboxes/substrate/src"),
      "@stormcloud266/toolbox-utxo": resolve("../../packages/toolboxes/utxo/src"),

      "@stormcloud266/wallet-coinbase": resolve("../../packages/wallets/coinbase/src"),
      "@stormcloud266/wallet-evm-extensions": resolve("../../packages/wallets/evm-extensions/src"),
      "@stormcloud266/wallet-exodus": resolve("../../packages/wallets/exodus/src"),
      "@stormcloud266/wallet-keepkey": resolve("../../packages/wallets/keepkey/src"),
      "@stormcloud266/wallet-keplr": resolve("../../packages/wallets/keplr/src"),
      "@stormcloud266/wallet-keystore": resolve("../../packages/wallets/keystore/src"),
      "@stormcloud266/wallet-ledger": resolve("../../packages/wallets/ledger/src"),
      "@stormcloud266/wallet-okx": resolve("../../packages/wallets/okx/src"),
      "@stormcloud266/wallet-phantom": resolve("../../packages/wallets/phantom/src"),
      "@stormcloud266/wallet-radix": resolve("../../packages/wallets/radix/src"),
      "@stormcloud266/wallet-talisman": resolve("../../packages/wallets/talisman/src"),
      "@stormcloud266/wallet-trezor": resolve("../../packages/wallets/trezor/src"),
      "@stormcloud266/wallet-wc": resolve("../../packages/wallets/wc/src"),
      "@stormcloud266/wallet-xdefi": resolve("../../packages/wallets/xdefi/src"),

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
