const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeContent(url) {
  try {
    if (!url) throw new Error("No URL provided for scraping.");

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      timeout: 10000, // 10 seconds timeout
    });

    const $ = cheerio.load(data);

    // Extract meaningful content: paragraphs, headings, lists
    let content = "";

    $("h1, h2, h3, h4, p, li").each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        content += text + "\n\n";
      }
    });

    // Limit content to avoid extremely long text
    if (content.length > 10000) {
      content = content.substring(0, 10000) + "\n\n[Content truncated]";
    }

    return content.trim();
  } catch (error) {
    console.error("❌ Scrape content failed for URL:", url, error.message);
    return "";
  }
}

module.exports = scrapeContent;
