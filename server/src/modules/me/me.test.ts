import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import { loginMutationWithToken, registerMutation } from '../../utils/mutations'

let getHost = () => ''
let app: any

beforeAll(async () => {
    app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}`
})

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'

const query = `
    {
        me {
            id,
            fullname,
            username
        }
    }
`

describe('Query me', async () => {
    it('should return user', async () => {
        await request(
            getHost(),
            registerMutation(email, password, fullname, username)
        )
        const login: any = await request(
            getHost(),
            loginMutationWithToken(email, password)
        )
        const { token } = login.login

        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response = await client.request(query)

        expect(response).toMatchSnapshot()
    })
})
