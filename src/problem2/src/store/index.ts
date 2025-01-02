import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import devtoolConfig from './devtool'
import { Currency, Transaction } from '../model'

interface State {
    currencies: Currency[]
    fromCurrencies: Currency[]
    fromCurrency: Currency | null
    toCurrencies: Currency[]
    toCurrency: Currency | null
    transactions: Transaction[]
}

interface Action {
    onSetCurrencies: (payload: Currency[]) => void

    onSetFromCurrencies: (payload: Currency[]) => void
    onSetToCurrencies: (payload: Currency[]) => void

    onSetFromCurrency: (payload: Currency) => void
    onSetToCurrency: (payload: Currency) => void

    onSetTransactions: (payload: Transaction[]) => void

    onResetCurrenciesStore: () => void
}

const initialState: State = {
    currencies: [],
    fromCurrencies: [],
    toCurrencies: [],
    fromCurrency: null,
    toCurrency: null,
    transactions: [],
}

export const swapStore = create<State & Action>()(
    devtools(
        (set) => ({
            ...initialState,
            onSetCurrencies: (payload) => set(() => ({ currencies: payload })),

            onSetFromCurrencies: (payload) => set(() => ({ fromCurrencies: payload })),
            onSetToCurrencies: (payload) => set(() => ({ toCurrencies: payload })),

            onSetFromCurrency: (payload) => set(() => ({ fromCurrency: payload })),
            onSetToCurrency: (payload) => set(() => ({ toCurrency: payload })),

            onSetTransactions: (payload) => set(() => ({ transactions: payload })),

            onResetCurrenciesStore: () => set(() => ({ ...initialState })),
        }),
        devtoolConfig('root')
    )
)

export default swapStore
