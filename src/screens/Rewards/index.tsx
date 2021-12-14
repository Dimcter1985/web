import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Layout from 'components/Layout'
import { SEARCH_PATH } from 'consts/pages'
import Gradient from 'components/Gradient'
import Text from 'components/Text'
import Link from 'components/Link'
import Title from 'components/Title'
import HiddenOn from 'components/HiddenOn'
import SubmitButton from 'components/SubmitButton'
import Container from 'components/Container'

import { DESCRIPTION, ADDITION, ADDITION_LINK_DOWNLOAD } from './consts'
import styles from './Rewards.module.scss'

const b = stylesBlock(styles)

const Reward: React.FC = () => (
  <Layout page={{ offsetTop: 'header' }}>
    <Container>
      <div className={b('wrapper')}>
        <Gradient position='right'/>
        <div className={b('content')}>
          <Title positions='left'>Introducing <br/> snailz rewards</Title>
          <Text className={b('description')} variant='h5'>{ DESCRIPTION }</Text>
          <Text className={styles.addition}>
            { ADDITION }
            <Link className={b('link')} href={ADDITION_LINK_DOWNLOAD}>Download Snailz</Link>
          </Text>
          <SubmitButton className={b('button')} size='large' href={SEARCH_PATH}>
            <Text className={b('button-title')} variant='h5'>
              Book <HiddenOn mobile>and get rewarded</HiddenOn> now
            </Text>
          </SubmitButton>
        </div>
      </div>
    </Container>
  </Layout>
)

export default Reward
