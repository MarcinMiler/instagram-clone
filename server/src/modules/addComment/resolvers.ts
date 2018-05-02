import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'
import { Comment } from '../../entity/Comment'
import { Notification } from '../../entity/Notifications'

export const resolvers: ResolverMap = {
    Mutation: {
        addComment: async (_, { photoId, text }, { user }) => {
            try {
                const comment = Comment.create({
                    photoId,
                    userId: user,
                    text
                })
                await comment.save()

                const photo = await Photo.findOne(photoId)

                if (photo && photo.userId !== user) {
                    const notification = Notification.create({
                        userId: user,
                        photoId,
                        message: 'comment your photo.',
                        sendTo: photo.userId
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
