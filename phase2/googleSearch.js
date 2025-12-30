const axios = require("axios");
require("dotenv").config();

const SERP_API_KEY = process.env.SERP_API_KEY;

async function googleSearch(query) {
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&num=5&api_key=${SERP_API_KEY}`;
    const response = await axios.get(url);
    const results = response.data.organic_results || [];

    // Take first 2 links which are not your domain
    const links = results
      .map(r => r.link)
      .filter(link => !link.includes("beyondchats.com"))
      .slice(0, 2);

    return links;
  } catch (error) {
    console.error("Google search failed:", error.message);
    return [];
  }
}

module.exports = googleSearch; // ✅ Make sure this exists
