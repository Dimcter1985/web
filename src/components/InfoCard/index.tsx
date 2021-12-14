import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useMediaQueries from 'hooks/useMediaQueries'
import Title from 'components/Title'
import Text from 'components/Text'
import styles from './InfoCard.module.scss'

interface IProps {
  className?: string;
  textAlign?: 'left' | 'center';
  title: string;
  subtitle: string;
}

const b = stylesBlock(styles)

const InfoCard: React.FC<IProps> = ({ className, textAlign = 'left', title, subtitle }) => {
  const { isMobile } = useMediaQueries()

  return (
    <div className={b('card', className)}>
      <Title
        positions={isMobile ? 'center' : textAlign}
        size='small'
      >
        { title }
      </Title>
      <Text
        className={b('subtitle', { position: textAlign })}
        variant='h5'
      >
        { subtitle }
      </Text>
    </div>
  )
}

export default React.memo(InfoCard)
