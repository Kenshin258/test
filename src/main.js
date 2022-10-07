const express = require("express");
const http = require("http");
const { getUser } = require("./controller/user.controller");

const app = express();

http.createServer(app).listen(3000, () => {
  console.log(`Server running on port 3000`);
});

app.get("/list", getUser);