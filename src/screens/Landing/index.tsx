import Layout from 'components/Layout'

import LandingProvider from './contexts/landing'
import FooterDivider from './components/FooterDivider'
import Hero from './sections/Hero'
import TopSalons from './sections/TopSalons'
import HowItWorks from './sections/HowItWorks'
import PopularServices from './sections/PopularServices'
import DownloadApp from './sections/DownloadApp'
import FeaturedSalons from './sections/FeaturedSalons'
import Rewards from './sections/Rewards'
import ForSalons from './sections/ForSalons'

const Landing: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <TopSalons />
      <HowItWorks />
      <PopularServices />
      <DownloadApp />
      <FeaturedSalons />
      <Rewards />
      <ForSalons />
      <FooterDivider />
    </Layout>
  )
}

const ConnectedLanding: React.FC = (props) => (
  <LandingProvider {...props}>
    <Landing />
  </LandingProvider>  
)

export default ConnectedLanding
