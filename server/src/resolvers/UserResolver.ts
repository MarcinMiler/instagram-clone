import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'
import { register, login } from '../auth'

const UserResolver: ResolverMap = {
    Query: {
        hello: (_, { name }) => `Hello Marcin ${name || 'World'}`,
        users: async () =>
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
        photos: async () =>
            Photo.find({ relations: ['likes', 'likes.user', 'comments'] })
    },
    Mutation: {
        createUser: async (_, args) => {
            const photo = Photo.create({ ...args.photo })
            await photo.save()

            const user = User.create({
                firstname: args.firstname
            })

            user.photos = [photo]
            await user.save()

            return user
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
        }
    }
}

export default UserResolver
