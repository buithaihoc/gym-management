# 📚 DOCUMENTATION INDEX - CHỈ MỤC TÀI LIỆU

Đây là tập hợp các tài liệu hướng dẫn chi tiết cho dự án Gym Management System.

---

## 📖 Các Tài Liệu Chính

### 1. **QUICKSTART.md** ⚡ (BẮT ĐẦU NHANH)
**Dành cho:** Ai mới setup lần đầu
**Nội dung:**
- Setup database PostgreSQL
- Cài Python dependencies  
- Cài Node.js dependencies
- Chạy backend & frontend
- Troubleshooting nhanh

👉 **Khi nào dùng:** Lần đầu tiên setup hoặc setup ở máy mới

---

### 2. **GYM_MANAGEMENT_HANDBOOK.md** 📘 (SỔ TAY CHI TIẾT)
**Dành cho:** Ai muốn hiểu toàn bộ dự án
**Nội dung:**
- Giới thiệu công nghệ (FastAPI, React, PostgreSQL)
- Cấu trúc dự án chi tiết từng file
- Hướng dẫn cài đặt bước-by-bước
- Cách chạy dự án
- **Phát triển Backend:** File chính, Models, Schemas, Routers (chi tiết)
- **Phát triển Frontend:** React components, pages, state management
- **Làm việc với Database:** SQL queries, migrations
- **Git & Teamwork:** Quy trình làm việc nhóm
- **Kiểm thử & Debug:** Tips và tools
- **Khắc phục sự cố:** Common errors & solutions

👉 **Khi nào dùng:** Khi bạn muốn học kỹ hơn từng phần, hoặc cần reference kỹ thuật

---

### 3. **API_REFERENCE.md** 📚 (THAM KHẢO API)
**Dành cho:** Ai phát triển API backend hoặc integrate frontend
**Nội dung:**
- Tất cả endpoints (Members, Memberships, Payments)
- Request/Response format
- Query parameters
- Error codes
- cURL examples
- React fetch examples
- HTTP status codes
- Relationships giữa bảng

👉 **Khi nào dùng:** Khi develop API hoặc gọi API từ frontend

---

### 4. **CODE_EXAMPLES.md** 💻 (VÍ DỤ CODE)
**Dành cho:** Ai muốn xem code thực tế
**Nội dung:**
- Backend examples:
  - GET endpoint (pagination)
  - POST endpoint (validation)
  - PUT endpoint (update)
  - DELETE endpoint
  - Advanced queries
  - Relationships
  - Error handling
  
- Frontend examples:
  - Fetch data (useEffect)
  - Form (controlled component)
  - Update data
  - Delete data
  - Routing
  
- Quy trình thêm feature mới (step-by-step)

👉 **Khi nào dùng:** Khi cần xem code pattern hoặc bắt đầu feature mới

---

### 5. **TEAM_WORKFLOW.md** 👥 (QUY TRÌNH NHÓM)
**Dành cho:** Tất cả team members
**Nội dung:**
- Phân công & trách nhiệm (A, B, C, Nhóm Trưởng)
- Timeline (4 tuần phát triển)
- Git workflow chi tiết
- Commit conventions
- Pull Request process
- Code review standards
- Handling conflicts
- Daily standup format
- Communication tips
- Deployment checklist

👉 **Khi nào dùng:** Khi bạn muốn biết quy trình làm việc nhóm, commit/PR flow

---

## 🎯 QUICK REFERENCE

### Cần setup lần đầu?
→ **QUICKSTART.md** + **GYM_MANAGEMENT_HANDBOOK.md** (3. Database + 4. Installation)

### Cần viết API endpoint mới?
→ **CODE_EXAMPLES.md** (Backend Examples 1-5) + **API_REFERENCE.md**

### Cần viết React component?
→ **CODE_EXAMPLES.md** (Frontend Examples 1-5) + **GYM_MANAGEMENT_HANDBOOK.md** (phần Frontend)

### Cần hiểu kiến trúc project?
→ **GYM_MANAGEMENT_HANDBOOK.md** (phần Cấu trúc dự án + Giới thiệu)

### Cần test API?
→ **API_REFERENCE.md** (cURL examples) hoặc mở **http://localhost:8000/docs** (Swagger UI)

### Cần làm feature hoàn chỉnh?
→ **CODE_EXAMPLES.md** (Quy trình Phát triển Feature Mới)

### Cần commit & push code?
→ **TEAM_WORKFLOW.md** (Git Workflow)

### Cần tạo Pull Request?
→ **TEAM_WORKFLOW.md** (Pull Request Workflow)

---

## 📁 Liên Kết Nhanh Tới Files

**Backend:**
- Main file: `backend/app/main.py`
- Models: `backend/app/models.py`
- Schemas: `backend/app/schemas.py`
- Routers: `backend/app/routers/` (members.py, memberships.py, payments.py)

**Frontend:**
- Main: `frontend/src/App.jsx`
- Pages: `frontend/src/pages/` (MembersPage, etc)
- Components: `frontend/src/components/` (Table, Form, etc)

