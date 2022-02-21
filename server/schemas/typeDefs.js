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
        parTotal: Int
    }

    type Hole {
        _id: ID
        holeNumber: Int
        par: Int
    }

    type Round {
        _id: ID
        courseName: String
        date: String
        username: String
        scores: [Score]
        totalScore: Int
    }

    type Score {
        _id: ID
        holeNumber: Int
        stroke: Int
    }

    type Query {
        users: [User]
        user(username: String): User
        courses: [Course]
        course(courseName: String): Course
        rounds: [Round]
        round(username: String): Round
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addFriend(friendId: ID!): User
        createCourse(courseName: String!, location: String!): Course
        addHole(courseId: ID!, holeNumber: Int!, par: Int!): Course
    }

    type Auth {
        token: ID!
        user: User 
    }
`;

module.exports = typeDefs;