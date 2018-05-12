import { ResolverMap } from '../../types/resolverType'
import { Notification } from '../../entity/Notification'

export const resolvers: ResolverMap = {
    Query: {
        notifications: async (_, __, { user }) =>
            Notification.find({ where: { sendTo: user }, relations: ['user'] })
    }
}
