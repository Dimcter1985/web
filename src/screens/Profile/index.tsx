import React from 'react'
import AccountLayout from 'components/Account/AccountLayout'
import AccountNavigation from 'components/Account/AccountNavigation'
import withUserGuard from 'hocs/withUserGuard'
import EditForm from './components/EditForm'

const Profile: React.FC = () => (
  <AccountLayout>
    <AccountNavigation activeItem='profile' />
    <EditForm />
  </AccountLayout>
)

export default withUserGuard(Profile)
