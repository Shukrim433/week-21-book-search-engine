import { gql } from '@apollo/client';

// `GET_ME`, will execute the `me` query set up using Apollo Server.
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            password
            bookCount
            savedBooks
        }
    }
`
// THIS is the query that were executing here :  me: User
// query me{}  = is specifying that the query being executed here is the 'me' query set up in server-typeDefs
// me {}  = is the User record returned by this query, as specified in the typeDefs
