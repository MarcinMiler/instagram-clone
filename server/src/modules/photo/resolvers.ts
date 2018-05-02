import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'

export const resolvers: ResolverMap = {
    Query: {
        photo: (_, { photoId }) =>
            Photo.findOne(photoId, {
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
    }
}
