import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const dbUrl = 'http://localhost:3000'

const server = new GraphQLServer({
    typeDefs: `
        type Query {
            agent(id: ID!): User
            agents(name: String, age: Int): [User]
            cars: [String]
            msg(values: [String!]!): String
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
                const response = await axios.get(`${dbUrl}/users/${args.id}`) // getting data from Fake Rest API
                return response.data
            },
            agents: async (parent, args, context, info) => {
                const name = args.name != null ? `name=${args.name}` : ''
                const age = args.age != null ? `age=${args.age}` : ''

                const response = await axios.get(`${dbUrl}/users?${name}&${age}`) // getting data from Fake Rest API 
                return response.data
            },
            cars: async () => {
                return ['mazda', 'ford']
            },
            msg: async (parent, args, context, info) => {
                if(args.values.length === 0) {
                    return 'Sorry no values'
                }
                return `Hello ${args.values[0]} ${args.values[1]}`
            }
        }
    }
})

server.start(() => {
    console.log('Running')
})