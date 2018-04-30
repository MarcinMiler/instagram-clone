import request from 'graphql-request'
import { startServer } from '../../startServer'
import {
    registerMutation,
    loginMutation,
    loginMutationWithToken
} from '../../utils/mutations'
let getHost = () => ''

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}`
})

describe('Mutation login', () => {
    test('should login with email and password', async () => {
        await request(
            getHost(),
            registerMutation('m@m.com', 'mm', 'Marcin Miler', 'Marcinek')
        )

        const response = await request(
            getHost(),
            loginMutation('m@m.com', 'mm')
        )
        expect(response).toEqual({ login: { ok: true, error: null } })
    })

    test('should not login with wrong email', async () => {
        const response = await request(
            getHost(),
            loginMutation('mm@mm.com', 'mm')
        )
        expect(response).toEqual({ login: { ok: false, error: 'Wrong email' } })
    })

    test('should not login with wrong password', async () => {
        const response = await request(
            getHost(),
            loginMutation('m@m.com', 'mmmmmmm')
        )
        expect(response).toEqual({
            login: { ok: false, error: 'Wrong password' }
        })
    })
})
