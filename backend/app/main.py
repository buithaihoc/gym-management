"""
=== FILE MAIN (main.py) ===
Tác dụng: File chính để chạy ứng dụng FastAPI
Tại sao cần: Nơi khởi tạo app, thêm routers, cấu hình CORS, v.v
Cách chạy: python -m uvicorn app.main:app --reload
           hoặc: uvicorn app.main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

# Import config và database
from app.config import settings
from app.database import engine, Base

# Import routers (API endpoints)
from app.routers import members, memberships, payments

# ============================================
# KHỞI TẠO FASTAPI APP
# ============================================

app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version,
    docs_url="/docs",           # Swagger UI: http://localhost:8000/docs
    redoc_url="/redoc",         # ReDoc: http://localhost:8000/redoc
    openapi_url="/openapi.json" # OpenAPI schema
)

# ============================================
# TẠO TẤT CẢ BẢNG DATABASE
# ============================================
# Nếu các bảng chưa tồn tại trong Database, hãy tạo chúng
Base.metadata.create_all(bind=engine)


# ============================================
# CONFIGURE CORS (CROSS-ORIGIN REQUESTS)
# ============================================
# CORS cho phép Frontend (http://localhost:3000) gọi API
# Nếu không có CORS config, Frontend sẽ bị lỗi "Blocked by CORS"

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,  # Danh sách domains được phép
    allow_credentials=True,                   # Cho phép cookies
    allow_methods=["*"],                      # Cho phép tất cả HTTP methods
    allow_headers=["*"],                      # Cho phép tất cả headers
)


# ============================================
# THÊM CÁC ROUTERS (API GROUPS)
# ============================================
# Mỗi router sẽ thêm các endpoints vào app
# Ví dụ: router members thêm /api/members, /api/members/{id}, v.v

app.include_router(members.router)
app.include_router(memberships.router)
app.include_router(payments.router)

# Ở đây có thể thêm các router khác:
# app.include_router(memberships.router)
# app.include_router(payments.router)


# ============================================
# ROOT ENDPOINT
# ============================================

@app.get(
    "/",
    summary="API Root",
    tags=["Root"],
    description="Endpoint gốc của API - Kiểm tra xem API có hoạt động không"
)
def root():
    """
    Endpoint kiểm tra xem API có hoạt động không
    
    Trả về:
    {
        "message": "Gym Management API đang chạy",
        "docs": "Xem API docs tại /docs"
    }
    """
    return {
        "message": "Gym Management API đang chạy 🎉",
        "docs": "Xem API docs tại /docs",
        "api_version": settings.api_version
    }


@app.get(
    "/health",
    summary="Health Check",
    tags=["Health"],
    description="Kiểm tra xem API và Database có hoạt động không"
)
def health_check():
    """
    Health check endpoint - Dùng để kiểm tra:
    1. API có hoạt động không
    2. Database có kết nối được không
    
    Trả về: {"status": "ok"}
    """
    return {"status": "ok", "message": "API và Database hoạt động bình thường"}


# ============================================
# CUSTOM EXCEPTION HANDLERS
# ============================================

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """
    Xử lý tất cả exception chung
    Trả về error response với định dạng thống nhất
    """
    return {
        "detail": str(exc),
        "error_code": "GENERAL_ERROR"
    }


# ============================================
# STARTUP/SHUTDOWN EVENTS
# ============================================

@app.on_event("startup")
async def startup_event():
    """
    Chạy khi ứng dụng khởi động
    Có thể dùng để kiểm tra kết nối database, load cache, v.v
    """
    print("✅ Ứng dụng FastAPI đã khởi động thành công!")
    print(f"📚 API Docs: http://localhost:8000/docs")


@app.on_event("shutdown")
async def shutdown_event():
    """
    Chạy khi ứng dụng tắt
    Có thể dùng để đóng kết nối database, lưu cache, v.v
    """
    print("❌ Ứng dụng FastAPI đã tắt")


if __name__ == "__main__":
    """
    Chạy ứng dụng bằng:
    python main.py
    
    Hoặc chạy với Uvicorn:
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    """
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
