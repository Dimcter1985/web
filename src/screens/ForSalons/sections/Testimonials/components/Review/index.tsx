import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Title from 'components/Title'
import Text from 'components/Text'
import styles from './Review.module.scss'

interface IProps {
  title: string;
  subtitle: string;
  name: string;
  imgPath: string;
}

const b = stylesBlock(styles)

const Review: React.FC<IProps> = ({ title, subtitle, name, imgPath }) => (
  <div className={b('root')}>
    <div className={b('img')}>
      <img src={imgPath} alt='' />
    </div>
    <Title size='small'>{ title }</Title>
    <Text className={b('subtitle')}>{ subtitle }</Text>
    <Text className={b('name')} variant='h5'>{ name }</Text>
  </div>
)

export default React.memo(Review)
