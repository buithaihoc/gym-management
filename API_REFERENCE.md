# 📚 API REFERENCE - HƯỚNG DẪN ENDPOINT API

## 📍 Base URL

```
http://localhost:8000/api
```

## 🏥 Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## 👥 MEMBERS ENDPOINTS

### 1. Lấy Danh Sách Thành Viên

```http
GET /members?skip=0&limit=10&is_active=true
```

**Query Parameters:**
- `skip` (int): Bỏ qua N bản ghi (phân trang)
- `limit` (int): Lấy tối đa N bản ghi
- `is_active` (bool, tùy chọn): Lọc theo trạng thái

**Response Success (200):**
```json
[
  {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "a@example.com",
    "phone": "0912345678",
    "gender": "Nam",
    "date_of_birth": "1995-05-15T00:00:00",
    "address": "123 Đường ABC",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00",
    "updated_at": "2024-01-15T10:30:00"
  }
]
```

**Ví dụ curl:**
```bash
curl "http://localhost:8000/api/members?skip=0&limit=10"
```

**Ví dụ React:**
```javascript
useEffect(() => {
  fetch('http://localhost:8000/api/members?skip=0&limit=10')
    .then(r => r.json())
    .then(setMembers)
}, [])
```

---

### 2. Lấy Chi Tiết Một Thành Viên

```http
GET /members/{member_id}
```

**Path Parameters:**
- `member_id` (int): ID của thành viên

**Response Success (200):**
```json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "a@example.com",
  "phone": "0912345678",
  "gender": "Nam",
  "date_of_birth": "1995-05-15T00:00:00",
  "address": "123 Đường ABC",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

**Response Error (404):**
```json
{
  "detail": "Member 999 not found"
}
```

**Ví dụ curl:**
```bash
curl http://localhost:8000/api/members/1
```

---

### 3. Tạo Thành Viên Mới

```http
POST /members
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Trần Thị B",
  "email": "b@example.com",
  "phone": "0987654321",
  "gender": "Nữ",
  "date_of_birth": "2000-03-20",
  "address": "456 Đường XYZ"
}
```

**Required Fields:**
- `name` (string, 1-100 chars)
- `email` (string, valid email format, unique)

**Optional Fields:**
- `phone`, `gender`, `date_of_birth`, `address`

**Response Success (201):**
```json
{
  "id": 2,
  "name": "Trần Thị B",
  "email": "b@example.com",
  "phone": "0987654321",
  "gender": "Nữ",
  "date_of_birth": "2000-03-20T00:00:00",
  "address": "456 Đường XYZ",
  "is_active": true,
  "created_at": "2024-01-16T14:20:00",
  "updated_at": "2024-01-16T14:20:00"
}
```

**Response Error (400):**
```json
{
  "detail": "Email 'b@example.com' already exists"
}
```

**Ví dụ curl:**
```bash
curl -X POST http://localhost:8000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Trần Thị B",
    "email": "b@example.com",
    "phone": "0987654321"
  }'
