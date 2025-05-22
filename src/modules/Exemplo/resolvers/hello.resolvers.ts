import { Resolvers } from "@/server/graphql";

export const helloResolvers: Resolvers = {
  Query: {
    hello: (_, { params }) => {
      return {
        message: `Hello, ${params.name}!`,
      };
    },
  },
};
