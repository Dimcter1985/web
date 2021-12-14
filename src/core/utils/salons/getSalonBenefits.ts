import { compact } from 'lodash'

type IProps = Pick<IListSalon, 'tipping' | 'activeLoyaltyProgram'>

export default function getSalonBenefits(salon: IProps): string[] {
  return compact<string>([
    salon.tipping && 'TIP IN-APP',
    !!salon.activeLoyaltyProgram && 'LOYALTY CARD',
  ])
}