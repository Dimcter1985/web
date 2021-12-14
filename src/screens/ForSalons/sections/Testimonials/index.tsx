import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import times from 'lodash/times'
import { TESTIMONIALS_SECTION, FAQS_SECTION } from '../../consts'
import { TESTIMONIALS as testimonials } from './consts'
import Wrapper from '../../components/Wrapper'
import Block from '../../components/Block'
import Button from '../../components/Button'
import Review from './components/Review'
import firstImg from './img/one.png'
import secondImg from './img/two.png'
import thirdImg from './img/three.png'
import styles from './Testimonials.module.scss'

const b = stylesBlock(styles)

const imgs = [firstImg, secondImg, thirdImg]

const Testimonials: React.FC = () => {
  const moveNextSection = useCallback(() => {
    const e = document.querySelector(`#${FAQS_SECTION}`)
    e?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Wrapper>
      <div id={TESTIMONIALS_SECTION} className={b('content')}>
        <div className={b('reviews')}>
          { times(3, (index) => (
            <Block key={index.toString()} index={index}>
              <Review
                title={testimonials[index].place}
                subtitle={testimonials[index].text}
                name={testimonials[index].name}
                imgPath={imgs[index]}
              />
            </Block>
          ))}
        </div>
        <Button className={b('button')} onClick={moveNextSection}>FAQS & MORE</Button>
      </div>
    </Wrapper>
  )
}

export default Testimonials
