import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Button from 'components/Button'
import Text from 'components/Text'
import PureButton from 'components/PureButton'
import Arrow from 'components/Svg/ArrowRight'
import styles from './Button.module.scss'

interface IProps {
  className?: string;
  onClick?: () => void;
}

const b = stylesBlock(styles)

const MoveButton: React.FC<IProps> = ({ className, onClick, children }) => (
  <div className={b('wrapper', className)}>
    <Button
      className={b('button')}
      size='large'
      onClick={onClick}
    >
      <Text className={b('title')} variant='h5'>{ children }</Text>
    </Button>
    <PureButton className={b('arrow')} onClick={onClick}>
      <Arrow className={b('icon')} />
    </PureButton>
  </div>
)

export default MoveButton
