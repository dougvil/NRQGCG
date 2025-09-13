<h1 align="center">Next.js GraphQL Codegen App Boilerplate</h1>

<p align="center"><strong>Schema ➜ Query ➜ Instant Typed React Query Hooks</strong></p>
<p align="center">Write GraphQL SDL & operations – get end‑to‑end TypeScript types, React Query hooks, query keys & named operations automatically.</p>

---

## 🔗 Quick Nav

- [Why Codegen First?](#why-codegen-first)
- [Workflow: From SDL to Hook](#workflow-from-sdl-to-hook)
- [Project Stack](#rocket-main-stack)
- [Folder Structure](#gear-folder-structure)
- [Creating Operations](#link-how-to-create-queries-andor-mutations)
- [Developer Experience Benefits](#developer-experience-benefits)
- [Contributing](#handshake-contributing)

---

## Why Codegen First?

This repo is optimized around GraphQL Code Generation as the core DX feature:

- Single source of truth: your SDL drives everything.
- Zero manual typing: operations generate fully‑typed variables, responses & resolvers.
- React Query synergy: auto-generated hooks with stable query/mutation keys.
- Safer refactors: named operations object prevents string drift.
- Faster onboarding: new devs follow a predictable schema→operation→hook path.

---

## Workflow: From SDL to Hook

1. Define schema in `src/modules/<Module>/typedefs/*.schema.graphql`.
2. Add a query/mutation in `src/modules/<Module>/queries/*.graphql`.
3. Run `npm run generate` (auto-runs before `dev` & `build`).
4. Import and use the generated hook from `src/server/graphql.ts` exports.

Example:

```graphql
# typedefs/hello.schema.graphql
input HelloQueryInput {
  name: String!
}
type HelloQueryResponse {
  message: String!
}
extend type Query {
  hello(params: HelloQueryInput!): HelloQueryResponse!
}
```

```graphql
# queries/hello.graphql
query HelloMessage($params: HelloQueryInput!) {
  hello(params: $params) {
    message
  }
}
```

```tsx
// Any component
import { useHelloMessageQuery } from "@/server/graphql";

const { data, isLoading } = useHelloMessageQuery({
  params: { name: "Douglas" },
});
```

Result: Fully typed variables & data + React Query caching & invalidation keys.

---

## :rocket: Main Stack

- **GraphQL Code Generator (featured)** – types, operations, React Query hooks, named ops
- **Next.js** (App Router)
- **Apollo Server** BFF (runs under `/api`)
- **@tanstack/react-query** caching + hooks integration
- **MUI** for UI components
- **SDL-first GraphQL** architecture

---

## :wrench: Scripts

```bash
# Development (runs codegen first via predev)
npm run dev

# Build for production (runs codegen via prebuild)
npm run build

# Lint
npm run lint

# Generate types & hooks manually
npm run generate
```

---

## :gear: Folder Structure

```
src/
  modules/
    <ModuleName>/
      typedefs/    # GraphQL schemas (.schema.graphql)
      queries/     # GraphQL queries and mutations (.graphql)
      resolvers/   # Apollo Server resolvers
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
2. **Implement the resolver** in `src/modules/<ModuleName>/resolvers/`:
   ```ts
   export const helloResolvers = {
     Query: {
       hello: (_, { params }) => ({ message: `Hello, ${params.name}!` }),
     },
   };
   ```
3. **Create query (or mutation)** in `src/modules/<ModuleName>/queries/*.graphql`:
   ```graphql
   query HelloMessage($params: HelloQueryInput!) {
     hello(params: $params) {
       message
     }
   }
   ```
4. **Run codegen**: `npm run generate`
5. **Use the generated hook**:
   ```tsx
   import { useHelloMessageQuery } from "@/server/graphql";
   const { data, isLoading } = useHelloMessageQuery({
     params: { name: "Douglas" },
   });
   ```

---

## Developer Experience Benefits

- Strong typing across resolvers, variables & responses
- Auto React Query keys: `useHelloMessageQuery.getKey()` available when exposing keys
- Centralized `graphql.ts` export surface
- Merged printable schema at `src/server/merged.schema.graphql`
- Works seamlessly with Next.js App Router & serverless Apollo handler
- Pre-build safety: generation tied to `predev` and `prebuild`

---

## :bulb: Observations

- Codegen outputs live in `src/server/graphql.ts`.
- Custom fetcher: `src/server/fetcher.ts`.
- Add new modules mirroring `src/modules/Exemplo`.
- Apollo Server mounted at `/api` route.

---

## :handshake: Contributing

We welcome contributions! Please:

1. Fork
2. Create a branch: `git checkout -b chore/short-desc` or `fix/issue` or `docs/improve-codegen`
3. Commit: `git commit -m "docs: improve codegen section"`
4. Push & open a PR

Guidelines:

- Follow existing style
- Prefer docs & DX polish over feature bloat
- Run `npm run lint`
- Keep focus on schema-driven workflow

---

## :memo: References

- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- [Next.js](https://nextjs.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Material-UI (MUI)](https://mui.com/)
