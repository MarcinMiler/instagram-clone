import { ResolverMap } from '../../types/resolverType'
import { Notification } from '../../entity/Notifications'

export const resolvers: ResolverMap = {
    Query: {
        notifications: async (_, args, { user }) =>
            Notification.find({ where: { sendTo: user }, relations: ['user'] })
    }
}
