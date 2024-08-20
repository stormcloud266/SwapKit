import { coinbaseWallet } from "@lastnetwork/wallet-coinbase";
import { evmWallet } from "@lastnetwork/wallet-evm-extensions";
import { keepkeyWallet } from "@lastnetwork/wallet-keepkey";
import { keplrWallet } from "@lastnetwork/wallet-keplr";
import { keystoreWallet } from "@lastnetwork/wallet-keystore";
import { ledgerWallet } from "@lastnetwork/wallet-ledger";
import { okxWallet } from "@lastnetwork/wallet-okx";
import { phantomWallet } from "@lastnetwork/wallet-phantom";
import { polkadotWallet } from "@lastnetwork/wallet-polkadotjs";
import { talismanWallet } from "@lastnetwork/wallet-talisman";
import { trezorWallet } from "@lastnetwork/wallet-trezor";
import { walletconnectWallet } from "@lastnetwork/wallet-wc";
import { xdefiWallet } from "@lastnetwork/wallet-xdefi";

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
