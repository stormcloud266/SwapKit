import { coinbaseWallet } from "@stormcloud266/wallet-coinbase";
import { evmWallet } from "@stormcloud266/wallet-evm-extensions";
import { keepkeyWallet } from "@stormcloud266/wallet-keepkey";
import { keplrWallet } from "@stormcloud266/wallet-keplr";
import { keystoreWallet } from "@stormcloud266/wallet-keystore";
import { ledgerWallet } from "@stormcloud266/wallet-ledger";
import { okxWallet } from "@stormcloud266/wallet-okx";
import { phantomWallet } from "@stormcloud266/wallet-phantom";
import { polkadotWallet } from "@stormcloud266/wallet-polkadotjs";
import { talismanWallet } from "@stormcloud266/wallet-talisman";
import { trezorWallet } from "@stormcloud266/wallet-trezor";
import { walletconnectWallet } from "@stormcloud266/wallet-wc";
import { xdefiWallet } from "@stormcloud266/wallet-xdefi";

export const wallets = {
  ...coinbaseWallet,
  ...evmWallet,
  ...keepkeyWallet,
  ...keplrWallet,
  ...keystoreWallet,
  ...ledgerWallet,
  ...okxWallet,
  ...phantomWallet,
  ...polkadotWallet,
  ...talismanWallet,
  ...trezorWallet,
  ...walletconnectWallet,
  ...xdefiWallet,
};
