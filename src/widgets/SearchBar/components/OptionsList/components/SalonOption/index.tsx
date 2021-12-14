import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import useGeolocation from 'core/hooks/useGeolocation'

import { ISalonOption } from '../../../..'
import LinkButton from '../LinkButton'

import styles from './salonOption.module.scss'

interface IProps {
  option: ISalonOption
  onClick: (option: ISalonOption) => void
}

const b = stylesBlock(styles)

const SalonOption: React.FC<IProps> = ({ option, onClick }) => {
  const { name, location } = option

  const { getDestinaceToSalon } = useGeolocation()

  const distance = getDestinaceToSalon(location)

  return (
    <LinkButton 
      className={b('container')}
      onClick={() => onClick(option)}
    >
      <Text className={b('name')}>
        { name }
      </Text>
      <Text className={b('time')}>
        {`${distance} miles`}
      </Text>
    </LinkButton>
  )
}

export default SalonOption
