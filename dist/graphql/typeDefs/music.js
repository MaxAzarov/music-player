"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Music {\n    _id: String\n    name: String!\n    link: String!\n    author: String!\n    album: String!\n    liked: Boolean!\n    image: String!\n  }\n\n  extend type Query {\n    GetMusics: [Music]!\n    hello: String!\n  }\n\n  extend type Mutation {\n    AddMusic(\n      name: String!\n      link: String\n      author: String!\n      album: String!\n      liked: Boolean!\n      image: String!\n    ): Music\n    ToggleLike(name: String!): String!\n  }\n"], ["\n  type Music {\n    _id: String\n    name: String!\n    link: String!\n    author: String!\n    album: String!\n    liked: Boolean!\n    image: String!\n  }\n\n  extend type Query {\n    GetMusics: [Music]!\n    hello: String!\n  }\n\n  extend type Mutation {\n    AddMusic(\n      name: String!\n      link: String\n      author: String!\n      album: String!\n      liked: Boolean!\n      image: String!\n    ): Music\n    ToggleLike(name: String!): String!\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;
