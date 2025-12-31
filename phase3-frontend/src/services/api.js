// src/services/api.js

const API_BASE_URL = "http://localhost:5000/api"; 
// Node.js backend is running on port 5000

export async function fetchArticles() {
  const response = await fetch(`${API_BASE_URL}/articles`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles from backend");
  }

  const data = await response.json();

  // Ensure each article has the expected fields
  const formattedArticles = data.map(article => ({
    id: article._id, // MongoDB id
    title: article.title,
    original_content: article.content || article.original_content || "N/A",
    updated_content: article.updated_content || "Not updated yet",
    references: article.references || [], // array of { title, link }
  }));

  return formattedArticles;
}
