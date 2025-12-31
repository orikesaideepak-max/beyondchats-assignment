// src/components/ArticleCard.jsx
import "./ArticleCard.css";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>

      <div className="article-section">
        <h4>Original Article</h4>
        <p>{article.original_content || "N/A"}</p>
      </div>

      <div className="article-section updated">
        <h4>Updated Article</h4>
        <p>{article.updated_content || "Not updated yet"}</p>

        {article.references && article.references.length > 0 && (
          <div className="references">
            <h5>References:</h5>
            <ul>
              {article.references.map((ref, idx) => (
                <li key={idx}>
                  <a href={ref.link} target="_blank" rel="noopener noreferrer">
                    {ref.title || ref.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleCard;
