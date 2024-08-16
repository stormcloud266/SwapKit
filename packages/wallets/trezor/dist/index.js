var v=Object.defineProperty;var C=(J,q)=>{for(var D in q)v(J,D,{get:q[D],enumerable:!0,configurable:!0,set:(B)=>q[D]=()=>B})};var g=(J,q)=>()=>(J&&(q=J(J=0)),q);var W=((J)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(J,{get:(q,D)=>(typeof require!=="undefined"?require:q)[D]}):J)(function(J){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+J+'" is not supported')});var y={};C(y,{getEVMSigner:()=>l});import{ChainToChainId as u,SwapKitError as I,SwapKitNumber as P,WalletOption as m,derivationPathToString as S}from"@swapkit/helpers";async function l({chain:J,derivationPath:q,provider:D}){const{AbstractSigner:B}=await import("@swapkit/toolbox-evm");class _ extends B{address;chain;derivationPath;provider;constructor({chain:Y,derivationPath:X,provider:N}){super(N);this.address="",this.chain=Y,this.derivationPath=X,this.provider=N}getAddress=async()=>{if(!this.address){const{default:Y}=await import("@trezor/connect-web"),X=await Y.ethereumGetAddress({path:S(this.derivationPath),showOnTrezor:!0});if(!X.success)throw new I({errorKey:"wallet_trezor_failed_to_get_address",info:{...X,chain:this.chain,derivationPath:this.derivationPath}});this.address=X.payload.address}return this.address};signMessage=async(Y)=>{const{default:X}=await import("@trezor/connect-web"),N=await X.ethereumSignMessage({path:S(this.derivationPath),message:Y});if(!N.success)throw new I({errorKey:"wallet_trezor_failed_to_sign_transaction",info:{...N,message:Y,chain:this.chain,derivationPath:this.derivationPath}});return N.payload.signature};signTypedData(){throw new Error("Not implemented")}signTransaction=async({to:Y,gasLimit:X,value:N,data:A,nonce:E,maxFeePerGas:V,maxPriorityFeePerGas:$,gasPrice:M})=>{if(!Y)throw new I({errorKey:"wallet_missing_params",info:{to:Y}});if(!X)throw new I({errorKey:"wallet_missing_params",info:{gasLimit:X}});const Z=V&&$;if(Z&&!V)throw new I({errorKey:"wallet_missing_params",info:{maxFeePerGas:V}});if(Z&&!$)throw new I({errorKey:"wallet_missing_params",info:{maxPriorityFeePerGas:$}});if(!(Z||M))throw new I({errorKey:"wallet_missing_params",info:{gasPrice:M}});const{default:b}=await import("@trezor/connect-web"),{Transaction:F,toHexString:O}=await import("@swapkit/toolbox-evm"),K=Z?{maxFeePerGas:O(BigInt(V?.toString()||0)),maxPriorityFeePerGas:O(BigInt($?.toString()||0))}:M&&{gasPrice:O(BigInt(M?.toString()||0))}||{gasPrice:"0x0"},R={chainId:Number.parseInt(u[this.chain]),to:Y.toString(),value:O(BigInt(N?.toString()||0)),gasLimit:O(BigInt(X?.toString()||0)),nonce:(E?.toString()||await this.provider.getTransactionCount(await this.getAddress(),"pending")).toString(),data:A?.toString()||"0x",...K},{success:L,payload:k}=await b.ethereumSignTransaction({path:S(this.derivationPath),transaction:R});if(!L)throw new I({errorKey:"wallet_trezor_failed_to_sign_transaction",info:{...k,chain:this.chain,derivationPath:this.derivationPath}});const{r:H,s:U,v:f}=k,Q=F.from({...R,nonce:Number.parseInt(R.nonce),type:Z?2:0,signature:{r:H,s:U,v:new P(f).getBaseValue("number")}}).serialized;if(!Q)throw new I({errorKey:"wallet_trezor_failed_to_sign_transaction",info:{chain:this.chain,derivationPath:this.derivationPath}});return Q};connect=(Y)=>{if(!Y)throw new I({errorKey:"wallet_provider_not_found",info:{wallet:m.TREZOR,chain:this.chain,derivationPath:this.derivationPath}});return new _({chain:this.chain,derivationPath:this.derivationPath,provider:Y})}}return new _({chain:J,derivationPath:q,provider:D})}var x=()=>{};import{Chain as j,FeeOption as d,SwapKitError as z,WalletOption as w,derivationPathToString as c,ensureEVMApiKeys as h,setRequestClientConfig as p}from"@swapkit/helpers";function s(J){switch(J[0]){case 84:return{input:"SPENDWITNESS",output:"PAYTOWITNESS"};case 49:return{input:"SPENDP2SHWITNESS",output:"PAYTOP2SHWITNESS"};case 44:return{input:"SPENDADDRESS",output:"PAYTOADDRESS"};default:return null}}async function n({api:J,rpcUrl:q,chain:D,derivationPath:B,blockchairApiKey:_,ethplorerApiKey:Y,covalentApiKey:X}){switch(D){case j.BinanceSmartChain:case j.Avalanche:case j.Arbitrum:case j.Optimism:case j.Polygon:case j.Sepolia:case j.Ethereum:{const{getProvider:N,getToolboxByChain:A}=await import("@swapkit/toolbox-evm"),{getEVMSigner:E}=await Promise.resolve().then(() => (x(),y)),V=h({chain:D,ethplorerApiKey:Y,covalentApiKey:X}),$=N(D,q),M=A(D),Z=await E({chain:D,derivationPath:B,provider:$});return{address:await Z.getAddress(),walletMethods:M({...V,api:J,provider:$,signer:Z})}}case j.Bitcoin:case j.BitcoinCash:case j.Dash:case j.Dogecoin:case j.Litecoin:{const{toCashAddress:N,getToolboxByChain:A,BCHToolbox:E}=await import("@swapkit/toolbox-utxo");if(!(_||J))throw new z({errorKey:"wallet_missing_api_key",info:{missingKey:"blockchairApiKey"}});const V=s(B);if(!V)throw new z({errorKey:"wallet_trezor_derivation_path_not_supported",info:{derivationPath:B}});const $=D.toLowerCase(),M={apiClient:J,apiKey:_,rpcUrl:q},Z=A(D)(M),F=await(async(R=B)=>{const{default:L}=await import("@trezor/connect-web"),{success:k,payload:H}=await L.getAddress({path:c(R),coin:$});if(!k)throw new z({errorKey:"wallet_trezor_failed_to_get_address",info:{chain:D,error:H.error||"Unknown error"}});return D===j.BitcoinCash?Z.stripPrefix(H.address):H.address})(),O=async(R,L,k="")=>{const{default:H}=await import("@trezor/connect-web"),U=B.map((Q,G)=>G<3?(Q|2147483648)>>>0:Q),f=await H.signTransaction({coin:$,inputs:L.map((Q)=>({address_n:U,prev_hash:Q.hash,prev_index:Q.index,amount:Q.value,script_type:V.input})),outputs:R.txOutputs.map((Q)=>{const G=D===j.BitcoinCash&&Q.address?N(Q.address):Q.address,T=D===j.BitcoinCash&&G?Z.stripPrefix(G)===F:G===F;if(!Q.address)return{amount:"0",op_return_data:Buffer.from(k).toString("hex"),script_type:"PAYTOOPRETURN"};if(T)return{address_n:U,amount:Q.value,script_type:V.output};return{address:G,amount:Q.value,script_type:"PAYTOADDRESS"}})});if(f.success)return f.payload.serializedTx;throw new z({errorKey:"wallet_trezor_failed_to_sign_transaction",info:{chain:D,error:f.payload.error}})};return{address:F,walletMethods:{...Z,transfer:async({from:R,recipient:L,feeOptionKey:k,feeRate:H,memo:U,...f})=>{if(!R)throw new z({errorKey:"wallet_missing_params",info:{wallet:w.TREZOR,memo:U,from:R}});if(!L)throw new z({errorKey:"wallet_missing_params",info:{wallet:w.TREZOR,memo:U,recipient:L}});const{psbt:Q,inputs:G}=await Z.buildTx({...f,memo:U,recipient:L,feeRate:H||(await Z.getFeeRates())[k||d.Fast],sender:R,fetchTxHex:D===j.Dogecoin}),T=await O(Q,G,U);return Z.broadcastTx(T)},signTransaction:O}}}default:throw new z({errorKey:"wallet_chain_not_supported",info:{chain:D,wallet:w.TREZOR}})}}function o({apis:J,rpcUrls:q,addChain:D,config:{covalentApiKey:B,ethplorerApiKey:_,blockchairApiKey:Y,trezorManifest:X={appUrl:"",email:""},thorswapApiKey:N}}){return async function A(E,V){const $=E[0];if(!$)return!1;p({apiKey:N});const{default:M}=await import("@trezor/connect-web"),{success:Z}=await M.getDeviceState();if(!Z)M.init({lazyLoad:!0,manifest:X});const{address:b,walletMethods:F}=await n({api:J[$],rpcUrl:q[$],chain:$,covalentApiKey:B,ethplorerApiKey:_,blockchairApiKey:Y,derivationPath:V});return D({chain:$,...F,address:b,balance:[],walletType:w.TREZOR}),!0}}var i=[j.Arbitrum,j.Avalanche,j.BinanceSmartChain,j.Bitcoin,j.BitcoinCash,j.Dash,j.Dogecoin,j.Ethereum,j.Litecoin,j.Optimism,j.Polygon,j.Sepolia],e={connectTrezor:o};export{e as trezorWallet,i as TREZOR_SUPPORTED_CHAINS};

//# debugId=7DA238D9B80D698464756E2164756E21
