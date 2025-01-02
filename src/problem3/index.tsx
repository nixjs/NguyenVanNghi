import { useMemo } from 'react'
import { WalletRow } from "./WalletRow"
import { Chain } from "./config"

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string
}

interface Props extends BoxProps {

}

export const WalletPage: React.FC<Props> = (props: Props) => {
    const { _, ...rest } = props;
    const balances = useWalletBalances();

    const ourBalances = useMemo(() => balances.filter((balance: WalletBalance) => Chain[balance.blockchain] !== 99 && balance.amount <= 0).sort((lhs: WalletBalance, rhs: WalletBalance) => Chain[rhs.blockchain] - Chain[lhs.blockchain])
        , [balances]);


    return (
        <div {...rest}>
            {ourBalances.map((balance: WalletBalance, index: number) => {
                const { amount, currency } = balance
                return (
                    <WalletRow
                        className={classes.row}
                        key={index}
                        amount={amount}
                        currency={currency}
                    />
                )
            })}
        </div>
    )
}
