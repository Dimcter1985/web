import React from 'react'

import { ReactComponent as AmexIcon } from './icons/amex.svg'
import { ReactComponent as VisaIcon } from './icons/visa.svg'
import { ReactComponent as MasterCardIcon } from './icons/mastercard.svg'
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

const SmallIcon: React.FC<IProps> = ({ type, className }) => {
  const IconComponent = icons[type]

  return <IconComponent className={className} />
}

export default SmallIcon
