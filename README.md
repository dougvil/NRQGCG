<h1 align="center">Next.js + Apollo Server Boilerplate</h1>

This is a modern Next.js boilerplate, using Apollo Server as BFF (Backend for Frontend), GraphQL Code Generator with @tanstack/react-query integration.

---

## :rocket: Main Stack

- **Next.js** (App Router)
- **Apollo Server** BFF
- **GraphQL** (SDL-first)
- **GraphQL Codegen** Generate types and useQuery/useMutation hooks
- **@tanstack/react-query** A powerful library to deal with fetched data and cache
- **MUI** (Material UI) Awesome React components

---

## :wrench: Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Generate types and useQuery/useMutation hooks
npm run generate
```

---

## :gear: Folder Structure

```
src/
	modules/
		<ModuleName>/
			typedefs/    # GraphQL schemas (.schema.graphql)
			queries/      # GraphQL queries and mutations (.graphql)
			resolvers/    # Apollo Server Resolvers
```

---

## :link: How to create queries and/or mutations

1. **Define your schema** in `src/modules/<ModuleName>/typedefs/*.schema.graphql`:

   ```graphql
   type Query {
     hello(params: HelloQueryInput!): HelloQueryResponse!
   }
   input HelloQueryInput {
     name: String!
   }
   type HelloQueryResponse {
     message: String!
   }
   ```

2. **Implement the resolver** correspondente em `src/modules/<Modulo>/resolvers/`:

   ```ts
   export const helloResolvers = {
     Query: {
       hello: (_, { params }) => ({ message: `Hello, ${params.name}!` }),
     },
   };
   ```

3. **Create query (or mutation as needed)** em `src/modules/<Modulo>/queries/*.graphql`:

   ```graphql
   query HelloMessage($params: HelloQueryInput!) {
     hello(params: $params) {
       message
     }
   }
   ```

4. **Run codegen** to generate Hooks:

   ```bash
   npm run generate
   ```

5. **Use the generated hook** in your component:

   ```tsx
   import { useHelloMessageQuery } from "@/server/graphql";

   const { data, isLoading } = useHelloMessageQuery({
     params: { name: "Douglas" },
   });
   ```

---

## :bulb: Observations

- The codegen generates types, hoojs and the "namedOperations" automatically in `src/server/graphql.ts`.
- The custom fetcher function is inside `src/server/fetcher.ts`.
- To add new modules, follow the files and folder structure from "Exemplo" folder.
- The Apollo Server runs in the `/api` route.

---

## :memo: References

- [Next.js](https://nextjs.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Material-UI (MUI)](https://mui.com/)

## :handshake: Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please make sure to:

- Follow the existing code style
- Dont add features, just bugfixes, this project must stay clean
- Update documentation as needed
- Run `npm run lint` before submitting
