# 🚀 QUICK START - HƯỚNG DẪN NHANH

## 1️⃣ LẦN ĐẦU SETUP (Chỉ cần làm 1 lần)

### A. Database Setup

```bash
# 1. Mở PostgreSQL
psql -U postgres

# 2. Tạo database
CREATE DATABASE gym_management;
\q

# 3. Tạo bảng từ schema
psql -U postgres -d gym_management -f database/schema.sql

# 4. (Tùy chọn) Thêm dữ liệu mẫu
psql -U postgres -d gym_management -f database/seed.sql
```

### B. Backend Setup

```bash
# 1. Tạo virtual environment
python -m venv venv

# 2. Kích hoạt (Windows)
venv\Scripts\activate
# Hoặc Linux/Mac:
source venv/bin/activate

# 3. Cài dependencies
pip install -r requirements.txt

# 4. Cấu hình .env
# Copy backend/.env.example → backend/.env
# Sửa DATABASE_URL nếu cần
```

### C. Frontend Setup

```bash
cd frontend
npm install
cd ..
```

---

## 2️⃣ CHẠY DỰ ÁN HÀNG NGÀY (Mở 2-3 terminal)

### Terminal 1 - Backend:
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Truy cập:
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## 3️⃣ PHÁT TRIỂN FEATURE MỚI

### Backend (Thêm API)

**1. Thêm Model** (`backend/app/models.py`):
```python
class YourModel(Base):
    __tablename__ = "your_table"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    # ... thêm columns
```

**2. Thêm Schema** (`backend/app/schemas.py`):
```python
class YourModelCreate(BaseModel):
    name: str
    # ... thêm fields

class YourModelResponse(YourModelCreate):
    id: int
    class Config:
        from_attributes = True
```

**3. Thêm Router** (`backend/app/routers/your_feature.py`):
```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
router = APIRouter()

@router.get("/your-feature")
def get_all(db: Session = Depends(get_db)):
    return db.query(YourModel).all()
```

**4. Đăng ký Router** (`backend/app/main.py`):
```python
from app.routers import your_feature
app.include_router(your_feature.router, prefix="/api", tags=["your_feature"])
```

### Frontend (Thêm Page)

**1. Tạo Page** (`frontend/src/pages/YourPage.jsx`):
```javascript
import { useState, useEffect } from 'react'

function YourPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/your-feature')
      .then(r => r.json())
      .then(setData)
  }, [])

  return <div>{/* JSX here */}</div>
}

export default YourPage
```

**2. Thêm Route** (`frontend/src/App.jsx`):
```javascript
import YourPage from './pages/YourPage'

// Thêm vào Routes:
<Route path="/your-page" element={<YourPage />} />
```

---

## 4️⃣ GIT & TEAMWORK

```bash
# Update code mới nhất
git pull origin develop

# Tạo branch feature
git checkout -b feature/xyz

# Code, code, code...

# Commit
git add .
git commit -m "feat: add xyz feature"

# Push
git push -u origin feature/xyz

# Tạo Pull Request trên GitHub (nhóm trưởng review + merge)
```

---

## 5️⃣ TEST API NHANH

### Dùng Swagger UI:
- Mở http://localhost:8000/docs
- Click endpoint
- "Try it out"
- Xem response

### Dùng curl:
```bash
# GET
curl http://localhost:8000/api/members

# POST
curl -X POST http://localhost:8000/api/members \
  -H "Content-Type: application/json" \
  -d '{"name":"Nguyễn A","email":"a@example.com"}'
```

---

## 6️⃣ TROUBLESHOOTING

| Lỗi | Giải pháp |
|-----|----------|
| `Connection refused: 5432` | PostgreSQL chưa chạy |
| `ModuleNotFoundError: fastapi` | `pip install -r requirements.txt` |
| `Cannot find module 'react'` | `cd frontend && npm install` |
| `CORS error` | Kiểm tra `ALLOWED_ORIGINS` trong backend/.env |
| `Port 8000 already in use` | `uvicorn ... --port 8001` |

---

**📖 Chi tiết xem: GYM_MANAGEMENT_HANDBOOK.md**

