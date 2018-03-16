import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (req: any) => console.log(req.headers)
})

createConnection().then(() => {
    server.start(() => console.log('Server is running on localhost:4000'))
})
