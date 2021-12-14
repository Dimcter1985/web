import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import Text from 'components/Text'
import DialogHeader from '../DialogHeader'
import CloseButton from '../CloseButton'
import DialogDivider from '../DialogDivider'
import DialogContent from '../DialogContent'
import SubmitButton from '../SubmitButton'
import { ReactComponent as DoneIcon } from './icons/done.svg'
import styles from './Finish.module.scss'

interface IProps {
  onClose: () => void
}

const b = stylesBlock(styles)

const Finish: React.FC<IProps> = ({ onClose }) => (
  <>
    <DialogHeader
      classes={{ root: b('header'), title: b('title') }}
      leftIcon={<CloseButton className={b('close-icon')} onClick={onClose} />}
    >
      Welcome to Snailz
    </DialogHeader>
    <DialogDivider />
    <DialogContent>
      <div className={b('wrapper')}>
        <div className={b('done-icon-wrapper')}>
          <DoneIcon />
        </div>
        <Text className={b('title')}>You're all set!</Text>
        <Text className={b('text')}>You can now book your first appointment and enjoy your service!</Text>
        <SubmitButton onClick={onClose}>Start exploring</SubmitButton>
      </div>
    </DialogContent>
  </>
)

export default Finish
