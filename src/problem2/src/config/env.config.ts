export interface EnvConfigValue {
    WAGMI_APP_NAME: string
    WAGMI_PROJECT_ID: string
    RPC_BSC_URL: string
}
export const Config: EnvConfigValue = {
    WAGMI_APP_NAME: 'RainbowKit demo',
    WAGMI_PROJECT_ID: 'a5e5bbf809864b1203d64a9657b3bccb',
    RPC_BSC_URL: 'https://bsc-testnet.infura.io/v3/b4e73466a36941e9806a35a7dbdd3f3d',
}

export const env: 'dev' | 'prod' = 'dev'

// ======================================//
// =============== ENV MOCKUP ===========//
// ======================================//
