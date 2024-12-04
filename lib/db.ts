import mongoose from "mongoose";

const connectDB = async (retries = 10, delay = 5000) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);

        if (retries > 0) {
            console.log(`Retrying connection (${retries} attempts left)...`);
            setTimeout(() => connectDB(retries - 1, delay * 2), delay);
        } else {
            console.error("Could not connect to MongoDB after multiple attempts. Exiting...");
        }
    }
};

export default connectDB;
