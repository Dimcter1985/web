import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import times from 'lodash/times'
import useMediaQueries from 'hooks/useMediaQueries'
import InfoCard from 'components/InfoCard'
import HiddenOn from 'components/HiddenOn'
import { INFO_SECTION, TESTIMONIALS_SECTION } from '../../consts'
import { INFO as info } from './consts'
import Wrapper from '../../components/Wrapper'
import Block from '../../components/Block'
import Button from '../../components/Button'
import Statistic from './components/Statistic'
import styles from './Info.module.scss'

const b = stylesBlock(styles)

const Info: React.FC = () => {
  const { isSmallScreen } = useMediaQueries()

  const moveNextSection = useCallback(() => {
    const e = document.querySelector(`#${TESTIMONIALS_SECTION}`)
    e?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  
  return (
    <Wrapper>
      <div id={INFO_SECTION} className={b('content')}>
        { times(3, (index) => (
          <Block key={index.toString()} index={index}>
            <div className={b('block')}>
              <InfoCard
                className={b('card')}
                textAlign={isSmallScreen ? 'center' : 'left'}
                title={info[index].left.title}
                subtitle={info[index].left.text}
              />
              <Statistic title={info[index].middle.title} text={info[index].middle.text} />
              <HiddenOn tablet mobile>
                <InfoCard
                  className={b('card')}
                  title={info[index].right.title}
                  subtitle={info[index].right.text}
                />
              </HiddenOn>
            </div>
          </Block>
        ))}
        <Button onClick={moveNextSection}>View testimonials</Button>
      </div>
    </Wrapper>
  )
}

export default Info
