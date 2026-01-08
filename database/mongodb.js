import mongoose from 'mongoose';
import {DB_URI} from "../config/env.js";


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(DB_URI).then(m => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectToDatabase;
