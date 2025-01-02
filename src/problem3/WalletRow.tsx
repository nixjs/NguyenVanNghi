import React from 'react'
import { CellUsd } from "./CellUsd"
import { CellFormatted } from "./CellFormatted"

interface WalletRowPropArg {
    className?: string
    amount: string
    currency: string
}

export const WalletRow: React.FC<WalletRowPropArg> = ({ amount, currency, className }) => {
    // todo something
    return <div className={className}>
        <CellUsd amount={amount} currency={currency} />
        <CellFormatted  amount={amount}/>
    </div>
}