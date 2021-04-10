import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const server = new GraphQLServer({
    typeDefs: `
        type Query {
            agent: User
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
            agent: async () => {
                const response = await axios.get('http://localhost:3000/users/1') // getting data from a Rest API
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