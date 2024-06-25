import mongoose from "mongoose";
const mongo_url = 'mongodb+srv://umamahesh:mapimplementation@cluster0.cxy5imj.mongodb.net/mi?retryWrites=true&w=majority&appName=Cluster0';
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