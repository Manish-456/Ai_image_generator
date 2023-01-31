import mongoose from "mongoose";

const connectDB = (url) => {mongoose.set('strictQuery', true);
mongoose.connect(url)
.then(() => console.log("Connected to db"))
.catch(err => console.log("Failed to connect to db"))
};

export default connectDB;
