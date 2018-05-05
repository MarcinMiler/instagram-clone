import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        feed: async (_, args, { user }) => {
            const u = await User.findOneById(user, {
                relations: [
                    'following',
                    'following.photos',
                    'following.photos.user',
                    'following.photos.likes',
                    'following.photos.likes.user',
                    'following.photos.comments',
                    'following.photos.comments.user',
                    'following.photos.comments.likes',
                    'following.photos.comments.likes.user'
                ]
            })
            if (u) {
                const photos = u.following.map(us => us.photos)
                return [].concat.apply([], photos)
            }
            return
        }
    }
}