**Database:**
- Schema: `database/schema.sql` (CREATE TABLE statements)
- Seeds: `database/seed.sql` (sample data)

**Config:**
- Backend: `backend/.env`
- Frontend: `frontend/vite.config.js`

---

## 🚀 TYPICAL WORKFLOWS

### Workflow 1: Backend Dev (Thành Viên A, B, C)

```
1. Mở QUICKSTART.md → Run backend
2. Mở CODE_EXAMPLES.md → Backend Examples
3. Tạo model + schema + router
4. Test ở Swagger UI (http://localhost:8000/docs)
5. Reference API_REFERENCE.md khi không chắc
6. Mở TEAM_WORKFLOW.md → Git workflow → commit & push
7. Tạo PR, nhóm trưởng review & merge
```

### Workflow 2: Frontend Dev (Nhóm Trưởng)

```
1. Mở QUICKSTART.md → Run frontend
2. Mở CODE_EXAMPLES.md → Frontend Examples
3. Tạo page hoặc component
4. Fetch data từ API (xem API_REFERENCE.md)
5. Test ở http://localhost:5173
6. Mở TEAM_WORKFLOW.md → Git workflow → commit & push
```

### Workflow 3: Debug Issue

```
1. Kiểm tra error message
2. Mở GYM_MANAGEMENT_HANDBOOK.md → Khắc phục sự cố
3. Nếu là lỗi code, mở CODE_EXAMPLES.md
4. Nếu là API issue, mở API_REFERENCE.md
5. Nếu vẫn stuck, tạo GitHub issue
```

### Workflow 4: Review PR

```
1. Mở PR trên GitHub
2. Mở CODE_EXAMPLES.md → Xem pattern tương tự
3. Kiểm tra: Logic, Error handling, Code quality, Tests, Docs
4. Dùng TEAM_WORKFLOW.md → Code Review Standards
5. Comment & approve/request changes
```

---

## 📞 HELP & SUPPORT

### Nếu stuck:

1. **Kiểm tra tài liệu** - Đọc doc phù hợp
2. **Google lỗi** - Copy error message search
3. **Hỏi team** - Post ở Slack/Teams
4. **Pair programming** - Làm cùng teammate
5. **Tạo issue** - Document problem + steps to reproduce

### Common Issues:

| Issue | Solution |
|-------|----------|
| "ModuleNotFoundError" | QUICKSTART.md → Step 3 |
| "Connection refused 5432" | QUICKSTART.md → Database Setup |
| Không biết tạo endpoint | CODE_EXAMPLES.md → Backend Ví Dụ 1 |
| Không biết fetch data | CODE_EXAMPLES.md → Frontend Ví Dụ 1 |
| Git conflict | TEAM_WORKFLOW.md → Handling Conflicts |
| API return error 422 | API_REFERENCE.md → HTTP Status Codes |

---

## 📊 Document Statistics

| Document | Size | Read Time | Sections |
|----------|------|-----------|----------|
| QUICKSTART.md | 4 KB | 5 min | 6 |
| GYM_MANAGEMENT_HANDBOOK.md | 50 KB | 45 min | 10 |
| API_REFERENCE.md | 11 KB | 15 min | 6 |
| CODE_EXAMPLES.md | 26 KB | 30 min | Backend + Frontend + Feature |
| TEAM_WORKFLOW.md | 11 KB | 15 min | 8 |

**Total: ~100KB, ~2 hours to read all**

---

## 🔄 Document Updates

Khi có thay đổi:

- Model thêm field → Update: `GYM_MANAGEMENT_HANDBOOK.md` + `CODE_EXAMPLES.md`
- API endpoint thay đổi → Update: `API_REFERENCE.md` + `CODE_EXAMPLES.md`
- Workflow thay đổi → Update: `TEAM_WORKFLOW.md`
- Setup steps thay đổi → Update: `QUICKSTART.md` + `GYM_MANAGEMENT_HANDBOOK.md`

---

## 👥 Contributor Guide

Khi edit tài liệu:

1. Sử dụng Markdown formatting
2. Giữ structure/table of contents
3. Update links nếu cần
4. Test examples (run code locally)
5. Commit: `docs: update XYZ documentation`

---

## 📝 Version History

- **v1.0** (Jan 2025): Initial documentation
- Created 5 comprehensive guides
- Covers: Setup, Development, API, Examples, Teamwork

---

**Last Updated:** January 2025
**Maintained By:** Nhóm Trưởng
**Status:** 🟢 Active

---

## 🎯 NEXT STEPS

1. **Everyone:** Read QUICKSTART.md (5 min)
2. **Everyone:** Setup project locally
3. **Backend team (A,B,C):** Read CODE_EXAMPLES.md Backend section
4. **Frontend team (Trưởng):** Read CODE_EXAMPLES.md Frontend section
5. **Everyone:** Read TEAM_WORKFLOW.md
6. **Start:** Pick first issue & follow Git Workflow

**Let's build something awesome! 🚀**

