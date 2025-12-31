const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
require("dotenv").config();

const Article = require("./models"); // make sure this exports Mongoose model
const articleRoutes = require("./articleRoutes");

const app = express();
app.use(bodyParser.json());

// 🔹 Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Use API routes
app.use("/api/articles", articleRoutes);

// Test route
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Scrape 5 oldest articles
async function scrapeArticles() {
  try {
    const pages = [15, 14];
    const articles = [];

    for (const page of pages) {
      const url = `https://beyondchats.com/blogs/page/${page}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      $(".blog-card, .post").each((i, elem) => {
        if (articles.length >= 5) return;

        const title = $(elem).find("h2 a, h3 a").first().text().trim();
        const link = $(elem).find("h2 a, h3 a").first().attr("href");
        const date = $(elem).find(".date, .post-date").first().text().trim();
        const content = $(elem).find(".blog-summary, .entry-summary").first().text().trim();

        if (title && link) {
          articles.push({ title, url: link, date, content });
        }
      });

      if (articles.length >= 5) break;
    }

    for (const art of articles) {
      const exists = await Article.findOne({ title: art.title });
      if (!exists) {
        await Article.create(art);
      }
    }

    console.log("Scraping complete! 5 oldest articles saved.");
  } catch (err) {
    console.error("Scraping error:", err);
  }
}

// Start scraping
scrapeArticles();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
