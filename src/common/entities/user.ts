import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { task } from './task'


@ObjectType()
export class user {
  @Field((type) => ID)
  id: string

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [task], { nullable: true })
  tasks?: [task] | null
}