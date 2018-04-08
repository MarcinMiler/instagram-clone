import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'
import { Account } from '../entity/Account'
import { Notification } from '../entity/Notifications'
import { getRepository } from 'typeorm'

const UserResolver: ResolverMap = {
    Query: {
        me: (_, args, { user }) =>
            User.findOneById(user, {
                relations: [
                    'photos',
                    'photos.likes',
                    'photos.comments',
                    'photos.likes.user',
                    'photos.comments.user',
                    'followers',
                    'following'
                ]
            }),
        users: () =>
            User.find({
                relations: [
                    'photos',
                    'photos.likes',
                    'photos.comments',
                    'photos.likes.user',
                    'photos.comments.user',
                    'followers',
                    'following'
                ]
            }),
        user: (_, { id }) => User.findOneById(id, { relations: ['photos'] }),
        searchUser: async (_, { pattern }) => {
            const data = await getRepository(User)
                .createQueryBuilder('user')
                .select()
                .where('user.username like :name', {
                    name: '%' + pattern + '%'
                })
                .getMany()
            return data
        },
        isFollowing: async (_, { userId }, { user }) => {
            const u = await User.findOneById(user, { relations: ['following'] })
            if (u) {
                const find = u.following.find(
                    f => f.id === parseInt(userId, 10)
                )
                if (find) {
                    return true
                }
            }
            return false
        },
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
            }),
        photo: (_, { photoId }) =>
            Photo.findOneById(photoId, {
                relations: [
                    'likes',
                    'likes.user',
                    'comments',
                    'comments.user',
                    'comments.likes',
                    'comments.likes.user',
                    'user'
                ]
            }),
        isLiked: async (_, { photoId }, { user }) => {
            const photo = await Photo.findOneById(photoId, {
                relations: ['likes', 'likes.user']
            })
            if (photo) {
                const res = photo.likes.find(like => like.userId === user)
                if (res) {
                    return true
                }
            }
            return false
        },
        notifications: async (_, args, { user }) =>
            Notification.find({ where: { sendTo: user } })
    },
    Mutation: {
        addPhoto: async (_, { url, text }, { user }) => {
            try {
                const photo = Photo.create({ userId: user, url })
                await photo.save()

                const comment = Comment.create({
                    photoId: photo.id,
                    userId: user,
                    text
                })
                await comment.save()

                return true
            } catch (err) {
                return false
            }
        },
        likePhoto: async (_, { photoId }, { user }) => {
            try {
                const photo = await Photo.findOneById(photoId, {
                    relations: ['likes', 'likes.user']
                })

                if (photo) {
                    const isLiked = photo.likes.find(l => l.userId === user)

                    if (!isLiked) {
                        const like = Like.create({
                            photoId,
                            userId: user
                        })
                        await like.save()

                        const notification = Notification.create({
                            userId: user,
                            message: 'is liked your photo.',
                            sendTo: photo.userId
                        })
                        await notification.save()

                        return true
                    }
                }

                return false
            } catch (err) {
                return false
            }
        },
        addComment: async (_, { photoId, text }, { user }) => {
            try {
                const comment = Comment.create({
                    photoId,
                    userId: user,
                    text
                })
                await comment.save()

                const photo = await Photo.findOneById(photoId)

                if (photo) {
                    const notification = Notification.create({
                        userId: user,
                        message: 'comment your photo.',
                        sendTo: photo.userId
                    })
                    await notification.save()
                }

                return true
            } catch (err) {
                return false
            }
        },
        likeComment: async (_, { commentId }, { user }) => {
            try {
                const comment = await Comment.findOneById(commentId, {
                    relations: ['likes', 'likes.user']
                })

                if (comment) {
                    const isLiked = comment.likes.find(l => l.userId === user)
                    if (!isLiked) {
                        const like = Like.create({
                            commentId,
                            userId: user
                        })
                        await like.save()

                        const notification = Notification.create({
                            userId: user,
                            message: 'is liked your comment.',
                            sendTo: comment.userId
                        })
                        await notification.save()

                        return true
                    }
                }
                return false
            } catch (err) {
                return false
            }
        },
        follow: async (_, { followerId }, { user }) => {
            try {
                const user1 = await User.findOneById(user, {
                    relations: ['followers', 'following']
                })

                const user2 = await User.findOneById(followerId, {
                    relations: ['followers', 'following']
                })

                if (user1 && user2) {
                    user1.following.push(user2)
                    user2.followers.push(user1)
                    await user1.save()
                    await user2.save()

                    const notification = Notification.create({
                        userId: user,
                        message: 'is following you.',
                        sendTo: followerId
                    })
                    await notification.save()
                }
                return true
            } catch (err) {
                return false
            }
        },
        unfollow: async (_, { followerId }, { user }) => {
            try {
                const user1 = await User.findOneById(user, {
                    relations: ['followers', 'following']
                })

                const user2 = await User.findOneById(followerId, {
                    relations: ['followers', 'following']
                })

                if (user1 && user2) {
                    const lol = user1.following.filter(
                        u => u.id !== parseInt(followerId, 10)
                    )
                    const lol2 = user2.followers.filter(
                        u => u.id !== parseInt(user, 10)
                    )

                    user1.following = lol
                    user2.followers = lol2

                    user1.save()
                    user2.save()
                }
                return true
            } catch (err) {
                return false
            }
        },
        changeProfileDetails: async (
            _,
            { fullname, username, bio, email },
            { user }
        ) => {
            let error = ''

            try {
                if (fullname) {
                    await User.updateById(user, { fullname })
                }

                if (username) {
                    const usernameExist = await User.findOne({
                        where: { username }
                    })
                    if (!usernameExist) {
                        await User.updateById(user, { username })
                    } else {
                        error += 'Username is taken '
                    }
                }

                if (bio) {
                    await User.updateById(user, { bio })
                }

                if (email) {
                    const usernameExist = await User.findOne({
                        where: { email }
                    })
                    if (!usernameExist) {
                        await User.updateById(user, { email })
                        await Account.updateById(user, { email })
                    } else {
                        error += 'Email is taken '
                    }
                }

                return {
                    ok: true,
                    error
                }
            } catch (err) {
                return {
                    ok: false,
                    error: 'Something goes wrong'
                }
            }
        }
    }
}

export default UserResolver
