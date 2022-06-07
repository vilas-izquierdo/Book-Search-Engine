const { User } = require("../models");
const { AuthenticationError } = require("apoolo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userInfo = await User.findOne({ _id: context.user._id }).populate(
          "books"
        );
        return userInfo;
      }
      throw new AuthenticationError("Log In First");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No User Exists");
      }
      const pcorrect = await user.isCorrectPassword(password);
      if (!pcorrect) {
        throw new AuthenticationError("Wrong info");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parents, args, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError("Log In");
    },
    deleteBook: async (parent, args, context) => {
      if (contect.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } }
        );
        return updateUser;
      }
      throw new AuthenticationError("Log In");
    },
  },
};

module.exports = resolvers;
