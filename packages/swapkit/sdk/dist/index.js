import{SwapKit as e}from"@swapkit/core";import{ChainflipPlugin as i}from"@swapkit/plugin-chainflip";import{EVMPlugin as o}from"@swapkit/plugin-evm";import{MayachainPlugin as l,ThorchainPlugin as p}from"@swapkit/plugin-thorchain";import{wallets as f}from"@swapkit/wallets";export*from"@swapkit/core";export*from"@swapkit/tokens";import{SwapKitApi as S}from"@swapkit/api";var m={...i,...o,...l,...p},w=({plugins:t,wallets:a,...r}={})=>{return e({...r,wallets:a||f,plugins:t||m})};export{w as createSwapKit,S as SwapKitApi};

//# debugId=D4A33A474BC9A81864756E2164756E21
