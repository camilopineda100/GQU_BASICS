import { GraphQLServer } from 'graphql-yoga'

/**
 * Scalar types
 * 
 * ID
 * String
 * Int
 * Boolean
 * Float
 * 
 * ID! exclamation indications null is not valid, return error when null
 * 
 */

/**
 * Object types / Custom types
 * 
 */


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
            agent() {
                return {
                    id: 1,
                    name: 'Sebas',
                    age: 27,
                    married: true,
                    average: 4.5
                }
            },
            agents() {
                return [{
                    id: 1,
                    name: 'Sebas',
                    age: 27,
                    married: true,
                    average: 4.5
                },  {
                    id: 2,
                    name: 'Camilo',
                    age: 27,
                    married: true,
                    average: 4.5
                }]
            }
        }
    }
})

server.start(() => {
    console.log('Running')
})