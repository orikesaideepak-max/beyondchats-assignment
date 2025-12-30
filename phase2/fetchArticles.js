const axios = require("axios");

async function fetchArticles() {
  try {
    const response = await axios.get("http://localhost:5000/api/articles");
    
    if (!response.data || response.data.length === 0) {
      console.log("No articles found from Phase 1 API.");
      return [];
    }

    console.log(`Fetched ${response.data.length} articles from Phase 1 API.`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles from Phase 1 API:", error.message);
    return [];
  }
}

module.exports = fetchArticles;
