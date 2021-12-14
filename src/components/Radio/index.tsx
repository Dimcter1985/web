import MuiRadio, { RadioProps } from '@material-ui/core/Radio'

import { ReactComponent as CheckedIcon } from './icons/checked.svg'
import { ReactComponent as UncheckedIcon } from './icons/unchecked.svg'

const Radio: React.FC<RadioProps> = (props) => {
  return (
    <MuiRadio
      icon={<UncheckedIcon />}
      checkedIcon={<CheckedIcon />}
      {...props}
    />
  )
}

export default Radio
