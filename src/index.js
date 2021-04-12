import { GraphQLServer } from 'graphql-yoga'
import { Query, Mutation, Post, User, Picture, AnimalUnion } from './graphql/resolvers'

const dbUrl = 'http://localhost:3000'

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Post,
        User,
        Picture,
        AnimalUnion
    }
})

server.start(() => {
    console.log('Running')
})