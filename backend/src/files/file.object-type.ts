import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class UploadObjectType {
  @Field()
  uuid: string;

  @Field()
  filename: string;

  @Field((_type) => GraphQLJSON)
  data: any;
}
