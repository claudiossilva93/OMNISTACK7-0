const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

//divide o servidor para trabalhar com http e websocket (que permite tempo real em aplicações)
const server = require("http").Server(app);
const io = require("socket.io")(server);

//conexão com o banco de dados mongoDb
mongoose.connect(
  "mongodb+srv://claudio:claudio@cluster0-zb07f.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

//repassa informação para todas as rotas do websocket
app.use((req, res, next) => {
  req.io = io;

  next();
});

//habilita o cors nas requisições da API
app.use(cors());

//rota para acesso de arquivos estaticos
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

//declarar o arquivo que terá as rotas da aplicação
app.use(require("./routes"));

server.listen(3333);
