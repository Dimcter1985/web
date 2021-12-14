import 'jest-localstorage-mock'

const testStorage: IStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

export default testStorage
