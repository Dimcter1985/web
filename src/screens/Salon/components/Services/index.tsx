import { useCallback, useState } from 'react'

import useApp from 'core/hooks/useApp'
import TabPanel from 'components/TabPanel'
import useCurrentSalon from 'hooks/useCurrentSalon'
import useAuthDialog from 'hooks/useAuthDialog'
import useDelayAction from 'hooks/useDelayAction'
import useCart from 'hooks/useCart'
import stylesBlock from 'utils/stylesBlock'

import Subheading from '../Subheading'
import Tab from './components/Tab'
import Service from './components/Service'
import TabsGroup from './components/TabsGroup'
import Container from './components/Container'

import styles from './services.module.scss'

interface IClasses {
  caption?: string
}

interface IProps {
  className?: string
  classes?: IClasses
}

const b = stylesBlock(styles)

const Services: React.FC<IProps> = ({ className, classes = {} }) => {

  const { id: salonId, salonCategories } = useCurrentSalon()
  const { add } = useCart()
  
  const { isLogged } = useApp() 

  const categories = salonCategories.sort((a: ISalonCategory, second: ISalonCategory) => a.position - second.position)

  const { show } = useAuthDialog()
  const { addAction } = useDelayAction()

  const [ activeTab, setActiveTab ] = useState<number | null>(categories[0]?.id || null)

  const onTabChange = useCallback((newValue: number) => setActiveTab(newValue), [])

  const onAddClick = useCallback((service: ICustomService) => {
    const payload = { salonId, service }
    if (!isLogged) {
      addAction({ type: 'ADD_TO_CART', payload })
      show()
      return
    }

    add(payload)
  }, [add, salonId, addAction, show, isLogged])

  if (!activeTab || !salonCategories.length) return null

  return (
    <>
      <Subheading className={b('caption', classes.caption)}>
        Services & Prices
      </Subheading>
      <Container className={className}>
        <TabsGroup>
          { categories.map((category) => (
            <Tab 
              key={category.id} 
              activeTab={activeTab}
              index={category.id}
              onChange={onTabChange}
            >
              { category.name }
            </Tab>
          ))}
        </TabsGroup>
        { categories.map((category) => (
          <TabPanel 
            key={category.id} 
            index={category.id} 
            value={activeTab}
            className={styles.tabPanel}
          >
            { category.salonServices.map((service) => (
              <Service 
                key={service.id} 
                service={service} 
                onAddClick={onAddClick}
              />
            ))}
          </TabPanel>
        )) }
      </Container>
    </>
  )
}

export default Services
