import { renderHook, act } from '@testing-library/react-hooks'

import { def, get, waitFor, userFactory, rewardFactory } from 'core/spec'
import createRedemption from 'core/api/rewards/createRedemption'
import fetchRewards from 'core/api/rewards/fetchRewards'
import fetchProfile from 'core/api/auth/fetchProfile'
import useRewards, { IUseRewards } from '../useRewards'
import useApp from '../useApp'

jest.mock('core/api/rewards/createRedemption', () => jest.fn())
jest.mock('core/api/rewards/fetchRewards', () => jest.fn())
jest.mock('core/api/auth/fetchProfile', () => jest.fn())

jest.mock('../useApp', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useRewards', () => {
  def('subject', () => renderHook(useRewards))

  def('reward', rewardFactory)
  def('rewards', () => [get.reward])

  def('user', () => userFactory({
    firstName: 'John',
    lastName: 'Smith',
  }))

  describe('Initial state', () => {
    beforeEach(() => {
      // @ts-ignore
      fetchRewards.mockResolvedValue({ data: [], total: 0 })
      // @ts-ignore
      useApp.mockReturnValue({ user: get.user })
    })

    it('has correct initial state', async () => {
      const hook = get.subject.result.current as IUseRewards

      await act(async () => {
        await waitFor(() => {
          expect(hook.rewards).toEqual([])
          expect(hook.loading).toEqual(false)
          expect(typeof hook.loadMore).toEqual('function')
          expect(hook.selectedReward).toEqual(null)
          expect(hook.redeemedReward).toEqual(null)
          expect(typeof hook.selectReward).toEqual('function')
          expect(typeof hook.redeemReward).toEqual('function')
          expect(typeof hook.unselectReward).toEqual('function')
          expect(hook.user).toEqual(get.user)
        })
      })
    })
  })

  describe('Actions with rewards', () => {
    def('updateUser', jest.fn)
    def('reward', rewardFactory)

    beforeEach(() => {
      // @ts-ignore
      useApp.mockReturnValue({
        user: get.user,
        updateUser: get.updateUser,
      })
      // @ts-ignore
      createRedemption.mockResolvedValue(get.reward)
      // @ts-ignore
      fetchProfile.mockResolvedValue(get.user)
    })

    it('selects and redeems reward', async () => {
      const { result } = get.subject

      act(() => { result.current.selectReward(get.reward) })
      await act(async () => { result.current.redeemReward() })

      await act(async () => {
        await waitFor(async () => {
          expect(createRedemption).toBeCalledWith({
            rewardId: get.reward.id,
            name: 'John Smith',
            email: get.user.email,
            phone: get.user.mobile,
          })
          expect(fetchProfile).toBeCalled()
          expect(get.updateUser).toBeCalledWith(get.user)
        })
      })
    })
  })
})
