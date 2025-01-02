import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { Toaster } from 'react-hot-toast'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'
import App from './App.tsx'
import { config } from './config/wagmi.config'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider locale={'en'}>
                    <App />
                    <Toaster />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </StrictMode>
)
