import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    addPhoto,
    likePhoto,
    likeComment,
    notifications
} from '../../utils/mutations'
import { Notification } from '../../entity/Notification'

let getHost = () => ''
let token = ''
let token2 = ''

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

    const login2: any = await request(
        getHost(),
        loginMutationWithToken('a@a.com', 'aa')
    )
    token2 = login2.login.token
})

describe('Query notifications', async () => {
    it('should return a notification', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const client2 = new GraphQLClient(getHost(), {
            headers: {
                token: token2
            }
        })

        await client.request(addPhoto('lol.jpg', 'Wow'))

        await client2.request(likePhoto(1))
        await client2.request(likeComment(1))

        const response: any = await client.request(notifications)

        expect(response.notifications).toHaveLength(2)
        expect(response).toMatchSnapshot()

        const notification = await Notification.find()

        expect(notification).toHaveLength(2)
        expect(notification).toMatchSnapshot()
    })
})
