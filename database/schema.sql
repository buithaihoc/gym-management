/*
=== SCHEMA DATABASE CHO HỆ THỐNG QUẢN LÝ GYM ===

Mô tả: Script tạo bảng cơ sở dữ liệu cho hệ thống quản lý phòng gym

Các bảng chính:
1. members - Thông tin thành viên
2. memberships - Gói tập luyện
3. payments - Lịch sử thanh toán

Lưu ý:
- Tất cả dữ liệu thời gian đều lưu bằng UTC
- Email và ID là duy nhất (UNIQUE)
- Khoá ngoài (FOREIGN KEY) đảm bảo tính toàn vẹn dữ liệu

Cách chạy:
- psql -U postgres -d gym_management -f schema.sql
- Hoặc: psql -U postgres -f schema.sql tạo database mới
*/

-- ============================================
-- BẢNG MEMBERS (Thành viên)
-- ============================================
-- Lưu thông tin cá nhân của thành viên phòng gym
-- 
-- Các trường:
-- - id: Mã định danh duy nhất (tự tăng)
-- - name: Tên thành viên (bắt buộc)
-- - email: Email duy nhất (tùy chọn)
-- - phone: Số điện thoại (tùy chọn)
-- - date_of_birth: Ngày sinh (tùy chọn)
-- - gender: Giới tính (tùy chọn): 'Nam' hoặc 'Nữ'
-- - address: Địa chỉ (tùy chọn)
-- - is_active: Trạng thái (True = còn tích cực, False = nghỉ)
-- - created_at: Thời gian tạo (tự động)
-- - updated_at: Thời gian cập nhật cuối (tự động)

CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),  -- 'Nam', 'Nữ'
    address VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Index để tăng tốc độ tìm kiếm
    CONSTRAINT email_check CHECK (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Index cho việc tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_name ON members(name);
CREATE INDEX IF NOT EXISTS idx_members_is_active ON members(is_active);


-- ============================================
-- BẢNG MEMBERSHIPS (Gói tập luyện)
-- ============================================
-- Lưu gói tập của mỗi thành viên
-- Một thành viên có thể có nhiều gói (ví dụ: gói cũ, gói mới)
--
-- Các trường:
-- - id: Mã gói tập (tự tăng)
-- - member_id: Mã thành viên (khóa ngoài)
-- - type: Loại gói ('monthly', 'three_months', 'yearly')
-- - price: Giá tiền (VND)
-- - start_date: Ngày bắt đầu
-- - end_date: Ngày kết thúc
-- - is_active: Gói còn hoạt động không
-- - created_at: Thời gian tạo

CREATE TABLE IF NOT EXISTS memberships (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('monthly', 'three_months', 'yearly')),
    price NUMERIC(12, 2) NOT NULL CHECK (price > 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Khóa ngoài: membership.member_id phải tồn tại trong members.id
    CONSTRAINT fk_membership_member FOREIGN KEY (member_id) 
        REFERENCES members(id) ON DELETE CASCADE,
    
    -- Ngày kết thúc phải >= ngày bắt đầu
    CONSTRAINT date_check CHECK (end_date >= start_date)
);

-- Index để tăng tốc độ tìm kiếm
CREATE INDEX IF NOT EXISTS idx_memberships_member_id ON memberships(member_id);
CREATE INDEX IF NOT EXISTS idx_memberships_is_active ON memberships(is_active);


-- ============================================
-- BẢNG PAYMENTS (Thanh toán)
-- ============================================
-- Lưu lịch sử thanh toán của thành viên
-- Một thành viên có thể có nhiều khoản thanh toán
--
-- Các trường:
-- - id: Mã thanh toán (tự tăng)
-- - member_id: Mã thành viên (khóa ngoài)
-- - membership_id: Mã gói tập (khóa ngoài, tùy chọn)
-- - amount: Số tiền thanh toán (VND)
-- - payment_method: Phương thức thanh toán ('cash', 'bank_transfer', 'card')
-- - status: Trạng thái ('pending', 'completed', 'failed', 'cancelled')
-- - payment_date: Ngày thanh toán
-- - note: Ghi chú (tùy chọn)
-- - created_at: Thời gian tạo

CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    membership_id INTEGER,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(50) NOT NULL 
        CHECK (payment_method IN ('cash', 'bank_transfer', 'card')),
    status VARCHAR(20) DEFAULT 'completed' 
        CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Khóa ngoài
    CONSTRAINT fk_payment_member FOREIGN KEY (member_id) 
        REFERENCES members(id) ON DELETE CASCADE,
    CONSTRAINT fk_payment_membership FOREIGN KEY (membership_id) 
        REFERENCES memberships(id) ON DELETE SET NULL
);

-- Index để tăng tốc độ tìm kiếm
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_membership_id ON payments(membership_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);


-- ============================================
-- TRIGGERS (Tự động cập nhật updated_at)
-- ============================================
-- Tự động cập nhật updated_at khi bảng members thay đổi

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


-- ============================================
-- COMMENTS (Giải thích cho Database)
-- ============================================

COMMENT ON TABLE members IS 'Bảng lưu thông tin thành viên phòng gym';
COMMENT ON TABLE memberships IS 'Bảng lưu gói tập luyện của thành viên';
COMMENT ON TABLE payments IS 'Bảng lưu lịch sử thanh toán của thành viên';

COMMENT ON COLUMN members.is_active IS 'True = còn tích cực, False = đã huỷ';
COMMENT ON COLUMN memberships.type IS 'Loại gói: monthly (tháng), three_months (3 tháng), yearly (năm)';
COMMENT ON COLUMN memberships.is_active IS 'True = gói còn hoạt động, False = gói hết hạn';
COMMENT ON COLUMN payments.status IS 'Trạng thái: pending (chờ), completed (hoàn tất), failed (thất bại), cancelled (huỷ)';

