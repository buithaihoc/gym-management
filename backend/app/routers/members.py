"""
=== FILE ROUTER MEMBERS (routers/members.py) ===
Tác dụng: Định nghĩa tất cả API endpoints liên quan đến MEMBERS (thành viên)
Tại sao cần: Chia nhỏ API endpoints để dễ quản lý
Cách dùng: 
- GET /api/members -> Lấy tất cả thành viên
- POST /api/members -> Tạo thành viên mới
- GET /api/members/{id} -> Lấy thông tin thành viên theo ID
- PUT /api/members/{id} -> Cập nhật thành viên
- DELETE /api/members/{id} -> Xoá thành viên

Quy ước:
- GET: Lấy dữ liệu
- POST: Tạo mới
- PUT/PATCH: Cập nhật
- DELETE: Xoá
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas import (
    MemberCreate, 
    MemberUpdate, 
    MemberResponse,
    MemberWithMemberships,
    ErrorResponse
)
from app import models


# Tạo router cho Members API
router = APIRouter(
    prefix="/api/members",
    tags=["Members"],
    responses={404: {"description": "Không tìm thấy thành viên"}}
)


# ============================================
# ENDPOINTS MEMBERS
# ============================================

@router.get(
    "",
    response_model=List[MemberResponse],
    summary="Lấy tất cả thành viên",
    description="Trả về danh sách tất cả thành viên của phòng gym"
)
def get_all_members(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Lấy danh sách tất cả thành viên
    
    Tham số:
    - skip: Bỏ qua N bản ghi (để phân trang)
    - limit: Lấy tối đa N bản ghi (để phân trang)
    
    Ví dụ: /api/members?skip=0&limit=10 -> Lấy 10 thành viên đầu tiên
    """
    members = db.query(models.Member).offset(skip).limit(limit).all()
    return members


@router.get(
    "/{member_id}",
    response_model=MemberWithMemberships,
    summary="Lấy thông tin chi tiết thành viên",
    description="Lấy thông tin 1 thành viên + danh sách gói tập của họ"
)
def get_member(member_id: int, db: Session = Depends(get_db)):
    """
    Lấy thông tin chi tiết của 1 thành viên theo ID
    Bao gồm: Thông tin cá nhân + Danh sách gói tập
    """
    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thành viên với ID: {member_id}"
        )
    
    return member


@router.post(
    "",
    response_model=MemberResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Tạo thành viên mới",
    description="Tạo hồ sơ thành viên mới cho phòng gym"
)
def create_member(member: MemberCreate, db: Session = Depends(get_db)):
    """
    Tạo thành viên mới
    
    Dữ liệu cần gửi (JSON):
    {
        "name": "Nguyễn Văn A",
        "email": "email@example.com",
        "phone": "0912345678",
        "date_of_birth": "2000-01-15",
        "gender": "Nam",
        "address": "123 Đường ABC, Thành phố"
    }
    """
    # Kiểm tra email đã tồn tại chưa (nếu có email)
    if member.email:
        existing_member = db.query(models.Member).filter(
            models.Member.email == member.email
        ).first()
        if existing_member:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Email '{member.email}' đã được sử dụng"
            )
    
    # Tạo thành viên mới
    db_member = models.Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    
    return db_member


@router.put(
    "/{member_id}",
    response_model=MemberResponse,
    summary="Cập nhật thành viên",
    description="Cập nhật thông tin của 1 thành viên"
)
def update_member(
    member_id: int,
    member_update: MemberUpdate,
    db: Session = Depends(get_db)
):
    """
    Cập nhật thông tin thành viên
    
    Dữ liệu có thể gửi (JSON - tất cả tùy chọn):
    {
        "name": "Nguyễn Văn B",
        "phone": "0987654321",
        "is_active": true
    }
    """
    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thành viên với ID: {member_id}"
        )
    
    # Cập nhật chỉ các trường được cung cấp
    for field, value in member_update.dict(exclude_unset=True).items():
        setattr(member, field, value)
    
    db.commit()
    db.refresh(member)
    
    return member


@router.delete(
    "/{member_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Xoá thành viên",
    description="Xoá hoàn toàn hồ sơ thành viên khỏi hệ thống"
)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    """
    Xoá thành viên khỏi hệ thống
    
    Cảnh báo: Hành động này sẽ xoá toàn bộ thông tin thành viên + gói tập + thanh toán
    """
    member = db.query(models.Member).filter(models.Member.id == member_id).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thành viên với ID: {member_id}"
        )
    
    db.delete(member)
    db.commit()
    
    return None
