import * as bcrypt from 'bcryptjs'
import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'
import { Account } from '../../entity/Account'

export const resolvers: ResolverMap = {
    Query: {
        hello: () => 'hello'
    },
    Mutation: {
        register: async (_, args) => {
            const { email, password, username, fullname } = args

            try {
                const hash = await bcrypt.hash(password, 12)

                const account = await Account.create({
                    email,
                    password: hash
                }).save()

                await User.create({
                    id: account.id,
                    email: account.email,
                    username,
                    fullname
                }).save()

                return {
                    ok: true
                }
            } catch (err) {
                return {
                    ok: false,
                    error: 'Error'
                }
            }
        }
    }
}
