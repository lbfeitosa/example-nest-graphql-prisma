import { Module, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { DefaultJwtStrategy } from './common/strategies/jwt.strategy'
import { NestModule } from '@nestjs/common'
import { MiddlewareConsumer } from '@nestjs/common'
import { AuthFirebase } from './common/middlewares/auth.firebase'
import { AuthSystem } from './common/middlewares/auth.system'
import { AdminFirebaseService } from './common/frameworks/firebase-admin'
import { JwtService } from '@nestjs/jwt'
import { HealthModule } from './health/health.module'
import {
  GUIDResolver,
  EmailAddressResolver,
  JSONResolver,
  JSONObjectResolver,
} from 'graphql-scalars'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [!ENV ? '.env' : `.env.${ENV}`],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      resolvers: {
        JSON: JSONResolver,
      },
      buildSchemaOptions: {
        noDuplicatedFields: true,
        dateScalarMode: 'timestamp'

      },
    }),
    TaskModule,
    UserModule,
    HealthModule
  ],
  controllers: [],
  providers: [DefaultJwtStrategy, AdminFirebaseService, JwtService],
  exports: [AdminFirebaseService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthFirebase)
      .forRoutes({ path: 'endpoints-firebase', method: RequestMethod.ALL })
      .apply(AuthSystem)
      .forRoutes({ path: 'system-api', method: RequestMethod.ALL })
  }
}
