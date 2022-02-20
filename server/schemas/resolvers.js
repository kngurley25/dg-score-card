const { User } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      // get all users
    users: async () => {
        return User.find()
          .select("-__v -password")
          .populate("friends")
      }, 
      // get a user by username
    user: async (parent, { username }) => {
        return User.findOne({ username })
          .select("-__v -password")
          .populate("friends")
      }, 
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError("Incorrect email!");
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError("Incorrect password!");
            }
      
            const token = signToken(user);
            return { token, user };
          },
          addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
    }

};

module.exports = resolvers;