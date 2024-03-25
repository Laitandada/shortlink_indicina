import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/mongo";
import Context from "./types/context";
// import { graphqlUploadExpress }from "graphql-upload";
import bodyParser from "body-parser";
async function bootstrap() {
  // Build the schema
  const schema = await buildSchema({
    resolvers,
  });

  // Init express
  const app = express();


  app.use(cors());
  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(bodyParser.json());
//   app.use(graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 10 }));

  // Create the Apollo server
  const server = new ApolloServer({
    schema,
    context: async (ctx: Context) => {
     
    //   console.log(ctx)
      return ctx
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: false,
    path: "/graphql",
  });

  app.use("*", (req, res) =>
    res.send(`Route not found for ${req.originalUrl}`)
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/graphql`);
  });

  connectToMongo();
}

bootstrap();
