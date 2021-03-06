import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Mutation: {
        unfollow: async (_, { followerId }, { user }) => {
            try {
                const user1 = await User.findOneById(user, {
                    relations: ['followers', 'following']
                })

                const user2 = await User.findOneById(followerId, {
                    relations: ['followers', 'following']
                })

                if (user1 && user2) {
                    const lol = user1.following.filter(
                        u => u.id !== parseInt(followerId, 10)
                    )
                    const lol2 = user2.followers.filter(u => u.id !== user)

                    user1.following = lol
                    user2.followers = lol2

                    await user1.save()
                    await user2.save()
                }
                return true
            } catch (err) {
                return false
            }
        }
    }
}
