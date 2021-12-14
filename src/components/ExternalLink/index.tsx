import React from 'react'

const ExternalLink: React.FC<AnchorProps> = ({ children, ...props }) => (
  <a target='_blank' rel='noopener noreferrer' {...props}>
    {children}
  </a>
)

export default ExternalLink