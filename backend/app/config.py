"""
=== FILE CẤU HÌNH (config.py) ===
Tác dụng: Chứa tất cả các thông số cấu hình của ứng dụng (Database URL, API keys, v.v)
Tại sao cần: Giúp quản lý cấu hình dễ dàng mà không phải sửa code
Cách dùng: from app.config import settings; print(settings.database_url)
"""

from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load biến môi trường từ file .env
load_dotenv()


class Settings(BaseSettings):
    """
    Lớp Settings - Định nghĩa tất cả biến cấu hình của ứng dụng
    Pydantic sẽ tự động đọc từ file .env hoặc biến môi trường
    """
    
    # ===== CẤU HÌNH DATABASE =====
    # DATABASE_URL định dạng: postgresql://user:password@localhost:5432/gym_db
    database_url: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:password@localhost:5432/gym_management"
    )
    
    # ===== CẤU HÌNH API =====
    api_title: str = "Gym Management API"
    api_version: str = "1.0.0"
    api_description: str = "API quản lý phòng gym - Thành viên, Gói tập luyện, Thanh toán"
    
    # ===== CẤU HÌNH CORS (Cho phép Frontend truy cập) =====
    # Danh sách các nguồn được phép gọi API từ Frontend
    allowed_origins: list = [
        "http://localhost:3000",  # Frontend development
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:3000",
    ]
    
    # ===== CẤU HÌNH KHÁC =====
    debug: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    class Config:
        """Cấu hình cho Pydantic Settings"""
        env_file = ".env"
        case_sensitive = False


# Tạo instance settings để dùng trong toàn bộ ứng dụng
settings = Settings()
