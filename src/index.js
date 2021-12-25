const { ApolloServer, PubSub } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils')

const
    Query = require('./resolvers/Query'),
    Mutation = require('./resolvers/Mutation'),
    User = require('./resolvers/User'),
    Link = require('./resolvers/Link'),
    Subscription = require('./resolvers/Subscription'),
    Vote = require('./resolvers/Vote')

const prisma = new PrismaClient()

// TODO: implement n+1 problem? -> https://www.youtube.com/watch?v=uCbFMZYQbxE

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
    // Query: {
    //     info: () => `This is the API of a Hackernews Clone`,
    //     feed: ,
    // },

    // Mutation: {
    //     post: (parent, args, context, info) =>
    //         context.prisma.link.create({
    //             data: {
    //                 url: args.url,
    //                 description: args.description,
    //             },
    //         })
    // },

    // Link: {
    //     id: parent => parent.id,
    //     url: parent => parent.url,
    //     description: parent => parent.description,
    // }
}

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
    context: ({ req }) => ({
        ...req,
        prisma,
        pubsub,
        userId:
            req && req.headers.authorization
                ? getUserId(req)
                : null
    })
})

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`))
