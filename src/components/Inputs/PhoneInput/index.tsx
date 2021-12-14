import React, { ComponentProps } from 'react'
import withInput from 'hocs/withInput'

import { MaskedInput } from '../MaskedInput'

const MASK = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]

type IProps = Omit<ComponentProps<typeof MaskedInput>, 'mask'>

const PhoneInput: React.FC<IProps> = (props) => (
  <MaskedInput mask={MASK} type='tel' {...props} />
)

export { PhoneInput }
export default withInput(PhoneInput)
