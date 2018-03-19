import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

const options = {
    endpoint: '/graphql',
    cors: {
        origin: '*'
    }
}

const addUser = (req: any, res: any, next: any) => {
    console.log(req.headers, 'token')
    next()
}

createConnection().then(() => {
    server.use(addUser)
    server.start(options, () =>
        console.log('Server is running on localhost:4000')
    )
})
