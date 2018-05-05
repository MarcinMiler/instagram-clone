import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        user: (_, { id }) => User.findOneById(id, { relations: ['photos'] })
    }
}
