import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard'

function Home(){
    const {loading, data} = useQuery(FETCH_POST_QUERY)
    
    return(
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading Posts...</h1>
                ) : (
                    data.getPosts && data.getPosts.map(post=>(
                        <Grid.Column key={post}>
                            <PostCard post={post} marginBottom = '20'/>
                        </Grid.Column>
                    ))
                )
                }
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POST_QUERY = gql`
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

export default Home