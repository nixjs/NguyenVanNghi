import { createPublicClient, http, defineChain, createWalletClient, custom } from 'viem'
import { env, Config } from './env.config'

const bscTestNet = defineChain({
    id: 97,
    name: 'BSC TestNet',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
    },
    blockExplorers: {
        default: { name: 'BSC Scan', url: 'https://testnet.bscscan.com' },
    },
})

const bscMainNet = defineChain({
    id: 56,
    name: 'Binance Smart Chain',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://bsc-dataseed.binance.org'] },
    },
    blockExplorers: {
        default: { name: 'BSC Scan', url: 'https://bscscan.com' },
    },
})

export const publicClient = createPublicClient({
    chain: env === 'prod' ? bscMainNet : bscTestNet,
    transport: http(),
})

export const walletClient = () => {
    if (typeof window.ethereum !== 'undefined')
        return createWalletClient({
            chain: env === 'prod' ? bscMainNet : bscTestNet,
            transport: custom(window?.ethereum),
        })
    return createWalletClient({
        chain: env === 'prod' ? bscMainNet : bscTestNet,
        transport: http(Config.RPC_BSC_URL),
    })
}
