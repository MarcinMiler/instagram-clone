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
                    await User.updateById(user, { fullname })
                }

                if (username) {
                    const usernameExist = await User.findOne({
                        where: { username }
                    })
                    if (!usernameExist) {
                        await User.updateById(user, { username })
                    } else {
                        error += 'Username is taken '
                    }
                }

                if (bio) {
                    await User.updateById(user, { bio })
                }

                if (email) {
                    const usernameExist = await User.findOne({
                        where: { email }
                    })
                    if (!usernameExist) {
                        await User.updateById(user, { email })
                        await Account.updateById(user, { email })
                    } else {
                        error += 'Email is taken '
                    }
                }

                return error
            } catch (err) {
                return 'Something goes wrong'
            }
        }
    }
}
