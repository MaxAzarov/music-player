import express, { Application, Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import typeDefs from "./graphql/typeDefs/root";
import resolvers from "./graphql/resolvers/root";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// const typeDefs = gql`
//   type Query {
//     hello: String!
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: async function () {
//       return "hello";
//     },
//   },
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

server.applyMiddleware({ app });

app.use(cors());

app.use(express.static("images"));
app.use(express.static("music"));

mongoose
  .connect(
    "mongodb+srv://Max:starwars123@player.rhsrr.mongodb.net/player?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }
  )
  .then((response) => {
    app.listen(PORT, () => {
      console.log("Server running! Port: " + PORT);
    });
  })
  .catch((e) => console.log("cannot connect to db"));
