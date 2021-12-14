import client from 'core/utils/api/client'

client.query = jest.fn()

export default client as any