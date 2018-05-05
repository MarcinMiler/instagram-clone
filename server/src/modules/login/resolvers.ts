import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { ResolverMap } from '../../types/resolverType'
import { Account } from '../../entity/Account'
import SECRET from '../../utils/SECRET'

const createToken = (id: number): string =>
    jwt.sign({ id }, SECRET, { expiresIn: '1y' })

export const resolvers: ResolverMap = {
    Mutation: {
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
                    error: 'Wrong password'
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
