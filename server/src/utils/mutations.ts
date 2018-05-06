export const registerMutation = (
    email: string,
    password: string,
    fullname: string,
    username: string
) => `
    mutation {
        register(email: "${email}", password: "${password}", fullname: "${fullname}", username: "${username}") {
            ok,
            error
        }
    }
`

export const loginMutation = (email: string, password: string) => `
    mutation {
        login(email: "${email}", password: "${password}") {
            ok,
            error
        }
    }
`

export const loginMutationWithToken = (email: string, password: string) => `
    mutation {
        login(email: "${email}", password: "${password}") {
            token
        }
    }
`

export const addPhoto = (url: string, text: string) => `
    mutation {
        addPhoto(url: "${url}", text: "${text}")
    }
`

export const likePhoto = (photoId: number) => `
    mutation {
        likePhoto(photoId: "${photoId}")
    }
`

export const addComment = (photoId: number, text: string) => `
    mutation {
        addComment(photoId: "${photoId}", text: "${text}")
    }
`

export const changeProfileDetails = (
    fullname: string,
    username: string,
    bio: string,
    email: string
) => `
    mutation {
        changeProfileDetails(fullname: "${fullname}", username: "${username}", bio: "${bio}", email: "${email}")
    }
`

export const follow = (followerId: number) => `
    mutation {
        follow(followerId: "${followerId}")
    }
`

export const isFollowing = (userId: number) => `
    {
        isFollowing(userId: ${userId})
    }
`

export const isLiked = (photoId: number) => `
    {
        isLiked(photoId: ${photoId})
    }
`

export const likeComment = (commentId: number) => `
    mutation {
        likeComment(commentId: "${commentId}")
    }
`

export const me = `
    {
        me {
            id,
            fullname,
            username
        }
    }
`

export const notifications = `
    {
        notifications {
            id,
            userId,
            photoId,
            sendTo,
            message
        }
    }
`

export const photoQuery = (photoId: number) => `
{
    photo(photoId: "${photoId}") {
        id
        url
        userId,
        user {
            username
            fullname
        }
        likes {
            user {
                username
            }
        }
        comments {
            id
            text
            likes {
                user {
                    username
                }
            }
        }
        likesCount
        commentsCount
    }
}
`
