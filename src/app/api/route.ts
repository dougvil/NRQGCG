import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "@/modules/Exemplo/resolvers";

// @ts-expect-error no-ts-file
import typeDefs from "@/server/merged.schema.graphql";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
}) as ApolloServer<object>;

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
