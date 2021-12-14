// TODO: Add TypeScript
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentClass, FC } from 'react'
import { UseFieldConfig, useField } from 'react-final-form'

type InputType = ComponentClass<any> | FC<any>

function withField<FieldType>(
  InputComponent: InputType,
  options: UseFieldConfig<FieldType> = {},
): any {
  const WithInput = ({ name, type, value, validate, ...props }: any): any => {
    const input = useField(name, { type, value, validate,  ...options })
    return <InputComponent {...input} {...props} />
  }

  return WithInput
}

export default withField
