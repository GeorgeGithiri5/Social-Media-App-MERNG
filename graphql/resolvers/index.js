const PostResolvers = require('./Post')
const userResolvers = require('./User')
const commentResolvers = require('./comments')

module.exports = {
    Post: {
        likeCount(parent){
            return parent.likes.length
        },
        commentCount: (parent)=>parent.comments.length
    },
    Query:{
        ...PostResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...PostResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...PostResolvers.Subscription
    }
}