import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'
import { Like } from '../../entity/Like'
import { sendNotification } from '../../utils/sendNotification'

export const resolvers: ResolverMap = {
    Mutation: {
        likePhoto: async (_, { photoId }, { user, expo }) => {
            try {
                const photo = await Photo.findOneById(photoId, {
                    relations: ['likes', 'likes.user']
                })

                if (photo) {
                    const isLiked = photo.likes.find(l => l.userId === user)

                    if (!isLiked) {
                        const like = Like.create({
                            photoId,
                            userId: user
                        })
                        await like.save()

                        if (photo.userId !== user) {
                            sendNotification(
                                user,
                                photo.userId,
                                'like',
                                expo,
                                photo.id
                            )
                        }

                        return true
                    }
                }

                return false
            } catch (err) {
                return false
            }
        }
    }
}
