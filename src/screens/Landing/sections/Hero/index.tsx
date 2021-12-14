import React from 'react'

import Gradient from 'components/Gradient'
import Container from 'components/Container'

import Content from './components/Content'
import Leaves from './components/Leaves'
import Search from './components/Search'
import Title from '../../components/Title'

import styles from './hero.module.scss'

const Hero: React.FC = () => {

  return (
    <Container className={styles.container}>
      <Leaves side='left' className={styles.leave} />
      <Leaves side='right' className={styles.leave} />
      <Gradient className={styles.gradient} />
      <Content>
        <Search />
        <Title>Top booked salons</Title>
      </Content>
    </Container>
  )
}

export default Hero