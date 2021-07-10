import React, {useState,useContext, useRef} from "react"
import gql from 'graphql-tag'
import {useMutation,useQuery} from '@apollo/react-hooks'
import {Grid, Image, Card, Button, Label, Icon, Form} from 'semantic-ui-react'
import moment from 'moment'

import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from "../components/DeleteButton"

function SinglePost(props){
    const {user} = useContext(AuthContext)
    const postId = props.match.params.postId

    const commentInputRef = useRef(null)

    const [comment, setComment] = useState('')

    const {data:getPost} = useQuery(FETCH_POST_QUERY, {
        variables:{
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('')
            commentInputRef.current.blur()
        },
        variables:{
            postId,
            body:comment
        }
    })

    function deletePostCallback(){
        props.history.push('/')
    }

    let postMarkup;

    if(!getPost){
        postMarkup = <p>Loading post...</p>
    }else{
        const {_id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost
    
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size = "small"
                        float = "right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{_id, likeCount, likes}} />
                            <Button 
                                as="div"
                                labelPosition = "right"
                                onClick = {()=>console.log('Comment on Post')}
                            >
                                <Button basic color="blue">
                                    <Icon name="comments" />
                                </Button>
                                <Label basic color="blue" pointing="left">
                                        {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && (
                                <DeleteButton postId={_id} callback={deletePostCallback}/>
                            )}
                        </Card.Content>
                        {user && (
                            <Card fluid >
                                <p>Post A Comment</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment.."
                                            name='comment'
                                            value ={comment}
                                            onChange={event=>setComment(event.target.value)}
                                            ref = {commentInputRef}
                                        />
                                        <button type="submit" className="ui button teal" disabled={comment.trim() === ''} onClick={submitComment}>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Card>
                        )}
                        {comments.map(comment=>(
                            <Card fluid key={comment._id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton  postId={_id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(comment.create).fromNow()}
                                    </Card.Meta>
                                    <Card.Description>
                                        {comment.body}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}
const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId:ID!, $body:String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
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
                id
                username
                createdAt
                body
            }
        }
    }
`

export default SinglePost