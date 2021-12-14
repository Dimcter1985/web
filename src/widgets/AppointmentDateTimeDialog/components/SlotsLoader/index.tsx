import Skeleton from 'components/Skeleton'
import times from 'lodash/times'

const slots = times(12)

const SlotsLoader: React.FC = () => {
  return (
    <>
      {slots.map((item) => (
        <Skeleton
          key={item}
          width='100%'
          height={40}
        />
      ))}
    </>
  )
}

export default SlotsLoader
