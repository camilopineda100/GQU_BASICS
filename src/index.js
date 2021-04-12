import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'

const dbUrl = 'http://localhost:3000'

const server = new GraphQLServer({
    typeDefs: `
        type Query {
            agent(id: ID!): User
            agents(name: String, age: Int): [User]
            posts: [Post!]!
            post(id: ID!): Post
            pictures: [Picture!]!
            picture(id: ID!): Picture
        }

        type User {
            id: ID
            name: String
            age: Int
            married: Boolean
            average: Float
            posts: [Post!]!
            pictures: [Picture!]!
        }

        type Post {
            id: ID
            title: String
            content: String
            author: User!
            picture: Picture
        }

        type Picture {
            id: ID
            path: String
            author: User!
            post: Post!
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

                const response = await axios.get(`${dbUrl}/users?${name}&${age}`)
                return response.data
            },
            posts: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/posts`) 
                return response.data
            },
            post: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/posts/${args.id}`)
                return response.data
            },
            pictures: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/pictures`)
                return response.data
            }
        },
        Post: {
            author: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/users/${parent.author}`)
                return response.data
            },
            picture: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/pictures/${parent.picture}`)
                return response.data
            }
        },
        User: {
            posts: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/posts?author=${parent.id}`)
                return response.data
            },
            pictures: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/pictures?author=${parent.id}`)
                return response.data
            }
        },
        Picture: {
            author: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/users/${parent.author}`)
                return response.data
            },
            post: async (parent, args, context, info) => {
                const response = await axios.get(`${dbUrl}/posts/${parent.post}`)
                return response.data
            }
        }
    }
})

server.start(() => {
    console.log('Running')
})