# 🤖📋 IssueAI — Customer Complaint Management System

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.140-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-MUI-007FFF?logo=mui&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLM-F55036)
![LangGraph](https://img.shields.io/badge/LangGraph-AI%20Pipeline-1C3C3C)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green)

![GitHub stars](https://img.shields.io/github/stars/Dileep0103/IssueAI-Customer-Complaint-Management-System?style=social)
![GitHub forks](https://img.shields.io/github/forks/Dileep0103/IssueAI-Customer-Complaint-Management-System?style=social)
![Last commit](https://img.shields.io/github/last-commit/Dileep0103/IssueAI-Customer-Complaint-Management-System)

IssueAI is an AI-powered full-stack web application built with **React, FastAPI, PostgreSQL, and the Groq LLM**. It automates the entire lifecycle of customer complaint handling — intake, AI-based classification and prioritization, tracking, and reporting — through a clean admin dashboard and a conversational AI assistant, replacing manual complaint triage with automated, consistent analysis.

## 🚀 Project Status

✅ Active Development — Current Version: v1.0

## 📑 Table of Contents

- [Why IssueAI?](#-why-issueai)
- [Key Highlights](#-key-highlights)
- [Features](#-features)
- [Screenshots](#️-screenshots)
- [Demo](#-demo)
- [Architecture](#️-architecture)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [API Overview](#-api-overview)
- [Live Demo](#-live-demo)
- [Setup & Installation](#️-setup--installation)
- [Default Admin Login](#-default-admin-login)
- [How the AI Pipeline Works](#-how-the-ai-pipeline-works)
- [Resume Highlights](#-resume-highlights)
- [Project Highlights](#-project-highlights)
- [Future Improvements](#️-possible-future-improvements)
- [Author](#-author)
- [License](#-license)

---

## 🎯 Why IssueAI?

Traditional complaint management relies on manual categorization and prioritization, making the process slow and inconsistent. IssueAI leverages Large Language Models (LLMs) to automate complaint classification, summarization, prioritization, and analytics — enabling faster, more consistent, and more accurate decision-making.

---

## ⭐ Key Highlights

- 🤖 AI-powered complaint categorization (category, priority, risk level)
- 📝 AI-generated complaint summaries
- 📄 PDF complaint upload & automatic text extraction
- 📊 Interactive analytics dashboard with charts
- 🔐 JWT-based authentication with protected routes
- 💬 AI chatbot for natural-language queries over complaint data
- 🌗 Dark / Light mode
- 📤 CSV & PDF report export

---

## ✨ Features

**🤖 AI Complaint Analysis**
Every complaint is analyzed by an LLM (via Groq, orchestrated with LangGraph) and automatically classified into:
- **Category** — Billing, Technical, Account, Service, Delivery, Other
- **Priority** — High, Medium, Low
- **Risk Level** — High, Medium, Low
- **Summary** — concise AI-generated summary (max 30 words)

**📄 PDF Upload**
Upload a complaint as a PDF; the system extracts the text, runs it through the AI pipeline, and saves the result to the database.

**✍️ Manual Complaint Analyzer**
Paste complaint text directly and get instant AI classification.

**📊 Admin Dashboard**
Search, filter (by category/priority/risk/status), update status, delete, and export complaints (CSV/PDF).

**📈 Analytics Page**
Visual breakdown of complaints by category and risk level, plus complaint trends over time (charts via Recharts).

**💬 AI Complaint Assistant (Chatbot)**
A chat interface that understands intents like "how many complaints", "high risk complaints", "billing complaints", or "which category has the most complaints", and answers using live database context.

**🔐 JWT-based Admin Authentication**
Secure login for admin access with protected frontend routes.

**🌗 Dark / Light Theme**
Toggleable UI theme, persisted in local storage.

---

## 🖼️ Screenshots

> 🚧 Screenshots will be added after deployment.

## 🎥 Demo

> 🚧 Demo GIF will be added after deployment.

---

## 🏗️ Architecture

```mermaid
flowchart TD
    A[React Frontend<br/>Vite + MUI] -->|REST API / Axios| B[FastAPI Backend]
    B --> C[LangGraph<br/>Complaint Analysis Graph]
    C --> D[Groq LLM<br/>openai/gpt-oss-20b]
    B --> E[(PostgreSQL Database)]
    B -->|JWT Auth| F[Admin Login]
```

**Flow:** The React frontend sends complaint text or a PDF to the FastAPI backend → FastAPI hands it to a LangGraph state graph → LangGraph calls the Groq LLM to classify category, priority, risk level, and generate a summary → results are persisted in PostgreSQL and surfaced back to the dashboard, analytics, and chatbot.

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| SQLAlchemy | ORM |
| PostgreSQL | Database |
| LangGraph + LangChain (`langchain-groq`) | AI complaint analysis pipeline |
| Groq LLM (`openai/gpt-oss-20b`) | Complaint classification & assistant responses |
| `python-jose` | JWT authentication |
| `passlib` (bcrypt) | Password hashing |
| `pypdf` | PDF text extraction |

### Frontend

| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| Material UI (MUI) | Component library |
| Redux Toolkit | State management |
| React Router | Client-side routing |
| Recharts | Analytics charts |
| Axios | API requests |
| `react-markdown` + `remark-gfm` | Chatbot message rendering |
| `jspdf` / `jspdf-autotable` / `react-csv` | Report export (PDF/CSV) |

---

## 📁 Project Structure

```
IssueAI-Customer-Complaint-Management-System/
├── 🗄️ backend/
│   ├── app/
│   │   ├── 🔐 auth/            # JWT + password hashing
│   │   ├── 🗃️ database/        # SQLAlchemy engine/session setup
│   │   ├── 🧠 langgraph/       # LangGraph complaint analysis graph
│   │   ├── 📦 models/          # Complaint & Admin ORM models
│   │   ├── 🌐 routers/         # auth, complaints, upload, assistant endpoints
│   │   ├── 📋 schemes/         # Pydantic request/response schemas
│   │   ├── ⚙️ services/        # AI service, assistant service, DB helpers
│   │   ├── 📄 utils/           # PDF text extraction
│   │   └── 🚀 main.py          # FastAPI app entrypoint
│   ├── requirements.txt
│   ├── seed_admin.py        # Creates a default admin user
│   └── seed_complaints.py   # Seeds sample complaint data
└── 💻 frontend/
    ├── src/
    │   ├── 🔌 api/              # Axios instance
    │   ├── 🧩 components/       # Navbar, Sidebar, tables, dialogs, charts
    │   ├── 📄 pages/             # Dashboard, Upload, Analyze, Assistant, Analytics, Login
    │   ├── 🗂️ redux/             # Redux store/slices
    │   └── 🎨 theme/              # MUI theme config
    └── package.json
```

---

## 🔌 API Overview

| Method | Endpoint                  | Description                                         |
|--------|----------------------------|------------------------------------------------------|
| GET    | `/`                         | Health check                                         |
| GET    | `/db-test`                  | Test database connectivity                           |
| POST   | `/analyze`                  | Analyze raw complaint text via AI                     |
| POST   | `/upload`                   | Upload a PDF complaint, analyze, and save it          |
| GET    | `/complaints/`               | Get all complaints                                    |
| GET    | `/complaints/filter`         | Filter complaints by category/priority/risk/status    |
| GET    | `/complaints/{id}`           | Get a single complaint                                |
| PUT    | `/complaints/{id}/status`    | Update a complaint's status                           |
| DELETE | `/complaints/{id}`           | Delete a complaint                                    |
| POST   | `/auth/login`                | Admin login, returns a JWT                            |
| POST   | `/assistant/`                | Ask the AI assistant a question about complaints      |

---

## 🌐 Live Demo

> _Add deployment links once the project is deployed._

- **Frontend:** _TBD_
- **Backend:** _TBD_
- **API Docs (Swagger):** _TBD_ (FastAPI auto-generates this at `/docs`)

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL database
- A [Groq](https://console.groq.com/) API key

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/issueai
```

Seed an initial admin user (default credentials: `admin` / `admin123`):

```bash
python seed_admin.py
```

(Optional) Seed sample complaint data:

```bash
python seed_complaints.py
```

Run the backend server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> ⚠️ **Note:** The backend CORS configuration currently allows requests only from `http://localhost:5173`, and the frontend's Axios client points to `http://127.0.0.1:8000`. Make sure both ports match your local setup, or update `backend/app/main.py` and `frontend/src/api/api.js` accordingly.

---

## 🔐 Default Admin Login

After running `seed_admin.py`:

```
Username: admin
Password: admin123
```

⚠️ Change this password before deploying to production.

---

## 🧠 How the AI Pipeline Works

1. A complaint (typed or extracted from a PDF) is passed into a **LangGraph** state graph.
2. The `analyze` node calls the Groq LLM with a structured prompt describing category, priority, and risk-level rules.
3. The model returns strict JSON containing `category`, `priority`, `risk_level`, and `summary`.
4. The result is stored in PostgreSQL and surfaced in the dashboard, analytics, and assistant chat.

The **AI Assistant** uses a lightweight intent detector (`intent_service.py`) to route questions (e.g., total counts, high-risk complaints, category-specific queries) to the right database query, then uses the Groq LLM to generate a natural-language answer grounded in the retrieved complaint data.

---

## 💼 Resume Highlights

- AI-powered full-stack web application
- React + FastAPI + PostgreSQL architecture
- Groq LLM integration using LangGraph
- JWT authentication and protected routes
- Analytics dashboard with interactive charts
- PDF upload and AI-powered complaint analysis

---

## 🏆 Project Highlights

- Developed a full-stack AI-powered complaint management platform end to end (backend, frontend, database, AI pipeline).
- Integrated Groq LLM with LangGraph for automated complaint classification and summarization.
- Built secure JWT authentication with protected routes and bcrypt password hashing.
- Implemented an analytics dashboard with interactive Recharts visualizations.
- Built an AI chatbot capable of answering complaint-related queries grounded in live database context.
- Added complaint report export as CSV and PDF.

---

## 🛣️ Possible Future Improvements

- Move the JWT secret key out of source code and into environment variables
- Add role-based access control for multiple admins
- Add pagination for large complaint datasets
- Deploy the backend and frontend (e.g., Render/Railway + Vercel) and add live demo links
- Add automated tests for API routes and AI classification accuracy

---

## 👤 Author

**Valluri Dileep Kumar**

🎓 B.Tech Computer Science Engineering
💻 Full Stack Developer
🤖 AI & Python Enthusiast

- GitHub: [@Dileep0103](https://github.com/Dileep0103)
- LinkedIn: _add your LinkedIn URL here_

---


## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ using React, FastAPI, PostgreSQL, Groq AI, and LangGraph.

⭐ If you found this project helpful, consider giving it a star!