Phase 2 – Article Rewriting & Publishing Pipeline
Overview

This phase implements an automated Node.js script that enhances existing articles by analyzing top-ranking Google articles and publishing an improved version using the APIs created in Phase 1.

The pipeline performs the following steps:

Fetches articles from the Phase 1 Articles API

Searches the article title on Google using SerpAPI

Extracts the top two blog/article links from search results

Scrapes the main content from those external articles

Rewrites the original article using an LLM (mocked implementation)

Appends reference links at the bottom of the rewritten article

Publishes the updated article using the Phase 1 CRUD API

🔹 LLM Integration (Mocked)

Due to paid API and quota limitations, the LLM rewriting step is mocked.

Mock LLM called for: <article title>


This demonstrates:

Correct integration point for an LLM (OpenAI / Gemini / etc.)

Proper flow of scraped reference content into the rewriting step

Safe handling of missing API keys

The code is structured so that a real LLM API can be plugged in easily by replacing the mock function.

🔹 Environment Variables

API keys are loaded using environment variables and are not committed to the repository.

Create a .env file locally using the following template:

GEMINI_API_KEY=your_gemini_api_key_here
SERP_API_KEY=your_serp_api_key_here


⚠️ The .env file is intentionally excluded from GitHub for security reasons.

A sample file .env.example is provided for reference.

🔹 How to Run Phase 2
node phase2/phase2Runner.js


Expected output:

Articles fetched from Phase 1 API

Google search + scraping logs

Mock LLM rewrite confirmation

Successful publishing confirmation for each article

🔹 Notes

Scraping failures (e.g., Amazon or protected sites) are handled gracefully

The pipeline continues even if reference scraping fails

Duplicate article processing is safely managed

Code is modular, readable, and extensible

🔹 Tech Stack

Node.js

Axios / Fetch

Cheerio (scraping)

SerpAPI (Google Search)

Environment variables (dotenv)