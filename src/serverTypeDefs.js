
exports.typeDefs = `
   type Query{
     name: String
   }


   type Mutation {
     login(username:String!, password: String!): Boolean!
   }`