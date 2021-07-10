import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Label, Button, Icon} from 'semantic-ui-react'

function LikeButton({user, post: {_id, likeCount, likes}}){
    const [liked, setLiked] = useState(false)

    useEffect(()=>{
        if(user && likes.find(like=>like.username === user.username)){
            setLiked(true)
        }else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: _id}
    })

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ):(
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ):(
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    )

    return(
        <Button as='div' labelPosition="right" onClick={likePost}>
            {likeButton}
            <label color="teal" pointing="left">
                {likeCount}
            </label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            _id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton