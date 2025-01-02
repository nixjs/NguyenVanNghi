/* eslint-disable @typescript-eslint/no-explicit-any */
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import RateIcon from './components/RateIcon'
import RateSwap from './components/RateSwap'
import Input from './components/Input'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from './utils/schema'
import { Currency, FormRequest, SwapRequest } from './model'
import useGetCurrencies from './hooks/useGetCurrencies'
import swapStore from './store'
import { onSwapToken, truncateMiddle } from './utils'
import clsx from 'clsx'
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Loader from './components/Loader'
import toast from 'react-hot-toast'
import { ConnectButton, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { ChainLabel } from './const'
import { onSwapAPI } from './utils/axios'
import useGetTransactions from './hooks/useGetTransactions'

function App() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const { address } = useAccount()
    const chainId = useChainId()
    const { openAccountModal } = useAccountModal()
    const { openChainModal } = useChainModal()

    const methods = useForm<FormRequest>({
        resolver: zodResolver(FormSchema),
        mode: 'onChange',
        defaultValues: {
            from: '1',
        },
    })
    const swapState = swapStore()
    useGetCurrencies()
    useGetTransactions()
    const [fixed, setFixed] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    const firstRef = React.useRef(true)
    const firstInputRef = React.useRef(true)
    const fAmount = methods.watch('from')

    const handleModal = (open: boolean) => setOpenModal(open)

    const handleFixed = () => {
        setFixed(!fixed)
        methods.setValue('fixed', !fixed)
    }

    const handleRotate = () => {
        const fCurrency = swapState.fromCurrency
        const fCurrencies = swapState.fromCurrencies
        fromValue(fAmount)
        swapState.onSetToCurrencies(fCurrencies)
        if (fCurrency) swapState.onSetToCurrency(fCurrency)

        const tCurrency = swapState.toCurrency
        const tCurrencies = swapState.toCurrencies
        swapState.onSetFromCurrencies(tCurrencies)
        if (tCurrency) swapState.onSetFromCurrency(tCurrency)
    }

    const handleFromSelect = (from: Currency) => {
        if (from.currency !== swapState.fromCurrency?.currency) {
            if (from.currency === swapState.toCurrency?.currency) {
                const pairCurrencies = swapState.currencies.filter((c) => c.currency !== from.currency)
                swapState.onSetToCurrencies(pairCurrencies)
                swapState.onSetToCurrency(pairCurrencies[0])
            }
            swapState.onSetFromCurrency(from)
        }
    }
    const handleToSelect = (to: Currency) => {
        if (to.currency !== swapState.toCurrency?.currency) {
            swapState.onSetToCurrency(to)
            if (to.currency === swapState.fromCurrency?.currency) {
                const pairCurrencies = swapState.currencies.filter((c) => c.currency !== to.currency)
                swapState.onSetFromCurrencies(pairCurrencies)
                swapState.onSetFromCurrency(pairCurrencies[0])
            }
        }
    }

    const fromValue = (value: string) => {
        if (swapState.fromCurrency && swapState.toCurrency) {
            const ourAmount = onSwapToken(value ?? 0, swapState.fromCurrency.price, swapState.toCurrency.price)
            methods.setValue('to', ourAmount)
        }
    }

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e
        fromValue(value)
    }

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e
        if (swapState.fromCurrency && swapState.toCurrency) {
            const ourAmount = onSwapToken(value ?? 0, swapState.toCurrency.price, swapState.fromCurrency.price)
            methods.setValue('from', ourAmount)
        }
    }

    React.useEffect(() => {
        if (firstInputRef.current && swapState.fromCurrency && swapState.toCurrency) {
            firstInputRef.current = false
            fromValue(fAmount)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fAmount, swapState.fromCurrency, swapState.toCurrency])

    React.useEffect(() => {
        if (address && swapState.fromCurrency && swapState.toCurrency) {
            fromValue(fAmount)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fAmount, address, swapState.fromCurrency, swapState.toCurrency])

    React.useEffect(() => {
        if (firstRef.current && swapState.currencies.length > 0) {
            firstRef.current = false
            swapState.onSetFromCurrencies(swapState.currencies)
            swapState.onSetFromCurrency(swapState.currencies[0])
            const pairCurrencies = swapState.currencies.filter((c) => c.currency !== swapState.currencies[0].currency)
            swapState.onSetToCurrencies(pairCurrencies)
            swapState.onSetToCurrency(pairCurrencies[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swapState.currencies])

    const isDisabled =
        !!Object.keys(methods.formState.errors).length ||
        Number(methods.watch('to')?.length) === 0 ||
        Number(methods.watch('from')?.length) === 0

    const onSubmit = async (data: FormRequest) => {
        if (swapState?.fromCurrency && swapState?.toCurrency && address) {
            setLoading(true)
            const { fixed, from } = data
            const params: SwapRequest = {
                address,
                amount: from,
                from: swapState?.fromCurrency.currency,
                to: swapState?.toCurrency.currency,
                fixed,
            }
            const response = await onSwapAPI(params)
            if (response?.data) {
                methods.reset()
                toast.success(
                    <div className='flex flex-col'>
                        [SWAPIZ]
                        <div className='text-left'>
                            <p>
                                You got ${response?.data?.value} ${response?.data?.symbol}.
                            </p>
                            <p>Hash: 0x3243240n2</p>
                        </div>
                    </div>
                )
            } else
                toast.error(
                    <div className='flex flex-col'>
                        [SWAPIZ]
                        <div className='text-left'>
                            <p>Failed</p>
                        </div>
                    </div>
                )
            setLoading(false)
        }
    }

    return (
        <div className='exchange-main max-w-[32.5rem] m-auto'>
            <div className='mb-10'>
                <a href='https://vite.dev' target='_blank'>
                    <img src={viteLogo} className='m-auto logo' alt='Vite logo' />
                </a>
                <h1 className='font-bold text-[3rem]'>SWAPIZ</h1>
                <p className='text-xl'>
                    Network support: <code className='font-bold text-[#FF494A]'>BSC Testnet</code>
                </p>
                <p className='text-xl'>
                    Switch <code className='font-bold text-[#FF494A]'>BSC Mainnet</code>, you need edit `env=prod` in /config/env.config.ts
                </p>
            </div>
            {address ? (
                <div className='flex flex-row items-center gap-4 mb-4'>
                    <button onClick={openChainModal} className='flex items-center gap-2 w-4/12 bg-[#29282A] text-[#02C076]' type='button'>
                        <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' width={24} height={24} />
                        {ChainLabel?.[chainId] ?? 'unknown'}
                    </button>
                    <button onClick={openAccountModal} className='w-8/12 bg-[#29282A] text-[#02C076]' type='button'>
                        {truncateMiddle(address ?? '#')}
                    </button>
                </div>
            ) : (
                <></>
            )}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='inputs bg-[#29282A] py-6 px-4 rounded-xl'>
                    <div className='inputs-exchange relative w-full'>
                        <div className='flex flex-row items-center justify-between w-full mb-6'>
                            <div className='font-bold text-xl'>Exchange</div>
                            <div className='flex flex-row items-center gap-1.5' role='presentation' onClick={handleFixed}>
                                <div className='flex flex-row items-center cursor-pointer gap-1.5 text-md'>
                                    <RateIcon fixed={fixed} />
                                    Floating rate
                                </div>
                            </div>
                        </div>
                        {swapState.fromCurrency ? (
                            <Input
                                currency={swapState.fromCurrency}
                                label='You send'
                                currencies={swapState.fromCurrencies}
                                onSelect={handleFromSelect}
                                onInputChange={handleFromChange}
                                isFrom
                            />
                        ) : (
                            <></>
                        )}
                        <RateSwap min='1' max={'∞'} currencySymbol={swapState.fromCurrency?.currency ?? '#'} onRotate={handleRotate} />
                        {swapState.toCurrency ? (
                            <Input
                                currency={swapState.toCurrency}
                                label='You get'
                                currencies={swapState.toCurrencies}
                                onSelect={handleToSelect}
                                onInputChange={handleToChange}
                            />
                        ) : (
                            <></>
                        )}

                        <ConnectButton.Custom>
                            {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                                // Note: If your app doesn't use authentication, you
                                // can remove all 'authenticationStatus' checks
                                const ready = mounted && authenticationStatus !== 'loading'
                                const connected =
                                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                                return (
                                    <div
                                        {...(!ready && {
                                            'aria-hidden': true,
                                            style: {
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                userSelect: 'none',
                                            },
                                        })}
                                        className='connect-wallet'
                                    >
                                        {(() => {
                                            if (!connected) {
                                                return (
                                                    <button
                                                        onClick={openConnectModal}
                                                        type='button'
                                                        className='mt-8 flex items-center justify-center font-bold uppercase px-6 h-14 w-full bg-[#02C076] text-[#29282a]'
                                                    >
                                                        Connect wallet
                                                    </button>
                                                )
                                            }

                                            if (chain.unsupported) {
                                                return (
                                                    <button
                                                        onClick={openChainModal}
                                                        type='button'
                                                        className='mt-8 flex items-center justify-center font-bold uppercase px-6 h-14 w-full bg-[#02C076] text-[#29282a]'
                                                    >
                                                        Invalid network
                                                    </button>
                                                )
                                            }

                                            return (
                                                <button
                                                    type='submit'
                                                    className={clsx(
                                                        'mt-8 flex items-center justify-center font-bold uppercase px-6 h-14 w-full text-[#29282a]',
                                                        loading || isDisabled ? 'bg-[rgba(255,255,255,.04)]' : 'bg-[#02C076]'
                                                    )}
                                                    disabled={isDisabled}
                                                >
                                                    {loading ? <Loader /> : 'Swap now'}
                                                </button>
                                            )
                                        })()}
                                    </div>
                                )
                            }}
                        </ConnectButton.Custom>
                        <p className='mt-4 mb-0 cursor-pointer' role='presentation' onClick={() => handleModal(true)}>
                            Transaction History
                        </p>
                    </div>
                </form>
            </FormProvider>
            <Dialog open={openModal} as='div' className='relative z-10 focus:outline-none' onClose={() => handleModal(false)}>
                <DialogBackdrop className='fixed inset-0 bg-black/30' />
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                        <DialogPanel
                            transition
                            className='w-full max-w-[32.5rem] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
                        >
                            <CloseButton className='bg-transaction absolute top-2 right-2 w-[1.5rem] h-[1.5rem] rounded-md p-0 flex items-center justify-center'>
                                x
                            </CloseButton>
                            <DialogTitle as='h3' className='font-bold text-xl text-center text-white'>
                                Transaction History
                            </DialogTitle>
                            {swapState.transactions.length === 0 ? (
                                <p className='mt-4 text-md text-white text-center'>No data</p>
                            ) : (
                                <div className='mt-4 relative overflow-x-auto'>
                                    <table className='w-full text-sm text-left rtl:text-right'>
                                        <thead>
                                            <tr className='bg-white/10'>
                                                <th className='px-6 py-2'>Hash</th>
                                                <th className='px-6 py-2'>From</th>
                                                <th className='px-6 py-2'>To</th>
                                                <th className='px-6 py-2'>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {swapState.transactions.map((item, idx) => {
                                                const { hash, amount, from, value, to, address } = item
                                                return (
                                                    <tr key={idx}>
                                                        <td className='px-6 py-3'>{hash}</td>
                                                        <td className='px-6 py-3'>{`${amount} ${from}`}</td>
                                                        <td className='px-6 py-3'>{`${value} ${to}`}</td>
                                                        <td className='px-6 py-3'>{truncateMiddle(address)}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default App
