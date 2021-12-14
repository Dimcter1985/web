import { useCallback, useState } from 'react'

import createRedemption from 'core/api/rewards/createRedemption'
import combineFullName from 'core/utils/user/combineFullName'
import fetchRewards from 'core/api/rewards/fetchRewards'
import fetchProfile from 'core/api/auth/fetchProfile'
import useList from './useList'
import useApp from './useApp'

export interface IUseRewards {
  rewards: IListReward[]
  loading: boolean
  loadMore: () => void
  selectedReward: IListReward | null
  redeemedReward: IListReward | null
  selectReward: (reward: IListReward) => void
  redeemReward: () => void
  unselectReward: () => void
  user: ICustomer | null
}

const useRewards = (): IUseRewards => {
  const [selectedReward, setSelectedReward] = useState<IListReward | null>(null)
  const [redeemedReward, setRedeemedReward] = useState<IListReward | null>(null)
  const [loading, setLoading] = useState(false)

  const { data, loadMore } = useList<IListReward>(fetchRewards)
  const { user, updateUser } = useApp()

  const unselectReward = useCallback(() => {
    setSelectedReward(null)
  }, [setSelectedReward])

  const redeemReward = useCallback(async () => {
    if (!user || !selectedReward) return
    try {
      setLoading(true)
      const { reward } = await createRedemption({
        rewardId: selectedReward.id,
        name: combineFullName(user),
        email: user.email,
        phone: user.mobile,
      })
      const updatedUser = await fetchProfile()
      setRedeemedReward(reward)
      updateUser(updatedUser)
      unselectReward()
    } catch (error) {
      return null
    } finally {
      setLoading(false)
    }
  }, [user, updateUser, fetchProfile, selectedReward, unselectReward, createRedemption])

  return {
    rewards: data,
    loading,
    loadMore,
    selectedReward,
    redeemedReward,
    selectReward: setSelectedReward,
    redeemReward,
    unselectReward,
    user,
  }
}

export default useRewards