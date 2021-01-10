import express, { Application, Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import typeDefs from "./graphql/typeDefs/root";
import resolvers from "./graphql/resolvers/root";
import path from "path";

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

const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

console.log(path.join(__dirname, "client", "build", "index.html"));
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
