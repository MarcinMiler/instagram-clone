import { request, GraphQLClient } from 'graphql-request'
import { startServer } from '../../startServer'
import {
    loginMutationWithToken,
    registerMutation,
    addComment
} from '../../utils/mutations'
import { Photo } from '../../entity/Photo'
import { Comment } from '../../entity/Comment'

let getHost = () => ''
let token = ''

const email = 'm@m.com'
const password = 'mm'
const fullname = 'Marcin Miler'
const username = 'Marcinek'
const url = 'url.jpg'
const text = 'New photo :)'

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

describe('Mutation addComment', async () => {
    it('should add new comment', async () => {
        const client = new GraphQLClient(getHost(), {
            headers: {
                token
            }
        })

        await Photo.create({
            userId: 1,
            url
        }).save()

        const response = await client.request(addComment(1, 'Wow'))

        expect(response).toEqual({ addComment: true })

        const photo = await Photo.findOneById(1, { relations: ['comments'] })
        const comment = await Comment.find()

        expect(photo).toMatchSnapshot()
        expect(comment).toHaveLength(1)
        expect(comment[0]).toEqual({
            id: 1,
            userId: 1,
            photoId: 1,
            text: 'Wow',
            likesCount: 0
        })
    })
})
