# 💻 CODE EXAMPLES - CÁC VÍ DỤ THỰC TẾ

## 🔧 Backend Examples

### ✅ Ví Dụ 1: Tạo API Endpoint GET (Lấy Danh Sách)

**File:** `backend/app/routers/members.py`

```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Member
from app.schemas import MemberResponse
from typing import List

router = APIRouter()

@router.get("/members", response_model=List[MemberResponse])
def get_members(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    is_active: bool = Query(None),
    db: Session = Depends(get_db)
):
    """
    Lấy danh sách thành viên với phân trang
    - skip: Bỏ qua N bản ghi (mặc định: 0)
    - limit: Lấy tối đa N bản ghi (mặc định: 10, tối đa: 100)
    - is_active: (Tùy chọn) Lọc theo trạng thái
    """
    query = db.query(Member)
    
    # Lọc theo is_active nếu được chỉ định
    if is_active is not None:
        query = query.filter(Member.is_active == is_active)
    
    # Phân trang
    members = query.offset(skip).limit(limit).all()
    return members
```

**Test:**
```bash
# Lấy 10 member đầu tiên
curl "http://localhost:8000/api/members"

# Lấy 20 member, bỏ qua 10 cái đầu (trang 2)
curl "http://localhost:8000/api/members?skip=10&limit=20"

# Lấy member hoạt động
curl "http://localhost:8000/api/members?is_active=true"
```

---

### ✅ Ví Dụ 2: Tạo API Endpoint POST (Thêm Mới)

**File:** `backend/app/routers/members.py`

```python
from fastapi import APIRouter, Depends, HTTPException
from app.models import Member
from app.schemas import MemberCreate, MemberResponse
from sqlalchemy.orm import Session

@router.post("/members", response_model=MemberResponse, status_code=201)
def create_member(member: MemberCreate, db: Session = Depends(get_db)):
    """
    Tạo thành viên mới
    
    Required fields:
    - name: Tên thành viên (1-100 ký tự)
    - email: Email (phải là email hợp lệ, không trùng)
    
    Optional fields:
    - phone, gender, date_of_birth, address
    """
    
    # Kiểm tra email đã tồn tại chưa
    existing = db.query(Member).filter(Member.email == member.email).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail=f"Email '{member.email}' đã được sử dụng"
        )
    
    # Tạo member mới từ schema data
    db_member = Member(**member.dict())
    
    # Lưu vào database
    db.add(db_member)
    db.commit()
    db.refresh(db_member)  # Lấy data mới nhất (bao gồm ID tự động)
    
    return db_member
```

**Test:**
```bash
curl -X POST http://localhost:8000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "a@example.com",
    "phone": "0912345678",
    "gender": "Nam"
  }'
```

---

### ✅ Ví Dụ 3: Tạo API Endpoint PUT (Cập Nhật)

**File:** `backend/app/routers/members.py`

```python
@router.put("/members/{member_id}", response_model=MemberResponse)
def update_member(
    member_id: int,
    member_update: MemberUpdate,
    db: Session = Depends(get_db)
):
    """
    Cập nhật thông tin thành viên
    
    - Chỉ cập nhật field được cung cấp (các field khác không đổi)
    - ID không thể thay đổi
    """
    
    # Tìm member
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(
            status_code=404,
            detail=f"Member {member_id} không tồn tại"
        )
    
    # Lấy dữ liệu cần cập nhật (loại bỏ None)
    update_data = member_update.dict(exclude_unset=True)
    
    # Cập nhật từng field
    for field, value in update_data.items():
        setattr(member, field, value)
    
    # Lưu database
    db.commit()
    db.refresh(member)
    
    return member
```

**Test:**
```bash
# Chỉ cập nhật tên
curl -X PUT http://localhost:8000/api/members/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nguyễn Văn B"}'

# Cập nhật nhiều field
curl -X PUT http://localhost:8000/api/members/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn B",
    "phone": "0987654321",
    "address": "TP HCM"
  }'
```

---

### ✅ Ví Dụ 4: Tạo API Endpoint DELETE (Xoá)

**File:** `backend/app/routers/members.py`

