import MuiSkeleton, { SkeletonProps } from '@material-ui/lab/Skeleton'

const Skeleton: React.FC<SkeletonProps> = ({ 
  variant = 'rect', 
  ...props 
}) => {
  return (
    <MuiSkeleton 
      variant={variant}
      {...props}
    />
  )
}

export default Skeleton
