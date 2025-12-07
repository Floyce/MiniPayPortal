# Mini Pay Portal

A minimal full-stack payment portal using Node.js, Express, Stripe, and Vanilla JS/Tailwind.

## Features
- **Frontend**: Clean, responsive UI with Tailwind CSS.
- **Backend**: Express server with Stripe integration.
- **Auth**: Simple JSON-based user storage (Signup/Login).
- **Payment**: Stripe Checkout integration.

## Prerequisites
- Node.js installed.
- Stripe Account (for API keys).

## Local Setup

1.  **Clone/Open project**.
2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in `backend/` with:
    ```env
    STRIPE_SECRET_KEY=sk_test_...
    CLIENT_URL=http://localhost:5500/frontend
    PORT=3000
    ```
    Start the server:
    ```bash
    npm start
    ```

3.  **Frontend Setup**:
    Serve the `frontend/` folder using a static file server (e.g., Live Server in VS Code).
    Ensure the `CLIENT_URL` in `.env` matches your frontend URL.

## Deployment Instructions

### Backend (Render)
1.  Create a new **Web Service** on [Render](https://render.com/).
2.  Connect your repository.
3.  Settings:
    -   **Root Directory**: `backend`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
4.  **Environment Variables**: Add `STRIPE_SECRET_KEY` and `CLIENT_URL` (URL of your deployed frontend).

### Frontend (GitHub Pages)
1.  Push your code to GitHub.
2.  Go to Repo Settings -> Pages.
3.  Deploy from the `/root` or `/docs` folder depending on structure.
    -   *Note*: Since GitHub Pages serves fro root, you might need to move `frontend/*` to root or configure deployment source to `frontend/`.
    -   Alternatively use Netlify/Vercel: Drag and drop `frontend` folder.
4.  **Important**: Update the API URL in frontend JS files (`http://localhost:3000`) to your deployed Render backend URL.
    -   In `signup.html`, `login.html`, `dashboard.html`.

## Notification
The user receives a visual confirmation on the `success.html` page after payment.
