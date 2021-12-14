import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import Title from 'components/Title'
import Text from 'components/Text'
import Button from 'components/Button'
import { INFO_SECTION } from '../../consts'
import PatternLine from './components/PatternLine'
import styles from './Main.module.scss'

const b = stylesBlock(styles)

const Main: React.FC = () => {
  const moveInfoSection = useCallback(() => {
    const e = document.querySelector(`#${INFO_SECTION}`)
    e?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  
  return (
    <div className={b('wrapper')}>
      <Title positions='center'>The gift of beauty</Title>
      <Text className={b('subtitle')} variant='h5'>
        Surprise a friend or loved one with a Snailz gift card.
      </Text>
      <div className={b('content')}>
        <PatternLine />
        <PatternLine inverted />
        <Button
          className={b('button')}
          color='secondary'
          size='large'
          onClick={moveInfoSection}
        >
          Buy gift card
        </Button> 
      </div>
    </div>
  )
}

export default Main
