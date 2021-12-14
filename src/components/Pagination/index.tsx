import { ComponentProps } from 'react'
import MuiPagination from '@material-ui/lab/Pagination'

type IProps = ComponentProps<typeof MuiPagination>

const Pagination: React.FC<IProps> = ({  
  siblingCount = 0,
  boundaryCount = 1,
  ...props
}) => {
  return (
    <MuiPagination
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      {...props}
    />
  )
}

export default Pagination
