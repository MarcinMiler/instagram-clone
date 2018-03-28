import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import * as jwt from 'jsonwebtoken'
import { SECRET } from './secret'

const options = {
    endpoint: '/graphql',
    cors: {
        origin: '*'
    }
}

const addUser = (req: any, res: any, next: any) => {
    const { token } = req.headers
    if (token) {
        const user = jwt.verify(token, SECRET)
        req.user = user
    }
    next()
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (req: any) => ({
        user: req.request.user.id
    })
})

createConnection().then(() => {
    server.use(addUser)
    server.start(options, () =>
        console.log('Server is running on localhost:4000')
    )
})
