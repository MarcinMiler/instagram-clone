import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    follow,
    feedQuery
} from '../../utils/mutations'
import { Photo } from '../../entity/Photo'

let getHost = () => ''
let token = ''

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}/graphql`

    const email = 'm@m.com'
    const password = 'mm'
    const fullname = 'Marcin Miler'
    const username = 'Marcinek'

    await request(
        getHost(),
        registerMutation(email, password, fullname, username)
    )

    await request(
        getHost(),
        registerMutation('a@a.com', 'aa', 'Angelika Miler', 'Angelaaa')
    )

    await request(
        getHost(),
        registerMutation('k@k.com', 'kk', 'Kinga Miler', 'Kingaaa')
    )

    const login: any = await request(
        getHost(),
        loginMutationWithToken(email, password)
    )
    token = login.login.token
})

describe('Query feed', async () => {
    it('should return followers new photos', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await client.request(follow(2))
        await client.request(follow(3))

        await Photo.create({
            userId: 2,
            url: 'lol.jpg'
        }).save()

        await Photo.create({
            userId: 3,
            url: 'lul.jpg'
        }).save()

        const response: any = await client.request(feedQuery)

        expect(response.feed).toHaveLength(2)
        expect(response).toMatchSnapshot()
    })
})
