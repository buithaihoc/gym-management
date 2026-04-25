# 🏋️ Gym Management System

Hệ thống quản lý phòng gym toàn diện - Quản lý thành viên, gói tập luyện và thanh toán

---

## 🎯 **BẮT ĐẦU NGAY** 👇

> ### 👉 **[→ START_HERE.md](START_HERE.md)** ← CLICK ĐỂ BẮT ĐẦU
> **5 phút** để tìm tài liệu phù hợp + Quick cheat sheet

---

## 📚 TÀI LIỆU CHÍNH (10 DOCUMENTS)

### ⭐ **CORE (Bắt buộc đọc)**

| Tài Liệu | Dành cho | Thời gian | Link |
|---------|----------|----------|------|
| **START_HERE.md** | Mới bắt đầu | 5 min | [📍 START HERE](START_HERE.md) |
| **QUICKSTART.md** | Setup nhanh | 5 min | [⚡ Quick Setup](QUICKSTART.md) |
| **GYM_MANAGEMENT_HANDBOOK.md** | Learn chi tiết | 45 min | [📘 Handbook](GYM_MANAGEMENT_HANDBOOK.md) |
| **CODE_EXAMPLES.md** | Lập trình | 30 min | [💻 Examples](CODE_EXAMPLES.md) |
| **API_REFERENCE.md** | API dev | 15 min | [📚 API Ref](API_REFERENCE.md) |

### 📖 **SUPPORTING (Tham khảo khi cần)**

| Tài Liệu | Tác dụng | Link |
|---------|---------|------|
| **TEAM_WORKFLOW.md** | Git & teamwork | [👥 Workflow](TEAM_WORKFLOW.md) |
| **SETUP_WINDOWS.md** | Windows setup chi tiết | [🪟 Windows](SETUP_WINDOWS.md) |
| **PROJECT_OVERVIEW.md** | Project overview | [📊 Overview](PROJECT_OVERVIEW.md) |
| **HANDBOOK_SUMMARY.md** | Tóm tắt & reference | [📋 Summary](HANDBOOK_SUMMARY.md) |
| **DOCUMENTATION_INDEX.md** | Complete index | [📑 Index](DOCUMENTATION_INDEX.md) |

**Total: 150+ KB, 10 documents, 2-3 hours complete learning**

## 📋 Mục lục

