import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    searchUsersQuery
} from '../../utils/mutations'

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

describe('Query search Users', async () => {
    it('should all users', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response: any = await client.request(searchUsersQuery(''))

        expect(response.searchUsers).toHaveLength(2)
        expect(response).toMatchSnapshot()
    })

    it('should return user by username pattern', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response: any = await client.request(searchUsersQuery('Marcinek'))

        expect(response.searchUsers).toHaveLength(1)
        expect(response).toMatchSnapshot()
    })
})
