export const typeDefs = `
    type User {
        id: ID!
        email: String!
        fullname: String!
        username: String!
        bio: String
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
        user: User!
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
        id: ID!
        text: String!
        date: String!
        user: User!
        likes: [Like]
        likesCount: Int!
    }

    type Notification {
        id: ID!
        userId: ID!
        photoId: ID
        sendTo: ID!
        message: String!
        user: User!
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
        me: User
        users: [User]
        user(id: ID!): User
        isFollowing(userId: ID!): Boolean!
        searchUser(pattern: String): [User]
        photos: [Photo]
        photo(photoId: ID!): Photo
        isLiked(photoId: ID!): Boolean!
        notifications: [Notification]
        feed: [Photo]
    }

    type Mutation {
        addPhoto(url: String!, text: String!): Boolean!
        likePhoto(photoId: ID!): Boolean!
        addComment(photoId: ID!, text: String!): Boolean!
        likeComment(commentId: ID!): Boolean!
        follow(followerId: ID!): Boolean!
        unfollow(followerId: ID!): Boolean!
        login(email: String!, password: String!): LoginResponse!
        register(email: String!, password: String!, username: String!, fullname: String!): Response!
        changeProfileDetails(fullname: String, username: String, bio: String, email: String): Response!
    }
`
