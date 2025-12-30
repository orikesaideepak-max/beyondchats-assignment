require('dotenv').config(); // Load API keys from .env
const fetchArticles = require("./fetchArticles");
const googleSearch = require("./googleSearch");
const scrapeContent = require("./scrapeContent");
const rewriteWithLLM = require("./rewriteWithLLM");
const publishArticle = require("./publishArticle");

// Sleep function to delay requests and avoid API rate limits
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runPhase2() {
  try {
    // Step 1: Fetch all articles from your Phase 1 API
    const articles = await fetchArticles();
    if (!articles || articles.length === 0) {
      console.log("No articles found to process.");
      return;
    }

    for (const article of articles) {
      console.log(`\nProcessing article: ${article.title}`);

      // Step 2: Search Google for top 2 relevant links
      const searchResults = await googleSearch(article.title);
      if (!searchResults || searchResults.length === 0) {
        console.log(`No search results found for "${article.title}"`);
        continue;
      }

      // Step 3: Scrape content from these links
      const scrapedContents = [];
      for (const link of searchResults) {
        try {
          const content = await scrapeContent(link);
          scrapedContents.push({ link, content });
        } catch (scrapeErr) {
          console.error(`Failed to scrape ${link}:`, scrapeErr.message);
        }
      }

      if (scrapedContents.length === 0) {
        console.log(`No content scraped for "${article.title}"`);
        continue;
      }

      // Step 4: Rewrite the article using LLM
      const newArticle = await rewriteWithLLM(article, scrapedContents);

      // Skip publishing if rewritten content is empty
      if (!newArticle.content || newArticle.content.trim() === "") {
        console.log(`Skipping publishing for "${article.title}" due to empty content.`);
        continue;
      }

      // Wait 2 seconds to avoid hitting API rate limit
      await sleep(2000);

      // Step 5: Publish rewritten article via Phase 1 API
      try {
        await publishArticle(newArticle);
      } catch (pubErr) {
        console.error(`❌ Publishing failed for article: "${article.title}"`, pubErr.message);
      }

      console.log(`Article "${article.title}" processed successfully.`);
    }

    console.log("\nPhase 2 completed successfully!");
  } catch (error) {
    console.error("Phase 2 failed:", error);
  }
}

runPhase2();
