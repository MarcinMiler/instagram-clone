import User from './UserResolver'
import Auth from './AuthResolver'

export const resolvers = {
    ...User,
    ...Auth
}
