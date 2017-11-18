# qewl-mock

Mocking middleware for [Qewl](https://github.com/kbrandwijk/qewl) GraphQL Application Framework.

## Installation

```
$ yarn add qewl-mock
```

## Usage

```ts
route.use(
  mock({ schema: 'schemaName', mocks?: {...}, preserveResolvers?: true | false })
)
```

Adds mocking to a GraphQL schema. Uses [`addMockFunctionsToSchema`](https://www.apollographql.com/docs/graphql-tools/mocking.html) from `graphql-tools`.

> **Note**: The `preserveResolvers` setting only applies to the resolvers in your original schema. Any resolvers you add using the Qewl `resolve` function will override the mock functions. This allows for optimal control over your resolvers.

Uses [Faker.js](https://github.com/marak/Faker.js/) for default mock values for `Number`, `Float` and `String`.

You can use `qewl-mock` together with Qewl GraphQL middleware functions to add additional processing to the mocked results, just like normal queries.

## Example

```ts
import * as express from 'express'
import { expressPlayground } from 'graphql-playground-middleware'
import { schema, remoteSchema, use, resolve } from 'qewl'
import { mock } from 'qewl-mock'

import { helloSchema } from './helloSchema'
import { helloResolver } from './helloResolver'

async function run() {

  const app = express()
  const graphql = express.Router()

  // Schema
  graphql.use(
    schema({ name: 'mySchema', schema: `
      type Query {
        hello: String
      }`
    })
  )

  // Mocking
  graphql.use(
    mock({schema: 'mySchema'})
  )

  // Endpoint
  graphql.use(
    serve()
  )

  app.use('/graphql', express.json(), graphql)
  app.use('/playground', expressPlayground({ endpoint: '/graphql' }))

  app.listen(3000, () => console.log('Server running. Open http://localhost:3000/playground to run queries.'))
}

run().catch(console.error.bind(console))
```
