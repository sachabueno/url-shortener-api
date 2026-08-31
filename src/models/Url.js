import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        urlOriginal: {
            type: String,
            required: true,
        },

        codigo: {
            type: String,
            required: true,
            unique: true
        },

        acessos: {
            type: Number,
            default: 0
        },

        ultimoAcesso: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
