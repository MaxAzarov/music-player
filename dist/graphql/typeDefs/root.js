"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var music_1 = __importDefault(require("./music"));
var root = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    _: String\n  }\n  type Mutation {\n    _: String\n  }\n  type Subscription {\n    _: String\n  }\n"], ["\n  type Query {\n    _: String\n  }\n  type Mutation {\n    _: String\n  }\n  type Subscription {\n    _: String\n  }\n"])));
exports.default = [root, music_1.default];
var templateObject_1;
