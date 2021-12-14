import stylesBlock from 'utils/stylesBlock'

import styles from './photo.module.scss'

interface IProps { 
  className?: string
  photo: IPhoto 
}

const b = stylesBlock(styles)

const Photo: React.FC<IProps> = ({ className, photo }) => {

  const { image } = photo

  return (
    <div className={b('wrapper')}>
      <img 
        className={b('photo', className)}
        src={image.url}
        alt=''
      />
    </div>
  )
}

export default Photo
