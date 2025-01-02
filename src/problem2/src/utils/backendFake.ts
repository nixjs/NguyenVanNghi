/* eslint-disable @typescript-eslint/no-explicit-any */

import { SwapRequest, Transaction } from '../model'

interface ResponseData<T> {
    status: number
    data?: T
    error?: any
}

const store = {
    post(address: string, amount: string, from: string, to: string, fixed: boolean, fn: any) {
        fn(null, {
            address,
            symbol: from,
            value: 1000,
        })
    },
    get(address: string, fn: any) {
        const props = [
            {
                hash: '0x1',
                address,
                amount: '10',
                from: 'BTC',
                value: '1000',
                to: 'USDT',
                fixed: false,
            },
            {
                hash: '0x2',
                address,
                amount: '12',
                from: 'ETH',
                value: '12',
                to: 'USDT',
                fixed: false,
            },
            {
                hash: '0x2',
                address,
                amount: '32',
                from: 'ZK',
                value: '1',
                to: 'USDT',
                fixed: false,
            },
        ]
        // call callback
        fn(null, props)
    },
}

export function swap(params: SwapRequest) {
    const { address, amount, from, to, fixed } = params
    return new Promise<ResponseData<{ address: string; symbol: string; value: number }>>((resolve) => {
        store.post(address, amount, from, to, fixed ?? false, (_error: any, properties: any) => {
            resolve({ status: 201, data: properties })
        })
    })
}

export function findAll(address: string) {
    return new Promise<ResponseData<Transaction[]>>((resolve) => {
        store.get(address, (_error: any, properties: any) => {
            resolve({ status: 201, data: properties })
        })
    })
}
