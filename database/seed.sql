/*
=== SEED DATA CHO DATABASE GYM MANAGEMENT ===

Mô tả: Script chèn dữ liệu mẫu vào database để test
Dùng cho: Development và testing

Dữ liệu mẫu bao gồm:
- 5 thành viên
- 8 gói tập
- 10 khoản thanh toán

Lưu ý:
- Chỉ chạy script này sau khi đã chạy schema.sql
- Nếu cần xoá dữ liệu cũ trước khi chạy, xoá nội dung các bảng

Cách chạy:
- psql -U postgres -d gym_management -f seed.sql
*/

-- ============================================
-- CHÈN DỮ LIỆU MEMBERS (Thành viên)
-- ============================================

INSERT INTO members (name, email, phone, date_of_birth, gender, address, is_active) VALUES
-- Thành viên 1
('Nguyễn Văn A', 'nguyenvana@example.com', '0912345678', '1995-05-15', 'Nam', '123 Đường ABC, TP HCM', TRUE),

-- Thành viên 2
('Trần Thị B', 'tranthib@example.com', '0987654321', '1998-08-22', 'Nữ', '456 Đường DEF, Hà Nội', TRUE),

-- Thành viên 3
('Lê Văn C', 'levanc@example.com', '0901234567', '1992-03-10', 'Nam', '789 Đường GHI, Đà Nẵng', TRUE),

-- Thành viên 4
('Phạm Thị D', 'phamthid@example.com', '0923456789', '2000-11-30', 'Nữ', '321 Đường JKL, TP HCM', TRUE),

-- Thành viên 5
('Hoàng Văn E', 'hoangvane@example.com', '0934567890', '1999-07-18', 'Nam', '654 Đường MNO, Hải Phòng', FALSE);

-- ============================================
-- CHÈN DỮ LIỆU MEMBERSHIPS (Gói tập)
-- ============================================

INSERT INTO memberships (member_id, type, price, start_date, end_date, is_active) VALUES
-- Gói tập của Nguyễn Văn A (member_id = 1)
(1, 'monthly', 500000, '2024-01-01', '2024-02-01', TRUE),
(1, 'monthly', 500000, '2024-02-01', '2024-03-01', FALSE),

-- Gói tập của Trần Thị B (member_id = 2)
(2, 'three_months', 1300000, '2024-01-15', '2024-04-15', TRUE),

-- Gói tập của Lê Văn C (member_id = 3)
(3, 'monthly', 500000, '2024-01-20', '2024-02-20', TRUE),
(3, 'monthly', 500000, '2024-02-20', '2024-03-20', TRUE),

-- Gói tập của Phạm Thị D (member_id = 4)
(4, 'yearly', 5000000, '2024-01-01', '2025-01-01', TRUE),

-- Gói tập của Hoàng Văn E (member_id = 5)
(5, 'monthly', 500000, '2023-12-01', '2024-01-01', FALSE);


-- ============================================
-- CHÈN DỮ LIỆU PAYMENTS (Thanh toán)
-- ============================================

INSERT INTO payments (member_id, membership_id, amount, payment_method, status, payment_date, note) VALUES
-- Thanh toán của Nguyễn Văn A
(1, 1, 500000, 'cash', 'completed', '2024-01-01 09:30:00', 'Thanh toán gói tháng 1'),
(1, 2, 500000, 'bank_transfer', 'completed', '2024-02-01 10:00:00', 'Thanh toán gói tháng 2'),

-- Thanh toán của Trần Thị B
(2, 3, 1300000, 'card', 'completed', '2024-01-15 14:30:00', 'Thanh toán gói 3 tháng'),
(2, NULL, 100000, 'cash', 'completed', '2024-02-10 11:00:00', 'Thanh toán bổ sung'),

-- Thanh toán của Lê Văn C
(3, 4, 500000, 'cash', 'completed', '2024-01-20 08:00:00', 'Thanh toán gói tháng 1'),
(3, 5, 500000, 'bank_transfer', 'completed', '2024-02-20 15:30:00', 'Thanh toán gói tháng 2'),

-- Thanh toán của Phạm Thị D
(4, 6, 5000000, 'card', 'completed', '2024-01-01 10:00:00', 'Thanh toán gói năm'),
(4, NULL, 200000, 'cash', 'pending', '2024-02-15 16:00:00', 'Đặt cọc thêm dịch vụ'),

-- Thanh toán của Hoàng Văn E
(5, 7, 500000, 'cash', 'completed', '2023-12-01 09:00:00', 'Thanh toán gói tháng 12'),
(5, NULL, 150000, 'cash', 'failed', '2024-01-15 11:00:00', 'Thanh toán thêm - thất bại');


-- ============================================
-- HIỂN THỊ THỐNG KÊ DỮ LIỆU (để xác nhận)
-- ============================================

SELECT '=== THỐNG KÊ MEMBERS ===' AS info;
SELECT COUNT(*) AS total_members, 
       SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS active_members
FROM members;

SELECT '=== THỐNG KÊ MEMBERSHIPS ===' AS info;
SELECT COUNT(*) AS total_memberships,
       SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS active_memberships
FROM memberships;

SELECT '=== THỐNG KÊ PAYMENTS ===' AS info;
SELECT COUNT(*) AS total_payments,
       SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_payments,
       SUM(amount) AS total_amount
FROM payments;
