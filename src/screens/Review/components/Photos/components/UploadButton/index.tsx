import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import PureButton from 'components/PureButton'
import { ReactComponent as Cross } from '../../../../icons/cross.svg'
import styles from './UploadButton.module.scss'

interface IProps {
  onClick: () => void;
}

const b = stylesBlock(styles)

const UploadButton: React.FC<IProps> = ({ onClick }) => (
  <PureButton className={b('wrapper')} onClick={onClick}>
    <Cross />
  </PureButton>
)

export default UploadButton
