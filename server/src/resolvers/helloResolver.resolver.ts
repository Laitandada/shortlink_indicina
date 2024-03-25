import { Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello(): string {
    return "Hello, world!";
  }
}

export default HelloResolver;
