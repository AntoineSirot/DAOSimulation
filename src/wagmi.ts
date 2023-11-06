import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { goerli, mainnet } from 'wagmi/chains'
import { sepolia } from '@wagmi/core'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '1cdc06fbcacd080a827fe5861d62ef05'

console.log("APIKEY: ", process.env.ALCHEMY_KEY);

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia],
  [
    alchemyProvider({ apiKey: "-cCDtdbrAuIjJnuKH242CFz4xnp-Kc9W" }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
