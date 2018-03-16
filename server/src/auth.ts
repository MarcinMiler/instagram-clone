import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Account } from './entity/Account'
import { User } from './entity/User'
import { SECRET } from './secret'

interface RegisterInput {
    email: string
    password: string
    firstname: string
}

interface LoginInput {
    email: string
    password: string
}

interface RegisterResponse {
    ok: boolean
    error?: string
}

interface LoginResponse {
    ok: boolean
    token?: string
    error?: string
}

const createToken = async (id: number): Promise<string> =>
    jwt.sign({ id }, SECRET, { expiresIn: '1y' })

export const register = async (
    args: RegisterInput
): Promise<RegisterResponse> => {
    const { email, password, firstname } = args

    try {
        const hash = await bcrypt.hash(password, 12)

        const account = await Account.create({
            email,
            password: hash
        }).save()

        await User.create({
            id: account.id,
            firstname
        }).save()

        return {
            ok: true
        }
    } catch (err) {
        return {
            ok: false,
            error: 'error'
        }
    }
}

export const login = async (args: LoginInput): Promise<LoginResponse> => {
    const { email, password } = args
    const account = await Account.findOne({ email })

    if (!account) {
        return {
            ok: false,
            error: 'Wrong email'
        }
    }

    const valid = await bcrypt.compare(password, account.password)
    if (!valid) {
        return {
            ok: false,
            error: 'Wromg password'
        }
    }

    const token = await createToken(account.id)

    return {
        ok: true,
        token
    }
}
