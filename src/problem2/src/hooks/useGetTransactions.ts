import React from 'react'
import swapStore from '../store'
import { onTransactionAPI } from '../utils/axios'
import { useAccount } from 'wagmi'

const useGetTransactions = () => {
    const { address } = useAccount()
    const swapState = swapStore()
    const firstRef = React.useRef(true)

    const onFetchTransactions = async () => {
        if (address) {
            const data = await onTransactionAPI(address)
            swapState.onSetTransactions(data?.data ?? [])
        }
    }

    React.useEffect(() => {
        if (address && firstRef.current) {
            firstRef.current = false
            async function onFetchTxn(address: string) {
                const data = await onTransactionAPI(address)
                swapState.onSetTransactions(data?.data ?? [])
            }
            onFetchTxn(address)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    return { onFetchTransactions }
}

export default useGetTransactions