```python
@router.delete("/members/{member_id}", status_code=204)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    """
    Xoá một thành viên
    
    Cảnh báo: Xoá member sẽ xoá tất cả gói tập và thanh toán liên quan (cascade)
    """
    
    # Tìm member
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(
            status_code=404,
            detail=f"Member {member_id} không tồn tại"
        )
    
    # Xoá từ database
    db.delete(member)
    db.commit()
    
    # Status 204 = No Content (không trả gì)
    return None
```

**Test:**
```bash
curl -X DELETE http://localhost:8000/api/members/1
```

---

### ✅ Ví Dụ 5: Query Nâng Cao (Filter, Search, Sort)

**File:** `backend/app/routers/members.py`

```python
@router.get("/members/search", response_model=List[MemberResponse])
def search_members(
    name: str = Query(None, description="Tìm kiếm theo tên"),
    email: str = Query(None, description="Tìm kiếm theo email"),
    is_active: bool = Query(None, description="Lọc theo trạng thái"),
    skip: int = Query(0),
    limit: int = Query(10),
    db: Session = Depends(get_db)
):
    """
    Tìm kiếm thành viên với nhiều điều kiện
    """
    query = db.query(Member)
    
    # Filter theo name (LIKE search)
    if name:
        query = query.filter(Member.name.ilike(f"%{name}%"))
    
    # Filter theo email
    if email:
        query = query.filter(Member.email.ilike(f"%{email}%"))
    
    # Filter theo is_active
    if is_active is not None:
        query = query.filter(Member.is_active == is_active)
    
    # Sắp xếp theo tên (A-Z)
    query = query.order_by(Member.name.asc())
    
    # Phân trang
    members = query.offset(skip).limit(limit).all()
    return members
```

**Test:**
```bash
# Tìm member có tên chứa "Nguyễn"
curl "http://localhost:8000/api/members/search?name=Nguyễn"

# Tìm email chứa "gmail"
curl "http://localhost:8000/api/members/search?email=gmail"

# Kết hợp nhiều điều kiện
curl "http://localhost:8000/api/members/search?name=Nguyễn&is_active=true&limit=5"
```

---

### ✅ Ví Dụ 6: Relationship Query (Lấy Member + Memberships)

**File:** `backend/app/routers/members.py`

```python
from sqlalchemy.orm import joinedload

@router.get("/members/{member_id}/full")
def get_member_with_details(member_id: int, db: Session = Depends(get_db)):
    """
    Lấy thông tin member + tất cả gói tập + thanh toán của họ
    """
    member = db.query(Member).filter(Member.id == member_id).first()
    
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # Lấy data kèm relationships (tránh N+1 query)
    memberships = db.query(Membership).filter(
        Membership.member_id == member_id
    ).all()
    
    payments = db.query(Payment).filter(
        Payment.member_id == member_id
    ).all()
    
    return {
        "member": member,
        "memberships": memberships,
        "payments": payments,
        "total_paid": sum(p.amount for p in payments if p.payment_status == "completed")
    }
```

**Response:**
```json
{
  "member": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "a@example.com"
  },
  "memberships": [
    {
      "id": 1,
      "membership_type": "monthly",
      "price": 500000,
      "end_date": "2024-02-15T00:00:00"
    }
  ],
  "payments": [
    {
      "id": 1,
      "amount": 500000,
      "payment_status": "completed"
    }
  ],
  "total_paid": 500000
}
```

---

### ✅ Ví Dụ 7: Validation Error Handling

**File:** `backend/app/schemas.py`

```python
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime

class MemberCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Tên (1-100 ký tự)")
    email: EmailStr = Field(..., description="Email hợp lệ")
    phone: Optional[str] = Field(None, max_length=20, description="Điện thoại")
    gender: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = Field(None, max_length=255, description="Địa chỉ")
    
    @validator('name')
    def name_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Tên không được để trống')
        return v.strip()
    
    @validator('phone')
    def phone_format(cls, v):
        if v:
            # Chỉ cho phép số và dấu +, -, space
            if not all(c.isdigit() or c in '+-() ' for c in v):
                raise ValueError('Định dạng điện thoại không hợp lệ')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Nguyễn Văn A",
                "email": "a@example.com",
                "phone": "0912345678",
                "gender": "Nam",
                "address": "123 Đường ABC"
            }
        }
```

