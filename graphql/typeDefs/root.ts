import { gql } from "apollo-server-express";
import music from "./music";

const root = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;
export default [root, music];
