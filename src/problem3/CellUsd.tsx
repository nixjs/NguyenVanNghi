import React from 'react'
import BigNumber from "bignumber.js"

interface CellUsdPropArg {
    amount: string
    currency: string
}

export const CellUsd: React.FC<CellUsdPropArg> = ({amount, currency}) => {
    const prices = usePrices(); // If realtime, move logic to web worker
    const usdValue = BigNumber(prices[currency).multipliedBy(BigNumber(amount)).toFixed()
    return <div>{usdValue}</div>
}