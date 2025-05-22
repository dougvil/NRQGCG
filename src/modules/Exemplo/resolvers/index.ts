import { type Resolvers } from "@/server/graphql";
import { helloResolvers } from "./hello.resolvers";

export const resolvers: Resolvers = {
  ...helloResolvers,
};
