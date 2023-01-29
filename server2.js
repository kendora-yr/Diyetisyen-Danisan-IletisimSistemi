import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express"

// create express and HTTP server
const app = express();

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { kullaniciId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { kullaniciId };
  }
};

const schema=makeExecutableSchema({typeDefs,resolvers})

const apolloServer = new ApolloServer({
  schema,
  context
});

await apolloServer.start()
apolloServer.applyMiddleware({ app,path:"/graphql" });

const server=app.listen(4000,()=>{
    const wsServer = new WebSocketServer({
        server,
        path: "/graphql",
      });
      useServer({schema},wsServer);
      console.log("Apollo and Subscription server is up 🚀")
})

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context:({req})=>{
//       const {authorization} = req.headers
//       if(authorization){
//         const {kullaniciId} = jwt.verify(authorization, process.env.JWT_SECRET)
//         return {kullaniciId}
//       }
//     }
//   });

// server.listen().then(({url})=>{
//     console.log(`🚀  Server ready at: ${url}`);
// });
