import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    saveNotificationToken
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

    const login: any = await request(
        getHost(),
        loginMutationWithToken(email, password)
    )
    token = login.login.token
})

describe('Mutation addComment', async () => {
    it('should add new comment', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const u: any = await User.findOneById(1)
        expect(u.notificationToken).toBeNull()

        const response = await client.request(
            saveNotificationToken('some token')
        )

        expect(response).toEqual({ saveNotificationToken: true })

        const userWithToken: any = await User.findOneById(1)
        expect(userWithToken.notificationToken).toEqual('some token')
    })
})
