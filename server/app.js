const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))


app.listen(4000, () => {
    console.log('Listening for request on port 4000.');
});