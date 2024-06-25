const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            // if the user is logged in
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id }).select('-__v -password'); // exclude passwrod and version fields
              // return their user record
              return userData

            }
            // else throw authentication error
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => { // args =  { username, email, password }
            const user = await User.create({ username, email, password })
            const token = signToken(user) // user object = jwt payload
            return { token, user };
        },
        login: async (parent, {email, password}) => {  // {email, password} = args
            const user = await User.findOne({ email })

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password) //password =  password from args

            if (!correctPw) { // if its not correct, error
                throw AuthenticationError;
            }

            const token = signToken(user) // else create JWT using user record

            return { token, user }; // return the jwt and the logged in user obj to the client
        },
        saveBook: async (parent, { bookData }, context) => { // bookData is the name of the mutation arg. passed specified in typeDefs
            // if users logged in add book to the logged in user's savedBooks array
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {  $addToSet: { 
                        savedBooks: bookData
                       }
                    },
                    { new: true, runValidators: true }

                )
                // return updatedUser record to client
                return updatedUser
            }
            // else throw error
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: {
                        savedBooks: { bookId: bookId }
                       }
                    },
                    { new: true }
                )
                // return the updatedUser record, minus deleted savedbook, to client
                return updatedUser
            }
            throw AuthenticationError;
        }


    }
}

module.exports = resolvers;