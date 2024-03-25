import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";

import { Field, InputType,ObjectType } from "type-graphql";

// function for getting current date
function getCurrentDate(): Date {
    return new Date();
  }

//  creating url shortner model schema
@ObjectType()
@index({ urlShortnerId: 1 })
export class Urlshortner {
  @Field(() => String)
  _id: String;


  @Field(() => String)
  @prop({ required: true })
  originalUrl: string;

  @Field(() => String)
  @prop({ required: true })
  shortUrl: string;

  @Field(() => Number, { nullable: true })
  @prop({ default: 0 })
  clicks: number;


  @Field(() => Date, { nullable: true })
  @prop({ default: getCurrentDate })
  createdAt: Date;

}

export const urlShortner =
  getModelForClass<typeof Urlshortner>(Urlshortner);

@InputType()
export class encodeInput {
  @Field()
  originalUrl: string;
}
@InputType()
export class decodeInput {
  @Field()
  shortUrl: string;
}
@InputType()
export class statisticsInput {
  @Field()
  shortUrl: string;
}
