# GiftLink

Full-stack gift-sharing app (Express + MongoDB backend, React frontend) for the IBM/Coursera capstone.

## Layout and requirements
| Requirement | File |
|---|---|
| Issue template with user-story labels | `.github/ISSUE_TEMPLATE/user-story.md`, stories listed in `user-stories.md` (8 stories, labels new/icebox/technical debt/backlog) |
| 16 gift documents imported to MongoDB | `giftlink-backend/util/import-mongo/gifts.json` + `index.js` (`npm run` → `node util/import-mongo/index.js`) |
| `await client.connect()` | `giftlink-backend/models/db.js` |
| `connectToDatabase()` in gift routes; `/` and `/:id` | `giftlink-backend/routes/giftRoutes.js` |
| Category filter | `giftlink-backend/routes/searchRoutes.js` |
| `/api/gifts/search` route (also `/api/search`) | `giftlink-backend/app.js` |
| `natural` import | `giftlink-backend/sentiment/index.js` |
| Register fetch with method + headers | `giftlink-frontend/src/components/RegisterPage/RegisterPage.js` |
| Login fetch with content-type + Authorization | `giftlink-frontend/src/components/LoginPage/LoginPage.js` |
| `collection.findOne()` for the user | `giftlink-backend/routes/authRoutes.js` |
| CI/CD | `.github/workflows/ci.yml` |

## Run
Backend (needs MongoDB; copy `.env.example` to `.env`, dev-only sample values):
```
cd giftlink-backend && npm install && node util/import-mongo/index.js && npm start
npm test
```
Frontend: `cd giftlink-frontend && npm install && npm start` (set `REACT_APP_BACKEND_URL` for deployment) / `npm run build`.

## Verified here
Backend tests (3) pass and the app module loads; the frontend production build succeeds. MongoDB was not available in this environment, so the import, live API calls, deployment and screenshots (tasks 2, 12–18) must be done by the student; GitHub repository links are filled in at submission.
