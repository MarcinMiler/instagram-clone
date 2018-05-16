import { ResolverMap } from '../../types/resolverType'
import { Comment } from '../../entity/Comment'
import { Like } from '../../entity/Like'
import { sendNotification } from '../../utils/sendNotification'

export const resolvers: ResolverMap = {
    Mutation: {
        likeComment: async (_, { commentId }, { user, expo }) => {
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
                            sendNotification(
                                user,
                                comment.userId,
                                'likeComment',
                                expo,
                                comment.photoId
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
