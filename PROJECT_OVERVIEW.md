# 🏋️ PROJECT OVERVIEW - TỔNG QUAN DỰ ÁN

---

## 🎯 PROJECT GOAL

Xây dựng một **Hệ Thống Quản Lý Phòng Gym Toàn Diện** với:
- ✅ Quản lý thành viên (Members)
- ✅ Quản lý gói tập (Memberships)
- ✅ Quản lý thanh toán (Payments)
- ✅ Tính năng tìm kiếm, lọc, phân trang
- ✅ Giao diện web thân thiện

**Scope:** MVP (Minimum Viable Product) - Tập trung vào core features

---

## 📊 TECH STACK

```
┌─────────────────────────────────┐
│     Frontend (Web UI)           │
│  React 18 + Vite + React Router │
│  Port: 5173                     │
└────────────┬────────────────────┘
             │ HTTP/JSON
             ▼
┌─────────────────────────────────┐
│     Backend (API)               │
│  FastAPI (Python)               │
│  SQLAlchemy ORM                 │
│  Pydantic validation            │
│  Port: 8000                     │
└────────────┬────────────────────┘
             │ SQL
             ▼
┌─────────────────────────────────┐
│     Database                    │
│  PostgreSQL 12+                 │
│  Port: 5432                     │
│  DB: gym_management             │
└─────────────────────────────────┘
```

### Các Công Nghệ Chi Tiết

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.x | UI Components |
| | Vite | 5.x | Build tool, dev server |
| | React Router | 6.x | Routing |
| | CSS3 | - | Styling |
| **Backend** | FastAPI | 0.136+ | Web framework |
| | SQLAlchemy | 2.0+ | ORM |
| | Pydantic | 2.x | Validation |
| | Uvicorn | 0.46+ | ASGI server |
| | psycopg2 | 2.9+ | PostgreSQL driver |
| **Database** | PostgreSQL | 12+ | RDBMS |
| **DevOps** | Git | - | Version control |
| | GitHub | - | Repository |
| | PowerShell | - | Windows shell |

---

## 📂 PROJECT STRUCTURE

```
gym-management/
│
├── 📁 backend/                          # Backend code
│   ├── 📁 app/
│   │   ├── main.py                      # FastAPI app entry
│   │   ├── database.py                  # DB connection
│   │   ├── config.py                    # Configuration
│   │   ├── models.py                    # SQLAlchemy models (3 models)
│   │   ├── schemas.py                   # Pydantic schemas
│   │   └── 📁 routers/                  # API endpoints
│   │       ├── members.py               # Members CRUD (5 endpoints)
│   │       ├── memberships.py           # Memberships CRUD (5 endpoints)
│   │       └── payments.py              # Payments CRUD (5 endpoints)
│   ├── requirements.txt                 # Python dependencies
│   ├── .env                             # Environment variables (GIT IGNORE)
│   └── .env.example                     # .env template
│
├── 📁 database/                         # Database setup
│   ├── schema.sql                       # CREATE TABLE statements
│   └── seed.sql                         # Sample data
│
├── 📁 frontend/                         # React app
│   ├── 📁 src/
│   │   ├── 📁 pages/                    # Page components (4 pages)
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MembersPage.jsx
│   │   │   ├── MembershipsPage.jsx
│   │   │   └── PaymentsPage.jsx
│   │   ├── 📁 components/               # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Form.jsx
│   │   │   └── ...
│   │   ├── App.jsx                      # Main component + routes
│   │   ├── main.jsx                     # React entry point
│   │   ├── index.html                   # HTML file
│   │   ├── App.css                      # Styles
│   │   └── index.css                    # Global styles
│   ├── vite.config.js                   # Vite config
│   ├── package.json                     # Node dependencies
│   └── node_modules/                    # Dependencies (GIT IGNORE)
│
├── 📁 .git/                             # Git repository
├── .gitignore                           # Git ignore rules
├── requirements.txt                     # All Python deps
│
├── 📖 README.md                         # Main documentation
├── 🚀 QUICKSTART.md                     # Quick setup
├── 📘 GYM_MANAGEMENT_HANDBOOK.md        # Detailed guide
├── 📚 API_REFERENCE.md                  # API docs
├── 💻 CODE_EXAMPLES.md                  # Code patterns
├── 👥 TEAM_WORKFLOW.md                  # Git & teamwork
├── 🪟 SETUP_WINDOWS.md                  # Windows setup
├── 📋 DOCUMENTATION_INDEX.md            # Doc index
└── 📊 PROJECT_OVERVIEW.md               # This file

```

---

## 🗄️ DATABASE SCHEMA

