import { LegacyRef } from 'react'
import Carousel, { CarouselProps, ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import CustomArrow from './components/CustomArrow'

export const defaultResponsive: ResponsiveType = {
  default: {
    breakpoint: { max: Number.MAX_VALUE, min: 0 },
    items: 1,
  },
}

interface IProps extends Omit<CarouselProps, 'responsive'> {
  forwardRef?: LegacyRef<Carousel> 
  responsive?: ResponsiveType
}

const MultiCarousel: React.FC<IProps> = ({ 
  forwardRef,
  draggable = true,
  responsive = defaultResponsive,
  customLeftArrow = <CustomArrow side='left' />,
  customRightArrow = <CustomArrow side='right' />,
  children, 
  ...props 
}) => (
  <Carousel
    draggable={draggable}
    keyBoardControl
    swipeable
    ssr
    focusOnSelect={false}
    minimumTouchDrag={80}
    additionalTransfrom={0}
    ref={forwardRef}
    responsive={responsive}
    customLeftArrow={customLeftArrow}
    customRightArrow={customRightArrow}
    {...props}
  >
    { children }
  </Carousel>
)

export default MultiCarousel
