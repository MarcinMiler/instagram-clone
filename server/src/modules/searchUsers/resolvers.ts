import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'
import { getRepository } from 'typeorm'

export const resolvers: ResolverMap = {
    Query: {
        searchUsers: async (_, { pattern }) => {
            const data = await getRepository(User)
                .createQueryBuilder('user')
                .select()
                .where('user.username like :name', {
                    name: '%' + pattern + '%'
                })
                .getMany()
            return data
        }
    }
}
