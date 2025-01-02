import { DevtoolsOptions } from 'zustand/middleware'

const devtoolConfig = (name: string, prefix = 'swap.app') => {
    return {
        name: `${prefix}/${name}`,
        enabled: true,
    } as DevtoolsOptions
}

export default devtoolConfig
