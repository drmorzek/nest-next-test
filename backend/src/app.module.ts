import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFileEntity } from './files/file.entity';
import { UploadService } from './files/file.service';
import { join } from 'path';
import { UploadResolver } from './files/file.resolver';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload-ts';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UploadedFileEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UploadedFileEntity]),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      graphiql: true,
      resolvers: {
        Upload: GraphQLUpload,
        JSON: GraphQLJSON,
      },

      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
    }),
  ],
  providers: [UploadService, UploadResolver],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
