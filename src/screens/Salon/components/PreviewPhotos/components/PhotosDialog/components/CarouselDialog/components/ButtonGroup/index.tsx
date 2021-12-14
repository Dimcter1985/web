import { ButtonGroupProps, CarouselInternalState } from 'react-multi-carousel'

import Arrow from '../Arrow'
import styles from './buttonGroup.module.scss'

const empty = { } as CarouselInternalState

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous, carouselState = empty }) => {

  const { currentSlide, totalItems } = carouselState
  
  const isFirst = currentSlide === 0
  const isLast = currentSlide === (totalItems - 1)

  return (
    <div className={styles.carouselButtonGroup}>
      <Arrow hide={isFirst} side='left' onClick={previous} />
      <Arrow hide={isLast} side='right' onClick={next} />
    </div>
  )
}

export default ButtonGroup
