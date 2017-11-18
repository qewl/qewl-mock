import { IMocks } from 'graphql-tools/dist/Interfaces'
import { addMockFunctionsToSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { merge } from 'lodash'
import * as faker from 'faker'

export const mock = ({ schema, mocks = {}, preserveResolvers = false }: { schema: string; mocks: IMocks, preserveResolvers: boolean }) => {
  return (req: any, res: any, next: any): any => {

    const defaultMocks = {
      Int: () => faker.random.number(100),
      Float: () => faker.random.number({precision: 0.1}),
      String: () => faker.random.words(faker.random.number(4)),
    }

    mocks = merge(defaultMocks, mocks)

    if (req.qewl.schemas[schema] instanceof GraphQLSchema) {
      addMockFunctionsToSchema({ schema: req.qewl.schemas[schema], mocks, preserveResolvers })
    }

    next()
  }
}
