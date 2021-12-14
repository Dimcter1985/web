import React, { useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'

import Button from 'components/Button'
import useApp from 'core/hooks/useApp'
import useAuthDialog from 'hooks/useAuthDialog'
import useCart from 'hooks/useCart'
import useServicesDialog from 'screens/Salon/hooks/useServicesDialog'

import styles from './bookNowCta.module.scss'

interface IProps {
  className?: string
}

const b = stylesBlock(styles)

const BookNowCta: React.FC<IProps> = ({ className }) => {

  const { hasItems } = useCart()
  const { isLogged } = useApp()
  const { show } = useAuthDialog()
  const { openServicesDialog } = useServicesDialog()

  const onClick = useCallback(() => {
    if (isLogged) {
      openServicesDialog()
    } else {
      show()
    }
  }, [isLogged, openServicesDialog, show])

  if (hasItems) { return null }

  return (
    <Button 
      className={b('item', className)}
      onClick={onClick}
    >
      Book now
    </Button>
  )
}

export default BookNowCta
