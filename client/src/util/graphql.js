import gql from 'graphql-tag'

export const FETCH_POST_QUERY = gql`
{
    getPosts{
        _id
        body
        createdAt
        username
        likeCount
        likes{
            username
        }
        commentCount
        comments{
            id username createdAt body
        }
    }
}
`