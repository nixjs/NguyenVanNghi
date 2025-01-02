import React from 'react'

interface RateSwapPropArg {
    min: string | number
    max: string | number
    currencySymbol: string
    onRotate: () => void
}

const RateSwap: React.FC<RateSwapPropArg> = ({ currencySymbol, max, min, onRotate }) => {
    return (
        <div className='flex flex-row items-center justify-between gap-2 py-3'>
            <div className='minimum-amount'>
                <div className='text-[#ffffff61] text-sm'>
                    Amount range{' '}
                    <span className='text-white'>
                        {min} - {max} <span className='font-bold'>{currencySymbol}</span>
                    </span>
                </div>
            </div>
            <div className='swap-coins cursor-pointer' role='presentation' onClick={onRotate}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_179_12127)'>
                        <path d='M13.41 16.59L12 18L16 22L20 18L18.59 16.59L17 18.17V3H15L15 18.17L13.41 16.59Z' fill='#02C076'></path>
                        <path d='M10.59 7.41L12 6L8 2L4 6L5.41 7.41L7 5.83L7 21H9V5.83L10.59 7.41Z' fill='#02C076'></path>
                    </g>
                    <defs>
                        <clipPath id='clip0_179_12127'>
                            <rect width='24' height='24' fill='white' transform='matrix(0 -1 1 0 0 24)'></rect>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default RateSwap
