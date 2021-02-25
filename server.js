const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const postRouter = require("./route/postRouter");

const app = express();

connectDB();

dotenv.config();
const Port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.use('/api/posts', postRouter);

app.listen(Port, () => {
    console.log(`Server running on port http://localhost:${Port}`);
});