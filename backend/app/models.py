"""
=== FILE MODELS (models.py) ===
Tác dụng: Định nghĩa cấu trúc của các bảng trong Database
Tại sao cần: SQLAlchemy dùng ORM để tự động tạo bảng và quản lý dữ liệu
Cách dùng: Từ models.Member để truy vấn dữ liệu: Member.query.all()

Chú ý: 
- Mỗi class = 1 bảng trong Database
- Mỗi attribute = 1 cột trong bảng
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

# ============================================
# CLASS MEMBER (Thành viên phòng gym)
# ============================================
class Member(Base):
    """
    Bảng MEMBERS - Lưu thông tin thành viên phòng gym
    
    Các trường:
    - id: Mã thành viên (tự tăng)
    - name: Tên thành viên
    - email: Email (duy nhất - không trùng)
    - phone: Số điện thoại
    - date_of_birth: Ngày sinh
    - gender: Giới tính (Nam/Nữ)
    - address: Địa chỉ
    - is_active: Còn tích cực hay không
    - created_at: Ngày tạo hồ sơ
    - updated_at: Ngày cập nhật lần cuối
    
    Mối quan hệ:
    - Một Member có thể có nhiều Membership (gói tập)
    - Một Member có thể có nhiều Payment (thanh toán)
    """
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=True)
    phone = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(10), nullable=True)  # "Nam", "Nữ"
    address = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Mối quan hệ với các bảng khác
    memberships = relationship("Membership", back_populates="member", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="member", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Member(id={self.id}, name='{self.name}', email='{self.email}')>"


# ============================================
# CLASS MEMBERSHIP (Gói tập luyện)
# ============================================
class MembershipType(str, enum.Enum):
    """Enum cho các loại gói tập"""
    MONTHLY = "monthly"        # Gói tháng (30 ngày)
    THREE_MONTHS = "three_months"  # Gói 3 tháng
    YEARLY = "yearly"          # Gói năm


class Membership(Base):
    """
    Bảng MEMBERSHIPS - Lưu gói tập luyện của thành viên
    
    Các trường:
    - id: Mã gói tập
    - member_id: Mã thành viên (khóa ngoại)
    - type: Loại gói (tháng, 3 tháng, năm)
    - price: Giá gói
    - start_date: Ngày bắt đầu
    - end_date: Ngày kết thúc
    - is_active: Gói còn hoạt động không
    - created_at: Ngày tạo gói
    
    Mối quan hệ:
    - Nhiều Membership thuộc về 1 Member
    - Một Membership có thể có nhiều Payment
    """
    __tablename__ = "memberships"
    
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    type = Column(String(20), nullable=False)  # "monthly", "three_months", "yearly"
    price = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Mối quan hệ với các bảng khác
    member = relationship("Member", back_populates="memberships")
    payments = relationship("Payment", back_populates="membership", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Membership(id={self.id}, member_id={self.member_id}, type='{self.type}')>"


# ============================================
# CLASS PAYMENT (Thanh toán)
# ============================================
class PaymentStatus(str, enum.Enum):
    """Enum cho trạng thái thanh toán"""
    PENDING = "pending"        # Đang chờ
    COMPLETED = "completed"    # Hoàn tất
    FAILED = "failed"          # Thất bại
    CANCELLED = "cancelled"    # Huỷ


class Payment(Base):
    """
    Bảng PAYMENTS - Lưu lịch sử thanh toán
    
    Các trường:
    - id: Mã thanh toán
    - member_id: Mã thành viên
    - membership_id: Mã gói tập
    - amount: Số tiền thanh toán
    - payment_method: Phương thức thanh toán (tiền mặt, chuyển khoản, v.v)
    - status: Trạng thái thanh toán
    - payment_date: Ngày thanh toán
    - created_at: Ngày tạo bản ghi
    
    Mối quan hệ:
    - Nhiều Payment thuộc về 1 Member
    - Nhiều Payment thuộc về 1 Membership
    """
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    membership_id = Column(Integer, ForeignKey("memberships.id"), nullable=True)
    amount = Column(Float, nullable=False)
    payment_method = Column(String(50), nullable=False)  # "cash", "bank_transfer", "card"
    status = Column(String(20), default="completed")  # "pending", "completed", "failed"
    payment_date = Column(DateTime, default=datetime.utcnow)
    note = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Mối quan hệ với các bảng khác
    member = relationship("Member", back_populates="payments")
    membership = relationship("Membership", back_populates="payments")
    
    def __repr__(self):
        return f"<Payment(id={self.id}, member_id={self.member_id}, amount={self.amount})>"
