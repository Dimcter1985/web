import Head from 'next/head'
import { createContext } from 'react'

import metaDescription from 'consts/metaDescription'
import metaTitle from 'consts/metaTitle'

interface IProps {
  featuredSalons?: ISalon[]
  topBookedSalons?: ISalon[]
  featuredServices?: IService[]
}

export interface IContext {
  featuredSalons: ISalon[]
  topBookedSalons: ISalon[]
  featuredServices: IService[]
}

const Context = createContext<IContext>({
  featuredSalons: [],
  topBookedSalons: [],
  featuredServices: [],
})

const Provider: React.FC<IProps> = ({ 
  featuredSalons = [],
  topBookedSalons = [],
  featuredServices = [],
  children, 
}) => {

  const value: IContext = {
    featuredSalons,
    topBookedSalons,
    featuredServices,
  }

  return (
    <Context.Provider value={value}>
      <Head>
        <title>{ metaTitle.landing }</title>
        <meta
          name='description'
          content={metaDescription.landing}
        />
      </Head>

      { children }

    </Context.Provider>
  )
}

export { Context }

export default Provider
