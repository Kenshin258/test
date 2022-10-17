const express = require("express");
const http = require("http");
const {
  getUser,
  transformFile,
  transformPractice,
  parseArr,
  concatArr,
} = require("./controller/user.controller");

const app = express();

http.createServer(app).listen(3000, () => {
  console.log(`Server running on port 3000`);
});

app.get("/list", getUser);
app.get("/transform", transformFile);
app.get("/transformPractice", transformPractice);
app.get("/parserArr", parseArr);
app.get("/concatArr", concatArr);
