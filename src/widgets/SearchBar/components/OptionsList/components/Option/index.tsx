
import { ISearchOption } from '../../../..'
import SalonOption from '../SalonOption'
import ServiceOption from '../ServiceOption'

interface IProps {
  option: ISearchOption
  onClick: (option: ISearchOption) => void
}

const Option: React.FC<IProps> = ({ option, onClick }) => {
  if (option.type === 'service') {
    return <ServiceOption option={option} onClick={onClick} />
  }

  return <SalonOption option={option} onClick={onClick} />
}

export default Option
