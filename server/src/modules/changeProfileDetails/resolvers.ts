import { ResolverMap } from '../../types/resolverType'
import { User } from '../../entity/User'
import { Account } from '../../entity/Account'

export const resolvers: ResolverMap = {
    Mutation: {
        changeProfileDetails: async (
            _,
            { fullname, username, bio, email },
            { user }
        ) => {
            let error = ''

            try {
                if (fullname) {
                    await User.update(user, { fullname })
                }

                if (username) {
                    const usernameExist = await User.findOne({
                        where: { username }
                    })
                    if (!usernameExist) {
                        await User.update(user, { username })
                    } else {
                        error += 'Username is taken '
                    }
                }

                if (bio) {
                    await User.update(user, { bio })
                }

                if (email) {
                    const usernameExist = await User.findOne({
                        where: { email }
                    })
                    if (!usernameExist) {
                        await User.update(user, { email })
                        await Account.update(user, { email })
                    } else {
                        error += 'Email is taken '
                    }
                }

                return {
                    ok: true,
                    error
                }
            } catch (err) {
                return {
                    ok: false,
                    error: 'Something goes wrong'
                }
            }
        }
    }
}
