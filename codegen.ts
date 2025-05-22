import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/modules/**/typedefs/*.schema.graphql",
  generates: {
    "./src/server/merged.schema.graphql": {
      plugins: ["schema-ast"], // This plugin prints the merged schema as a string
      config: {
        includeDirectives: true, // Optional: include directives in the output
      },
    },
    "./src/server/graphql.ts": {
      documents: ["./src/modules/**/queries/*.graphql"],
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typescript-react-query",
        "named-operations-object",
      ],
      config: {
        fetcher: { func: "./fetcher#customFetcher", isReactHook: false },
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        reactQueryVersion: 5,
      },
    },
  },
};
export default config;
