import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        isFollowing: async (_, { userId }, { user }) => {
            const u = await User.findOne(user, { relations: ['following'] })
            if (u) {
                const find = u.following.find(
                    f => f.id === parseInt(userId, 10)
                )
                if (find) {
                    return true
                }
            }
            return false
        }
    }
}
