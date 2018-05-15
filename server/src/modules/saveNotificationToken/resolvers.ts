import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        hello: () => 'hello'
    },
    Mutation: {
        saveNotificationToken: async (_, { token }, { user }) => {
            try {
                await User.updateById(user, { notificationToken: token })

                return true
            } catch (err) {
                return false
            }
        }
    }
}
