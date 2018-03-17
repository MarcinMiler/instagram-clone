import { ResolverMap } from '../types/ResolverType'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Account } from '../entity/Account'
import { User } from '../entity/User'
import { SECRET } from '../secret'

const createToken = async (id: number): Promise<string> =>
    jwt.sign({ id }, SECRET, { expiresIn: '1y' })

const AuthResolver: ResolverMap = {
    Mutation: {
        register: async (_, args) => {
            const { email, password, firstname, lastname, username } = args

            try {
                const hash = await bcrypt.hash(password, 12)

                const account = await Account.create({
                    email,
                    password: hash
                }).save()

                await User.create({
                    id: account.id,
                    firstname,
                    lastname,
                    username
                }).save()

                return {
                    ok: true
                }
            } catch (err) {
                console.log(err)
                return {
                    ok: false,
                    error: 'errorr'
                }
            }
        },
        login: async (_, args) => {
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
    }
}

export default AuthResolver
