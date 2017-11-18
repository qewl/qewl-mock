# qewl-mock

Mocking middleware for [Qewl](https://github.com/kbrandwijk/qewl) GraphQL Application Framework.

## Installation

```
$ yarn add qewl-mock
```

## Usage

```ts
route.use(
  mock({ schema: 'schemaName', mocks: {...}, preserveResolvers: true | false })
)
```

Adds mocking to a GraphQL schema. Uses [`addMockFunctionsToSchema`](https://www.apollographql.com/docs/graphql-tools/mocking.html) from `graphql-tools`.

Uses [Faker.js](https://github.com/marak/Faker.js/) for default mock values for `Number`, `Float` and `String`.
