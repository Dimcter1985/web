import Text from 'components/Text'
import IconButton from 'components/IconButton'
import stylesBlock from 'utils/stylesBlock'

import { ReactComponent as MinusIcon } from './icons/minus.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'

import styles from './quantityCounter.module.scss'

interface IProps {
  value: number
  multiplier?: number
  className?: string
  onChange: (value: number) => void
}

const MIN_VALUE = 1
const b = stylesBlock(styles)

const QuantityCounter: React.FC<IProps> = ({ 
  value,
  multiplier = 1,
  className,
  onChange,
}) => {

  const disabledMinus = value <= MIN_VALUE

  const onMinusClick = (): void => {
    if (value > multiplier) {
      onChange(value - multiplier)
    }
  }

  const onPlusClick = (): void => onChange(value + multiplier)

  return (
    <div className={b('container', className)}>
      <IconButton 
        className={styles.buttonLeft}
        disabled={disabledMinus}
        onClick={onMinusClick}
      >
        <MinusIcon className={styles.icon} />
      </IconButton>
      <Text className={styles.text}>
        { value }
      </Text>
      <IconButton
        className={styles.buttonRight}
        onClick={onPlusClick}
      >
        <PlusIcon className={styles.icon} />
      </IconButton>
    </div>
  )
}

export default QuantityCounter
