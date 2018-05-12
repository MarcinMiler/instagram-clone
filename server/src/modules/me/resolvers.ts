import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        me: async (_, __, { user }) => {
            const u = await User.findOneById(user, {
                relations: [
                    'photos',
                    'photos.likes',
                    'photos.comments',
                    'photos.likes.user',
                    'photos.comments.user',
                    'followers',
                    'following'
                ]
            })
            if (u) {
                u.photos.sort((a: any, b: any) => b.id - a.id)
            }
            return u
        }
    }
}
