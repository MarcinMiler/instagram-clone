import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    photosQuery
} from '../../utils/mutations'
import { Photo } from '../../entity/Photo'
import { Comment } from '../../entity/Comment'
import { Like } from '../../entity/Like'

let getHost = () => ''
let token = ''

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}/graphql`

    await request(
        getHost(),
        registerMutation(email, password, fullname, username)
    )

    await request(
        getHost(),
        registerMutation('a@a.com', 'aa', 'Angelika Miler', 'Angelaaa')
    )

    const login: any = await request(
        getHost(),
        loginMutationWithToken(email, password)
    )
    token = login.login.token
})

describe('Query photos', async () => {
    it('should return photos', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await Photo.create({
            userId: 1,
            url: 'lol.jpg'
        }).save()

        await Comment.create({
            userId: 1,
            photoId: 1,
            text: 'Wow'
        }).save()

        await Comment.create({
            userId: 2,
            photoId: 1,
            text: 'Nice'
        }).save()

        await Like.create({
            userId: 2,
            photoId: 1
        }).save()

        await Like.create({
            userId: 2,
            commentId: 1
        }).save()

        await Photo.create({
            userId: 2,
            url: 'lul.jpg'
        }).save()

        await Comment.create({
            userId: 2,
            photoId: 2,
            text: 'Wow'
        }).save()

        await Comment.create({
            userId: 1,
            photoId: 2,
            text: 'Nice'
        }).save()

        await Like.create({
            userId: 1,
            photoId: 2
        }).save()

        await Like.create({
            userId: 1,
            commentId: 2
        }).save()

        const response: any = await client.request(photosQuery)

        expect(response.photos).toHaveLength(2)
        expect(response).toMatchSnapshot()
    })
})
