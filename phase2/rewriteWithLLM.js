async function rewriteWithLLM(article, refs) {
  console.log("Mock LLM called for:", article.title);

  if (!refs || refs.length === 0) {
    return null;
  }

  const referencesText = refs
    .map((r, i) => `${i + 1}. ${r.link}`)
    .join("\n");

  const rewrittenContent = `
${article.content || ""}

--- Updated Version ---

This article has been rewritten to better match the structure, tone,
and formatting of top-ranking articles found on Google search results.

Key improvements:
- Cleaner formatting
- Clearer explanations
- SEO-friendly structure

References:
${referencesText}
`;

  return {
    title: article.title,
    content: rewrittenContent.trim(),
    url: article.url,
  };
}

module.exports = rewriteWithLLM;
