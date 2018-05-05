import { ResolverMap } from '../../types/resolverType'
import { Notification } from '../../entity/Notification'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Mutation: {
        follow: async (_, { followerId }, { user }) => {
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

                    const notification = Notification.create({
                        userId: user,
                        message: 'is following you.',
                        sendTo: followerId
                    })
                    await notification.save()
                }
                return true
            } catch (err) {
                return false
            }
        }
    }
}
