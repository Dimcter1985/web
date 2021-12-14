import React from 'react'

const ExclamationPoin = ({ ...props }: IconProps): JSX.Element => (
  <svg viewBox='0 0 24 24' {...props}>
    <path d='M10.8 15.6H13.2V18H10.8V15.6ZM10.8 6H13.2V13.2H10.8V6ZM11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 11.988 0ZM12 21.6C6.696 21.6 2.4 17.304 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 17.304 17.304 21.6 12 21.6Z' fill='#FF453B'/>
  </svg>
)

ExclamationPoin.defultProps ={
  width: 24,
  height: 24,
}

export default ExclamationPoin
