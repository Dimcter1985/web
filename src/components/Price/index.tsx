import Text, { IProps as ITextProps } from 'components/Text'

interface IProps extends ITextProps {  
  price: number | string
  negative?: boolean
  className?: string
}

const Price: React.FC<IProps> = ({ price, negative, className, ...props }) => (
  <Text className={className} {...props}>
    { negative ? `-$${price}` : `$${price}`}
  </Text>
)

export default Price
