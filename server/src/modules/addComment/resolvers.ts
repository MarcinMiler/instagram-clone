import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'
import { Comment } from '../../entity/Comment'
import { sendNotification } from '../../utils/sendNotification'

export const resolvers: ResolverMap = {
    Mutation: {
        addComment: async (_, { photoId, text }, { user, expo }) => {
            try {
                const comment = Comment.create({
                    photoId,
                    userId: user,
                    text
                })

                await comment.save()

                const photo = await Photo.findOneById(photoId)

                if (photo && photo.userId !== user) {
                    sendNotification(
                        user,
                        photo.userId,
                        'comment',
                        expo,
                        photo.id
                    )
                }

                return true
            } catch (err) {
                return false
            }
        }
    }
}
