import { Notification } from '../entity/Notification'
import { User } from '../entity/User'

const typeOfMessage = (type: string) => {
    interface Types {
        [key: string]: string
    }

    const types: Types = {
        comment: 'commented your photo.',
        like: 'liked your photo.',
        likeComment: 'liked your comment',
        follow: 'followed you.'
    }
    return types[type]
}

export const sendNotification = async (
    currentUser: number,
    userToSend: number,
    messageType: string,
    expo: any,
    photoId?: number
) => {
    const message = typeOfMessage(messageType)

    const notification = Notification.create({
        userId: currentUser,
        photoId,
        message,
        sendTo: userToSend
    })
    await notification.save()

    const sendTo: any = await User.findOneById(userToSend)
    const u: any = await User.findOneById(currentUser)

    if (sendTo.notificationToken) {
        const expoMessage = {
            to: sendTo.notificationToken,
            sound: 'default',
            body: `${u.username} ${message}`
        }

        await expo.sendPushNotificationsAsync([expoMessage])
    }
}
