
**Frontend:**
- `App.jsx` – Main component that fetches articles and renders `ArticleCard`.
- `ArticleCard.jsx` – Displays each article's original and updated content with references.
- `services/api.js` – Handles API requests to the backend.
- `App.css` & `ArticleCard.css` – Professional styling and responsive design.

**Backend (Node.js + MongoDB):**
- `server.js` – Express server, connects to MongoDB, and provides `/api/articles` endpoint.
- `models/` – Mongoose schema for articles.
- `articleRoutes.js` – API routes to fetch articles.

---

## Installation & Setup

### Backend
1. Navigate to your backend folder:
   ```bash
   cd phase3-backend
2. npm install
3. mongod
4. node server.js


Frontend
Navigate to the frontend folder:
cd phase3-frontend
Install dependencies:
npm install
Start the React app:
npm run dev
Frontend runs at: http://localhost:5173
