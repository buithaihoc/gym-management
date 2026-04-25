# 📘 SỔ TAY HƯỚNG DẪN - HỆ THỐNG QUẢN LÝ PHÒNG GYM
## Hướng dẫn Chi Tiết Cho Toàn Bộ Nhóm Phát Triển

---

## 📋 MỤC LỤC
1. [Giới Thiệu Công Nghệ](#giới-thiệu)
2. [Cấu Trúc Dự Án Chi Tiết](#cấu-trúc)
3. [Hướng Dẫn Cài Đặt Toàn Bộ](#cài-đặt)
4. [Cách Chạy Dự Án](#chạy)
5. [Phát Triển Backend](#backend)
6. [Phát Triển Frontend](#frontend)
7. [Làm Việc Với Database](#database)
8. [Quy Trình Git & Teamwork](#git)
9. [Kiểm Thử & Debug](#debug)
10. [Khắc Phục Sự Cố](#sốcó)

---

## 🚀 <a id="giới-thiệu"></a>1. GIỚI THIỆU CÔNG NGHỆ

### Công nghệ sử dụng:

| Phần | Công Nghệ | Tác Dụng | Tại Sao Chọn |
|-----|-----------|---------|------------|
| **Backend** | FastAPI | Web API framework | Nhanh, dễ học, tự động API docs |
| **Frontend** | React + Vite | Giao diện web | Component-based, performant |
| **Database** | PostgreSQL | Cơ sở dữ liệu | Mạnh mẽ, tin cậy, free |
| **Kết nối DB** | SQLAlchemy | ORM (Object-Relational Mapping) | Dễ làm việc với database |
| **Validation** | Pydantic | Kiểm tra data từ API | Tự động validate |

### Cách các phần hoạt động:

```
┌─────────────────────────────────────────────────────────┐
│                    USER (Người Dùng)                    │
│              Mở trình duyệt -> http://...               │
└────────────────────────┬────────────────────────────────┘
                         │ (HTTP Request)
                         ▼
┌─────────────────────────────────────────────────────────┐
│               FRONTEND (React + Vite)                   │
│   - Hiển thị giao diện (pages, components)              │
│   - Xử lý user input (click, submit form)               │
│   - Gửi request đến Backend API                         │
└────────────────────────┬────────────────────────────────┘
                         │ (HTTP POST/GET/PUT/DELETE)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                 BACKEND (FastAPI)                       │
│   - Xử lý HTTP requests                                 │
│   - Kiểm tra data (Pydantic schemas)                    │
│   - Query/Update database qua SQLAlchemy                │
│   - Trả về JSON response                                │
└────────────────────────┬────────────────────────────────┘
                         │ (SQL Query)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              DATABASE (PostgreSQL)                      │
│   - Lưu trữ dữ liệu (members, memberships, payments)    │
│   - Xử lý queries, trả dữ liệu về                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 <a id="cấu-trúc"></a>2. CẤU TRÚC DỰ ÁN CHI TIẾT

```
gym-management/
│
├── 📂 backend/                      # ⭐ Backend API (FastAPI)
│   ├── 📂 app/                      # Thư mục chính chứa code
│   │   ├── __init__.py              # Đánh dấu là Python package
│   │   ├── main.py                  # ⭐⭐⭐ FILE CHÍNH - Khởi tạo app
│   │   ├── config.py                # ⚙️ Cấu hình (constants, settings)
│   │   ├── database.py              # 🔌 Kết nối đến PostgreSQL
│   │   ├── models.py                # 📊 Định nghĩa bảng (Members, Memberships, etc)
│   │   ├── schemas.py               # 📝 Định nghĩa format request/response
│   │   └── 📂 routers/              # 🔀 Các API endpoints
│   │       ├── __init__.py
│   │       ├── members.py           # API cho quản lý thành viên
│   │       ├── memberships.py       # API cho gói tập
│   │       └── payments.py          # API cho thanh toán
│   │
│   ├── .env                         # 🔐 File cấu hình (mật khẩu, URL DB) - GIT IGNORE
│   ├── .env.example                 # 📋 Template .env (commit vào git)
│   ├── requirements.txt             # 📦 Python packages cần cài
│   └── (venv/)                      # Virtual environment (GIT IGNORE)
│
├── 📂 database/                     # 🗄️ Database scripts
│   ├── schema.sql                   # 📐 CREATE TABLE statements
│   └── seed.sql                     # 🌱 Dữ liệu mẫu để test
│
├── 📂 frontend/                     # 🎨 Frontend (React + Vite)
│   ├── 📂 src/
│   │   ├── 📂 components/           # 🧩 Reusable components
│   │   │   ├── Header.jsx           # Header chung
│   │   │   ├── Sidebar.jsx          # Navigation menu
│   │   │   ├── MemberForm.jsx       # Form thêm/sửa thành viên
│   │   │   ├── Table.jsx            # Component hiển thị bảng
│   │   │   └── ...
│   │   │
│   │   ├── 📂 pages/                # 📄 Page components (full page)
│   │   │   ├── MembersPage.jsx      # Trang quản lý thành viên
│   │   │   ├── MembershipsPage.jsx  # Trang quản lý gói tập
│   │   │   ├── PaymentsPage.jsx     # Trang quản lý thanh toán
│   │   │   └── Dashboard.jsx        # Trang chủ
│   │   │
│   │   ├── App.jsx                  # ⭐ Component chính (routes)
│   │   ├── App.css                  # Layout styles chung
│   │   ├── main.jsx                 # 🔌 Entry point (render App)
│   │   ├── index.html               # 📄 HTML file
│   │   └── index.css                # 🎨 Global styles
│   │
│   ├── vite.config.js               # ⚙️ Cấu hình Vite (build tool)
│   └── package.json                 # 📦 Node.js packages + scripts
│
├── run.ps1                          # 🚀 Script chạy trên Windows
├── run.sh                           # 🚀 Script chạy trên Linux/Mac
├── requirements.txt                 # 📦 Python dependencies (tất cả)
└── README.md                        # 📖 Documentation
```

### Giải thích chi tiết từng loại file:

#### **File Python trong Backend**

| File | Tác dụng | Ví dụ |
|------|---------|-------|
| `main.py` | Khởi tạo FastAPI app, đăng ký routers | `app = FastAPI()`, `app.include_router(members_router)` |
| `database.py` | Kết nối PostgreSQL, tạo session | `engine = create_engine(DATABASE_URL)` |
| `models.py` | Định nghĩa bảng (SQLAlchemy ORM) | `class Member(Base):` |
| `schemas.py` | Định nghĩa request/response format | `class MemberCreate(BaseModel):` |
| `routers/*.py` | Định nghĩa API endpoints | `@router.get("/members")` |
| `config.py` | Constants, settings | `DATABASE_URL = "postgresql://..."` |

#### **File SQL trong Database**

| File | Tác dụng | Khi nào chạy |
|------|---------|------------|
| `schema.sql` | Tạo bảng database | Lần đầu setup, sau khi clone |
| `seed.sql` | Chèn dữ liệu mẫu | Khi test, demo |

#### **File JavaScript/React trong Frontend**

| File | Tác dụng | Ví dụ |
|------|---------|-------|
| `App.jsx` | Component chính (route config) | `<Routes>`, `<Route path="/members">` |
| `pages/*.jsx` | Full page components | `function MembersPage() {}` |
| `components/*.jsx` | Reusable components | `function MemberForm() {}` |
| `main.jsx` | Entry point (render App) | `ReactDOM.render(<App />)` |
| `vite.config.js` | Build configuration | Cấu hình port, proxy đến API |
| `package.json` | Dependencies + scripts | `npm run dev`, `npm install` |

---

## 💾 <a id="cài-đặt"></a>3. HƯỚNG DẪN CÀI ĐẶT TOÀN BỘ

### 📋 Yêu cầu tối thiểu:
- **Python 3.9+** (kiểm tra: `python --version`)
- **Node.js 16+** (kiểm tra: `node --version`)
- **PostgreSQL 12+** (kiểm tra: `psql --version`)
- **Git** (kiểm tra: `git --version`)

### 🔧 Bước 1: Chuẩn Bị Môi Trường

#### **Windows:**

```powershell
# Mở PowerShell (Admin) và chạy:
python --version
node --version
psql --version

# Nếu chưa cài PostgreSQL, download từ: https://www.postgresql.org/download/
# Cài đặt với password là "postgres" (hoặc ghi nhớ)
```

#### **Linux/Mac:**

```bash
# Cài đặt PostgreSQL (nếu chưa có)
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# Mac:
brew install postgresql
```

### 🗄️ Bước 2: Tạo Database PostgreSQL

```bash
# Mở PostgreSQL
psql -U postgres

# Trong PostgreSQL shell, chạy:
CREATE DATABASE gym_management;

# Kiểm tra database được tạo
\l

# Thoát
\q
```

**Kết quả mong đợi:**
```
postgres=# \l
                            List of databases
        Name        |  Owner   | Encoding |   Collate    |    Ctype
-------------------+----------+----------+-------------+----------
 gym_management    | postgres | UTF8     | en_US.UTF-8  | en_US.UTF-8
```

### 📐 Bước 3: Tạo Database Schema (Bảng)

```bash
# Từ thư mục gym-management root
cd gym-management

# Chạy schema.sql để tạo bảng
psql -U postgres -d gym_management -f database/schema.sql

# Kiểm tra bảng được tạo
psql -U postgres -d gym_management -c "\dt"
```

**Kết quả mong đợi:**
```
            List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | members    | table | postgres
 public | memberships| table | postgres
 public | payments   | table | postgres
```

### 🌱 Bước 4: Chèn Dữ Liệu Mẫu (Tùy chọn)

```bash
# Chèn dữ liệu mẫu vào database
psql -U postgres -d gym_management -f database/seed.sql

# Kiểm tra dữ liệu
psql -U postgres -d gym_management -c "SELECT * FROM members LIMIT 5;"
```

### 🐍 Bước 5: Cài Đặt Backend (Python)

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

# Kiểm tra cài đặt
pip list | grep -i "fastapi\|sqlalchemy\|uvicorn"
```

**Kết quả mong đợi:**
```
fastapi                    0.136.1
SQLAlchemy                 2.0.49
uvicorn                    0.46.0
```

### ⚙️ Bước 6: Cấu Hình Backend (.env file)

```bash
# Copy template .env
cp backend/.env.example backend/.env

# Mở backend/.env và chỉnh sửa:
# Windows: notepad backend\.env
# Linux/Mac: nano backend/.env

# Nội dung backend/.env:
```

**Mẫu backend/.env:**
```env
# PostgreSQL connection
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gym_management

# FastAPI settings
DEBUG=True
API_PORT=8000

# CORS settings (cho phép frontend kết nối)
ALLOWED_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

**Giải thích:**
- `DATABASE_URL`: Kết nối PostgreSQL (format: `postgresql://user:password@host:port/dbname`)
- `DEBUG=True`: Mode phát triển (tự động reload)
- `ALLOWED_ORIGINS`: Cho phép frontend kết nối (React chạy ở port 5173)

### 📦 Bước 7: Cài Đặt Frontend (Node.js)

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt Node dependencies
npm install

# Kiểm tra cài đặt
npm list react react-dom

# Quay lại root
cd ..
```

**Kết quả mong đợi:**
```
react@18.x.x
react-dom@18.x.x
vite@x.x.x
```

### ✅ Hoàn Thành Setup!

Kiểm tra tất cả:
```bash
# Kiểm tra Python env
python --version

# Kiểm tra FastAPI
python -c "import fastapi; print(fastapi.__version__)"

# Kiểm tra Node
node --version
npm --version

# Kiểm tra React
npm list react -g
```

---

## 🚀 <a id="chạy"></a>4. CÁCH CHẠY DỰ ÁN

### **Cách 1: Chạy Từng Phần (Chi Tiết - Lý Tưởng Cho Học Tập)**

Mở **3 Terminal** riêng biệt:

#### Terminal 1 - Backend:
```bash
# Từ thư mục root
cd backend

# Kích hoạt virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Chạy backend
uvicorn app.main:app --reload --port 8000

# Kết quả:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# INFO:     Application startup complete
```

#### Terminal 2 - Frontend:
```bash
# Từ thư mục root
cd frontend

# Chạy dev server
npm run dev

# Kết quả:
# VITE v5.0.0  ready in 1234 ms
# ➜  Local:   http://localhost:5173/
```

#### Terminal 3 - (Tùy chọn) Kiểm Tra API:
```bash
# Kiểm tra backend đang chạy
curl http://localhost:8000/health

# Kiểm tra API docs
# Mở trình duyệt: http://localhost:8000/docs

# Kiểm tra frontend đang chạy
curl http://localhost:5173
```

### **Cách 2: Chạy Tất Cả Bằng Script (Nhanh)**

#### Windows (PowerShell):
```powershell
# Từ thư mục root
./run.ps1
```

#### Linux/Mac (Bash):
```bash
# Từ thư mục root
bash run.sh
```

**Script sẽ:**
- Kích hoạt virtual environment
- Chạy backend ở port 8000
- Chạy frontend ở port 5173

### 📍 Truy Cập Ứng Dụng:

| Tên | URL | Tác dụng |
|-----|-----|---------|
| **Frontend** | http://localhost:5173 | Giao diện web |
| **API Docs** | http://localhost:8000/docs | Swagger UI (test API) |
| **Health Check** | http://localhost:8000/health | Kiểm tra backend chạy |
| **Database** | localhost:5432 | PostgreSQL (chạy ẩn) |

---

## 💻 <a id="backend"></a>5. PHÁT TRIỂN BACKEND (FastAPI)

### 📊 Cấu Trúc Thư Mục Backend

```
backend/app/
├── main.py           # ⭐ File chính
├── config.py         # Cấu hình
├── database.py       # Kết nối DB
├── models.py         # Bảng (SQLAlchemy ORM)
├── schemas.py        # API formats (Pydantic)
└── routers/
    ├── members.py
    ├── memberships.py
    └── payments.py
```

### 🔍 Chi Tiết Từng File

#### **1. main.py** - File Khởi Tạo FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routers import members, memberships, payments
from app.config import ALLOWED_ORIGINS

# Tạo FastAPI app instance
app = FastAPI(
    title="Gym Management API",
    description="API quản lý phòng gym",
    version="1.0.0"
)

# Tạo bảng nếu chưa tồn tại
Base.metadata.create_all(bind=engine)

# Cấu hình CORS (cho phép frontend kết nối)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký routers
app.include_router(members.router, prefix="/api", tags=["members"])
app.include_router(memberships.router, prefix="/api", tags=["memberships"])
app.include_router(payments.router, prefix="/api", tags=["payments"])

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Gym Management API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

**Giải thích:**
- `FastAPI()`: Tạo ứng dụng FastAPI
- `Base.metadata.create_all()`: Tạo bảng từ models
- `CORSMiddleware`: Cho phép frontend (React) kết nối
- `include_router()`: Đăng ký các endpoint từ routers

#### **2. config.py** - Cấu Hình Ứng Dụng

```python
from dotenv import load_dotenv
import os

# Load từ .env file
load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/gym_management")

# FastAPI settings
DEBUG = os.getenv("DEBUG", True)
API_PORT = int(os.getenv("API_PORT", 8000))

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", ["http://localhost:5173", "http://localhost:3000"])

# App info
APP_NAME = "Gym Management System"
APP_VERSION = "1.0.0"
```

**Giải thích:**
- `load_dotenv()`: Đọc từ `.env` file
- `os.getenv()`: Lấy biến environment (có default nếu không tìm thấy)

#### **3. database.py** - Kết Nối PostgreSQL

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL

# Tạo engine (kết nối đến PostgreSQL)
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Cho SQLite/testing
)

# Tạo session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class cho tất cả models
Base = declarative_base()

# Dependency: Lấy database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**Giải thích:**
- `create_engine()`: Kết nối đến PostgreSQL
- `sessionmaker`: Factory để tạo session
- `Base`: Base class cho models (SQLAlchemy ORM)
- `get_db()`: Dependency injection cho FastAPI endpoints

#### **4. models.py** - Định Nghĩa Bảng (SQLAlchemy ORM)

```python
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum

# ============ MEMBERS (Thành viên) ============
class Member(Base):
    __tablename__ = "members"
    
    # Columns
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    gender = Column(String(10), nullable=True)
    date_of_birth = Column(DateTime, nullable=True)
    address = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    memberships = relationship("Membership", back_populates="member", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="member", cascade="all, delete-orphan")

# ============ MEMBERSHIPS (Gói tập) ============
class MembershipType(str, enum.Enum):
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"

class Membership(Base):
    __tablename__ = "memberships"
    
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False, index=True)
    membership_type = Column(String(50), default="monthly")
    price = Column(Float, nullable=False)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    member = relationship("Member", back_populates="memberships")
    payments = relationship("Payment", back_populates="membership")

# ============ PAYMENTS (Thanh toán) ============
class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class PaymentMethod(str, enum.Enum):
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"
    CARD = "card"

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False, index=True)
    membership_id = Column(Integer, ForeignKey("memberships.id"), nullable=True)
    amount = Column(Float, nullable=False)
    payment_status = Column(String(50), default="pending")
    payment_method = Column(String(50), default="cash")
    payment_date = Column(DateTime, default=datetime.utcnow)
    note = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    member = relationship("Member", back_populates="payments")
    membership = relationship("Membership", back_populates="payments")
```

**Giải thích:**
- `Column()`: Định nghĩa cột trong bảng
- `ForeignKey()`: Tham chiếu đến bảng khác (tạo quan hệ)
- `relationship()`: Kết nối giữa các bảng ở mức Python
- `cascade="all, delete-orphan"`: Xoá thành viên → xoá dữ liệu liên quan

#### **5. schemas.py** - Định Nghĩa API Format (Pydantic)

```python
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List

# ============ MEMBER SCHEMAS ============
class MemberBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = None

class MemberCreate(MemberBase):
    pass

class MemberUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = None

class MemberResponse(MemberBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Cho phép Pydantic đọc từ SQLAlchemy model

# ============ MEMBERSHIP SCHEMAS ============
class MembershipCreate(BaseModel):
    member_id: int
    membership_type: str
    price: float

class MembershipUpdate(BaseModel):
    membership_type: Optional[str] = None
    price: Optional[float] = None
    end_date: Optional[datetime] = None
    is_active: Optional[bool] = None

class MembershipResponse(BaseModel):
    id: int
    member_id: int
    membership_type: str
    price: float
    start_date: datetime
    end_date: datetime
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============ PAYMENT SCHEMAS ============
class PaymentCreate(BaseModel):
    member_id: int
    membership_id: Optional[int] = None
    amount: float
    payment_method: str = "cash"
    note: Optional[str] = None

class PaymentUpdate(BaseModel):
    payment_status: Optional[str] = None
    amount: Optional[float] = None
    note: Optional[str] = None

class PaymentResponse(BaseModel):
    id: int
    member_id: int
    membership_id: Optional[int]
    amount: float
    payment_status: str
    payment_method: str
    payment_date: datetime
    note: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True
```

**Giải thích:**
- `BaseModel`: Base class cho tất cả schemas
- `Field()`: Kiểm tra field (min/max, type, required)
- `Optional[]`: Field không bắt buộc
- `from_attributes=True`: Cho phép chuyển từ SQLAlchemy model sang Pydantic

#### **6. routers/members.py** - API Endpoints Cho Thành Viên

```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Member
from app.schemas import MemberCreate, MemberUpdate, MemberResponse
from typing import List

# Tạo router
router = APIRouter()

# ============ GET - Lấy dữ liệu ============

@router.get("/members", response_model=List[MemberResponse])
def get_members(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    is_active: bool = Query(None),
    db: Session = Depends(get_db)
):
    """Lấy danh sách tất cả thành viên (có phân trang)"""
    query = db.query(Member)
    
    # Lọc theo is_active nếu được chỉ định
    if is_active is not None:
        query = query.filter(Member.is_active == is_active)
    
    # Phân trang
    members = query.offset(skip).limit(limit).all()
    return members

@router.get("/members/{member_id}", response_model=MemberResponse)
def get_member(member_id: int, db: Session = Depends(get_db)):
    """Lấy chi tiết một thành viên"""
    member = db.query(Member).filter(Member.id == member_id).first()
    
    if not member:
        raise HTTPException(status_code=404, detail=f"Member {member_id} not found")
    
    return member

# ============ POST - Tạo mới ============

@router.post("/members", response_model=MemberResponse, status_code=201)
def create_member(member: MemberCreate, db: Session = Depends(get_db)):
    """Tạo thành viên mới"""
    
    # Kiểm tra email đã tồn tại chưa
    existing = db.query(Member).filter(Member.email == member.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Tạo member mới
    db_member = Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    
    return db_member

# ============ PUT - Cập nhật ============

@router.put("/members/{member_id}", response_model=MemberResponse)
def update_member(
    member_id: int,
    member_update: MemberUpdate,
    db: Session = Depends(get_db)
):
    """Cập nhật thông tin thành viên"""
    member = db.query(Member).filter(Member.id == member_id).first()
    
    if not member:
        raise HTTPException(status_code=404, detail=f"Member {member_id} not found")
    
    # Chỉ cập nhật field được cung cấp (loại bỏ None)
    update_data = member_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(member, field, value)
    
    db.commit()
    db.refresh(member)
    
    return member

# ============ DELETE - Xoá ============

@router.delete("/members/{member_id}", status_code=204)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    """Xoá thành viên"""
    member = db.query(Member).filter(Member.id == member_id).first()
    
    if not member:
        raise HTTPException(status_code=404, detail=f"Member {member_id} not found")
    
    db.delete(member)
    db.commit()
    
    return None
```

**Giải thích:**
- `@router.get()`: Endpoint GET
- `response_model`: Kiểu dữ liệu trả về
- `Query()`: Tham số query string (skip, limit)
- `Depends(get_db)`: Inject database session
- `HTTPException`: Lỗi HTTP (404, 400, etc)
- `db.query()`: Truy vấn database
- `db.add()`, `db.commit()`: Lưu vào database

### ✏️ Quy Trình Thêm API Mới

Nếu muốn thêm feature mới (ví dụ: Quản lý Nhân viên):

**1. Thêm Model** (`models.py`):
```python
class Staff(Base):
    __tablename__ = "staffs"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    # ... thêm columns khác
```

**2. Thêm Schema** (`schemas.py`):
```python
class StaffCreate(BaseModel):
    name: str
    # ... thêm fields khác

class StaffResponse(StaffCreate):
    id: int
    # ... thêm fields khác
```

**3. Tạo Router** (`routers/staffs.py`):
```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/staffs")
def get_staffs(db: Session = Depends(get_db)):
    # Logic ở đây
    pass
```

**4. Đăng ký Router** (`main.py`):
```python
from app.routers import staffs
app.include_router(staffs.router, prefix="/api", tags=["staffs"])
```

---

## 🎨 <a id="frontend"></a>6. PHÁT TRIỂN FRONTEND (React + Vite)

### 📊 Cấu Trúc Thư Mục Frontend

```
frontend/src/
├── components/          # 🧩 Reusable components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── MemberForm.jsx
│   ├── Table.jsx
│   └── ...
├── pages/               # 📄 Full page components
│   ├── Dashboard.jsx
│   ├── MembersPage.jsx
│   ├── MembershipsPage.jsx
│   └── PaymentsPage.jsx
├── App.jsx              # ⭐ Main component
├── App.css
├── main.jsx             # 🔌 Entry point
├── index.css
└── index.html
```

### 🔍 Chi Tiết Từng File

#### **1. main.jsx** - Entry Point (Điểm Vào)

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Render App component vào root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Giải thích:**
- `ReactDOM.createRoot()`: Tạo React root
- `<App />`: Render component App vào `<div id="root">` trong HTML

#### **2. index.html** - HTML Chính

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gym Management System</title>
  </head>
  <body>
    <!-- React app sẽ render ở đây -->
    <div id="root"></div>
    <!-- Script sẽ được Vite inject tự động -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### **3. App.jsx** - Component Chính (Routes)

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import MembersPage from './pages/MembersPage'
import MembershipsPage from './pages/MembershipsPage'
import PaymentsPage from './pages/PaymentsPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/memberships" element={<MembershipsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
```

**Giải thích:**
- `<Router>`: Bật React Router
- `<Routes>`: Container cho route definitions
- `<Route>`: Định nghĩa route (path, component)

#### **4. pages/MembersPage.jsx** - Trang Quản Lý Thành Viên

```javascript
import { useState, useEffect } from 'react'
import MemberForm from '../components/MemberForm'
import Table from '../components/Table'

function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Lấy danh sách thành viên khi component mount
  useEffect(() => {
    fetchMembers()
  }, [])

  // Fetch từ API backend
  const fetchMembers = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/members')
      const data = await response.json()
      setMembers(data)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  // Xử lý tạo thành viên mới
  const handleCreateMember = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Tạo thành viên thành công!')
        setShowForm(false)
        fetchMembers() // Refresh danh sách
      } else {
        alert('Lỗi tạo thành viên')
      }
    } catch (error) {
      console.error('Error creating member:', error)
    }
  }

  // Xử lý xoá thành viên
  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Bạn chắc chắn muốn xoá?')) return

    try {
      const response = await fetch(`http://localhost:8000/api/members/${memberId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        alert('Xoá thành công!')
        fetchMembers() // Refresh danh sách
      }
    } catch (error) {
      console.error('Error deleting member:', error)
    }
  }

  return (
    <div className="page">
      <h1>Quản Lý Thành Viên</h1>
      
      <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
        {showForm ? 'Đóng Form' : '+ Thêm Thành Viên'}
      </button>

      {showForm && (
        <MemberForm onSubmit={handleCreateMember} />
      )}

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <Table
          columns={['ID', 'Tên', 'Email', 'Phone', 'Trạng Thái']}
          data={members.map(m => ({
            ID: m.id,
            'Tên': m.name,
            'Email': m.email,
            'Phone': m.phone,
            'Trạng Thái': m.is_active ? '✅ Hoạt động' : '❌ Không hoạt động'
          }))}
          onDelete={(id) => handleDeleteMember(id)}
        />
      )}
    </div>
  )
}

export default MembersPage
```

**Giải thích:**
- `useState()`: Tạo state (members, loading)
- `useEffect()`: Hook để chạy effect khi component mount
- `fetch()`: Gọi API từ backend
- `async/await`: Xử lý promise (HTTP request)
- `.json()`: Chuyển response thành JSON

#### **5. components/MemberForm.jsx** - Form Thêm/Sửa Thành Viên

```javascript
import { useState } from 'react'

function MemberForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    gender: initialData.gender || '',
    address: initialData.address || '',
  })

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Tên: *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email: *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Điện Thoại:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Giới Tính:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">-- Chọn --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="address">Địa Chỉ:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Lưu</button>
    </form>
  )
}

export default MemberForm
```

**Giải thích:**
- `e.preventDefault()`: Ngăn form submit mặc định
- `onChange`: Cập nhật state khi input thay đổi
- `required`: HTML5 validation

#### **6. components/Table.jsx** - Component Bảng Tái Dùng

```javascript
function Table({ columns, data, onDelete }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col}>{row[col]}</td>
              ))}
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(row.ID)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
```

### 🛠️ Cài Đặt Thêm Thư Viện React Phổ Biến

```bash
cd frontend

# Router (điều hướng giữa pages)
npm install react-router-dom

# HTTP client (gọi API)
npm install axios

# UI library (buttons, modals, etc)
npm install bootstrap
# Hoặc:
npm install tailwindcss

# State management (nếu cần, sau này)
npm install zustand
# Hoặc:
npm install redux @reduxjs/toolkit react-redux
```

### ✏️ Quy Trình Thêm Tính Năng Mới trong React

1. **Tạo Page** (`pages/NewFeaturePage.jsx`):
   - State management
   - Fetch API
   - Render UI

2. **Tạo Components** (`components/`):
   - Form, Table, Modal, etc
   - Reusable, props-driven

3. **Thêm Route** (`App.jsx`):
   - `<Route path="/new-feature" element={<NewFeaturePage />} />`

4. **Thêm Navigation** (`components/Sidebar.jsx`):
   - Link tới trang mới

---

## 🗄️ <a id="database"></a>7. LÀM VIỆC VỚI DATABASE

### 📊 Sơ Đồ Mối Quan Hệ

```
MEMBERS (Thành viên)
├── id (PK)
├── name
├── email (unique)
├── phone
├── is_active
└── timestamps

    ↓ 1:N relationship

MEMBERSHIPS (Gói tập)
├── id (PK)
├── member_id (FK → members.id)
├── type (monthly, quarterly, yearly)
├── price
├── start_date
├── end_date
└── is_active

    ↓ 1:N relationship

PAYMENTS (Thanh toán)
├── id (PK)
├── member_id (FK → members.id)
├── membership_id (FK)
├── amount
├── status (pending, completed, failed)
└── payment_method (cash, transfer, card)
```

### 💾 Các Thao Tác SQL Thường Dùng

#### **Xem dữ liệu:**
```bash
# Kết nối database
psql -U postgres -d gym_management

# Các command hữu ích:
\dt                              # Liệt kê bảng
\d members                       # Mô tả bảng members
SELECT * FROM members;           # Xem tất cả thành viên
SELECT COUNT(*) FROM members;    # Đếm số thành viên
```

#### **Thêm dữ liệu mẫu:**
```sql
-- Thêm thành viên
INSERT INTO members (name, email, phone, gender) VALUES
  ('Nguyễn Văn A', 'a@example.com', '0912345678', 'Nam'),
  ('Trần Thị B', 'b@example.com', '0987654321', 'Nữ');

-- Thêm gói tập cho thành viên id=1
INSERT INTO memberships (member_id, type, price, start_date, end_date) VALUES
  (1, 'monthly', 500000, NOW(), NOW() + INTERVAL '1 month');

-- Thêm thanh toán
INSERT INTO payments (member_id, membership_id, amount, payment_method) VALUES
  (1, 1, 500000, 'cash');
```

#### **Truy vấn nâng cao:**
```sql
-- Lấy thành viên + gói tập của họ
SELECT m.name, m.email, mb.type, mb.price, mb.end_date
FROM members m
LEFT JOIN memberships mb ON m.id = mb.member_id
WHERE m.is_active = true;

-- Tổng doanh thu từ thanh toán
SELECT SUM(amount) as total_revenue FROM payments WHERE payment_status = 'completed';

-- Gói tập hết hạn
SELECT m.name, mb.type, mb.end_date
FROM memberships mb
JOIN members m ON mb.member_id = m.id
WHERE mb.end_date < NOW();
```

### 📝 Cập Nhật Schema Khi Thay Đổi Model

Nếu thêm column mới trong model SQLAlchemy:

**1. Cách Thủ Công (Nhanh):**
```sql
-- Cập nhật trực tiếp
ALTER TABLE members ADD COLUMN address TEXT;
ALTER TABLE members ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
```

**2. Cách Chuyên Nghiệp (Dùng Alembic - later):**
```bash
# Alembic là tool quản lý database migrations
# Setup:
pip install alembic
alembic init migrations

# Tạo migration mới:
alembic revision --autogenerate -m "Add address column"

# Áp dụng migration:
alembic upgrade head
```

---

## 🔀 <a id="git"></a>8. QUY TRÌNH GIT & TEAMWORK

### 📌 Cấu Trúc Branch

```
main (production-ready)
  ↑
  └── develop (integration branch)
        ↑
        ├── feature/members (A làm)
        ├── feature/memberships (B làm)
        ├── feature/payments (C làm)
        └── feature/dashboard (D làm)
```

### 🔄 Quy Trình Làm Việc (Chia Công Việc)

#### **Nhóm Trưởng (Setup):**

```bash
# 1. Tạo repository trên GitHub
# 2. Clone về máy
git clone <repo-url>
cd gym-management

# 3. Tạo branch develop
git checkout -b develop
git push -u origin develop

# 4. Báo cho team biết
# "Các bạn checkout branch develop để bắt đầu"
```

#### **Mỗi Thành Viên (Phát Triển Feature):**

```bash
# 1. Update code mới nhất
git pull origin develop

# 2. Tạo branch riêng cho feature
# Ví dụ: A làm members
git checkout -b feature/members

# 3. Code, code, code...
# (thay đổi file)

# 4. Commit thay đổi
git add .
git commit -m "Add members CRUD endpoints"
# Hoặc chi tiết hơn:
git commit -m "feat: add create/update/delete endpoints for members"

# 5. Push lên remote
git push -u origin feature/members

# 6. Tạo Pull Request (PR) trên GitHub
# (Nhóm trưởng review + merge vào develop)
```

### 📝 Quy Ước Commit Message

```
# Format:
<type>: <short description>

# Ví dụ:
feat: add member creation API endpoint
fix: fix database connection error
docs: update README with setup instructions
refactor: simplify payment calculation logic
test: add tests for member validation

# Types:
feat    - Tính năng mới
fix     - Sửa bug
docs    - Cập nhật documentation
style   - Formatting, style (không ảnh hưởng logic)
refactor - Refactor code
test    - Thêm/cập nhật tests
chore   - Dependency updates, config
```

### 🤝 Quy Trình Pull Request (Nhóm Trưởng)

```bash
# Khi thành viên gửi PR, nhóm trưởng:

# 1. Checkout PR branch
git fetch origin feature/members
git checkout feature/members

# 2. Test code
npm run test
# hoặc test thủ công

# 3. Review code
# (kiểm tra logic, style)

# 4. Nếu OK, merge vào develop
git checkout develop
git pull origin develop
git merge feature/members
git push origin develop

# 5. Xoá branch cũ (optional)
git branch -d feature/members
git push origin --delete feature/members
```

### ⚠️ Xử Lý Conflict

Nếu 2 người sửa cùng file:

```bash
# 1. Update latest develop
git pull origin develop

# 2. Git sẽ báo conflict
# 3. Mở file conflict, xoá markers:
<<<<<<< HEAD
my changes
=======
their changes
>>>>>>> feature/members

# 4. Giữ lại code đúng, xoá markers
# 5. Commit
git add .
git commit -m "Resolve merge conflict"
git push
```

### 📊 Chia Công Việc (4 Người)

| Người | Công Việc | Branch | Deadline |
|-------|-----------|--------|----------|
| **A** | Backend: Members API | `feature/members` | - |
| **B** | Backend: Memberships API | `feature/memberships` | - |
| **C** | Backend: Payments API | `feature/payments` | - |
| **Nhóm Trưởng (D)** | Frontend: Setup + Dashboard | `feature/dashboard` | - |

---

## 🔍 <a id="debug"></a>9. KIỂM THỬ & DEBUG

### 🧪 Kiểm Tra Backend

#### **Sử dụng Swagger UI:**
```
Mở: http://localhost:8000/docs

- Click endpoint
- Nhập parameters
- Click "Try it out"
- Xem response
```

#### **Sử dụng curl (terminal):**
```bash
# GET
curl http://localhost:8000/api/members

# GET with query params
curl "http://localhost:8000/api/members?skip=0&limit=10"

# POST
curl -X POST http://localhost:8000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "a@example.com",
    "phone": "0912345678"
  }'

# PUT
curl -X PUT http://localhost:8000/api/members/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nguyễn Văn B"}'

# DELETE
curl -X DELETE http://localhost:8000/api/members/1
```

#### **Debug FastAPI:**
```python
# Thêm print để debug
@router.get("/members")
def get_members(db: Session = Depends(get_db)):
    print("DEBUG: Fetching members...")  # ← Thêm dòng này
    members = db.query(Member).all()
    print(f"DEBUG: Found {len(members)} members")  # ← Và dòng này
    return members

# Xem terminal backend, sẽ hiện "DEBUG: ..."
```

### 🎨 Kiểm Tra Frontend

#### **Sử dụng Console Browser:**
```javascript
// Mở: http://localhost:5173
// Nhấn F12 → Console

// Test fetch:
fetch('http://localhost:8000/api/members')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(e => console.error(e))
```

#### **Debug React Components:**
```bash
# Cài React DevTools extension
# Chrome: https://chrome.google.com/webstore/search/React%20Developer%20Tools

# Inspect element
# F12 → Components tab → Xem state, props
```

#### **Console Log Debugging:**
```javascript
function MembersPage() {
  const [members, setMembers] = useState([])
  
  useEffect(() => {
    console.log('DEBUG: Component mounted')  // ← Sẽ hiện khi component mount
    fetchMembers()
  }, [])
  
  const fetchMembers = async () => {
    console.log('DEBUG: Fetching from API...')
    try {
      const response = await fetch('http://localhost:8000/api/members')
      const data = await response.json()
      console.log('DEBUG: Received data:', data)  // ← Xem dữ liệu nhận được
      setMembers(data)
    } catch (error) {
      console.error('DEBUG: Error:', error)  // ← Xem lỗi
    }
  }
  
  return (
    // JSX here
  )
}
```

### 📊 Kiểm Tra Database

```bash
# Kết nối database
psql -U postgres -d gym_management

# Xem data
SELECT * FROM members;
SELECT * FROM memberships;
SELECT * FROM payments;

# Đếm bản ghi
SELECT COUNT(*) FROM members;

# Xem queries gần đây
# (PostgreSQL logs)
```

### ⚡ Các Lỗi Phổ Biến

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-----------|----------|
| `Connection refused: localhost:5432` | PostgreSQL chưa chạy | `sudo systemctl start postgresql` |
| `ModuleNotFoundError: fastapi` | Chưa cài dependencies | `pip install -r requirements.txt` |
| `localhost:8000 refused connection` | Backend chưa chạy | Chạy `uvicorn app.main:app --reload` |
| `Cannot GET /api/members` | Route không đăng ký | Kiểm tra `include_router` trong main.py |
| `CORS error` | Frontend kết nối bị chặn | Kiểm tra `ALLOWED_ORIGINS` trong config.py |
| `Cannot find module 'react'` | Node packages chưa cài | `cd frontend && npm install` |
| `Database does not exist` | Database chưa tạo | `psql -U postgres -c "CREATE DATABASE gym_management;"` |

---

## ❌ <a id="sốcó"></a>10. KHẮC PHỤC SỰ CỐ

### 🔴 Backend không chạy

**Triệu chứng:** Error `ModuleNotFoundError` hoặc port 8000 refused

**Giải pháp:**
```bash
# 1. Kích hoạt virtual environment
cd backend
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 2. Cài dependencies
pip install -r requirements.txt

# 3. Kiểm tra .env
cat .env
# Đảm bảo DATABASE_URL đúng

# 4. Chạy backend
uvicorn app.main:app --reload --port 8000

# 5. Test
curl http://localhost:8000/health
```

### 🔴 Database connection error

**Triệu chứng:** `FATAL: role 'postgres' does not exist`

**Giải pháp:**
```bash
# 1. Kiểm tra PostgreSQL chạy
sudo systemctl status postgresql  # Linux
# Hoặc check Services trên Windows

# 2. Kiểm tra password
psql -U postgres

# 3. Nếu role không tồn tại, tạo:
sudo -u postgres createuser -P postgres
# Password: postgres

# 4. Tạo database
sudo -u postgres createdb -O postgres gym_management

# 5. Chạy schema
psql -U postgres -d gym_management -f database/schema.sql
```

### 🔴 Frontend không load

**Triệu chứng:** Blank page hoặc error console

**Giải pháp:**
```bash
# 1. Cài dependencies
cd frontend
npm install

# 2. Xoá node_modules cache
rm -rf node_modules package-lock.json
npm install

# 3. Chạy dev server
npm run dev

# 4. Mở http://localhost:5173

# 5. Kiểm tra console (F12)
# Xem có error gì
```

### 🔴 CORS Error

**Triệu chứng:** Browser console: `Access-Control-Allow-Origin header`

**Giải pháp:**
```python
# backend/app/main.py - kiểm tra CORS config
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # ← Đảm bảo đúng
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 🔴 Lỗi Data Validation

**Triệu chứng:** API trả về `422 Unprocessable Entity`

**Giải pháp:**
```bash
# 1. Kiểm tra request format
# Đảm bảo JSON đúng format

# 2. Kiểm tra schema
# Xem pydantic schema định nghĩa gì

# 3. Test với Swagger
# http://localhost:8000/docs
# Dùng UI để test

# 4. Log error
# Xem backend console có lỗi gì
```

---

## 📚 TÓM TẮT NHANH

### ⚡ Startup Nhanh

```bash
# Terminal 1
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2
cd frontend
npm run dev

# Browser
# Frontend: http://localhost:5173
# API Docs: http://localhost:8000/docs
```

### 📂 Folder Nào Để Làm Gì?

- **Thêm API endpoint** → `backend/app/routers/`
- **Thêm Model bảng** → `backend/app/models.py`
- **Thêm validation** → `backend/app/schemas.py`
- **Thêm page React** → `frontend/src/pages/`
- **Thêm component React** → `frontend/src/components/`
- **Cấu hình** → `backend/.env`

### 🔑 Lệnh Hay Dùng

```bash
# Backend
pip install -r requirements.txt          # Cài dependencies
uvicorn app.main:app --reload --port 8000  # Chạy
python -c "import fastapi; print(fastapi.__version__)"  # Check version

# Frontend
npm install                              # Cài dependencies
npm run dev                              # Chạy dev server
npm run build                            # Build production

# Database
psql -U postgres -d gym_management -f database/schema.sql  # Setup
psql -U postgres -d gym_management -c "SELECT * FROM members;"  # Query

# Git
git checkout -b feature/xyz              # Tạo branch mới
git add .                                # Chuẩn bị commit
git commit -m "desc"                     # Commit
git push -u origin feature/xyz           # Push lên
git pull origin develop                  # Cập nhật từ develop
```

---

## 🎯 CHECKLIST SETUP LẦN ĐẦU

- [ ] Clone repository
- [ ] Cài đặt Python 3.9+, Node 16+, PostgreSQL 12+
- [ ] Tạo database PostgreSQL
- [ ] Chạy schema.sql
- [ ] Tạo virtual environment Python
- [ ] Cài backend dependencies (`pip install -r requirements.txt`)
- [ ] Tạo backend/.env file
- [ ] Cài frontend dependencies (`npm install`)
- [ ] Chạy backend (uvicorn)
- [ ] Chạy frontend (npm run dev)
- [ ] Test API (http://localhost:8000/docs)
- [ ] Test Frontend (http://localhost:5173)
- [ ] Tạo branch develop
- [ ] Chia công việc cho team

---

**Chúc mọi người phát triển hệ thống thành công! 🚀**

Để có thêm giúp đỡ, hãy liên hệ nhóm trưởng hoặc tham khảo README.md chính.
