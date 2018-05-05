import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    changeProfileDetails
} from '../../utils/mutations'
import { User } from '../../entity/User'

let getHost = () => ''
let token = ''

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'

const newEmail = 'mm@mm.com'
const newFullname = 'Mirek Miler'
const newUsername = 'Milerek'
const newBio = 'New bio'

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

describe('Mutation changeProfileDetails', async () => {
    it('should change profile details', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response = await client.request(
            changeProfileDetails(newFullname, newUsername, newBio, newEmail)
        )

        expect(response).toEqual({
            changeProfileDetails: ''
        })

        const user = await User.findOneById(1)

        expect(user).toMatchSnapshot()
    })

    it('should throw error when email and username is taken', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response = await client.request(
            changeProfileDetails(newFullname, 'Angelaaa', newBio, 'a@a.com')
        )

        expect(response).toEqual({
            changeProfileDetails: 'Username is taken Email is taken '
        })
    })
})
