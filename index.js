const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const Post = require('./models/Post')
const {MONGODB} = require('./config')

const typeDefs = gql`
    type Post{
        _id: ID!,
        body: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find()
                return posts
            }catch(err){
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser:true}, { useUnifiedTopology: true })
        .then(()=>{
            console.log("MongoDB connected")
            return server.listen({port: 5000})
        })
        .then(res=>{
            console.log(`Server running at ${res.url}`)
        })       