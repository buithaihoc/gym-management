# ============================================
# SCRIPT KHỞI ĐỘNG HỆ THỐNG GYM MANAGEMENT
# (Cho Windows PowerShell)
# ============================================
#
# Tác dụng: Tự động chạy các bước chuẩn bị trên Windows
# Gồm:
# 1. Kích hoạt Virtual Environment
# 2. Cài đặt các thư viện (nếu cần)
# 3. Khởi động API server
#
# Cách dùng trên PowerShell:
#   .\run.ps1
#
# Nếu bị lỗi "cannot be loaded because running scripts is disabled", chạy:
#   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
#

Write-Host "=================================================="
Write-Host "🏋️ GYM MANAGEMENT SYSTEM - STARTUP SCRIPT" -ForegroundColor Cyan
Write-Host "=================================================="
Write-Host ""

# 1. Kiểm tra Python
Write-Host "📦 Kiểm tra Python..." -ForegroundColor Yellow
if (-Not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python không được cài đặt!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Python đã cài đặt" -ForegroundColor Green
Write-Host ""

# 2. Kiểm tra Virtual Environment
Write-Host "📦 Kiểm tra Virtual Environment..." -ForegroundColor Yellow
if (-Not (Test-Path "venv")) {
    Write-Host "⚠️  Virtual Environment chưa tồn tại, tạo mới..." -ForegroundColor Yellow
    python -m venv venv
}
Write-Host "✅ Virtual Environment sẵn sàng" -ForegroundColor Green
Write-Host ""

# 3. Kích hoạt Virtual Environment
Write-Host "⚡ Kích hoạt Virtual Environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"
Write-Host "✅ Virtual Environment đã kích hoạt" -ForegroundColor Green
Write-Host ""

# 4. Cài đặt thư viện
Write-Host "📦 Cài đặt các thư viện (requirements)..." -ForegroundColor Yellow
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt --quiet
    Write-Host "✅ Thư viện đã cài đặt" -ForegroundColor Green
} else {
    Write-Host "⚠️  requirements.txt không tìm thấy" -ForegroundColor Yellow
}
Write-Host ""

# 5. Chạy Database Migrations
Write-Host "🗄️  Chuẩn bị Database..." -ForegroundColor Yellow
Write-Host "⚠️  Lưu ý: Bạn cần tạo database trước!" -ForegroundColor Yellow
Write-Host "   Câu lệnh: createdb -U postgres gym_management" -ForegroundColor Gray
Write-Host "   Hoặc chạy: psql -U postgres -f database/schema.sql" -ForegroundColor Gray
Write-Host ""

# 6. Khởi động API Server
Write-Host "=================================================="
Write-Host "🚀 Khởi động API Server..." -ForegroundColor Cyan
Write-Host "📍 API sẽ chạy tại: http://localhost:8000" -ForegroundColor Green
Write-Host "📚 API Docs tại: http://localhost:8000/docs" -ForegroundColor Green
Write-Host "=================================================="
Write-Host ""

Set-Location backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
