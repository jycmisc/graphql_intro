const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql

//Dummy data
var userData = [
    {  "id": '1', "name": "John Doe", "age": 30, " email": "john\.doe\@gmail.com" , "profession": "Developer"},
    {  "id": '2', "name": "Jane Doe", "age": 25, " email": "jane\.doe\@gmail.com" , "profession": "Project Manager"},
    {  "id": '3', "name": "John Smith", "age": 45, " email": "john\.smith\@outlook.com" , "profession": "Senior Director"},
    {  "id": '4', "name": "Jane Smith", "age": 40, " email": "jame\.smith\@outlook.com" , "profession": "Intern"},
    {  "id": '5', "name": "John Doe", "age": 30, " email": "john\.doe\@yahoo.com" , "profession": "System Administrator"},
    {  "id": '6', "name": "Jane Doe", "age": 25, " email": "jane\.doe2\@gmail.com" , "profession": "Cloud Architect"},
    {  "id": '7', "name": "John Smith", "age": 45, " email": "john\.smith\@godaddy.com" , "profession": "Human Resources"}
];
var hobbiesData = [
    {  "id": '1', "title": "Programming", " description": "The process of designing and building an executable computer program to accomplish a specific computing result or to perform a specific task." , "duration": "2 Years"},
    {  "id": '2', "title": "Rowing", " description": "The act of propelling a boat using the motion of oars in the water by displacing water to propel the boat forward. " , "duration": "6 Months"},
    {  "id": '3', "title": "Basketball", " description": " A team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball " , "duration": "8 Years"},
    {  "id": '4', "title": "Baseball", " description": "A bat-and-ball game played between two opposing teams who take turns batting and fielding. " , "duration": "3 Days"},
    {  "id": '5', "title": "Biking", " description": "Use of bicycles for transport, recreation, exercise or sport." , "duration": "2 Months"},
    {  "id": '6', "title": "Marathon", " description": " A long-distance race with a distance of 42.195 km [1] or 26.2 miles usually run as a road race, but the distance can be covered on trail routes." , "duration": "1 Year"},
    {  "id": '7', "title": "Akido", " description": " A modern Japanese martial art that is split into many different styles, including Iwama Ryu, Iwama Shin Shin Aiki Shuren Kai, Shodokan Aikido, Yoshinkan, Aikikai and Ki Aikido." , "duration": "6 Years"}
];
var postsData = [
    {  "id": '1', "comment": "While I've been to this location multiple times, today they were running behind despite what appeared to be a full staff. I waited 40 minutes and eventually left without my coffee.", userId: '1'},
    {  "id": '2', "comment": "Seem fairly well organized with decent amount of servers. Up to brand standards.", userId: '1'},
    {  "id": '3', "comment": "Could be better, nice acai refreshers though.", userId: '3'},
    {  "id": '4', "comment": "I had a gift card so we went. 2 grandes, both filled only 3/4 with foam another inch, and the foam didn't even reach the top of the cup. ~$10 for maybe one and a quarter cup of coffee. :(", userId: '4'},
    {  "id": '5', "comment": "Enjoy the coffee and refreshment", userId: '7'},
    {  "id": '6', "comment": "Nice Starbucks in a nice area, depending on the hour its a very nice place to meet, study, or relax.", userId: '2'},
    {  "id": '7', "comment": "Starbucks is the best coffee ever drive thru is the best clear friendly employees,and helpful.you get a thank you for coming in for Starbucks coffee.", userId: '7'}
];

//Create UserData Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        email: {type: GraphQLString},
        profession: {type: GraphQLString}
    }),
});

//Create HobbyData Types
const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'User\'s Hobby',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        duration: {type: GraphQLString},
    }),
});

//Create Post Types
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'User\'s Comment',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return userData.find(user => user.id === parent.userId);
            }
        }
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
                // return Hobby Type
                return userData.find(user => user.id === args.id);
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                // return Hobby Type
                return hobbiesData.find(hobby => hobby.id === args.id);
            }
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                // return Hobby Type
                return postsData.find(post => post.id === args.id);
            }
        },
    }
});
/*
    {
        user: {
    }
*/

module.exports = new GraphQLSchema({
    query: RootQuery
})