import * as z from 'zod'
import { FormSchema } from '../utils/schema'

export type FormRequest = z.TypeOf<typeof FormSchema>

export interface Currency {
    currency: string
    date: string
    price: number
}

export interface SwapRequest {
    address: string
    from: string
    to: string
    amount: string
    fixed?: boolean
}

export interface Transaction {
    hash: string
    address: string
    amount: string
    from: string
    to: string
    value: string
    fixed?: boolean
}
