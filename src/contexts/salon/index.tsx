import { useMemo , createContext } from 'react'



interface IProps {
  salon: ISalon
}

export interface IContext {
  salon: ISalon
}

const SalonContext = createContext<IContext>({
  salon: {} as ISalon,
})

const SalonProvider: React.FC<IProps> = ({ salon, children }) => {

  const value: IContext = useMemo(() => ({
    salon,
  }), [salon])

  return (
    <SalonContext.Provider value={value}>
      { children }
    </SalonContext.Provider>
  )
}

export { SalonProvider }

export default SalonContext
