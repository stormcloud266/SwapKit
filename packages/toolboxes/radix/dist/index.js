import{CoreApiClient as R}from"@radixdlt/babylon-core-api-sdk";import{LTSRadixEngineToolkit as U,NetworkId as X,PrivateKey as _,SimpleTransactionBuilder as z}from"@radixdlt/radix-engine-toolkit";import{mnemonicToSeed as M}from"@scure/bip39";import{AssetValue as N,Chain as O,RPCUrl as y,SwapKitError as f}from"@swapkit/helpers";async function E(j){const q=await M(j);return new _.Ed25519(q.slice(0,32))}function W(j,q){return U.Derive.virtualAccountAddress(j.publicKey(),q.networkId)}function m(j){return j.startsWith("account_rdx1")&&j.length===66}function B({api:j,signer:q,network:x}){return async function F({assetValue:J,from:Y,recipient:G}){if(!J.address)throw new Error("Asset value must have an address");const Q=await j.LTS.getConstructionMetadata(),Z=(await z.new({networkId:x.networkId,validFromEpoch:Q.current_epoch,fromAccount:Y,signerPublicKey:q.publicKey()})).transferFungible({toAccount:G,resourceAddress:J.address,amount:J.getBaseValue("number")}).compileIntent(),D=q.signToSignature(Z.hashToNotarize),$=Z.compileNotarized(D),H=$.transactionId.id;try{await j.LTS.submitTransaction({notarized_transaction_hex:$.toHex()})}catch(L){throw new Error(`Failed to submit transaction: ${L}`)}return H}}function C({api:j,address:q}){return async function x(F=q){return(await j.LTS.getAccountAllFungibleResourceBalances({account_address:F})).fungible_resource_balances.map((G)=>{const Q=new N({value:G.amount,chain:O.Radix,decimal:8,symbol:G.fungible_resource_address});return Q.address=G.fungible_resource_address,Q})}}function I(j){return function q(x){throw new f("not_implemented",{method:"signMessage",toolbox:"radix"})}}function P(j){return function q(x){throw new f("not_implemented",{method:"validateSignature",toolbox:"radix"})}}async function b(j=y.Radix,q={networkId:X.Mainnet,networkName:"mainnet",dashboardBase:"https://dashboard.radixdlt.com"}){return await R.initialize({basePath:j,logicalNetworkName:q.networkName,fetch})}var A=async({api:j,network:q={networkId:X.Mainnet,networkName:"mainnet",dashboardBase:"https://dashboard.radixdlt.com"},signer:x})=>{const F=await W(x,q);return{api:j,createPrivateKey:E,validateAddress:m,getAddress:()=>F,transfer:B({api:j,signer:x,network:q}),signMessage:I(x),validateSignature:P(x),getBalance:C({address:F,api:j})}},T={networkId:X.Mainnet,networkName:"mainnet",dashboardBase:"https://dashboard.radixdlt.com"};export{b as getRadixCoreApiClient,E as createPrivateKey,A as RadixToolbox,T as RadixMainnet};

//# debugId=77F33A0F73B6DBE464756E2164756E21
