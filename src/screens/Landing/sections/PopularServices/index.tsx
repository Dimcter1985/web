import BlackTheme from 'components/BlackTheme'
import Container from 'components/Container'
import MultiCarousel from 'components/MultiCarousel'

import ServiceLink from './components/ServiceLink'
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'

import manicure1x from './images/manicure@1x.jpg'
import manicure2x from './images/manicure@2x.jpg'
import pedicure1x from './images/pedicure@1x.jpg'
import pedicure2x from './images/pedicure@2x.jpg'
import massage1x from './images/massage@1x.jpg'
import massage2x from './images/massage@2x.jpg'
import eyelashes1x from './images/eyelashes@1x.jpg'
import eyelashes2x from './images/eyelashes@2x.jpg'

import styles from './popularServices.module.scss'

const responsive = {
  default: {
    breakpoint: { max: Number.MAX_VALUE, min: 0 },
    items: 1,
    partialVisibilityGutter: 60,
  },
}

const PopularServices: React.FC = () => {
  return (
    <BlackTheme>
      <Container>
        <div className={styles.contentGroup}>
          <div>
            <Title className={styles.title}>
              Popular 
              {' '}
              <br className={styles.hideTablet} /> 
              {' '}
              Services
            </Title>
            <Subtitle 
              className={styles.subtitle}
              color='textSecondary'
            >
              Let’s find you a service.<br />
              Get you booked and glammed.
            </Subtitle>
          </div>
          <div className={styles.servicesGrid}>
            <ServiceLink imageSrc={manicure1x} imageSrc2x={manicure2x} name='Manicure' />
            <ServiceLink imageSrc={pedicure1x} imageSrc2x={pedicure2x} name='Pedicure' />
            <ServiceLink imageSrc={massage1x} imageSrc2x={massage2x} name='Massage' />
            <ServiceLink imageSrc={eyelashes1x} imageSrc2x={eyelashes2x} name='Eyelashes' />
          </div>
          <MultiCarousel 
            className={styles.servicesCarousel}
            partialVisible
            responsive={responsive}
          >
            <ServiceLink imageSrc={manicure1x} imageSrc2x={manicure2x} name='Manicure' />
            <ServiceLink imageSrc={pedicure1x} imageSrc2x={pedicure2x} name='Pedicure' />
            <ServiceLink imageSrc={massage1x} imageSrc2x={massage2x} name='Massage' />
            <ServiceLink imageSrc={eyelashes1x} imageSrc2x={eyelashes2x} name='Eyelashes' />
          </MultiCarousel>
        </div>
      </Container>
    </BlackTheme>
  )
}

export default PopularServices
