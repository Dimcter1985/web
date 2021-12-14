import { NextRouter } from 'next/router'

jest.mock('hooks/useRouter', () => (
  (): NextRouter => ({
    ...jest.requireActual('hooks/useRouter') as NextRouter,
    push: jest.fn(),
    replace: jest.fn(),
    isReady: true,
  })),
)
