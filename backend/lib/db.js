import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connecting seccessfuly")
    } catch (error) {
        console.log("error ro concting to database")
        process.exit(1)
    }
}