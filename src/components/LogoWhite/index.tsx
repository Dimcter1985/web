import { ReactComponent as LogoIcon } from './icons/logo.svg'

interface IProps {
  className?: string
}

const LogoWhite: React.FC<IProps> = ({ className }) => {
  return (
    <LogoIcon className={className} />
  )
}

export default LogoWhite
