import { ResolverMap } from '../../types/resolverType'
import { Comment } from '../../entity/Comment'
import { Notification } from '../../entity/Notification'
import { Like } from '../../entity/Like'

export const resolvers: ResolverMap = {
    Mutation: {
        likeComment: async (_, { commentId }, { user }) => {
            try {
                const comment = await Comment.findOneById(commentId, {
                    relations: ['likes', 'likes.user']
                })

                if (comment) {
                    const isLiked = comment.likes.find(l => l.userId === user)
                    if (!isLiked) {
                        const like = Like.create({
                            commentId,
                            userId: user
                        })
                        await like.save()

                        if (comment.userId !== user) {
                            const notification = Notification.create({
                                userId: user,
                                photoId: comment.photoId,
                                message: 'is liked your comment.',
                                sendTo: comment.userId
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
