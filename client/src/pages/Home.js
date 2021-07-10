import React,{useContext} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'

import {FETCH_POST_QUERY} from '../util/graphql'

function Home(){
    const {user} = useContext(AuthContext)
    const {loading, data} = useQuery(FETCH_POST_QUERY)
    
    return(
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
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

export default Home