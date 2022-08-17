# Next / TypeScript

npx create-next-app@latest --typescript front

# chakra-ui

https://chakra-ui.com/

# cd front

npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
npm run dev
background = bg = "red.100~300" 높으면 연함

## window.ethereum

npm install @metamask/providers

**next-env.d.ts**

```typescript
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
```

**MintingModal.tsx**

```typescript

```

## 가낫

(0) 0x9f92ee1f4a8d5df74a755db94bc1893505c848c3c9d4fd600b566ada79d1624e
(1) 0xd796fae91aa86efcb5d583309f7f27f57181f49d1e8d0846ab733a986a368092
(2) 0xde3ab57dc716755ee535275dced29d7513edce88085e8ece1763f3d8761a096f
(3) 0x902508827cd899d6c91944bfbc93f2497f848935b38be19d0f73240cbbcb2429
(4) 0x375685947e727b23743ab17d37cf718cd46309db4ef224b5ec561a14b6163bef
(5) 0x499cd980e352f8724845efb1bedfc5ba2ec10b76ae2eaf285e14767412ca55d4
(6) 0xd5daa4e6be9d2ebdfaab36b4e2697ea25768a27862c2231f9b892b696c9f6279
(7) 0x11dc428aa75f3a202bfec82da5a78ee9f25a4b4c9f631c3b3dd979dc1629ef16
(8) 0x850702a2080b3bcbed79776f02579a6ce05bcc1ae55e8e36c1bddcfe496735be
(9) 0x357a2e3602a19f6bee1175e3db3b769a5c4e034f94af958027c38b733f9649de
