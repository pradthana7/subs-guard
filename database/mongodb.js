import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(DB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
