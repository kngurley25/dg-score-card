const { User, Course, Round } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
         const userData = await User.findOne({ _id: context.user._id })
           .select("-__v -password")
           .populate("friends")
           .populate("courses")
           .populate("rounds");
   
         return userData;
        }
        throw new AuthenticationError('Not logged in');
       },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("courses")
        .populate("rounds");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("courses")
        .populate("rounds");
    },
    courses: async () => {
      return Course.find();
    },
    course: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Course.findOne(params).sort({ courseName: 1 });
    },
    rounds: async () => {
      return Round.find();
    },
    round: async (parent, { roundId }) => {
      const params = roundId ? { roundId } : {};
      return Round.findOne(params).sort({ createAt: -1 });
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
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addCourse: async (parent, { courseId }, context) => {

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { courses: courseId } },
          { new: true }
        ).populate("courses");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addRound: async (parent, { roundId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rounds: roundId } },
          { new: true }
        ).populate("rounds");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { courses: courseId } },
            { new: true }
          ).populate("courses");
  
          return updatedUser;
        }
  
        throw new AuthenticationError("You need to be logged in!");
      },
    addRound: async (parent, args, context) => {
        if (context.user) {
            const round = await Round.create({ ...args, username: context.user.username });
            
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { rounds: round._id } },
            { new: true }
          );
  
          return round;
        }
  
        throw new AuthenticationError("You need to be logged in!");
      },

    createCourse: async (parent, args, context) => {
      if (context.user) {
        const course = await Course.create(args);
        return course;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addHole: async (parent, { courseId, holeNumber, par }, context) => {
      if (context.user) {
        const updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { holes: { holeNumber, par } } },
          { new: true, runValidators: true }
        );

        return updatedCourse;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    createRound: async (parent, args, context) => {
      if (context.user) {
        const round = await Round.create(args);
        return round;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addScore: async (parent, { roundId, holeNumber, stroke }, context) => {
      if (context.user) {
        const updatedRound = await Round.findOneAndUpdate(
          { _id: roundId },
          { $push: { scores: { holeNumber, stroke } } },
          { new: true, runValidators: true }
        );

        return updatedRound;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
