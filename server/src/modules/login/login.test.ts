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

describe('Mutation login', async () => {
    it('should login with email and password', async () => {
        await request(
            getHost(),
            registerMutation('a@a.com', 'aa', 'Angelika Miler', 'Angela')
        )

        const response = await request(
            getHost(),
            loginMutation('a@a.com', 'aa')
        )
        expect(response).toEqual({ login: { ok: true, error: null } })
    })

    it('should not login with bad email', async () => {
        const response = await request(
            getHost(),
            loginMutation('aa@aa.com', 'aa')
        )
        expect(response).toEqual({
            login: { ok: false, error: 'Wrong email' }
        })
    })

    it('should not login with bad password', async () => {
        const response = await request(
            getHost(),
            loginMutation('a@a.com', 'aaaaaa')
        )
        expect(response).toEqual({
            login: { ok: false, error: 'Wrong password' }
        })
    })
})
