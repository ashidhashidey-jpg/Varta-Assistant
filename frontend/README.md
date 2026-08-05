# Varta Assistant — Frontend

A React 18 + Vite + Tailwind CSS frontend for the Varta Assistant AI chatbot SaaS,
built to talk to your existing Node/Express/MongoDB/Groq backend with **no backend
changes required**.

## Stack

React 18 · Vite · React Router DOM · Axios · Tailwind CSS · Framer Motion ·
Lucide React + React Icons · Recharts · React Hot Toast · React Hook Form ·
Context API · clsx + tailwind-merge · date-fns

## Folder structure

```
src/
  pages/            Route-level screens (Landing, Onboarding, Chat, Admin*, ...)
  components/
    layout/         Navbar, Footer, Sidebar, AdminLayout
    ui/             Button, Card, Modal, Pagination, SearchBar, ThemeToggle, ...
    chat/           ChatWindow, MessageBubble, TypingIndicator, ChatInput
    admin/          AnalyticsCard, ProfessionChart, ConversationRow
    landing/        Hero, Features, Benefits, Testimonials, CTA
  context/          ThemeContext, VisitorContext, AdminContext
  services/         api.js (Axios instance), widgetService.js, adminService.js
  hooks/            useChat, useTheme
  routes/           ProtectedRoute (admin), OnboardedRoute (chat)
  utils/            cn, formatDate, ErrorBoundary
```

## 1. Install

```bash
cd varta-frontend
npm install
```

## 2. Configure environment

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Leave empty to use the dev proxy below, or point it at your deployed backend, e.g. `https://api.yourapp.com` |
| `VITE_ADMIN_PASSWORD` | Must match your backend's `ADMIN_PASSWORD` (see caveat below) |

## 3. Run in development

```bash
npm run dev
```

This starts Vite on `http://localhost:5173`. `vite.config.js` proxies any
`/api/*` request to `http://localhost:5000` (your existing Express server),
so make sure the backend is running (`npm run dev` in `backend/`) alongside it.
Override the proxy target with `VITE_API_PROXY_TARGET` if your backend runs on
a different port.

## 4. Build for production

```bash
npm run build
```

Outputs to `dist/`. Your `server.js` already serves
`path.join(__dirname, '..', 'frontend', 'dist')` as static files — so if this
project lives in a sibling `frontend/` folder next to `backend/`, you can run
the Express server alone in production and it will serve this build directly
(single-port hosting), no extra config needed.

## API contract used (unchanged from your backend)

- `POST /api/widget/onboard` → `{ visitorId, conversationId, visitorName }`
- `GET /api/widget/history/:visitorId` → `{ visitorName, conversationId, messages[] }`
- `POST /api/widget/chat` → `{ reply }`
- `GET /api/analytics` → `{ totalVisitors, totalConversations, totalMessages, professionBreakdown[] }`
- `GET /api/conversations` → `[{ _id, visitorId: {...}, createdAt }]`
- `GET /api/conversations/:id` → `{ conversation, messages[] }`

## ⚠️ About the admin login

Your current `server.js` has no `/api/admin/login` endpoint — `config.ADMIN_PASSWORD`
is only ever printed to the server console. So `AdminContext.jsx` checks the
password **entirely in the browser** against `VITE_ADMIN_PASSWORD`. This keeps
casual visitors out of `/admin/*`, but it is not real authentication: anyone
who reads the built JS bundle can find the expected password, and the check
can be bypassed by anyone comfortable in devtools.

When you're ready to harden this, the smallest fix is a backend endpoint like:

```js
app.post('/api/admin/login', (req, res) => {
  if (req.body.password !== config.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  // issue a signed JWT or session cookie here
  res.json({ token: signedToken });
});
```

`AdminContext.login()` and the Axios request interceptor in `services/api.js`
already have the seams in place to swap to that flow later — only those two
files would need to change.
