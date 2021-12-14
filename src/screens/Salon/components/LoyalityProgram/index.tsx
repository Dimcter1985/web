import useCurrentSalon from 'hooks/useCurrentSalon'
import Text from 'components/Text'

import Divider from '../Divider'
import Caption from '../Caption'

const translateKind: Record<string, string> = {
  'cost': 'dollars off',
  'percent': 'percentage off',
}

const getDescription = (activeLoyaltyProgram: ILoyaltyProgram) => {
  const { visits, value, kind, salonServices } = activeLoyaltyProgram
  const services = salonServices.map(({ name }) => name).join(', ')

  const kindText = translateKind[kind] ?? `free ${services}`

  return `
    For every ${visits} visits, you will receive ${value} ${kindText},
    which you can redeem on your following visit. 
    Your cards will be updated automatically for your convenience. 
  `
}

const LoyalityProgram: React.FC = () => {

  const { activeLoyaltyProgram } = useCurrentSalon()

  if (!activeLoyaltyProgram || !activeLoyaltyProgram.enabled) {
    return null
  }

  return (
    <>
      <Caption>Salon LOYALTY Card</Caption>
      <Text>
        { getDescription(activeLoyaltyProgram) }
      </Text>
      <Divider />
    </>
  )
}

export default LoyalityProgram
