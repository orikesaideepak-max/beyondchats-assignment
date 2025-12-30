const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const Article = require("./models"); // make sure this exports Mongoose model
const articleRoutes = require("./articleRoutes");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/beyondchats")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Use API routes (all routes under /api/articles)
app.use("/api/articles", articleRoutes);

// Optional: Add a simple GET route for testing directly
app.get("/articles", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Scrape 5 oldest articles (page 15 + page 14)
async function scrapeArticles() {
    try {
        const pages = [15, 14]; // first last page, then previous
        const articles = [];

        for (const page of pages) {
            const url = `https://beyondchats.com/blogs/page/${page}`;
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            $(".blog-card, .post").each((i, elem) => {
                if (articles.length >= 5) return; // stop after 5 articles

                const title = $(elem).find("h2 a, h3 a").first().text().trim();
                const url = $(elem).find("h2 a, h3 a").first().attr("href");
                const date = $(elem).find(".date, .post-date").first().text().trim();
                const content = $(elem).find(".blog-summary, .entry-summary").first().text().trim();

                if (title && url) {
                    articles.push({ title, url, date, content });
                }
            });

            if (articles.length >= 5) break; // exit loop once 5 collected
        }

        // Save to MongoDB if not exists
        for (const art of articles) {
            const exists = await Article.findOne({ title: art.title });
            if (!exists) {
                await Article.create(art);
            }
        }

        console.log("Scraping complete! 5 oldest articles saved to MongoDB.");
    } catch (err) {
        console.error("Scraping error:", err);
    }
}

// Start scraping
scrapeArticles();

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