**Test với dữ liệu sai:**
```bash
# Lỗi: Email không hợp lệ
curl -X POST http://localhost:8000/api/members \
  -H "Content-Type: application/json" \
  -d '{"name": "A", "email": "not-email"}'
# Response 422:
# {"detail":[{"loc":["body","email"],"msg":"invalid email format",...}]}

# Lỗi: Tên trống
curl -X POST http://localhost:8000/api/members \
  -H "Content-Type: application/json" \
  -d '{"name": "", "email": "a@example.com"}'
# Response 422: "Tên không được để trống"
```

---

## 🎨 Frontend Examples

### ✅ Ví Dụ 1: Component Lấy Dữ Liệu (useEffect + fetch)

**File:** `frontend/src/pages/MembersPage.jsx`

```javascript
import { useState, useEffect } from 'react'

function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hook: Chạy khi component mount
  useEffect(() => {
    fetchMembers()
  }, []) // Empty dependency = chạy 1 lần khi mount

  // Hàm fetch từ API
  const fetchMembers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:8000/api/members')
      
      // Kiểm tra HTTP status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setMembers(data)
    } catch (error) {
      console.error('Error fetching members:', error)
      setError('Lỗi khi lấy dữ liệu thành viên')
    } finally {
      setLoading(false)
    }
  }

  // Render
  if (loading) return <div>Đang tải...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div>
      <h1>Danh Sách Thành Viên ({members.length})</h1>
      {members.length === 0 ? (
        <p>Chưa có thành viên nào</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.is_active ? '✅ Hoạt động' : '❌ Không hoạt động'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MembersPage
```

---

### ✅ Ví Dụ 2: Form Tạo Mới (Controlled Component)

**File:** `frontend/src/components/MemberForm.jsx`

```javascript
import { useState } from 'react'

function MemberForm({ onSubmit, onCancel }) {
  // State cho mỗi field
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
  })
  
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault() // Ngăn reload page
    
    // Validation đơn giản
    if (!formData.name.trim()) {
      setError('Tên không được để trống')
      return
    }
    if (!formData.email.trim()) {
      setError('Email không được để trống')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Lỗi tạo thành viên')
      }

      const newMember = await response.json()
      alert('Tạo thành viên thành công!')
      onSubmit(newMember) // Callback cho parent component
      resetForm()
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      gender: '',
      address: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h2>Thêm Thành Viên Mới</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <div style={{ marginBottom: '10px' }}>
        <label>Tên: *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên"
          required
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Email: *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập email"
          required
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Điện Thoại:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Nhập số điện thoại"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Giới Tính:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">-- Chọn --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Địa Chỉ:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Nhập địa chỉ"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Đang lưu...' : 'Lưu'}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Hủy
      </button>
    </form>
  )
}

export default MemberForm
```

---

### ✅ Ví Dụ 3: Cập Nhật Dữ Liệu (PUT Request)

**File:** `frontend/src/components/MemberEditor.jsx`

```javascript
import { useState, useEffect } from 'react'

function MemberEditor({ memberId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load member data khi component mount
  useEffect(() => {
    loadMember()
  }, [memberId])

  const loadMember = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/members/${memberId}`)
      const data = await response.json()
      setFormData(data)
    } catch (err) {
      setError('Lỗi khi tải dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:8000/api/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Cập nhật thất bại')

      const updated = await response.json()
      onUpdate(updated)
      alert('Cập nhật thành công!')
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Đang tải...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cập Nhật Thành Viên #{memberId}</h3>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Địa chỉ"
      />

      <button type="submit">Lưu</button>
      <button type="button" onClick={onClose}>Hủy</button>
    </form>
  )
}

