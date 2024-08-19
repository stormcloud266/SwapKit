import type { SolanaProvider } from "@stormcloud266/toolbox-solana";

declare global {
  interface Window {
    phantom: {
      solana: SolanaProvider;
    };
  }
}
