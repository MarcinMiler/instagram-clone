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

test('Mutation login', async () => {
    await request(
        getHost(),
        registerMutation('m@m.com', 'mm', 'Marcin Miler', 'Marcinek')
    )

    const response1 = await request(getHost(), loginMutation('m@m.com', 'mm'))
    expect(response1).toEqual({ login: { ok: true, error: null } })

    const response2 = await request(getHost(), loginMutation('mm@mm.com', 'mm'))
    expect(response2).toEqual({ login: { ok: false, error: 'Wrong email' } })

    const response3 = await request(
        getHost(),
        loginMutation('m@m.com', 'mmmmmmm')
    )
    expect(response3).toEqual({
        login: { ok: false, error: 'Wrong password' }
    })
})
