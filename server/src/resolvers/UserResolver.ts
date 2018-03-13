import { ResolverMap } from '../types/ResolverType'
import { User } from '../entity/User'
import { Photo } from '../entity/Photo'
import { Like } from '../entity/Like'

const UserResolver: ResolverMap = {
    Query: {
        hello: (_, { name }) => `Hello Marci ${name || 'World'}`,
        users: async () =>
            User.find({
                relations: ['photos', 'photos.likes', 'photos.likes.user']
            }),
        photos: async () => Photo.find({ relations: ['likes', 'likes.user'] })
    },
    Mutation: {
        createUser: async (_, args) => {
            const photo = Photo.create({ ...args.photo })
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
        }
    }
}

export default UserResolver
