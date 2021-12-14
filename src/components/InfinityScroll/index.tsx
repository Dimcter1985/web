import React from 'react'
import ReactInfinityScroll from 'react-infinite-scroller'

type IProps = React.ComponentProps<typeof ReactInfinityScroll>

const InfinityScroll: React.FC<IProps> = ({
  pageStart = 1,
  initialLoad = false,
  ...props
}) => (
  <ReactInfinityScroll
    pageStart={pageStart}
    initialLoad={initialLoad}
    loader={<h2 key={0}>Loading...</h2>}
    {...props}
  />
)

export default InfinityScroll
