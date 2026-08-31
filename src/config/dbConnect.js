import mongoose from "mongoose";

async function dbConnect() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI não encontrada no arquivo .env.");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000
    });

    return mongoose.connection;
}
export default dbConnect;
