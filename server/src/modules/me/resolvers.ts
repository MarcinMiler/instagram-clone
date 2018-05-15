import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'
const Expo = require('expo-server-sdk')

export const resolvers: ResolverMap = {
    Query: {
        me: async (_, __, { user }) => {
            const u = await User.findOneById(user, {
                relations: [
                    'photos',
                    'photos.likes',
                    'photos.comments',
                    'photos.likes.user',
                    'photos.comments.user',
                    'followers',
                    'following'
                ]
            })
            if (u) {
                u.photos.sort((a: any, b: any) => b.id - a.id)
            }

            // const expo = new Expo()

            // const message = {
            //     to: 'some token',
            //     sound: 'default',
            //     body: 'Notification test',
            //     data: { withSome: 'data' }
            // }

            // try {
            //     const receipts = await expo.sendPushNotificationsAsync([
            //         message
            //     ])
            //     console.log(receipts)
            // } catch (err) {
            //     console.log(err)
            // }

            return u
        }
    }
}
