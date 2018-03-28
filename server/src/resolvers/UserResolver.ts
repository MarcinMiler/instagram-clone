import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'

const UserResolver: ResolverMap = {
    Query: {
        me: (_, args, { user }) => User.findOneById(user),
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
        }
    }
}

export default UserResolver
