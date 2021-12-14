import React from 'react'
import Layout from 'components/Layout'
import Main from './sections/Main'
import Info from './sections/Info'
import Testimonials from './sections/Testimonials'
import FAQS from './sections/FAQS'

const ForSalons: React.FC = () => (
  <Layout page={{ offsetTop: 'header' }}>
    <Main />
    <Info />
    <Testimonials />
    <FAQS />
  </Layout>
)

export default ForSalons
