import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'
import { Comment } from '../../entity/Comment'

export const resolvers: ResolverMap = {
    Mutation: {
        addPhoto: async (_, { url, text }, { user }) => {
            try {
                const photo = Photo.create({ userId: user, url })
                await photo.save()

                const comment = Comment.create({
                    photoId: photo.id,
                    userId: user,
                    text
                })
                await comment.save()

                return true
            } catch (err) {
                return false
            }
        }
    }
}
