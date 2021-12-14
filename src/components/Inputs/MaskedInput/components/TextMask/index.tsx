import React from 'react'
import MaskedInput from 'react-text-mask'

interface IProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  mask: Array<string | RegExp>;
  placeholder: string;
}

const TextMask: React.FC<IProps> = ({ inputRef, mask, placeholder, ...other }) => (
  <MaskedInput
    {...other}
    ref={(ref: any): void => {
      inputRef(ref ? ref.inputElement : null)
    }}
    mask={mask}
    placeholder={placeholder || undefined}
  />
)

export default TextMask
