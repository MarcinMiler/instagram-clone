import { ResolverMap } from '../../types/resolverType'
import { Photo } from '../../entity/Photo'

export const resolvers: ResolverMap = {
    Query: {
        photos: () =>
            Photo.find({
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
