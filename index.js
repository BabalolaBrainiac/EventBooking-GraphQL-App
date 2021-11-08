const express = require("express");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const { graphqlHttp } = require("express-graphql");
const {buildSchema}  = require("graphql");

const app = express();
app.use(bodyparser.json());

//Schema Defnition
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    type Rootquery {
      events: [String!]!
    }

    type Rootmutation {
      createEvent(name: String):
    }
    
    schema {
      query: Rootquery
      mutation: Rootmutation
    }
    `),

    rootValue: {
      events: () => {
        return ["cooking", "playing", "chilling"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

//Server
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
