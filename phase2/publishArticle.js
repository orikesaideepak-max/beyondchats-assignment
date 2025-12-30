const axios = require("axios");

async function publishArticle(article) {
  try {
    if (!article || !article.title) {
      throw new Error("Invalid article object provided.");
    }

    const response = await axios.post("http://localhost:5000/api/articles", article);

    if (response.status === 201 || response.status === 200) {
      console.log(`✅ Published article: "${article.title}"`);
    } else {
      console.warn(`⚠️ Article published but returned status: ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ Publishing failed for article: "${article?.title || 'Unknown'}"`, error.message);
  }
}

module.exports = publishArticle;
