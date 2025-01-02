import BigNumber from 'bignumber.js'
import { Decimal } from '../const'

export const getTokenUrl = (currencySymbol: string) =>
    `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${currencySymbol}.svg`

export const onSwapToken = (amount: string | number, fromPrice: string | number, toPrice: string | number): string => {
    if (Number(amount) === 0) return BigNumber(0).toFixed(Decimal, BigNumber.ROUND_DOWN)
    const valueInUsd = BigNumber(amount).multipliedBy(fromPrice)
    return valueInUsd.dividedBy(toPrice).toFixed(Decimal, BigNumber.ROUND_DOWN)
}

const ellipsisMiddle = (str: string, start = 0, end = 7, limitEndChars = 8, separator = '...'): string => {
    if (!str) return ''
    const stLeng = str.length
    if (stLeng <= end) return str
    if (stLeng <= limitEndChars) return `${str.substring(start, end)}${separator}`
    return `${str.substring(start, end)}${separator}${str.substring(str.length - limitEndChars, str.length)}`
}

export const truncateMiddle = (value: string, lenAllowTruncate = 12, start = 0, end = 6, limitEndChars = 6, separator = '...') =>
    Number(value?.length) > lenAllowTruncate ? ellipsisMiddle(value, start, end, limitEndChars, separator) : value

export const wait = <T>(ms: number, value: T) => {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value))
}
