import React from 'react'

interface RateIconPropArg {
    fixed?: boolean
}

const RateIcon: React.FC<RateIconPropArg> = ({ fixed }) => {
    if (!fixed)
        return (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_1976_6070)'>
                    <path
                        d='M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z'
                        fill='#02C076'
                    ></path>
                </g>
                <defs>
                    <clipPath id='clip0_1976_6070'>
                        <rect width='24' height='24' fill='white'></rect>
                    </clipPath>
                </defs>
            </svg>
        )
    return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_2125_867)'>
                <path
                    d='M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z'
                    fill='#02C076'
                ></path>
            </g>
            <defs>
                <clipPath id='clip0_2125_867'>
                    <rect width='24' height='24' fill='white'></rect>
                </clipPath>
            </defs>
        </svg>
    )
}

export default RateIcon
