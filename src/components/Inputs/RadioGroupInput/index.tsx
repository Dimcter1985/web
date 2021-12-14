import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'

import Radio from 'components/Radio'
import withInput from 'hocs/withInput'
import { IOption } from 'types/option'

interface IProps extends RadioGroupProps {
  options: IOption[]
  optionClassName?: string
}

const RadioGroupInput: React.FC<IProps> = ({ options, optionClassName, ...props }) => (
  <RadioGroup {...props}>
    { options.map((option) => (
      <FormControlLabel
        key={option.id}
        className={optionClassName}
        value={option.id}
        control={<Radio />}
        label={option.name}
      />
    ))}
  </RadioGroup>
)

export { RadioGroupInput }

export default withInput(RadioGroupInput)
