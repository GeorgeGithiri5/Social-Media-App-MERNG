const PostResolvers = require('./Post')
const userResolvers = require('./User')

module.exports = {
    Query:{
        ...PostResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation
    }
}