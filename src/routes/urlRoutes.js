import express from "express";
import UrlController from "../controllers/urlController.js";

const routes = express.Router();

routes.post("/urls", UrlController.encurtarUrl);
routes.get("/urls/:codigo/stats", UrlController.obterEstatisticas);
routes.get("/:codigo", UrlController.redirecionarUrl);
routes.delete("/urls/:codigo", UrlController.excluirUrl);


export default routes;
