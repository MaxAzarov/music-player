import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const app: Application = express();
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

const { MONGODB_URI = "" } = process.env;

server.applyMiddleware({ app });

app.use(cors());

const root = path.join(__dirname, "client", "build");

app.use(express.static(root));
app.use(express.static("images"));
app.use(express.static("music"));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then((response) => {
    app.listen(PORT, () => {
      console.log("Server running! Port: " + PORT);
    });
  })
  .catch((e) => console.log("cannot connect to db"));
