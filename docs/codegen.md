# GraphQL Code Generation Guide

This project centers around an SDL-first workflow: write schema + operations, then let the generator produce everything else.

---

## What Gets Generated

| File                               | Purpose                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `src/server/graphql.ts`            | Typed documents, React Query hooks, resolvers/types, named operations object |
| `src/server/merged.schema.graphql` | Merged printable schema (for tooling / exploration)                          |

---

## Trigger Points

- `npm run generate` (manual)
- `predev` (runs before `npm run dev`)
- `prebuild` (runs before `npm run build`)

You usually don't need to run it manually unless adding/changing SDL or queries while the dev server is already running.

---

## Adding a Module Quickly

```
src/modules/Foo/
  typedefs/foo.schema.graphql
  queries/getFoo.graphql
  resolvers/foo.resolvers.ts
```

`foo.schema.graphql`:

```graphql
type Foo {
  id: ID!
  name: String!
}
extend type Query {
  foo(id: ID!): Foo
}
```

`getFoo.graphql`:

```graphql
query GetFoo($id: ID!) {
  foo(id: $id) {
    id
    name
  }
}
```

`foo.resolvers.ts`:

```ts
export const fooResolvers = {
  Query: { foo: (_parent, { id }) => ({ id, name: `Foo #${id}` }) },
};
```

Run `npm run generate`, then:

```ts
import { useGetFooQuery } from "@/server/graphql";
```

---

## Generated React Query Hooks

Each operation produces:

- `use<OpName>Query` / `use<OpName>Mutation`
- Static query key helpers when `exposeQueryKeys` / `exposeMutationKeys` is enabled.

Example:

```ts
const key = useGetFooQuery.getKey({ id: "1" });
```

Useful for prefetching / cache invalidation.

---

## Named Operations Object

Accessed via the exported `namedOperations` (from the named-operations-object plugin) for safer cache interactions or logging:

```ts
import { namedOperations } from "@/server/graphql";
console.log(namedOperations.Query.GetFoo);
```

---

## Custom Fetcher

`codegen.ts` sets:

```ts
fetcher: { func: "./fetcher#customFetcher", isReactHook: false }
```

The fetcher lives in `src/server/fetcher.ts`—customize headers, auth, tracing, etc.

---

## Watching for Changes (Optional)

You can run the generator in watch mode:

```bash
npx graphql-codegen --watch
```

(Add a script if desired.)

---

## Troubleshooting

| Symptom                      | Fix                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Hook not generated           | Check file glob matches: schema in `typedefs/*.schema.graphql`, query in `queries/*.graphql` |
| Type errors after rename     | Re-run `npm run generate` (clean build artifacts if needed)                                  |
| Missing field in result type | Confirm it's requested in the `.graphql` operation                                           |
| Duplicate type names         | Namespace with distinct module type names or consolidate schema parts                        |

---

## Extending Codegen

Add more plugins in `codegen.ts`, e.g. `introspection` or `graphql-modules-preset`. Keep focus on minimal DX friction.

---

## Best Practices

- Keep SDL granular; compose small types.
- Co-locate operations with module logic (current structure enforces this).
- Avoid manual string-based query keys—use generated helpers.
- Commit generated files (faster CI, easier onboarding).

---

## Roadmap Ideas (Optional)

- Add persisted query manifest generation
- Add ESLint rule integration for operation naming
- Add prefetch utilities leveraging generated keys

---

Happy building! 🚀
