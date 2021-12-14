import Typography, { TypographyProps } from '@material-ui/core/Typography'

export type IProps = TypographyProps

const Text: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Typography {...props}>
      { children }
    </Typography>
  )
}

export default Text
