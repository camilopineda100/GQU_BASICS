import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const server = new GraphQLServer({
    typeDefs: `
        type Query {
            agent(id: ID!): User
            agents: [User]
        }

        type User {
            id: ID
            name: String
            age: Int
            married: Boolean
            average: Float
        }
    `,
    resolvers: {
        Query: {
            agent: async (parent, args, context, info) => {
                const response = await axios.get(`http://localhost:3000/users/${args.id}`) // getting data from a Rest API
                return response.data
            },
            agents: async () => {
                const response = await axios.get('http://localhost:3000/users') // getting data from a Rest API
                return response.data
            }
        }
    }
})

server.start(() => {
    console.log('Running')
})