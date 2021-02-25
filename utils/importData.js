const dotenv = require("dotenv");
const fs = require("fs");

const Post = require("../model/Post");
const connectDB = require("../config/db");

dotenv.config();

connectDB();

const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));

const importData = async () => {
    try {
        await Post.create(posts);
        console.log("Data successfully imported...");
        process.exit();
    } catch (err) {
        console.log(`error : ${err}`);
        process.exit(1);
    }
}


const deleteData = async () => {
    try {
        await Post.deleteMany({});
        console.log("Data successfully deleted...");
        process.exit();
    } catch (err) {
        console.log(`error : ${err}`);
        process.exit(1);
    }
}

if(process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}