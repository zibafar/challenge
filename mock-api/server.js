const jsonServer = require("json-server");
const db = require("./db");
const server = jsonServer.create();
const router = jsonServer.router(db());
const middlwares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlwares);

server.use(router);
server.listen(5000, () => {
    console.log("mock api is running");
})