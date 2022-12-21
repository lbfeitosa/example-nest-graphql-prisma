import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql'
import { user } from 'src/common/entities/user'
import { task } from 'src/common/entities/task'
import { PrismaService } from 'src/common/frameworks/prisma.service'
import { UserService } from './user.service'
import { UserCreateInput, UserUniqueInput } from './dto/user.dto'


@Resolver(user)
export class UserResolver {
  constructor(private userService: UserService,
    private prisma: PrismaService) { }

  @ResolveField()
  async tasks(@Root() user: user): Promise<task[]> {
    return this.prisma.user
      .findUnique({
        where: {
          id: user.id,
        }
      }).tasks()
  }

  @Mutation((returns) => user)
  async signupUser(
    @Args('data') data: UserCreateInput,
  ): Promise<user> {
    return this.userService.createUser(data)
  }

  @Query((returns) => user, { nullable: true })
  async getUser(
    @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
  ): Promise<any> {
    return this.userService.user(userUniqueInput)
  }
}