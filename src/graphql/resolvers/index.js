import axios from 'axios'

const dbUrl = 'http://localhost:3000'

const Query = {
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
}

const Mutation = {
    createAgent: async (parent, args, context, info) => {
        const response = await axios.post(`${dbUrl}/users`, {
            name: args.name,
            age: args.age,
            married: args.married,
            average: 0
        })
        return response.data
    },
    createPost: async (parent, args, context, info) => {
        const response = await axios.post(`${dbUrl}/posts`, {
            title: args.title,
            content: args.content,
            author: 1,
            picture: 1
        })
        return response.data
    },
    deletePost: async (parent, args, context, info) => {
        const response = await axios.delete(`${dbUrl}/posts/${args.id}`)

        if(Object.keys(response.data).length === 0) {
            return true
        }
        return false
    },
    deleteAgent: async (parent, args, context, info) => {
        const response = await axios.delete(`${dbUrl}/users/${args.id}`)

        // find all posts and delete them
        // find all pictures and delete them
        
        if(Object.keys(response.data).length === 0) {
            return true
        }
        return false
    }
}

const Post = {
    author: async (parent, args, context, info) => {
        try {
            const response = await axios.get(`${dbUrl}/users/${parent.author}`)
            return response.data
        } catch (e) {
            return null
        } 
    },
    picture: async (parent, args, context, info) => {
        const response = await axios.get(`${dbUrl}/pictures/${parent.picture}`)
        return response.data
    }
}

const User = {
    posts: async (parent, args, context, info) => {
        const response = await axios.get(`${dbUrl}/posts?author=${parent.id}`)
        return response.data
    },
    pictures: async (parent, args, context, info) => {
        const response = await axios.get(`${dbUrl}/pictures?author=${parent.id}`)
        return response.data
    }
}

const Picture = {
    author: async (parent, args, context, info) => {
        const response = await axios.get(`${dbUrl}/users/${parent.author}`)
        return response.data
    },
    post: async (parent, args, context, info) => {
        const response = await axios.get(`${dbUrl}/posts/${parent.post}`)
        return response.data
    }
}

export {
    Query,
    Mutation,
    Post,
    User,
    Picture
}
