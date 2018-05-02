import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'
import { Notification } from '../../entity/Notifications'
import { Like } from '../../entity/Like'

export const resolvers: ResolverMap = {
    Mutation: {
        likePhoto: async (_, { photoId }, { user }) => {
            try {
                const photo = await Photo.findOne(photoId, {
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
                            const notification = Notification.create({
                                userId: user,
                                photoId,
                                message: 'is liked your photo.',
                                sendTo: photo.userId
                            })
                            await notification.save()
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
