import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'

export const resolvers: ResolverMap = {
    Query: {
        photo: async (_, { photoId }) => {
            const p = await Photo.findOneById(photoId, {
                relations: [
                    'likes',
                    'likes.user',
                    'comments',
                    'comments.user',
                    'comments.likes',
                    'comments.likes.user',
                    'user'
                ]
            })

            if (p) {
                p.comments.sort((a: any, b: any) => a.id - b.id)
            }

            return p
        }
    }
}
