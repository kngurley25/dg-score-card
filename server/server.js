require("dotenv").config();
const express = require('express');
const rateLimit = require("express-rate-limit");
const db = require('./config/connection');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require("cors");

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


const dgcr_api = require("./dgcr_api/index.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const whitelist = ['https://calm-peak-91863.herokuapp.com/', 'http://localhost:3000'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             console.log(origin)
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     optionsSuccessStatus: 200
// };

const limiter = rateLimit({
    windowMs: 1000,
    max: 50
});

app.use(cors(corsOptionsDelegate));
app.use(limiter);

app.use("/dgcr_api", dgcr_api);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/service-worker.js'));
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Now listening on localhost:${PORT}`);
    });
});