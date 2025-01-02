/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import clsx from 'clsx'
import { getTokenUrl } from '../utils'
import AssetDefault from '../assets/oah.svg'
import { Currency } from '../model'
import { useOnClickOutside } from 'usehooks-ts'
import { useFormContext } from 'react-hook-form'
import { KeyAccept } from '../const'

interface InputPropArg {
    isFrom?: boolean
    label: string
    currency: Currency
    currencies: Currency[]
    onSelect?: (value: Currency) => void
    onInputChange?: (e: any) => void
}

const Input: React.FC<InputPropArg> = ({ isFrom, label = 'You send', currency, currencies, onSelect, onInputChange }) => {
    const { register } = useFormContext()
    const [active, setActive] = React.useState(false)
    const ref = React.useRef(null)

    const handleClickOutside = () => setActive(false)
    useOnClickOutside(ref, handleClickOutside)

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback((e) => {
        if ((e.altKey || e.metaKey || e.ctrlKey) && e.code.length > 0) {
            return true
        } else if (!KeyAccept.includes(e.code)) return e.preventDefault()
    }, [])

    const renderList = React.useMemo(() => {
        return currencies.map((item, idx) => (
            <div
                key={idx}
                className='font-bold text-[#1b1a1c] flex items-center justify-between cursor-pointer'
                onClick={() => {
                    onSelect?.(item)
                    setActive(false)
                }}
            >
                <div className='flex flex-row items-center gap-4 py-3 px-3'>
                    <div className='flex items-center min-w-[1.75rem] rounded-full'>
                        <img src={getTokenUrl(item.currency.toUpperCase())} alt='' width={32} height={32} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-left text-md text-white leading-4'>{item.currency}</div>
                        <div className='text-[#ffffff61]'>{item.currency}</div>
                    </div>
                </div>
            </div>
        ))
    }, [currencies, onSelect])

    return (
        <div className='flex justify-between gap-1 rounded-md h-[3.75rem] w-full relative'>
            <div className='bg-[#363537] w-full h-full flex items-center justify-between overflow-hidden py-2 px-3 rounded-l-md relative'>
                <input
                    type='text'
                    className='input-value px-3 z-[2] caret-[#02c076] border-none outline-none bg-transparent shadow-none text-[1.25rem] w-full absolute left-0 text-white h-6 font-semibold leading-6'
                    placeholder='0'
                    onKeyDown={handleInputKeyDown}
                    {...register(isFrom ? 'from' : 'to', {
                        onChange: onInputChange,
                    })}
                />
                <span className='absolute top-[2px] text-sm text-[#ffffff61] font-semibold'>{label}</span>
            </div>
            <div
                className='relative flex items-center flex-row justify-between w-fill max-w-[8.5rem] cursor-pointer py-3 pl-4 pr-3 bg-[#363537] rounded-r-md cursor-pointer'
                role='presentation'
                onClick={() => setActive(!active)}
                // ref={ref}
            >
                <div className='flex items-center flex-row gap-2'>
                    <img
                        className='max-w-[1.75rem] rounded-full'
                        src={getTokenUrl(currency.currency.toUpperCase())}
                        alt=''
                        width={28}
                        height={28}
                        onError={(e) => (e.currentTarget.src = AssetDefault)}
                    />

                    <div className='text-xxl font-bold'>{currency.currency}</div>
                </div>
                <div className='w-[2.5rem] h-[1.5rem] flex items-center justify-center'>
                    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M6 7.3748L0 1.3748L1.075 0.299805L6 5.2498L10.925 0.324804L12 1.3998L6 7.3748Z'
                            fill='white'
                            fillOpacity='0.38'
                        ></path>
                    </svg>
                </div>
            </div>
            <div className={clsx('list absolute w-full left-0 top-full z-10', !active ? 'hidden' : undefined)}>
                <div className='mt-2 bg-[#363537] max-h-80 rounded-md pt-2 overflow-y-auto overflow-x-hidden shadow-[0_0.25rem_0.75rem_#1b1a1ca3]'>
                    {renderList}
                </div>
            </div>
        </div>
    )
}

export default Input
