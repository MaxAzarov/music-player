import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Music {
    _id: String
    name: String!
    link: String!
    author: String!
    album: String!
    liked: Boolean!
    image: String!
  }

  extend type Query {
    GetMusics: [Music]!
    hello: String!
  }

  extend type Mutation {
    AddMusic(
      name: String!
      link: String
      author: String!
      album: String!
      liked: Boolean!
      image: String!
    ): Music
    ToggleLike(name: String!): String!
  }
`;

export default typeDefs;
