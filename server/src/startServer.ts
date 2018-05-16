import 'reflect-metadata'
import { importSchema } from 'graphql-import'
import { GraphQLServer } from 'graphql-yoga'
import * as path from 'path'
import * as fs from 'fs'
import * as jwt from 'jsonwebtoken'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { createTypeormConn } from './utils/createTypeormConn'
import SECRET from './utils/SECRET'

const Expo = require('expo-server-sdk')

const options = {
    port: process.env.NODE_ENV === 'test' ? 0 : 4000,
    endpoint: '/graphql',
    cors: {
        origin: '*'
    }
}

const addUser = (req: any, _: any, next: any) => {
    const token = req.headers.token
    if (token) {
        const user = jwt.verify(token, SECRET)
        req.user = user
    }
    next()
}

export const startServer = async () => {
    const schemas: GraphQLSchema[] = []
    const folders = fs.readdirSync(path.join(__dirname, './modules'))
    folders.forEach(folder => {
        const { resolvers } = require(`./modules/${folder}/resolvers`)
        const typeDefs = importSchema(
            path.join(__dirname, `./modules/${folder}/schema.graphql`)
        )
        schemas.push(makeExecutableSchema({ resolvers, typeDefs }))
    })

    const expo = new Expo()

    const server = new GraphQLServer({
        schema: mergeSchemas({ schemas }),
        context: (req: any) => {
            if (req.request.user) {
                return {
                    user: req.request.user.id,
                    expo
                }
            }
            return
        }
    })
    server.use(addUser)

    await createTypeormConn()

    const app = await server.start(options)

    return app
}