### Tables & Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    MEMBERS                              │
│ ─────────────────────────────────────────────────────── │
│ id (PK) int                                             │
│ name varchar(100)                                       │
│ email varchar(100) UNIQUE                              │
│ phone varchar(20)                                       │
│ gender varchar(10)                                      │
│ date_of_birth timestamp                                │
│ address varchar(255)                                    │
│ is_active boolean DEFAULT true                         │
│ created_at timestamp DEFAULT now()                     │
│ updated_at timestamp DEFAULT now()                     │
└─────────────────┬───────────────────────────────────────┘
                  │ 1:N
                  ├─────────────────────────────────┐
                  │                                 │
                  ▼                                 ▼
        ┌──────────────────────┐      ┌──────────────────────┐
        │  MEMBERSHIPS         │      │    PAYMENTS          │
        │ ────────────────────│      │ ────────────────────│
        │ id (PK) int          │      │ id (PK) int          │
        │ member_id (FK)       │◄─────┤ member_id (FK)       │
        │ type varchar(50)     │  1:N │ membership_id (FK)   │
        │ price float          │      │ amount float         │
        │ start_date timestamp │      │ payment_status      │
        │ end_date timestamp   │      │ payment_method      │
        │ is_active boolean    │      │ payment_date        │
        │ created_at timestamp │      │ note varchar(255)   │
        └──────────────────────┘      │ created_at timestamp │
                                      └──────────────────────┘
