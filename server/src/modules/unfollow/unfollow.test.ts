import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    follow,
    unfollowMutation
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

describe('Mutation unfollow', async () => {
    it('should unfollow user', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await client.request(follow(2))

        const user = await User.findOneById(1)
        const user2 = await User.findOneById(2)

        expect(user).toHaveProperty('followingCount', 1)
        expect(user2).toHaveProperty('followersCount', 1)

        const response = await client.request(unfollowMutation(2))

        expect(response).toEqual({ unfollow: true })

        const unfollowUser = await User.findOneById(1)
        const unfollowUser2 = await User.findOneById(2)

        expect(unfollowUser).toHaveProperty('followingCount', 0)
        expect(unfollowUser2).toHaveProperty('followersCount', 0)
    })
})