- [Tính năng](#tính-năng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Quick Start](#quick-start)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt Chi Tiết](#cài-đặt)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Cấu trúc API](#cấu-trúc-api)
- [Cơ sở dữ liệu](#cơ-sở-dữ-liệu)
- [Khắc phục sự cố](#khắc-phục-sự-cố)
- [Phát triển](#phát-triển)
- [Quy ước](#quy-ước)

---

## ✨ Tính năng

### 👥 Quản lý Thành viên
- ✅ Thêm, sửa, xoá thành viên
- ✅ Quản lý thông tin cá nhân
- ✅ Theo dõi trạng thái hoạt động
- ✅ Tìm kiếm, lọc, phân trang

### 🎯 Quản lý Gói tập
- ✅ Tạo gói tập (tháng, 3 tháng, năm)
- ✅ Theo dõi hạn gói
- ✅ Quản lý giá tiền
- ✅ Kích hoạt/Vô hiệu hóa gói

### 💰 Quản lý Thanh toán
- ✅ Ghi nhận thanh toán
- ✅ Theo dõi trạng thái thanh toán
- ✅ Lịch sử thanh toán
- ✅ Phương thức thanh toán đa dạng (tiền mặt, chuyển khoản, thẻ)

---

## 📁 Cấu trúc dự án

```
gym-management/
│
├── backend/                    # 🔧 Backend API (FastAPI)
│   ├── app/
│   │   ├── __init__.py        # Package marker
│   │   ├── main.py            # ⭐ File chính - Khởi tạo FastAPI app
│   │   ├── database.py        # 🗄️ Cấu hình database connection
│   │   ├── config.py          # ⚙️ Cấu hình ứng dụng
│   │   ├── models.py          # 📊 SQLAlchemy Models (Bảng database)
│   │   ├── schemas.py         # 📝 Pydantic Schemas (API validation)
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── members.py     # 👥 API endpoints cho thành viên
│   │       ├── memberships.py # 🎯 API endpoints cho gói tập
│   │       └── payments.py    # 💰 API endpoints cho thanh toán
│   │
│   ├── .env                    # 🔐 Cấu hình môi trường (GIT IGNORE)
│   ├── .env.example            # 📋 Mẫu .env
│   └── requirements.txt        # 📦 Python dependencies
│
├── database/                   # 🗄️ Database scripts
│   ├── schema.sql             # 📐 Tạo bảng database
│   └── seed.sql               # 🌱 Dữ liệu mẫu
│
├── frontend/                   # 🎨 Frontend (React)
│   ├── src/
│   │   ├── components/        # 🧩 Reusable components
│   │   ├── pages/             # 📄 Page components
│   │   ├── App.jsx            # ⭐ Main React component
│   │   ├── App.css            # Layout styles
│   │   ├── main.jsx           # 🔌 React entry point
│   │   ├── index.html         # 📄 HTML chính
│   │   └── index.css          # 🎨 Global styles
│   └── package.json           # 📦 Frontend dependencies
│
├── run.sh                      # 🚀 Run script (Linux/Mac)
├── run.ps1                     # 🚀 Run script (Windows PowerShell)
│
├── requirements.txt            # 📦 All Python dependencies
└── README.md                   # 📖 File này

```

### 📖 Giải thích từng phần:

| Folder | Tác dụng | Tái dùng |
|--------|---------|---------|
| `backend/app/main.py` | File chính để chạy API | Khởi tạo Flask app, thêm routers |
| `backend/app/database.py` | Kết nối database | `from app.database import get_db` |
| `backend/app/models.py` | Định nghĩa bảng | Tạo bảng mới ở đây |
| `backend/app/schemas.py` | Validate dữ liệu API | Định nghĩa request/response format |
| `backend/app/routers/` | API endpoints | Thêm router mới cho chức năng mới |
| `database/schema.sql` | Tạo bảng | Chạy đầu tiên khi setup database |
| `database/seed.sql` | Dữ liệu mẫu | Chạy để test với dữ liệu giả |
| `frontend/` | Giao diện web | Các page thành viên, gói tập, etc |

---

## 🔧 Yêu cầu hệ thống

### Backend
- Python 3.9+
- PostgreSQL 12+
- pip (Python package manager)

### Frontend
- Node.js 16+
- npm hoặc yarn

### Kiểm tra
```bash
# Kiểm tra Python
python --version

# Kiểm tra Node.js
node --version
npm --version

# Kiểm tra PostgreSQL
psql --version
```

---

## 📥 Cài đặt

### 1️⃣ Clone/Tải dự án
```bash
# Nếu dùng Git
git clone <repository-url>
cd gym-management

# Hoặc: Tải file ZIP và giải nén
```

### 2️⃣ Cài đặt Backend

#### Bước 1: Tạo PostgreSQL Database
```bash
# Kết nối vào PostgreSQL
psql -U postgres

# Tạo database mới
CREATE DATABASE gym_management;

# Thoát
\q
```

#### Bước 2: Chạy Database Schema
```bash
# Tạo bảng từ schema.sql
psql -U postgres -d gym_management -f database/schema.sql

# (Tùy chọn) Chèn dữ liệu mẫu
psql -U postgres -d gym_management -f database/seed.sql
```

#### Bước 3: Cài đặt Python Dependencies
```bash
# Tạo Virtual Environment
python -m venv venv

# Kích hoạt Virtual Environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt
```

#### Bước 4: Cấu hình Environment
```bash
# Copy .env.example thành .env
cp backend/.env.example backend/.env

# Chỉnh sửa backend/.env với thông tin thực tế
# DATABASE_URL=postgresql://postgres:password@localhost:5432/gym_management
```

#### Bước 5: Chạy Backend
```bash
cd backend
uvicorn app.main:app --reload --port 8000

# Hoặc dùng script
cd ..
./run.ps1          # Windows
./run.sh           # Linux/Mac
```

Backend sẽ chạy tại: `http://localhost:8000`

### 3️⃣ Cài đặt Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt Node dependencies
npm install

# Chạy development server
npm run dev

# (Tùy chọn) Build production
npm run build
```

Frontend sẽ chạy tại: `http://localhost:5173` hoặc `http://localhost:3000`

---

## 🚀 Hướng dẫn sử dụng

### Khởi động hệ thống

#### Cách 1: Chạy từng phần (Chi tiết)
```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Cách 2: Dùng Script (Nhanh)
```bash
# Windows
./run.ps1

# Linux/Mac
bash run.sh
```

### 📚 Truy cập API Documentation

Sau khi chạy backend, mở:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

### 🔌 API Endpoints chính

| HTTP | Endpoint | Tác dụng |
|------|----------|---------|
| GET | `/api/members` | Lấy tất cả thành viên |
| POST | `/api/members` | Tạo thành viên mới |
| GET | `/api/members/{id}` | Lấy chi tiết thành viên |
| PUT | `/api/members/{id}` | Cập nhật thành viên |
| DELETE | `/api/members/{id}` | Xoá thành viên |
| GET | `/api/memberships` | Lấy tất cả gói tập |
| POST | `/api/memberships` | Tạo gói tập mới |
| GET | `/api/payments` | Lấy lịch sử thanh toán |
| POST | `/api/payments` | Ghi nhận thanh toán |

---

## 🗄️ Cơ sở dữ liệu

### Sơ đồ mối quan hệ

```
┌─────────────┐
│   MEMBERS   │
│             │
│ - id (PK)   │◄─────┐
│ - name      │      │ 1:N
│ - email     │      │
│ - phone     │      │
│ - ...       │      │
└─────────────┘      │
                     │
        ┌────────────┴────────────┐
        │                         │
┌──────────────────┐     ┌──────────────────┐
│  MEMBERSHIPS     │     │    PAYMENTS      │
│                  │     │                  │
│ - id (PK)        │     │ - id (PK)        │
│ - member_id (FK) │◄────┤ - member_id (FK) │
│ - type           │  1:N│ - membership_id  │
│ - price          │     │ - amount         │
│ - start_date     │     │ - status         │
│ - end_date       │     │ - ...            │
│ - ...            │     │ ...              │
└──────────────────┘     └──────────────────┘
```

### Ví dụ dữ liệu

**MEMBERS (Thành viên)**
```sql
SELECT * FROM members;
-- id | name          | email               | is_active
-- 1  | Nguyễn Văn A  | nguyenvana@...      | true
-- 2  | Trần Thị B    | tranthib@...        | true
```

**MEMBERSHIPS (Gói tập)**
```sql
SELECT * FROM memberships WHERE member_id = 1;
-- id | member_id | type    | price   | start_date | end_date   | is_active
-- 1  | 1         | monthly | 500000  | 2024-01-01 | 2024-02-01 | true
```

**PAYMENTS (Thanh toán)**
```sql
SELECT * FROM payments WHERE member_id = 1;
-- id | member_id | amount  | status    | payment_method
-- 1  | 1         | 500000  | completed | cash
```

---

## 🛠️ Cấu trúc API

### Request/Response Format

#### Request ví dụ - Tạo thành viên mới
```bash
POST /api/members
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0912345678",
  "gender": "Nam",
  "date_of_birth": "1995-05-15",
  "address": "123 Đường ABC, TP HCM"
}
```

#### Response ví dụ - Success (201)
```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0912345678",
  "gender": "Nam",
  "date_of_birth": "1995-05-15",
  "address": "123 Đường ABC, TP HCM",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

#### Response ví dụ - Error (400)
```json
{
  "detail": "Email 'nguyenvana@example.com' đã được sử dụng"
}
```

---

## ❓ Khắc phục sự cố

### ❌ Lỗi: "ModuleNotFoundError: No module named 'fastapi'"
```bash
# Giải pháp:
pip install -r requirements.txt
```

### ❌ Lỗi: "FATAL: role 'postgres' does not exist"
```bash
# Giải pháp: Tạo role postgres
sudo -u postgres createuser -P postgres
```

### ❌ Lỗi: "database 'gym_management' does not exist"
```bash
# Giải pháp:
psql -U postgres -c "CREATE DATABASE gym_management;"
```

### ❌ Lỗi: "Connection refused localhost:5432"
```bash
# Giải pháp: Bắt đầu PostgreSQL service
# Windows: Start PostgreSQL service
# Linux: sudo systemctl start postgresql
# Mac: brew services start postgresql
```

### ❌ Lỗi: "Port 8000 already in use"
```bash
# Giải pháp: Chạy trên port khác
uvicorn app.main:app --reload --port 8001
```

---

## 📚 Tài liệu thêm

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 👨‍💻 Phát triển

### Thêm tính năng mới

1. **Thêm Model** → `backend/app/models.py`
2. **Thêm Schema** → `backend/app/schemas.py`
3. **Thêm Router** → `backend/app/routers/new_feature.py`
4. **Import Router** → `backend/app/main.py`
5. **Tạo Frontend** → `frontend/src/pages/NewFeature.jsx`

### Convention

- **Python**: snake_case (member_id, get_all_members)
- **JavaScript**: camelCase (memberId, getAllMembers)
- **Database**: snake_case (members, payment_date)
- **API Routes**: kebab-case (/api/members, /api/payment-history)

---

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại

---

## 👥 Liên hệ & Support

- 📧 Email: support@example.com
- 📱 Phone: +84 123 456 789
- 💬 Issues: [GitHub Issues](https://github.com/yourusername/gym-management/issues)

---

**Chúc bạn phát triển hệ thống quản lý gym thành công! 🚀**

