import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'

export const resolvers: ResolverMap = {
    Query: {
        isLiked: async (_, { photoId }, { user }) => {
            const photo = await Photo.findOne(photoId, {
                relations: ['likes', 'likes.user']
            })
            if (photo) {
                const res = photo.likes.find(like => like.userId === user)
                if (res) {
                    return true
                }
            }
            return false
        }
    }
}
