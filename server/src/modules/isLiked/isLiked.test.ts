import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    isLiked
} from '../../utils/mutations'
import { Like } from '../../entity/Like'
import { Photo } from '../../entity/Photo'

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

describe('Query isLiked', async () => {
    it('should check if photo is liked', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await Photo.create({
            url: 'lol.jpg',
            userId: 2
        }).save()

        await Like.create({
            photoId: 1,
            userId: 1
        }).save()

        const response = await client.request(isLiked(1))

        expect(response).toEqual({ isLiked: true })

        const like = await Like.find()

        expect(like).toHaveLength(1)
        expect(like).toMatchSnapshot()
    })

    it('should check if photo is not liked', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await Photo.create({
            url: 'lul.jpg',
            userId: 2
        }).save()

        const response = await client.request(isLiked(2))

        expect(response).toEqual({ isLiked: false })

        const like = await Like.find({ where: { userId: 1, photoId: 2 } })

        expect(like).toHaveLength(0)
    })
})
