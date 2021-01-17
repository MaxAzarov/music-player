"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var root_1 = __importDefault(require("./graphql/typeDefs/root"));
var root_2 = __importDefault(require("./graphql/resolvers/root"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
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
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: root_1.default,
    resolvers: root_2.default,
    playground: true,
});
server.applyMiddleware({ app: app });
app.use(cors_1.default());
var root = require("path").join(__dirname, "client", "build");
app.use(express_1.default.static(root));
app.use(express_1.default.static("images"));
app.use(express_1.default.static("music"));
app.get("*", function (req, res) {
    res.sendFile("index.html", { root: root });
});
console.log(path_1.default.join(__dirname, "client", "build", "index.html"));
mongoose_1.default
    .connect("mongodb+srv://Max:starwars123@player.rhsrr.mongodb.net/player?retryWrites=true&w=majority", { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true })
    .then(function (response) {
    app.listen(PORT, function () {
        console.log("Server running! Port: " + PORT);
    });
})
    .catch(function (e) { return console.log("cannot connect to db"); });
