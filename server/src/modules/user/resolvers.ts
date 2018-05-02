import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
    Query: {
        user: (_, { id }) => User.findOne(id, { relations: ['photos'] })
    }
}
