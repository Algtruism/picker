import {gql} from '@apollo/client';


const GET_RATINGS = gql`
               query Ratings{
                   ratings @client
               }
            `
const GET_LOGIN_STATES = gql`
   query GetLoginStates{
      loginStates @client
   }
`
export const localResolvers = {
    Query: {
        rating: (obj, args, {cache}) => {
            const query = GET_RATINGS
            var ratings = cache.readQuery({query})
            if(ratings[args.businessKey] === undefined) return 0 
            return ratings[args.businessKey]
        },
        loggedIn: (obj, args, {cache}) => {
            const query = GET_LOGIN_STATES
            var loginStates = cache.readQuery({query}).loginStates
            if(loginStates == null) return false;
            var loginState = loginStates[args.username]
            return loginState == null ? false : loginState
        },
        loginStates: (obj, args, {cache}) =>{
            const query = GET_LOGIN_STATES
            var loginStates = cache.readQuery({query})
            return loginStates == null ? false : loginStates
        }
    },
    Mutation: {
        incrementCount: (obj, args, {cache}) => {
            const query = gql`
              query RemovedCount{
                 removedCount @client
              }   
            `
            var test = cache.readQuery({query})
            var previous = test.removedCount
            var data = {removedCount: previous + 1}
            cache.writeQuery({query, data})
            return previous + 1
        },
        setLoggedIn: (obj, args, { cache }) =>{
            const query = GET_LOGIN_STATES;
            var loginStates = cache.readQuery({query}).loginStates;
            if (loginStates == null) loginStates = {}
            cache.writeQuery({query, data: {loginStates: {...loginStates, [args.username]: args.loggedIn}}})
        }
    }
}
