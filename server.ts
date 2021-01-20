import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const app: Application = express();
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

server.applyMiddleware({ app });

app.use(cors());

const root = require("path").join(__dirname, "client", "build");

app.use(express.static(root));
app.use(express.static("images"));
app.use(express.static("music"));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

console.log(path.join(__dirname, "client", "build", "index.html"));

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
