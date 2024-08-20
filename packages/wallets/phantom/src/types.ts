import type { SolanaProvider } from "@lastnetwork/toolbox-solana";

declare global {
  interface Window {
    phantom: {
      solana: SolanaProvider;
    };
  }
}
