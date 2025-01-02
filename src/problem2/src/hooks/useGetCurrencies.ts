import React from 'react'
import swapStore from '../store'
import { onGetPricesAPI } from '../utils/axios'

const useGetCurrencies = () => {
    const swapState = swapStore()

    const onFetchCurrencies = async () => {
        const data = await onGetPricesAPI()
        swapState.onSetCurrencies(data)
    }

    React.useEffect(() => {
        async function onFetchTokenPrices() {
            const data = await onGetPricesAPI()
            swapState.onSetCurrencies(data)
        }
        onFetchTokenPrices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { onFetchCurrencies }
}

export default useGetCurrencies
