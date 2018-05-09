import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        user: async (_, { id }) => {
            const u = await User.findOneById(id, { relations: ['photos'] })

            if (u) {
                u.photos.sort((a: any, b: any) => b.id - a.id)
            }
            return u
        }
    }
}
