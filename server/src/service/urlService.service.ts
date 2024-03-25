import { urlShortner } from "../schema/urlModel.schema";


export class UrlService {
    async encodeUrl(originalUrl: string): Promise<string> {
        try {
            // Check if the URL already exists in the database
            const existingUrl = await urlShortner.findOne({ originalUrl });
            if (existingUrl) {
                return existingUrl.shortUrl;
            }

            // Generate a unique short URL
            const shortUrl = Math.random().toString(36).substring(2, 8);

            // Save the URL to the database
            const newUrl = await urlShortner.create({ originalUrl, shortUrl });
            return newUrl.shortUrl;
        } catch (error) {
            throw new Error("Error encoding URL");
        }
    }

    async decodeUrl(shortUrl: string): Promise<string> {
        try {
            // Find the original URL based on the short URL
            const url = await urlShortner.findOne({ shortUrl });
            if (url) {
                return url.originalUrl;
            } else {
                throw new Error("Short URL not found");
            }
        } catch (error) {
            throw new Error("Error decoding URL");
        }
    }

    async getStatistics(urlPath: string): Promise<any> {
        try {
            // Find the URL statistics based on the short URL path
            const url = await urlShortner.findOne({ shortUrl: urlPath });
            if (url) {
                return {
                    originalUrl: url.originalUrl,
                    shortUrl: url.shortUrl,
                    clicks: url.clicks,
                    createdAt: url.createdAt,
                };
            } else {
                throw new Error("Short URL not found");
            }
        } catch (error) {
            throw new Error("Error fetching URL statistics");
        }
    }
}

export const urlService = new UrlService();
