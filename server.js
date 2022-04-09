const jsonserver = require("json-server");
const server = jsonserver.create();
const router = jsonserver.router("./db.json");
const middlewares = jsonserver.default({
  static: "./build",
});

const port = process.env.PORT || 8000;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$,1",
  })
);

server.use(router);
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
