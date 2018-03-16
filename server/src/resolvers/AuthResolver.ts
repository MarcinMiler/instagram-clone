import { ResolverMap } from '../types/ResolverType'
import { register, login } from '../auth'

const AuthResolver: ResolverMap = {
    Mutation: {
        register: (_, args) => register(args),
        login: (_, args) => login(args)
    }
}

export default AuthResolver
