import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    likePhoto
} from '../../utils/mutations'
import { Photo } from '../../entity/Photo'
import { Like } from '../../entity/Like'

let getHost = () => ''
let token = ''

beforeAll(async () => {
    const app = await startServer()
    const { port } = app.address()
    getHost = () => `http://127.0.0.1:${port}/graphql`

    await request(
        getHost(),
        registerMutation(email, password, fullname, username)
    )
    const login: any = await request(
        getHost(),
        loginMutationWithToken(email, password)
    )
    token = login.login.token
})

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'
const url = 'url.jpg'

describe('Mutation like Photo', async () => {
    it('should like photo', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await Photo.create({
            userId: 1,
            url
        }).save()

        const response = await client.request(likePhoto(1))

        expect(response).toEqual({ likePhoto: true })

        const photo = await Photo.findOneById(1, { relations: ['likes'] })
        const like = await Like.find()

        expect(photo).toMatchSnapshot()
        expect(like).toHaveLength(1)
        expect(like).toMatchSnapshot()
    })

    it('should not like twice', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        const response = await client.request(likePhoto(1))

        expect(response).toEqual({ likePhoto: false })

        const photo = await Photo.findOneById(1, { relations: ['likes'] })
        const like = await Like.find()

        expect(photo).toMatchSnapshot()
        expect(like).toHaveLength(1)
        expect(like).toMatchSnapshot()
    })
})
