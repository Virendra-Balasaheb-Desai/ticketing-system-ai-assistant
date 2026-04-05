import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected : ",con.connections[0].host);
    } catch (error) {
        console.log("Error in MongoDB connection : ", error.message);
    }
}