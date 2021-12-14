import Text from 'components/Text'
import React from 'react'
import { useField } from 'react-final-form'

interface IProps {
  name: string;
}

const Anonymous: React.FC<IProps> = ({ name }) => {
  const { input: { value } } = useField(name)
  
  if (!value) { return null }

  return (
    <Text>Posted Anonymously</Text>
  )
}

export default Anonymous
