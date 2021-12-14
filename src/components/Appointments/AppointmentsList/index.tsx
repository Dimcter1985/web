import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import { Statuses } from 'core/consts/appointments'
import useAppointmentsList from 'core/hooks/useAppointmentsList'
import CancelAppointmentProvider from 'contexts/cancelAppointment'
import Text from 'components/Text'
import RouterLink from 'components/RouterLink'
import InfinityScroll from 'components/InfinityScroll'
import AccountButton from 'components/Account/AccountButton'
import AppointmentCard from '../AppointmentCard'
import styles from './AppointmentsList.module.scss'

interface IProps {
  appointments: IListAppointment[];
  loaded: boolean;
  noMore: boolean;
  loadMore: () => void;
  emptyText: string;
}

const b = stylesBlock(styles)

const AppointmentsList: React.FC<IProps> = ({ emptyText, appointments, loaded, noMore, loadMore }) => {
  if (loaded && appointments.length === 0) {
    return (
      <>
        <Text className={b('empty-text')}>{ emptyText }</Text>
        <RouterLink href='/search'>
          <AccountButton className={b('book-button')}>Book now</AccountButton>
        </RouterLink>
      </>
    )
  }
  
  return (
    <div className={b('wrapper')}>
      <InfinityScroll hasMore={!noMore} loadMore={loadMore}>
        { appointments.map((app, index) => (
          <AppointmentCard
            key={index.toString()}
            appointment={app}
          />
        ))}
      </InfinityScroll>
    </div>
  )
}

interface IConnectProps {
  statuses?: Statuses[];
  emptyText: string;
  sort?: {
    order: ISortDirection
    sortBy: IAppointmentSortBy
  };
  infinity?: boolean;
  batch?: AppointmentsBatch;
}

const ConnectCancelDialog: React.FC<IConnectProps> = ({ emptyText, ...props }) => {
  const { data, loaded, noMore, loadMore, removeFromList } = useAppointmentsList(props)
  
  return (
    <CancelAppointmentProvider removeFromList={removeFromList}>
      <AppointmentsList
        appointments={data}
        loaded={loaded}
        noMore={noMore}
        loadMore={loadMore}
        emptyText={emptyText}
      />
    </CancelAppointmentProvider>
  )
}

export default ConnectCancelDialog
