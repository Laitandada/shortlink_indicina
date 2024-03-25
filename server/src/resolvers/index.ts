import HelloResolver from "./helloResolver.resolver";
import { UrlResolver } from "./urlResolver.resolver";


export const resolvers = [UrlResolver,HelloResolver] as const;