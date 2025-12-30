const express = require("express");
const router = express.Router();
const Article = require("./models");

// Get all articles
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single article
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create article
router.post("/", async (req, res) => {
    try {
        const newArticle = await Article.create(req.body);
        res.json(newArticle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update article
router.put("/:id", async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedArticle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete article
router.delete("/:id", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
