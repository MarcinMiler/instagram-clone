import request from 'graphql-request'
import * as jwt from 'jsonwebtoken'
import { startServer } from '../../startServer'
import {
    registerMutation,
    loginMutation,
    loginMutationWithToken
} from '../../utils/mutations'
import SECRET from '../../utils/SECRET'
import { User } from '../../entity/User'

let getHost = () => ''

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}/graphql`
})

describe('Mutation login', async () => {
    it('should login with email and password', async () => {
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

    it('should not login with bad email', async () => {
        const response = await request(
            getHost(),
            loginMutation('mm@mm.com', 'mm')
        )
        expect(response).toEqual({
            login: { ok: false, error: 'Wrong email' }
        })
    })

    it('should not login with bad password', async () => {
        const response = await request(
            getHost(),
            loginMutation('m@m.com', 'mmmmm')
        )
        expect(response).toEqual({
            login: { ok: false, error: 'Wrong password' }
        })
    })

    it('should return valid token', async () => {
        const response: any = await request(
            getHost(),
            loginMutationWithToken('m@m.com', 'mm')
        )

        const { token } = response.login

        const isValid: any = jwt.verify(token, SECRET)

        const user = await User.findOne({ where: { email: 'm@m.com' } })

        if (user) {
            expect(isValid.id).toEqual(user.id)
        }
    })
})
