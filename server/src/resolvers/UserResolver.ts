import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'
import { Account } from '../entity/Account'

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
