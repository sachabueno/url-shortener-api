import "dotenv/config";
import express from "express";
import dbConnect from "./src/config/dbConnect.js";
import urlRoutes from "./src/routes/urlRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API Encurtador de URLs funcionando!"
  });
});

dbConnect()
  .then((conexao) => {
    console.log("Conexão com MongoDB realizada com sucesso!");

    conexao.on("error", (erro) => {
      console.error("Erro de conexão:", erro.message);
    });
  })
  .catch((erro) => {
    console.error("Não foi possível conectar ao MongoDB:", erro.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
