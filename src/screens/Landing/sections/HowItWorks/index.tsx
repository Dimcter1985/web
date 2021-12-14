import BlackTheme from 'components/BlackTheme'
import Container from 'components/Container'

import Separator from './components/Separator'
import InfoItem from './components/InfoItem'
import Title from '../../components/Title'

import styles from './howItWorks.module.scss'

const HowItWorks: React.FC = () => {
  return (
    <BlackTheme>
      <Container>
        <Separator />
        <div className={styles.content}>
          <Title className={styles.title}>
            How it works
          </Title>
          <div className={styles.itemsGroup}>
            <InfoItem 
              caption='Find a Salon'
              text={<span>Find a salon or service in <br /> your area.</span>}
            />
            <InfoItem 
              caption='Choose a time'
              text='Choose when works best for you without calling the salon.'
            />
            <InfoItem 
              caption='Get Pampered'
              text='Do everything right from your phone. Payment and tips are all done within snailz.'
            />
          </div>
        </div>
        <Separator />
      </Container>
    </BlackTheme>
  )
}

export default HowItWorks
