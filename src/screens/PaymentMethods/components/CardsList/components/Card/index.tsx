import React, { useState, useCallback } from 'react'
import stylesBlock from 'utils/stylesBlock'
import useVisibility from 'hooks/useVisibility'
import Collapse from '@material-ui/core/Collapse'
import PaymentIcon from 'components/Svg/Cards/BigIcon'
import PaymentIconSmall from 'components/Svg/Cards/SmallIcon'
import Text from 'components/Text'
import PureButton from 'components/PureButton'
import Divider from 'components/Divider'
import CloseCross from './components/CloseCross'
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog'
import { ReactComponent as OpenArrow } from './icons/open-arrow.svg'
import styles from './Card.module.scss'

interface IProps {
  card: ICreditCard;
  makePrimary: () => void;
  deleteCard: () => Promise<void>;
  removeCardFromList: () => void;
}

const b = stylesBlock(styles)

const Card: React.FC<IProps> = ({ card, makePrimary, deleteCard, removeCardFromList }) => {
  const { visible, toggle } = useVisibility(false)
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const { cardType, last4, expiresAt, default: primary } = card

  const type = cardType === 'American Express' ? 'Amex' : cardType

  const showDeleteDialog = useCallback(() => setVisibleDeleteDialog(true), [setVisibleDeleteDialog])

  const confirmDelete = useCallback(() => {
    deleteCard()
      .then(() => setIsDeleted(true))
      .catch((error) => alert(error))
      .finally(() => setVisibleDeleteDialog(false))
  }, [deleteCard, setIsDeleted])

  return (
    <>
      { !isDeleted &&
        <>
          <PureButton className={b('card')} onClick={toggle}>
            <div className={b('info')}>
              <PaymentIcon type={cardType as unknown as ICreditCardType} className={b('big-icon')} />
              <PaymentIconSmall type={cardType as unknown as ICreditCardType} className={b('small-icon')} />
              <Text className={b('info-text')}>
                { type } <b>****{ last4 }</b>
              </Text>
              { primary && <Text className={b('primary')}>Primary</Text> }
              <OpenArrow className={b('arrow', { open: visible })} />
            </div>
            <div className={b('name-expires-mobile')}>
              <Text className={b('name')}>Jane Doe</Text>
              <Text className={b('expires')}>
                { `Expires: ${expiresAt.replace('-', '/')}` }
              </Text>
            </div>
          </PureButton>
          <Collapse in={visible}>
            <div className={b('name-expires-default')}>
              <Text className={b('name')}>Jane Doe</Text>
              <Text className={b('expires')}>{ `Expires: ${expiresAt.replace('-', '/')}` }</Text>
            </div>
            <div className={b('extra-info')}>
              <div className={b('action-buttons')}>
                { !primary && 
                  <PureButton className={b('make-primary')} onClick={makePrimary}>
                    Make primary
                  </PureButton>
                }
                <PureButton className={b('delete-button')} onClick={showDeleteDialog}>
                  Delete
                </PureButton>
              </div>
            </div>
          </Collapse>
        </>
      }
      { isDeleted &&
        <div className={b('delete-card')}>
          <Text className={b('delete-text')}>
            Delete successful!
          </Text>
          <CloseCross className={b('delete-icon')} onClick={removeCardFromList} />
        </div>
      }
      <Divider className={b('separator')} />
      <ConfirmDeleteDialog
        open={visibleDeleteDialog}
        card={card}
        onClose={() => setVisibleDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default Card
