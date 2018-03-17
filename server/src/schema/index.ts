export const typeDefs = `
    type User {
        id: ID!
        firstname: String!
        lastname: String!
        username: String!
        date: String!
        photos: [Photo]
        following: [User]
        followers: [User]
        photosCount: Int!
        followingCount: Int!
        followersCount: Int!
    }

    type Photo {
        id: ID!
        userId: ID!
        url: String!
        date: String!
        likes: [Like]
        likesCount: Int!
        comments: [Comment]
        commentsCount: Int!
    }

    type Like {
        user: User
    }

    type Comment {
        text: String!
        date: String!
        user: User
    }

    type LoginResponse {
        ok: Boolean!
        token: String
        error: String
    }

    type Response {
        ok: Boolean!
        error: String
    }

    type Query {
        hello(name: String): String!
        users: [User]
        photos: [Photo]
    }

    type Mutation {
        createPhoto(userId: ID!, url: String!): Boolean
        likePhoto(photoId: ID!, userId: ID!): Boolean!
        createComment(photoId: ID!, userId: ID!, text: String!): Boolean!
        follow(userId: ID!, followerId: ID!): Boolean!
        login(email: String!, password: String!): LoginResponse!
        register(email: String!, password: String!, firstname: String!, lastname: String! username: String!): Response!
    }
`
