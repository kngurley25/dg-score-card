require("dotenv").config();
const express = require('express');
const db = require('./config/connection');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        context: authMiddleware
    });
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Use GraphQL at localhost:${PORT}${server.graphqlPath}`);
};
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Now listening on localhost:${PORT}`);
    });
});