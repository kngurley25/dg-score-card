const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
    authMiddleware: function({ req }) {
        let token = req.headers.authorization || req.query.token || req.body.token;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            return req;
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('invalid token');
        }
        return req;
    },
    // TODO confirm if we have both username and email credentials
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};