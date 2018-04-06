import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'
import { Account } from '../entity/Account'
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
            Photo.find({ relations: ['likes', 'likes.user', 'comments'] }),
        photo: (_, { photoId }) =>
            Photo.findOneById(photoId, {
                relations: ['likes', 'likes.user', 'comments', 'user']
            })
    },
    Mutation: {
        addPhoto: async (_, { url }, { user }) => {
            try {
                const photo = Photo.create({ userId: user, url })
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
