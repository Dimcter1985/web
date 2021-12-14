import toHasGraphQLMutationCall from './toHasGraphQLMutationCall'
import toHasCalledWithVariables from './toHasCalledWithVariables'
import toHasGraphQLQueryCall from './toHasGraphQLQueryCall'

expect.extend({
  toHasGraphQLMutationCall,
  toHasCalledWithVariables,
  toHasGraphQLQueryCall,
})