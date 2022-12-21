import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UserUniqueInput {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  email: string
}

@InputType()
export class UserCreateInput {
  @Field()
  email: string

  @Field({ nullable: true })
  name: string
}