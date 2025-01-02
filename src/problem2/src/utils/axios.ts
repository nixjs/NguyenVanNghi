import axios from 'axios'
import { Currency, SwapRequest } from '../model'
import { swap, findAll } from './backendFake'
import { wait } from '.'

export const onGetPricesAPI = async (): Promise<Currency[]> => {
    const response = await axios.get(' https://interview.switcheo.com/prices.json')
    return response.data
}
export const onSwapAPI = async (params: SwapRequest) => swap(params).then((value) => wait(5000, value))
export const onTransactionAPI = async (address: string) => await findAll(address)
