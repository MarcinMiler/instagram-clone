import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'

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
        photos: () =>
            Photo.find({ relations: ['likes', 'likes.user', 'comments'] })
    },
    Mutation: {
        createPhoto: async (_, { userId, url }) => {
            try {
                const photo = Photo.create({ userId, url })
                await photo.save()

                return true
            } catch (err) {
                return false
            }
        },
        likePhoto: async (_, { photoId, userId }) => {
            try {
                const like = Like.create({
                    photoId,
                    userId
                })
                await like.save()

                return true
            } catch (err) {
                return false
            }
        },
        createComment: async (_, { photoId, userId, text }) => {
            try {
                const comment = Comment.create({
                    photoId,
                    userId,
                    text
                })
                await comment.save()

                return true
            } catch (err) {
                return false
            }
        },
        follow: async (_, { userId, followerId }) => {
            try {
                const user = await User.findOneById(userId, {
                    relations: ['followers', 'following']
                })

                const user2 = await User.findOneById(followerId, {
                    relations: ['followers', 'following']
                })

                if (user && user2) {
                    user.following.push(user2)
                    user2.followers.push(user)
                    await user.save()
                    await user2.save()
                }
                return true
            } catch (err) {
                return false
            }
        },
        changeFullname: async (_, { fullname }, { user }) => {
            try {
                await User.updateById(user, { fullname })
                return true
            } catch (err) {
                return false
            }
        },
        changeUsername: async (_, { username }, { user }) => {
            const usernameExists = await User.findOne({ username })

            if (usernameExists) {
                return false
            }

            try {
                await User.updateById(user, { username })
                return true
            } catch (err) {
                return false
            }
        },
        changeBio: async (_, { bio }, { user }) => {
            try {
                await User.updateById(user, { bio })
                return true
            } catch (err) {
                return false
            }
        },
        changeEmail: async (_, { email }, { user }) => {
            const emailExists = await User.findOne({ email })

            if (emailExists) {
                return false
            }

            try {
                await User.updateById(user, { email })
                return true
            } catch (err) {
                return false
            }
        }
    }
}

export default UserResolver
