const express = require("express");

const Post = require("../model/Post");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let query = Post.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * pageSize;
        const total = await Post.countDocuments();

        const pages = Math.ceil(total / pageSize);

        query = query.skip(skip).limit(pageSize);

        if(page > pages) {
            return res.status(404).json({
                status : "failed",
                message : "page not found",
            });
        }

        const result = await query;

        res.status(200).json({
            status : "success",
            count : result.length,
            page,
            pages,
            data : result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status : "failed",
            message : "server error"
        });
    }
});

module.exports = router;