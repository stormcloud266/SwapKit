var H=((t)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(t,{get:(m,W)=>(typeof require!=="undefined"?require:m)[W]}):t)(function(t){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});import{setRequestClientConfig as A}from"@swapkit/helpers";import{Chain as O,WalletOption as F}from"@swapkit/helpers";import{CoinbaseWalletSDK as R}from"@coinbase/wallet-sdk";import{Chain as f,ChainToRPC as U}from"@swapkit/helpers";import{AbstractSigner as j,getProvider as q}from"@swapkit/toolbox-evm";class _ extends j{#t;constructor(t,m){super(m);this.#t=t}async getAddress(){const t=await this.#t.request({method:"eth_requestAccounts"});if(!t[0])throw new Error("No Account found");return t[0]}async signTransaction(){return await this.#t.request({method:"eth_signTransaction"})}async signMessage(t){return await this.#t.request({method:"personal_sign",params:[t,await this.getAddress()]})}signTypedData=()=>{throw new Error("this method is not implemented")};connect(t){return new _(this.#t,t)}}var B=async({chain:t,ethplorerApiKey:m,covalentApiKey:W,api:u,coinbaseWalletSettings:N={appName:"Developer App"}})=>{switch(t){case f.Ethereum:case f.Sepolia:case f.Avalanche:case f.Arbitrum:case f.Optimism:case f.Polygon:case f.BinanceSmartChain:{const E=new R(N).makeWeb3Provider(U[t]);if(!E)throw new Error("No wallet provider");const{getToolboxByChain:S}=await import("@swapkit/toolbox-evm"),l=q(t),I=new _(E,l),y={api:u,provider:l,signer:I},C=S(t)({...y,covalentApiKey:W,ethplorerApiKey:m});return{address:await I.getAddress(),...C}}default:throw new Error(`No wallet for chain ${t}`)}};function L({addChain:t,config:{thorswapApiKey:m,covalentApiKey:W,ethplorerApiKey:u},coinbaseWalletSettings:N}){return async function D(E){A({apiKey:m});const S=E.map(async(l)=>{const I=await B({chain:l,covalentApiKey:W,ethplorerApiKey:u,coinbaseWalletSettings:N});t({...I,balance:[],chain:l,walletType:F.COINBASE_MOBILE})});return await Promise.all(S),!0}}var Z=[O.Arbitrum,O.Avalanche,O.BinanceSmartChain,O.Optimism,O.Polygon,O.Ethereum,O.Sepolia],$={connectCoinbaseWallet:L};export{$ as coinbaseWallet};

//# debugId=337D56AF9E92396B64756E2164756E21