export default MemberEditor
```

---

### ✅ Ví Dụ 4: Xoá Dữ Liệu (DELETE Request)

**File:** `frontend/src/components/MemberList.jsx`

```javascript
function MemberList({ members, onDelete, onEdit }) {
  const handleDelete = async (memberId) => {
    if (!window.confirm('Bạn chắc chắn muốn xoá?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/api/members/${memberId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Xoá thất bại')
      }

      alert('Xoá thành công!')
      onDelete(memberId)
    } catch (error) {
      alert('Lỗi xoá: ' + error.message)
    }
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {members.map(member => (
          <tr key={member.id}>
            <td>{member.id}</td>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>
              <button onClick={() => onEdit(member.id)}>Sửa</button>
              <button onClick={() => handleDelete(member.id)}>Xoá</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MemberList
```

---

### ✅ Ví Dụ 5: Routing (Điều hướng Giữa Pages)

**File:** `frontend/src/App.jsx`

```javascript
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MembersPage from './pages/MembersPage'
import MembershipsPage from './pages/MembershipsPage'
import PaymentsPage from './pages/PaymentsPage'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <nav style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
        <Link to="/">Dashboard</Link> |
        <Link to="/members">Thành Viên</Link> |
        <Link to="/memberships">Gói Tập</Link> |
        <Link to="/payments">Thanh Toán</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/memberships" element={<MembershipsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </Router>
  )
}

export default App
```

---

## 🔄 Quy Trình Phát Triển Feature Mới

### Ví Dụ: Thêm Tính Năng "Quản Lý Staff (Nhân Viên)"

#### **Bước 1: Thêm Model** (`backend/app/models.py`)

```python
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime

class Staff(Base):
    __tablename__ = "staffs"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    position = Column(String(50))  # Trainer, Receptionist, Manager
    phone = Column(String(20))
    salary = Column(Float)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

#### **Bước 2: Thêm Schema** (`backend/app/schemas.py`)

```python
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class StaffCreate(BaseModel):
    name: str
    email: EmailStr
    position: str
    phone: Optional[str] = None
    salary: Optional[float] = None

class StaffResponse(StaffCreate):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
```

#### **Bước 3: Thêm Router** (`backend/app/routers/staffs.py`)

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Staff
from app.schemas import StaffCreate, StaffResponse
from typing import List

router = APIRouter()

@router.get("/staffs", response_model=List[StaffResponse])
def get_staffs(db: Session = Depends(get_db)):
    return db.query(Staff).filter(Staff.is_active == True).all()

@router.post("/staffs", response_model=StaffResponse, status_code=201)
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    db_staff = Staff(**staff.dict())
    db.add(db_staff)
    db.commit()
    db.refresh(db_staff)
    return db_staff

@router.put("/staffs/{staff_id}", response_model=StaffResponse)
def update_staff(staff_id: int, staff_update: StaffCreate, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    
    for field, value in staff_update.dict().items():
        setattr(staff, field, value)
    
    db.commit()
    db.refresh(staff)
    return staff

@router.delete("/staffs/{staff_id}", status_code=204)
def delete_staff(staff_id: int, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    
    db.delete(staff)
    db.commit()
    return None
```

#### **Bước 4: Đăng Ký Router** (`backend/app/main.py`)

```python
from app.routers import staffs

# Thêm dòng này:
app.include_router(staffs.router, prefix="/api", tags=["staffs"])
```

#### **Bước 5: Tạo Frontend Page** (`frontend/src/pages/StaffsPage.jsx`)

```javascript
import { useState, useEffect } from 'react'

function StaffsPage() {
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/staffs')
      .then(r => r.json())
      .then(setStaffs)
  }, [])

  const handleDelete = async (staffId) => {
    if (!window.confirm('Xoá?')) return
    await fetch(`http://localhost:8000/api/staffs/${staffId}`, {
      method: 'DELETE'
    })
    setStaffs(staffs.filter(s => s.id !== staffId))
  }

  return (
    <div>
      <h1>Quản Lý Nhân Viên</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Position</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map(staff => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.position}</td>
              <td>
                <button onClick={() => handleDelete(staff.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StaffsPage
```

#### **Bước 6: Thêm Route** (`frontend/src/App.jsx`)

```javascript
import StaffsPage from './pages/StaffsPage'

// Thêm route:
<Route path="/staffs" element={<StaffsPage />} />
```

---

**Done! Bây giờ bạn có API endpoint `/api/staffs` và UI để quản lý nhân viên!** ✨

