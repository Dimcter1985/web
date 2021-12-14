import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import Title from 'components/Title'
import Text from 'components/Text'
import { INFO_SECTION } from '../../consts'
import Button from '../../components/Button'
import Wrapper from '../../components/Wrapper'
import Arc from './components/Arc'
import styles from './Main.module.scss'

const b = stylesBlock(styles)

const Main: React.FC = () => {
  const moveNextSection = useCallback(() => {
    const e = document.querySelector(`#${INFO_SECTION}`)
    e?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Wrapper>
      <div className={b('content')}>
        <div className={b('head')}>
          <Arc side='left' />
          <div className={b('info')}>
            <Title className={b('title')} positions='center'>For salons</Title>
            <Text className={b('text')} variant='h5'>
              Grow your buisness with access to thousands of new customers
            </Text>
          </div>
          <Arc side='right' />
        </div>
        <Button className={b('button')} onClick={moveNextSection}>Get More Info</Button>
      </div>
    </Wrapper>
  )
}

export default Main
