export const typeDefs = `
    type User {
        id: ID!
        email: String!
        firstname: String!
        photos: [Photo]
    }

    type Photo {
        id: ID!
        userId: ID!
        url: String!
        likes: [Like]
    }

    type Like {
        userId: ID!
        user: User
    }

    input PhotoInput {
        url: String!
    }

    type Query {
        hello(name: String): String!
        users: [User]
        photos: [Photo]
    }

    type Mutation {
        createUser(email: String! firstname: String! photo: PhotoInput): User!
        likePhoto(photoId: ID! userId: ID!): Boolean
    }
`
