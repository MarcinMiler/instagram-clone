import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    photoQuery
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

describe('Query photo', async () => {
    it('should return a photo', async () => {
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

        const response = await client.request(photoQuery(1))

        expect(response).toMatchSnapshot()
    })
})
