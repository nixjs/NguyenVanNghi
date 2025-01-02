import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit'
import { env, Config } from './env.config'

const bscTestNet = {
    id: 97,
    name: 'BSC TestNet',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] }
    },
    blockExplorers: {
        default: { name: 'BSC Scan', url: 'https://testnet.bscscan.com' }
    },
    contracts: {}
} as const satisfies Chain

const bscMainNet = {
    id: 56,
    name: 'Binance Smart Chain',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://bsc-dataseed.binance.org'] }
    },
    blockExplorers: {
        default: { name: 'BSC Scan', url: 'https://bscscan.com' }
    },
    contracts: {}
} as const satisfies Chain

export const config = getDefaultConfig({
    appName: Config.WAGMI_APP_NAME,
    projectId: Config.WAGMI_PROJECT_ID,
    chains: [bscTestNet, bscMainNet, ...(env === 'dev' ? [bscTestNet] : [])],
    ssr: true
})
