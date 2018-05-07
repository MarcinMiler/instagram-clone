import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    searchUsersQuery,
    follow,
    unfollowMutation,
    userQuery
} from '../../utils/mutations'
import { User } from '../../entity/User'
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

describe('Query user', async () => {
    it('should return user', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await Photo.create({
            url: 'lul.jpg',
            userId: 1
        }).save()

        const response = await client.request(userQuery(1))

        expect(response).toMatchSnapshot()
    })
})
