const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql


//Create Data Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'RootQuery description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                // we resolve with data
                // get and return data from a datasource
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})