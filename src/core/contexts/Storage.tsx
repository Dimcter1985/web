import React, { createContext } from 'react'

const Storage = createContext({} as IStorageContext)

interface IProps {
  storage: IStorage
}

const StorageProvider: React.FC<IProps> = ({ children, storage }) => (
  <Storage.Provider value={{ storage }}>
    {children}
  </Storage.Provider>
)

export { StorageProvider }

export default Storage