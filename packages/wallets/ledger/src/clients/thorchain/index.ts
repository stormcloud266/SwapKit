import { type DerivationPathArray, NetworkDerivationPath } from "@lastnetwork/helpers";
import { base64 } from "@scure/base";

import { CosmosLedgerInterface } from "../../interfaces/CosmosLedgerInterface.ts";
import type { GetAddressAndPubKeyResponse } from "../../types.ts";
import { getSignature } from "./utils.ts";

export class THORChainLedger extends CosmosLedgerInterface {
  private pubKey: string | null = null;

  public derivationPath: DerivationPathArray;

  constructor(derivationPath: DerivationPathArray = NetworkDerivationPath.THOR) {
    super();
    this.chain = "thor";
    this.derivationPath = derivationPath;
  }

  get pubkey() {
    return this.pubKey;
  }

  connect = async () => {
    await this.checkOrCreateTransportAndLedger();
    const { compressed_pk, bech32_address }: GetAddressAndPubKeyResponse =
      await this.getAddressAndPubKey();

    this.pubKey = base64.encode(compressed_pk);

    return bech32_address;
  };

  getAddressAndPubKey = async () => {
    await this.checkOrCreateTransportAndLedger(true);

    const response: GetAddressAndPubKeyResponse = await this.ledgerApp.getAddressAndPubKey(
      this.derivationPath,
      this.chain,
    );

    this.validateResponse(response.return_code, response.error_message);

    return response;
  };

  showAddressAndPubKey = async () => {
    await this.checkOrCreateTransportAndLedger(true);

    const response: GetAddressAndPubKeyResponse = await this.ledgerApp.showAddressAndPubKey(
      this.derivationPath,
      this.chain,
    );

    this.validateResponse(response.return_code, response.error_message);

    return response;
  };

  signTransaction = async (rawTx: string, sequence = "0") => {
    await this.checkOrCreateTransportAndLedger(true);

    const { return_code, error_message, signature } = await this.ledgerApp.sign(
      this.derivationPath,
      rawTx,
    );

    if (!this.pubKey) throw new Error("Public Key not found");

    this.validateResponse(return_code, error_message);

    return [
      {
        pub_key: { type: "tendermint/PubKeySecp256k1", value: this.pubKey },
        sequence,
        signature: getSignature(signature),
      },
    ];
  };

  sign = async (message: string) => {
    await this.checkOrCreateTransportAndLedger(true);

    const { return_code, error_message, signature } = await this.ledgerApp.sign(
      this.derivationPath,
      message,
    );

    if (!this.pubKey) throw new Error("Public Key not found");

    this.validateResponse(return_code, error_message);

    return getSignature(signature);
  };
}
