import React from 'react'
import BigNumber from "bignumber.js"

interface CellFormattedPropArg {
    amount: string
}

export const CellFormatted: React.FC<CellFormattedPropArg> = ({amount}) => {
    return <div>{BigNumber(amount).toFixed()}</div>
}