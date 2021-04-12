import { GraphQLServer } from 'graphql-yoga'
import { Query, Mutation, Post, User, Picture, AnimalInterface } from './graphql/resolvers'

const dbUrl = 'http://localhost:3000'

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Post,
        User,
        Picture,
        AnimalInterface
    }
})

server.start(() => {
    console.log('Running')
})