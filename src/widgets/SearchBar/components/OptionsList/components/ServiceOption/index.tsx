import stylesBlock from 'utils/stylesBlock'

import Text from 'components/Text'

import { IServiceOption } from '../../../..'
import LinkButton from '../LinkButton'

import styles from './serviceOption.module.scss'

interface IProps {
  option: IServiceOption
  onClick: (option: IServiceOption) => void
}

const b = stylesBlock(styles)

const ServiceOption: React.FC<IProps> = ({ option, onClick }) => (
  <LinkButton 
    className={b('button')}
    onClick={() => onClick(option)}
  >
    <Text className={b('text')}>
      { option.name }
    </Text>
  </LinkButton>
)

export default ServiceOption