```

**Ví dụ React:**
```javascript
const handleCreateMember = async (formData) => {
  const response = await fetch('http://localhost:8000/api/members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const newMember = await response.json()
  return newMember
}
```

---

### 4. Cập Nhật Thành Viên

```http
PUT /members/{member_id}
Content-Type: application/json
```

**Path Parameters:**
- `member_id` (int): ID của thành viên

**Request Body (Tất cả optional):**
```json
{
  "name": "Nguyễn Văn A (Updated)",
  "email": "a.updated@example.com",
  "phone": "0912999999",
  "gender": "Nam",
  "date_of_birth": "1995-05-15",
  "address": "789 Đường Mới"
}
```

**Response Success (200):**
```json
{
  "id": 1,
  "name": "Nguyễn Văn A (Updated)",
  "email": "a.updated@example.com",
  "phone": "0912999999",
  "gender": "Nam",
  "date_of_birth": "1995-05-15T00:00:00",
  "address": "789 Đường Mới",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-16T15:45:00"
}
```

**Ví dụ curl:**
```bash
curl -X PUT http://localhost:8000/api/members/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nguyễn Văn A (Updated)"}'
```

---

### 5. Xoá Thành Viên

```http
DELETE /members/{member_id}
```

**Path Parameters:**
- `member_id` (int): ID của thành viên

**Response Success (204):**
```
(No content)
```

**Response Error (404):**
```json
{
  "detail": "Member 999 not found"
}
```

**Ví dụ curl:**
```bash
curl -X DELETE http://localhost:8000/api/members/1
```

**Ví dụ React:**
```javascript
const handleDeleteMember = async (memberId) => {
  if (!window.confirm('Bạn chắc chắn?')) return
  await fetch(`http://localhost:8000/api/members/${memberId}`, {
    method: 'DELETE'
  })
  // Refresh list
  fetchMembers()
}
```

---

## 🎯 MEMBERSHIPS ENDPOINTS

### 1. Lấy Danh Sách Gói Tập

```http
GET /memberships?skip=0&limit=10
```

**Response:**
```json
[
  {
    "id": 1,
    "member_id": 1,
    "membership_type": "monthly",
    "price": 500000,
    "start_date": "2024-01-15T00:00:00",
    "end_date": "2024-02-15T00:00:00",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00"
  }
]
```

---

### 2. Lấy Gói Tập Của Một Thành Viên

```http
GET /memberships?member_id={member_id}
```

**Query Parameters:**
- `member_id` (int): ID thành viên

---

### 3. Tạo Gói Tập Mới

```http
POST /memberships
Content-Type: application/json
```

**Request Body:**
```json
{
  "member_id": 1,
  "membership_type": "monthly",
  "price": 500000
}
```

**Membership Types:**
- `monthly` - 1 tháng
- `quarterly` - 3 tháng
- `yearly` - 1 năm

**Response Success (201):**
```json
{
  "id": 1,
  "member_id": 1,
  "membership_type": "monthly",
  "price": 500000,
  "start_date": "2024-01-15T10:30:00",
  "end_date": "2024-02-15T10:30:00",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00"
}
```

---

### 4. Cập Nhật Gói Tập

```http
PUT /memberships/{membership_id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "membership_type": "quarterly",
  "price": 1200000,
  "is_active": false
}
```

---

### 5. Xoá Gói Tập

```http
DELETE /memberships/{membership_id}
```

**Response Success (204):**
```
(No content)
```

---

## 💰 PAYMENTS ENDPOINTS

### 1. Lấy Danh Sách Thanh Toán

```http
GET /payments?skip=0&limit=10
```

**Response:**
```json
[
  {
    "id": 1,
    "member_id": 1,
    "membership_id": 1,
    "amount": 500000,
    "payment_status": "completed",
    "payment_method": "cash",
    "payment_date": "2024-01-15T10:30:00",
    "note": "Thanh toán gói tháng 1",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

---

### 2. Lấy Thanh Toán Của Một Thành Viên

```http
GET /payments?member_id={member_id}
```

**Query Parameters:**
- `member_id` (int): ID thành viên

---

### 3. Tạo Thanh Toán Mới

```http
POST /payments
Content-Type: application/json
```

**Request Body:**
```json
{
  "member_id": 1,
  "membership_id": 1,
  "amount": 500000,
  "payment_method": "cash",
  "note": "Thanh toán gói tháng 1"
}
```

**Payment Methods:**
- `cash` - Tiền mặt
- `bank_transfer` - Chuyển khoản
- `card` - Thẻ

**Response Success (201):**
```json
{
  "id": 1,
  "member_id": 1,
  "membership_id": 1,
  "amount": 500000,
  "payment_status": "pending",
  "payment_method": "cash",
  "payment_date": "2024-01-15T10:30:00",
  "note": "Thanh toán gói tháng 1",
  "created_at": "2024-01-15T10:30:00"
}
```

---

### 4. Cập Nhật Thanh Toán

```http
PUT /payments/{payment_id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "payment_status": "completed",
  "amount": 550000,
  "note": "Thanh toán tăng thêm"
}
```

**Payment Status:**
- `pending` - Chờ xử lý
- `completed` - Hoàn thành
- `failed` - Thất bại

---

### 5. Xoá Thanh Toán

```http
DELETE /payments/{payment_id}
```

---

## 🔐 Authentication & Authorization

Hiện tại hệ thống **không có authentication** (mọi endpoint đều public).

Để thêm xác thực sau (JWT):
```python
# backend/app/auth.py (sẽ tạo sau)
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def get_current_user(credentials = Depends(security)):
    # Verify JWT token
    pass
```

---

## 📊 HTTP Status Codes

| Code | Ý Nghĩa |
|------|---------|
| `200` | OK - Thành công |
| `201` | Created - Tạo mới thành công |
| `204` | No Content - Thành công (không có response body) |
| `400` | Bad Request - Dữ liệu không hợp lệ |
| `404` | Not Found - Không tìm thấy resource |
| `409` | Conflict - Email/dữ liệu đã tồn tại |
| `422` | Unprocessable Entity - Validation error |
| `500` | Internal Server Error - Lỗi server |

---

## 🧪 Test Endpoints Với Swagger UI

1. Mở http://localhost:8000/docs
2. Xem danh sách tất cả endpoints
3. Click endpoint để xem chi tiết
4. Click "Try it out"
5. Nhập parameters/body
6. Click "Execute"
7. Xem response

---

## 🔗 Relationships (Quan Hệ Giữa Bảng)

```
MEMBERS (1)
    ├─ (1:N) ─→ MEMBERSHIPS (N)
    │             ├─ (1:N) ─→ PAYMENTS (N)
    │
    └─ (1:N) ─→ PAYMENTS (N)

Ý NGHĨA:
- 1 Member có nhiều Memberships (gói tập)
- 1 Member có nhiều Payments (thanh toán)
- 1 Membership có nhiều Payments (thanh toán cho gói)
```

**Query ví dụ:**
```bash
# Lấy member 1 + tất cả gói tập của họ
curl http://localhost:8000/api/members/1
curl "http://localhost:8000/api/memberships?member_id=1"

# Lấy tất cả thanh toán của member 1
curl "http://localhost:8000/api/payments?member_id=1"
```

---

## 🚀 Tips

1. **Luôn kiểm tra response status code** - Biết request có thành công hay không
2. **Dùng Swagger UI khi test** - Dễ hơn curl
3. **Kiểm tra response body** - Đặc biệt error messages
4. **Filter & Pagination** - Dùng `skip`, `limit` cho danh sách lớn
5. **Validate input** - Kiểm tra type, length, format trước khi gửi

---

## 📝 Ghi Chú

- Tất cả timestamps ở format ISO 8601 (VD: `2024-01-15T10:30:00`)
- Response luôn là JSON
- Mỗi endpoint có automatic documentation tại `/docs`
- Database ID là auto-increment

