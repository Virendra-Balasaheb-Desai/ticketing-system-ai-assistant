import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
    try {

        if (cached.conn) {
            console.log("Database Connected from cache: ",cached.conn.connections[0].host);
            return cached.conn;
        }

        if (!cached.promise) {
            cached.promise = mongoose.connect(process.env.MONGODB_URI, {
                bufferCommands: false,
            });
            console.log("Database Connected promise initialed : ",cached.promise);
        }

        cached.conn = await cached.promise;
        console.log("Database Connected : ",cached.conn.connections[0].host);

        return cached.conn;
    } catch (error) {
        console.log("Error in MongoDB connection : ", error?.message);
    }
}