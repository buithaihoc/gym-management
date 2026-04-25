"""
=== FILE SCHEMAS (schemas.py) ===
Tác dụng: Định nghĩa cấu trúc dữ liệu cho API requests/responses (Data Validation)
Tại sao cần: Pydantic tự động kiểm tra dữ liệu đầu vào, chuyển đổi kiểu dữ liệu
Cách dùng: Khi client gửi POST request, FastAPI sẽ kiểm tra theo schema này

Khác nhau:
- models.py: Định nghĩa bảng DATABASE
- schemas.py: Định nghĩa dữ liệu API (JSON)
"""

from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime
from typing import Optional, List
from enum import Enum


# ============================================
# SCHEMAS CHO MEMBER (Thành viên)
# ============================================

class MemberBase(BaseModel):
    """
    Base Schema cho Member - Chứa các trường chung
    Dùng cho cả tạo và cập nhật Member
    """
    name: str = Field(..., min_length=1, max_length=100, description="Tên thành viên")
    email: Optional[str] = Field(None, description="Email (tùy chọn)")
    phone: Optional[str] = Field(None, description="Số điện thoại (tùy chọn)")
    date_of_birth: Optional[date] = Field(None, description="Ngày sinh (tùy chọn)")
    gender: Optional[str] = Field(None, description="Giới tính: Nam hoặc Nữ (tùy chọn)")
    address: Optional[str] = Field(None, description="Địa chỉ (tùy chọn)")


class MemberCreate(MemberBase):
    """Schema để TẠO thành viên mới"""
    pass


class MemberUpdate(BaseModel):
    """Schema để CẬP NHẬT thành viên"""
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None


class MemberResponse(MemberBase):
    """
    Schema trả về từ API khi LẤY thông tin Member
    Bao gồm thêm: id, is_active, created_at, updated_at
    """
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Cho phép convert từ SQLAlchemy Model


# ============================================
# SCHEMAS CHO MEMBERSHIP (Gói tập)
# ============================================

class MembershipTypeEnum(str, Enum):
    """Enum cho các loại gói tập"""
    MONTHLY = "monthly"
    THREE_MONTHS = "three_months"
    YEARLY = "yearly"


class MembershipBase(BaseModel):
    """Base Schema cho Membership"""
    member_id: int = Field(..., description="Mã thành viên")
    type: MembershipTypeEnum = Field(..., description="Loại gói: monthly, three_months, yearly")
    price: float = Field(..., gt=0, description="Giá gói (phải > 0)")
    start_date: date = Field(..., description="Ngày bắt đầu")
    end_date: date = Field(..., description="Ngày kết thúc")


class MembershipCreate(MembershipBase):
    """Schema để TẠO gói tập mới"""
    pass


class MembershipUpdate(BaseModel):
    """Schema để CẬP NHẬT gói tập"""
    type: Optional[MembershipTypeEnum] = None
    price: Optional[float] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_active: Optional[bool] = None


class MembershipResponse(MembershipBase):
    """Schema trả về từ API khi LẤY thông tin Membership"""
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================
# SCHEMAS CHO PAYMENT (Thanh toán)
# ============================================

class PaymentStatusEnum(str, Enum):
    """Enum cho trạng thái thanh toán"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class PaymentBase(BaseModel):
    """Base Schema cho Payment"""
    member_id: int = Field(..., description="Mã thành viên")
    membership_id: Optional[int] = Field(None, description="Mã gói tập (tùy chọn)")
    amount: float = Field(..., gt=0, description="Số tiền (phải > 0)")
    payment_method: str = Field(..., description="Phương thức: cash, bank_transfer, card")
    status: PaymentStatusEnum = Field(default="completed", description="Trạng thái thanh toán")
    note: Optional[str] = Field(None, description="Ghi chú (tùy chọn)")


class PaymentCreate(PaymentBase):
    """Schema để TẠO thanh toán mới"""
    pass


class PaymentUpdate(BaseModel):
    """Schema để CẬP NHẬT thanh toán"""
    status: Optional[PaymentStatusEnum] = None
    note: Optional[str] = None


class PaymentResponse(PaymentBase):
    """Schema trả về từ API khi LẤY thông tin Payment"""
    id: int
    payment_date: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================
# SCHEMAS PHỨC TẠP (Combining multiple models)
# ============================================

class MemberWithMemberships(MemberResponse):
    """Schema Member kèm theo tất cả Memberships của họ"""
    memberships: List[MembershipResponse] = []


class MemberWithPayments(MemberResponse):
    """Schema Member kèm theo tất cả Payments của họ"""
    payments: List[PaymentResponse] = []


class MembershipWithPayments(MembershipResponse):
    """Schema Membership kèm theo tất cả Payments của nó"""
    payments: List[PaymentResponse] = []


# ============================================
# SCHEMA CHO ERROR RESPONSES
# ============================================

class ErrorResponse(BaseModel):
    """Schema cho API Error Response"""
    detail: str = Field(..., description="Mô tả lỗi")
    error_code: Optional[str] = Field(None, description="Mã lỗi")
