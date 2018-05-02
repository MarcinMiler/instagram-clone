import { request } from 'graphql-request'
import { startServer } from '../../startServer'
import { Account } from '../../entity/Account'
import { User } from '../../entity/User'

let getHost = () => ''

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}`
})

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'

const mutation = `
    mutation {
        register(email: "${email}", password: "${password}", fullname: "${fullname}", username: "${username}") {
            ok,
            error
        }
    }
`

test('should register', async () => {
    const response = await request(getHost(), mutation)
    expect(response).toEqual({ register: { ok: true, error: null } })

    const accounts = await Account.find({ where: { email } })
    expect(accounts).toHaveLength(1)

    const users = await User.find({ where: { email } })
    expect(users).toHaveLength(1)

    const account = accounts[0]
    expect(account.email).toEqual(email)
    expect(account.password).not.toEqual(password)

    const user = users[0]
    const matchUser = {
        email,
        fullname,
        username
    }
    expect(user).toMatchObject(matchUser)

    expect(user.id).toEqual(account.id)
})
