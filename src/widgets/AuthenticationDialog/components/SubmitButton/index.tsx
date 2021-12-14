import React from 'react'
import BaseButton from 'components/SubmitButton'
import Text from 'components/Text'
import styles from './SubmitButton.module.scss'

interface IProps {
  disabled?: boolean;
  onClick?: () => void
}

const SubmitButton: React.FC<IProps> = ({ disabled, onClick, children }) => (
  <BaseButton
    className={styles.button}
    type='submit'
    disabled={disabled}
    theme='pink'
    onClick={onClick}
  >
    <Text className={styles.label}>{ children }</Text>
  </BaseButton>
)

export default SubmitButton
