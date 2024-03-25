
import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/mongo";

async function startServer() {
    const schema = await buildSchema({
        resolvers: resolvers,
    });

    const server = new ApolloServer({ schema });

    connectToMongo();

    const { url } = await server.listen(5000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

startServer();
