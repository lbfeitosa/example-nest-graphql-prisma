import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { user } from './user'
import { task } from './task'
import {
  JSONResolver,
  JSONObjectResolver,
} from 'graphql-scalars'

@ObjectType()
export class taskOperation {
  @Field((type) => ID)
  id: string

  @Field()
  status?: string

  @Field()
  workflowId?: string

  @Field((type) => JSONResolver)
  workflowParams?: JSON;

  @Field((type) => JSONResolver)
  result?: JSON

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  startedAt?: Date | null

  @Field((type) => Date)
  completedAt?: Date | null

  @Field((type) => Date)
  failedAt?: Date | null

  @Field((type) => task)
  task: task

  @Field((type) => user)
  user?: user | null
}