import { FormatMoney } from 'format-money-js'

export default (number: number): string => new FormatMoney().from(number, { decimals: 2, symbol: '$' }) as string