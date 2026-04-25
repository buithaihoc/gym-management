# 🪟 SETUP GUIDE - WINDOWS

Hướng dẫn chi tiết cài đặt trên Windows (cho ai không quen command line).

---

## ✅ CHECKLIST TRƯỚC KHI BẮT ĐẦU

Tích vào những cái bạn đã cài:
- [ ] Python 3.9+ (https://www.python.org/downloads/)
- [ ] Node.js 16+ (https://nodejs.org/)
- [ ] PostgreSQL 12+ (https://www.postgresql.org/download/windows/)
- [ ] Git (https://git-scm.com/download/win)
- [ ] VS Code (https://code.visualstudio.com/) - Optional nhưng recommended

---

## 📥 BƯỚC 1: CLONE PROJECT

### Cách 1: Dùng Git (Recommended)

```powershell
# Mở PowerShell (không cần Admin)
# Vào folder muốn clone (hoặc Desktop)

# Clone project
git clone <repository-url>
cd gym-management
```

### Cách 2: Download ZIP

1. Mở GitHub repository
2. Click "Code" → "Download ZIP"
3. Giải nén ZIP
4. Mở PowerShell trong folder gym-management

---

## 🗄️ BƯỚC 2: SETUP DATABASE POSTGRESQL

### Kiểm Tra PostgreSQL Installed

```powershell
psql --version
```

Nếu báo "command not found" → PostgreSQL chưa cài, [download ở đây](https://www.postgresql.org/download/windows/)

### Tạo Database

```powershell
# Mở PostgreSQL (Nếu chưa có, cài từ link trên)
psql -U postgres

# Nhập password (khi install PostgreSQL đã chọn)
# Nếu không nhớ, cài lại PostgreSQL

# Trong PostgreSQL shell (dấu #), gõ:
CREATE DATABASE gym_management;

# Xác nhận
\l

# Thoát
\q
```

**Kết quả mong đợi:**
```
postgres=# CREATE DATABASE
postgres=# \l
                            List of databases
        Name        |  Owner   | Encoding |   Collate    |    Ctype
-------------------+----------+----------+-------------+----------
 gym_management    | postgres | UTF8     | en_US.UTF-8  | en_US.UTF-8
```

### Chạy Database Schema

```powershell
# Vẫn từ folder gym-management
psql -U postgres -d gym_management -f database/schema.sql

# Kiểm tra bảng được tạo
psql -U postgres -d gym_management -c "\dt"
```

**Kết quả:**
```
             List of relations
 Schema |      Name      | Type  |  Owner
--------+----------------+-------+----------
 public | members        | table | postgres
 public | memberships    | table | postgres
 public | payments       | table | postgres
```

### (Tùy chọn) Thêm Dữ Liệu Mẫu

```powershell
psql -U postgres -d gym_management -f database/seed.sql
```

---

## 🐍 BƯỚC 3: SETUP BACKEND (PYTHON)

### 3.1 Kiểm Tra Python

```powershell
python --version
```

Nếu error → [Cài Python](https://www.python.org/downloads/), nhớ tick "Add Python to PATH"

### 3.2 Tạo Virtual Environment

```powershell
# Từ thư mục gym-management root
python -m venv venv

# Kích hoạt Virtual Environment
venv\Scripts\activate

# Nếu thành công, terminal sẽ hiện:
# (venv) C:\...\gym-management>
```

**Troubleshoot:** Nếu báo error về execution policy:
```powershell
# Chạy PowerShell as Admin:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Rồi try lại:
venv\Scripts\activate
```

### 3.3 Cài Python Dependencies

```powershell
# Đảm bảo venv đã active ((venv) ở đầu command)
pip install -r requirements.txt

# Kiểm tra cài xong
pip list | findstr fastapi
# Nếu hiện "fastapi xxx" → OK
```

### 3.4 Setup Environment File

```powershell
# Copy .env.example thành .env
copy backend\.env.example backend\.env

# Mở file để edit (dùng Notepad hoặc VS Code)
notepad backend\.env
```

**Nội dung backend/.env:**
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gym_management

# FastAPI
DEBUG=True
API_PORT=8000

# CORS (cho Frontend)
ALLOWED_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

**Lưu ý:** Thay "postgres" bằng password bạn chọn khi cài PostgreSQL

---

## 📦 BƯỚC 4: SETUP FRONTEND (NODE.JS)

### 4.1 Kiểm Tra Node.js

```powershell
node --version
npm --version
```

Nếu error → [Cài Node.js](https://nodejs.org/), choose LTS version

### 4.2 Cài Frontend Dependencies

```powershell
# Vào thư mục frontend
cd frontend

# Cài npm packages
npm install

# Quay lại root
cd ..
```

---

## 🚀 BƯỚC 5: CHẠY TOÀN BỘ HỆ THỐNG

### Cách 1: Dùng Script (Dễ Nhất)

```powershell
# Từ root folder, chạy:
.\run.ps1

# Nếu báo lỗi execution policy:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\run.ps1
```

**Kết quả:** Sẽ mở 2 terminal, 1 chạy backend, 1 chạy frontend

### Cách 2: Chạy Riêng Từng Phần (Tốt Hơn Để Debug)

**Terminal 1 - Backend:**
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000

# Kết quả:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# INFO:     Application startup complete
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev

# Kết quả:
# VITE v5.0.0  ready in 1234 ms
# ➜  Local:   http://localhost:5173/
```

---

## 🌐 BƯỚC 6: TRUY CẬP HỆ THỐNG

Mở trình duyệt:

| URL | Tác dụng |
|-----|---------|
| http://localhost:5173 | **Frontend** - Giao diện web |
| http://localhost:8000/docs | **Swagger UI** - Test API |
| http://localhost:8000/health | **Health Check** - Backend hoạt động? |
| localhost:5432 | **PostgreSQL** - Database (chạy ẩn) |

---

## 🧪 BƯỚC 7: TEST HỆ THỐNG

### Test Backend

Mở http://localhost:8000/docs

1. Click endpoint "GET /members"
2. Click "Try it out"
3. Click "Execute"
4. Nếu thấy "200" → Backend OK ✅

### Test Frontend

Mở http://localhost:5173

- Nếu thấy trang web → Frontend OK ✅
- Nếu không thấy, mở F12 → Console, xem error

### Test Database

```powershell
# Kiểm tra có data không
psql -U postgres -d gym_management -c "SELECT * FROM members LIMIT 5;"
```

---

## 🔄 LẦN SAU CHẠY LẠI (MỖI LẦN PHÁT TRIỂN)

Không cần cài lại, chỉ:

```powershell
# Terminal 1: Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

Hoặc chạy script:
```powershell
.\run.ps1
```

---

## ❌ TROUBLESHOOTING WINDOWS

### ❌ Error: "psql: command not found"

**Giải pháp:**
- PostgreSQL chưa cài hoặc chưa add vào PATH
- [Download PostgreSQL](https://www.postgresql.org/download/windows/)
- Cài lại, tick "Add to PATH"

### ❌ Error: "python: command not found"

**Giải pháp:**
- [Download Python](https://www.python.org/downloads/)
- Cài lại, **TICK "Add Python to PATH"**
- Restart PowerShell

### ❌ Error: "cannot be loaded because running scripts is disabled"

**Giải pháp:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ❌ Error: "port 8000 already in use"

**Giải pháp:**
```powershell
# Chạy trên port khác
uvicorn app.main:app --reload --port 8001

# Hoặc tìm process chiếm port 8000
netstat -ano | findstr :8000
# Kill process
taskkill /PID <PID> /F
```

### ❌ Error: "ModuleNotFoundError: fastapi"

**Giải pháp:**
```powershell
# Đảm bảo virtual environment active ((venv) ở đầu)
venv\Scripts\activate

# Cài lại
pip install -r requirements.txt
```

### ❌ Error: "CORS error" hoặc "blocked by CORS"

**Giải pháp:**
- Backend phải chạy (port 8000)
- Frontend phải chạy (port 5173)
- Kiểm tra ALLOWED_ORIGINS trong backend/.env

### ❌ Error: "Database does not exist"

**Giải pháp:**
```powershell
psql -U postgres
CREATE DATABASE gym_management;
\q
psql -U postgres -d gym_management -f database/schema.sql
```

### ❌ Error: "Cannot connect to PostgreSQL"

**Giải pháp:**

1. Kiểm tra PostgreSQL chạy:
   - Open "Services" (Win+R → services.msc)
   - Tìm "PostgreSQL"
   - Nếu "Stopped" → Right-click → "Start"

2. Kiểm tra password:
   - Mở psql và nhập password
   - Nếu quên, [reset password](https://www.postgresqltutorial.com/postgresql-reset-password/)

3. Kiểm tra DATABASE_URL trong backend/.env:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/gym_management
   ```

---

## 📝 CHEAT SHEET POWERSHELL

```powershell
# Navigation
cd <folder>              # Vào folder
cd ..                    # Lên 1 level
ls                       # List files
pwd                      # Current folder

# Python
python --version         # Check version
python -m venv venv      # Tạo venv
venv\Scripts\activate    # Kích hoạt venv
pip install <package>   # Cài package
pip list                 # List installed packages

# Node.js
node --version           # Check version
npm install              # Cài dependencies
npm run dev              # Chạy dev server
npm run build            # Build production

# Git
git clone <url>          # Clone repo
git status               # Check status
git add .                # Add changes
git commit -m "message"  # Commit
git push                 # Push lên remote

# Database
psql -U postgres         # Kết nối PostgreSQL
\l                       # List databases
\dt                      # List tables
\q                       # Thoát
```

---

## 🎯 SUMMARY

### Setup 1 lần:
1. Clone project
2. Create database PostgreSQL
3. Run schema.sql
4. Setup Python venv + pip install
5. Setup Node.js + npm install
6. Tạo backend/.env

### Run mỗi lần:
```powershell
# Terminal 1
cd backend && venv\Scripts\activate && uvicorn app.main:app --reload

# Terminal 2
cd frontend && npm run dev
```

### Access:
- Frontend: http://localhost:5173
- API Docs: http://localhost:8000/docs

---

**Xong! Bây giờ đã sẵn sàng phát triển! 🚀**

Nếu gặp lỗi:
1. Đọc phần Troubleshooting
2. Search Google error message
3. Hỏi team trên Slack/Teams

