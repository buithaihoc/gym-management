#!/bin/bash
# ============================================
# SCRIPT KHỞI ĐỘNG HỆ THỐNG GYM MANAGEMENT
# ============================================
# 
# Tác dụng: Tự động chạy các bước chuẩn bị
# Gồm:
# 1. Kích hoạt Virtual Environment
# 2. Cài đặt các thư viện (nếu cần)
# 3. Chạy database migrations
# 4. Khởi động API server
#
# Cách dùng:
#   bash run.sh
#
# Hoặc trên Windows PowerShell:
#   .\run.ps1
#

set -e  # Dừng script nếu có lỗi

echo "=================================================="
echo "🏋️ GYM MANAGEMENT SYSTEM - STARTUP SCRIPT"
echo "=================================================="

# 1. Kiểm tra Python
echo "📦 Kiểm tra Python..."
if ! command -v python &> /dev/null; then
    echo "❌ Python không được cài đặt!"
    exit 1
fi
echo "✅ Python đã cài đặt"

# 2. Kiểm tra Virtual Environment
echo ""
echo "📦 Kiểm tra Virtual Environment..."
if [ ! -d "venv" ]; then
    echo "⚠️  Virtual Environment chưa tồn tại, tạo mới..."
    python -m venv venv
fi
echo "✅ Virtual Environment sẵn sàng"

# 3. Kích hoạt Virtual Environment
echo ""
echo "⚡ Kích hoạt Virtual Environment..."
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "❌ Không thể kích hoạt Virtual Environment"
    exit 1
fi
echo "✅ Virtual Environment đã kích hoạt"

# 4. Cài đặt thư viện
echo ""
echo "📦 Cài đặt các thư viện (requirements)..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt --quiet
    echo "✅ Thư viện đã cài đặt"
else
    echo "⚠️  requirements.txt không tìm thấy"
fi

# 5. Chạy Database Migrations
echo ""
echo "🗄️  Chạy Database Migrations..."
echo "⚠️  Lưu ý: Bạn cần tạo database trước!"
echo "   Câu lệnh: createdb -U postgres gym_management"
echo "   Hoặc chạy: psql -U postgres -f database/schema.sql"

# 6. Khởi động API Server
echo ""
echo "=================================================="
echo "🚀 Khởi động API Server..."
echo "📍 API sẽ chạy tại: http://localhost:8000"
echo "📚 API Docs tại: http://localhost:8000/docs"
echo "=================================================="
echo ""

cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
