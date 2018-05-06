import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    me
} from '../../utils/mutations'
import { User } from '../../entity/User'

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

    const login: any = await request(
        getHost(),
        loginMutationWithToken(email, password)
    )
    token = login.login.token
})

describe('Query me', async () => {
    it('should return user', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response: any = await client.request(me)

        expect(response).toMatchSnapshot()

        const user: any = await User.findOneById(1, {
            select: ['id', 'fullname', 'username']
        })

        const { id, username, fullname } = response.me

        expect([user.id, user.username, user.fullname]).toMatchObject([
            parseInt(id, 10),
            username,
            fullname
        ])
    })
})
