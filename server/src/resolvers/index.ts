import User from './UserResolver'
import Auth from './AuthResolver'

export const resolvers = {
    Query: {
        ...User.Query
    },
    Mutation: {
        ...User.Mutation,
        ...Auth.Mutation
    }
}
