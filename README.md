# ReachInbox

It is a full-stack based application that allows user to send an email automatically to someone on a scheduled time. It accept request from the user, store it in relational database (MySQL / PostgreSQL) and after that it manages the scheduled time and according to the scheduled time it automatically send email and also show the status and background tasks on the dashboard.

# Problem Statement

At ReachInbox, a huge part of our system is **reliable scheduling and sending of emails at scale**.

Your task is to build a **production-grade email scheduler service + dashboard** that:

- Accepts **email send requests** via APIs
- Schedules them to be sent at a **specific time**
- Uses **BullMQ + Redis** as a persistent job scheduler (**no cron jobs**)
- Sends emails using fake SMTP via **Ethereal Email**
- Survives **server restarts** without restarting from scratch or losing jobs
- Exposes a **frontend dashboard** to:
    - Schedule new emails
    - View scheduled emails
    - View sent emails

# Technologies Requirement

| Technology | Purpose |
|---|---|
| React.js | Flexible for choosing stack for routing, data fetching, interactive ui and slightly easy to load in browser. |
| TypeScript | Handles unexpected runtime error before it happens |
| Tailwind CSS | Modern Styling and responsive design |
| Google OAuth | User safe authentication |
| Node.js | JavaScript runtime environment |
| BullMQ | Background task scheduling and processing |
| Redis | Job management by queue jobs and distribute properly even after server crashes and then restart and also to implement *Rate Limiting.* |
| MySQL / PostgreSQL | Relational database |
| Nodemailer | SMTP email delivery |
| Elasticsearch | Indexing emails and search |
| BullMQ Dashboard | Queue Visibility |

# Infrastructure needed

- Docker for testing CI/CD pipeline and for resolving environment inconsistancy
- Redis with determined storage for realtime analytics and rate limiting
- RDBMS (Relational Database Management System)
- Node.js and `npm`
- OAuth Credentials from Google Cloud Console

# Installation & Setup

**1. Clone Repository**

`git clone https://github.com/rka2005/ReachInbox.git`

**2. Install of dependency for frontend and backend**

`cd frontend
npm install`

`cd backend
npm install`

# Environment Configuaration

### Backend `.env`
```
PORT=5000
FRONTEND_URL=<your_frontend_url>

GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_PROJECT_ID=<your_google_project_id>
GOOGLE_AUTH_URI=<google_auth_url>
GOOGLE_TOKEN_URI=<google_token_uri>
GOOGLE_CLIENT_SECRET=<google_client_secret>
GOOGLE_REDIRECT_URI=<google_redirect_uri>

```