import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    follow,
    isFollowing
} from '../../utils/mutations'
import { User } from '../../entity/User'

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

describe('Query isFollowing', async () => {
    it('should check is user is following another user', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await client.request(follow(2))

        const response = await client.request(isFollowing(2))

        expect(response).toEqual({ isFollowing: true })

        const user: any = await User.findOneById(1, {
            relations: ['following']
        })

        expect(user).toMatchSnapshot()
        expect(user.following[0].id).toBe(2)
    })
})