```

### Enum Values

**MEMBERSHIP TYPES:**
- `monthly` - 1 tháng (500k)
- `quarterly` - 3 tháng (1.2M)
- `yearly` - 1 năm (4M)

**PAYMENT STATUS:**
- `pending` - Chờ xử lý
- `completed` - Hoàn thành
- `failed` - Thất bại

**PAYMENT METHODS:**
- `cash` - Tiền mặt
- `bank_transfer` - Chuyển khoản
- `card` - Thẻ

---

## 🔌 API ENDPOINTS

### Members (15 endpoints planned, 5 core)

```
GET    /api/members                      # List all
POST   /api/members                      # Create
GET    /api/members/{id}                 # Get one
PUT    /api/members/{id}                 # Update
DELETE /api/members/{id}                 # Delete
```

### Memberships (15 endpoints planned, 5 core)

```
GET    /api/memberships                  # List all
POST   /api/memberships                  # Create
GET    /api/memberships/{id}             # Get one
PUT    /api/memberships/{id}             # Update
DELETE /api/memberships/{id}             # Delete
```

### Payments (15 endpoints planned, 5 core)

```
GET    /api/payments                     # List all
POST   /api/payments                     # Create
GET    /api/payments/{id}                # Get one
PUT    /api/payments/{id}                # Update
DELETE /api/payments/{id}                # Delete
```

### Utility

```
GET    /health                           # Health check
GET    /docs                             # Swagger UI
GET    /redoc                            # ReDoc
```

**Total:** ~15 endpoints (MVP scope)

---

## 🎨 FRONTEND PAGES

### Page Breakdown

| Page | URL | Components | Features |
|------|-----|-----------|----------|
| **Dashboard** | `/` | Header, Stats, Charts | Overview, quick stats |
| **Members** | `/members` | Header, Sidebar, Table, Form | CRUD, Search, Filter, Paginate |
| **Memberships** | `/memberships` | Header, Sidebar, Table, Form | CRUD, Expiry tracking |
| **Payments** | `/payments` | Header, Sidebar, Table, Form | CRUD, Status tracking |

### Component Reusability

**Shared Components:**
- `Header.jsx` - Top navigation
- `Sidebar.jsx` - Left menu
- `Table.jsx` - Generic data table
- `Form.jsx` - Generic form
- `Modal.jsx` - Popups
- `Button.jsx` - Buttons
- `Input.jsx` - Form inputs
- `Loading.jsx` - Spinners

---

## 👥 TEAM ROLES

| Role | Person | Responsibility | Deliverable |
|------|--------|------------------|-------------|
| **Leader** | You | Project management, frontend, code review, deployment | Dashboard + Members Page + GitHub |
| **Backend A** | Team A | Members API | 5 Members endpoints + tests |
| **Backend B** | Team B | Memberships API | 5 Memberships endpoints + tests |
| **Backend C** | Team C | Payments API | 5 Payments endpoints + tests |

---

## 📅 DEVELOPMENT TIMELINE

### Phase 1: Foundation (Week 1)
- ✅ Git setup
- ✅ Database design & creation
- ✅ Backend boilerplate (main.py, database.py)
- ✅ Frontend boilerplate (React setup, routing)
- ✅ Documentation

**Deliverable:** Working dev environment for whole team

### Phase 2: Backend APIs (Week 2-3)
- ✅ Members API (CRUD + search/filter)
- ✅ Memberships API (CRUD + relationship)
- ✅ Payments API (CRUD + status tracking)
- ✅ API testing (Swagger)
- ✅ Error handling

**Deliverable:** 15 working endpoints

### Phase 3: Frontend (Week 3-4)
- ✅ Shared components (Table, Form, Header, Sidebar)
- ✅ 4 Pages (Dashboard, Members, Memberships, Payments)
- ✅ API integration (fetch data)
- ✅ Responsive UI
- ✅ Error handling

**Deliverable:** Working web interface

### Phase 4: Integration & QA (Week 4-5)
- ✅ End-to-end testing
- ✅ Bug fixes
- ✅ Performance optimization
- ✅ Documentation cleanup
- ✅ Code review

**Deliverable:** Production-ready system

---

## 📈 SUCCESS METRICS

| Metric | Target | Status |
|--------|--------|--------|
| Endpoints | 15+ | - |
| Database Tables | 3 | - |
| Frontend Pages | 4+ | - |
| Code Coverage | 80%+ | - |
| Documentation | 100% | - |
| Team Knowledge | Everyone understands code | - |
| Performance | <500ms response time | - |
| Uptime | 100% (dev environment) | - |

---

## 🔒 NON-FUNCTIONAL REQUIREMENTS

### Security
- [ ] Input validation (Pydantic)
- [ ] Error handling (no stack traces to client)
- [ ] Rate limiting (future: implement)
- [ ] Authentication (future: add JWT)

### Performance
- [ ] Database query optimization
- [ ] Pagination for large datasets
- [ ] Caching (future: add Redis)
- [ ] API response time < 500ms

### Maintainability
- [ ] Code follows conventions
- [ ] Clear comments for complex logic
- [ ] Modular architecture
- [ ] Comprehensive documentation

### Scalability
- [ ] Database designed for growth
- [ ] API stateless (can scale horizontally)
- [ ] Frontend can handle 1000+ members
- [ ] Backend can handle 100+ concurrent users

---

## 🚀 DEPLOYMENT PLAN

### Development
- ✅ Local machine (each developer)
- ✅ Git version control
- ✅ GitHub repository

### Testing Environment
- [ ] Shared test server (future)

### Production
- [ ] Cloud deployment (future: AWS/Heroku)
- [ ] Domain name (future)
- [ ] HTTPS (future)
- [ ] Monitoring (future)

---

## 📝 DOCUMENTATION DELIVERABLES

| Document | Status | Link |
|----------|--------|------|
| README | ✅ Complete | [README.md](README.md) |
| Quick Start | ✅ Complete | [QUICKSTART.md](QUICKSTART.md) |
| Setup Guide | ✅ Complete | [SETUP_WINDOWS.md](SETUP_WINDOWS.md) |
| Handbook | ✅ Complete | [GYM_MANAGEMENT_HANDBOOK.md](GYM_MANAGEMENT_HANDBOOK.md) |
| API Reference | ✅ Complete | [API_REFERENCE.md](API_REFERENCE.md) |
| Code Examples | ✅ Complete | [CODE_EXAMPLES.md](CODE_EXAMPLES.md) |
| Team Workflow | ✅ Complete | [TEAM_WORKFLOW.md](TEAM_WORKFLOW.md) |
| Project Overview | ✅ This file | [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) |

---

## 🎯 HOW TO USE THIS DOCUMENT

**For Project Planning:**
- Use Timeline & Team Roles to track progress
- Refer to Success Metrics for quality gates

**For Development:**
- Check Tech Stack to understand tools
- Use DB Schema to design queries
- Check API Endpoints before coding

**For Team:**
- Share Project Overview in kickoff meeting
- Reference Team Roles for accountability
- Track Timeline for deadlines

---

## 📞 NEXT STEPS

1. **Kick-off Meeting** (30 min)
   - Share this document
   - Discuss roles & responsibilities
   - Set up communication channels

2. **Environment Setup** (2 hours)
   - Everyone follow SETUP_WINDOWS.md
   - Test that everyone can run the project

3. **Code Review Setup** (30 min)
   - Follow TEAM_WORKFLOW.md
   - Setup GitHub + PR template

4. **Start Development**
   - Follow timeline
   - Daily standups
   - Weekly sync-ups

---

**Let's build something awesome! 🚀**

Questions? → Ask on Slack/Teams or create GitHub issue

