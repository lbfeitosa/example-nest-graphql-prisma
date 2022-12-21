import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { user } from './user'
import { taskOperation } from './taskOperation'

@ObjectType()
export class task {
  @Field((type) => ID)
  id: string

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field()
  fileLocation: string

  @Field()
  fileName: string

  @Field((type) => user)
  user?: user | null

  @Field((type) => [taskOperation], { nullable: true })
  taskOperations?: [taskOperation] | null
}