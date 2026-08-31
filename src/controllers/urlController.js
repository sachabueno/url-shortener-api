import { nanoid } from "nanoid";
import mongoose from "mongoose";
import Url from "../models/Url.js";

class UrlController {
    static async encurtarUrl(req, res) {
        try {
            const { urlOriginal } = req.body;

            if (mongoose.connection.readyState !== 1) {
                return res.status(503).json({
                    mensagem: "Banco de dados indisponível. Verifique a conexão com o MongoDB Atlas."
                });
            }

            if (!urlOriginal) {
                return res.status(400).json({
                    mensagem: "A URL original é obrigatória"
                });
            }
            try {
                new URL(urlOriginal);
            } catch {
                return res.status(400).json({
                    mensagem: "URL inválida."
                });
            }
            const codigo = nanoid(6);

            const novaUrl = await Url.create({
                urlOriginal,
                codigo
            });
            return res.status(201).json({
                urlOriginal: novaUrl.urlOriginal,
                codigo: novaUrl.codigo,
                urlCurta: `${req.protocol}://${req.get("host")}/${novaUrl.codigo}`
            });
        } catch (error) {
            res.status(500).json({
                mensagem: "Erro ao encurtar URL."
            });
        }
    }
    static async redirecionarUrl(req, res) {
        try {
            const { codigo } = req.params;

            const url = await Url.findOne({ codigo });

            if (!url) {
                return res.status(404).json({
                    mensagem: "URL não encontrada."
                });
            }
            url.acessos += 1;
            url.ultimoAcesso = new Date();

            await url.save();

            return res.redirect(url.urlOriginal);
        } catch (erro) {
            return res.status(500).json({
                mensagem: "Erro ao acessar URL."
            });
        }
    }
    static async obterEstatisticas(req, res) {
        try {
            const { codigo } = req.params;

            const url = await Url.findOne({ codigo });

            if (!url) {
                return res.status(404).json({
                    mensagem: "URL não encontrada."
                });
            }
            return res.status(200).json({
                urlOriginal: url.urlOriginal,
                codigo: url.codigo,
                acessos: url.acessos,
                criadoEm: url.createdAt,
                ultimoAcesso: url.ultimoAcesso
            });
        } catch (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar estatísticas."
            });
        }
    }
static async excluirUrl(req, res) {
    try {
        const { codigo } = req.params;

        const url = await Url.findOneAndDelete({ codigo });

        if (!url) {
            return res.status(404).json({
                mensagem: "URL não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "URL excluída com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao excluir URL."
        });
    }
}
}
export default UrlController;
