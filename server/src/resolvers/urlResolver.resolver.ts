import { Resolver, Query, Mutation, Arg } from "type-graphql";


import { decodeInput, encodeInput, statisticsInput } from "../schema/urlModel.schema";
import { UrlService } from "../service/urlService.service";

@Resolver()
export class UrlResolver {
    constructor(private urlService: UrlService) {}

    @Mutation(() => String)
    async encode(@Arg("input") input: encodeInput): Promise<string> {
        return await this.urlService.encodeUrl(input.originalUrl);
    }

    @Mutation(() => String)
    async decode(@Arg("input") input: decodeInput): Promise<string> {
        return await this.urlService.decodeUrl(input.shortUrl);
    }
    @Mutation(() => String)
    async statistics(@Arg("input") input: statisticsInput): Promise<string> {
        return await this.urlService.decodeUrl(input.shortUrl);
    }

 
}
