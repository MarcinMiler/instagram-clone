import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    follow
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

describe('Mutation follow', async () => {
    it('should follow user', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response = await client.request(follow(2))

        expect(response).toEqual({ follow: true })

        const user = await User.findOneById(1, {
            relations: ['followers', 'following']
        })

        expect(user).toMatchSnapshot()
    })
})
