import { IMocks } from 'graphql-tools/dist/Interfaces'
import { addMockFunctionsToSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'

export const mock = ({ schema, mocks }: { schema: string; mocks: IMocks }) => {
  return (req: any, res: any, next: any): any => {

    if (req.qewl.schemas[schema] instanceof GraphQLSchema) {
      addMockFunctionsToSchema({ schema: req.qewl.schemas[schema], mocks })
    }

    next()
  }
}
