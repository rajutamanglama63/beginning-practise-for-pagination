const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log("MongoDB connection established...");
    } catch (err) {
        res.status(500).json({error : err.message});
        console.log("MongoDB connection failed...");
        process.exit(1);
    }
}

module.exports = connectDB;