import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'
import { sendNotification } from '../../utils/sendNotification'

export const resolvers: ResolverMap = {
    Mutation: {
        follow: async (_, { followerId }, { user, expo }) => {
            try {
                const user1 = await User.findOneById(user, {
                    relations: ['followers', 'following']
                })

                const user2 = await User.findOneById(followerId, {
                    relations: ['followers', 'following']
                })

                if (user1 && user2) {
                    user1.following.push(user2)
                    user2.followers.push(user1)
                    await user1.save()
                    await user2.save()

                    sendNotification(user, followerId, 'follow', expo)
                }
                return true
            } catch (err) {
                return false
            }
        }
    }
}
