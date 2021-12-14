import { Moment } from 'moment-timezone'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import styles from './ReceiptDateTime.module.scss'

interface IProps {
  className?: string;
  value: Moment
}

const b = stylesBlock(styles)

const FORMAT = 'MMM. DD hh:mm A'

const ReceiptDateTime: React.FC<IProps> = ({ className, value }) => {
  return (
    <Text className={b('item', className)}>
      { value.format(FORMAT) }
    </Text>
  )
}

export default ReceiptDateTime
