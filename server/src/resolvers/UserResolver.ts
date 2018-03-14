import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'
import { Comment } from '../entity/Comment'

const UserResolver: ResolverMap = {
    Query: {
        hello: (_, { name }) => `Hello Marci ${name || 'World'}`,
        users: async () =>
            User.find({
                relations: [
                    'photos',
                    'photos.likes',
                    'photos.comments',
                    'photos.likes.user',
                    'photos.comments.user'
                ]
            }),
        photos: async () =>
            Photo.find({ relations: ['likes', 'likes.user', 'comments'] })
    },
    Mutation: {
        createUser: async (_, args) => {
            const date = new Date()
            const photo = Photo.create({ ...args.photo, date })
            await photo.save()
            const user = User.create({
                email: args.email,
                firstname: args.firstname
            })
            user.photos = [photo]
            await user.save()
            return user
        },
        likePhoto: async (_, args) => {
            try {
                const like = Like.create({
                    photoId: args.photoId,
                    userId: args.userId
                })
                await like.save()
                return true
            } catch (err) {
                return false
            }
        },
        createComment: async (_, args) => {
            try {
                const comment = Comment.create({
                    photoId: args.photoId,
                    userId: args.userId,
                    text: args.text
                })
                await comment.save()
                return true
            } catch (err) {
                return false
            }
        }
    }
}

export default UserResolver
