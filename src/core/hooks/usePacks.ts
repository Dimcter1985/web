import { useState, useCallback, SetStateAction } from 'react'

interface IParams {
  packs: IServicePack[],
  maxQuantity?: number
  minQuantity?: number
}

export interface IUsePacks {
  packs: IServicePack[],
  increaseQuanity: (serviceId: number) => void
  decreaseQuanity: (serviceId: number) => void
  removeService: (serviceId: number) => void
  setPacks: React.Dispatch<SetStateAction<IServicePack<IService>[]>>
}

const usePacks = ({ packs: initialPacks, maxQuantity = 5, minQuantity = 1 }: IParams): IUsePacks => {
  const [packs, setPacks] = useState(initialPacks)

  const removeService = useCallback((serviceId: number) => {
    setPacks((prevPacks) => prevPacks.filter(({ service }) => serviceId !== service.id))
  }, [setPacks])

  const increaseQuanity = useCallback((serviceId: number) => {
    setPacks((prevPacks) => (prevPacks.map((pack) => {
      if (pack.service.id !== serviceId) { return pack } 
      const nextQuantity = pack.quantity + 1
      if (nextQuantity > maxQuantity) { return pack }
      return { ...pack, quantity: nextQuantity }
    })))
  }, [setPacks, maxQuantity])

  const decreaseQuanity = useCallback((serviceId: number) => {
    setPacks((prevPacks) => (prevPacks.map((pack) => {
      if (pack.service.id !== serviceId) { return pack } 
      const nextQuantity = pack.quantity - 1
      if (nextQuantity < minQuantity) { return pack }
      return { ...pack, quantity: nextQuantity }
    })))
  }, [setPacks, minQuantity])

  return { packs, removeService, increaseQuanity, decreaseQuanity, setPacks }
}

export default usePacks
