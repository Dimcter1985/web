import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import PureButton from 'components/PureButton'
import salonImage from 'core/resources/salon.jpg'
import styles from './Image.module.scss'

interface IProps {
  src?: string
  alt: string
  onClick: () => void
}

const b = stylesBlock(styles)

const Image: React.FC<IProps> = ({ src, alt, onClick }) => (
  <PureButton
    className={b('wrapper')}
    onClick={onClick}
  >
    <img className={b('image')} src={src || salonImage} alt={alt} />
  </PureButton>
)

export default Image
