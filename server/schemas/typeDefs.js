const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        friends: [User]
    }

    type Course {
        _id: ID
        courseName: String
        location: String
        holes: [Hole]
        holeCount: Int
    }

    type Round {
        _id: ID
        courseName: String
        date: String
        scores: [Score]
        totalScore: Int
    }

    type Query {
        users: [User]
        user(username: String): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
    }

    type Auth {
        token: ID!
        user: User 
    }
`;

module.exports = typeDefs;