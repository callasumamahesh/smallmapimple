import mongoose from "mongoose";
const mongo_url = process.env.mongodb_url;
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_url,{
            dbName:'mi',
            // useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000,  // Adjust as needed
            socketTimeoutMS: 45000, 
        })
        console.log('Connected to db');
    } catch (error) {
        console.log(error);
    }
    return true;
}

export default connectToDatabase;