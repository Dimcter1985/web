import React from 'react'

import { ReactComponent as AmexIcon } from './icons/amex.svg'
import { ReactComponent as MasterCardIcon } from './icons/master.svg'
import { ReactComponent as VisaIcon } from './icons/visa.svg'
import { ReactComponent as DiscoverIcon } from './icons/discover.svg'

const icons: Record<ICreditCardType, React.FC<any>> = {
  'Visa': VisaIcon,
  'MasterCard': MasterCardIcon,
  'American Express': AmexIcon,
  'Discover': DiscoverIcon,
}

interface IProps {
  className?: string
  type: ICreditCardType,
}

const BigIcon: React.FC<IProps> = ({ className, type }) => {
  const IconComponent = icons[type]

  return <IconComponent className={className} />
}

export default BigIcon
