"""
=== FILE ROUTER MEMBERSHIPS (routers/memberships.py) ===
Tác dụng: Định nghĩa tất cả API endpoints liên quan đến MEMBERSHIPS (gói tập)
Tại sao cần: Quản lý gói tập luyện của thành viên
Cách dùng:
- GET /api/memberships -> Lấy tất cả gói tập
- POST /api/memberships -> Tạo gói tập mới
- GET /api/memberships/{id} -> Lấy thông tin gói tập
- PUT /api/memberships/{id} -> Cập nhật gói tập
- DELETE /api/memberships/{id} -> Xoá gói tập
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.database import get_db
from app.schemas import (
    MembershipCreate,
    MembershipUpdate,
    MembershipResponse,
    MembershipWithPayments
)
from app import models


# Tạo router cho Memberships API
router = APIRouter(
    prefix="/api/memberships",
    tags=["Memberships"],
    responses={404: {"description": "Không tìm thấy gói tập"}}
)


# ============================================
# ENDPOINTS MEMBERSHIPS
# ============================================

@router.get(
    "",
    response_model=List[MembershipResponse],
    summary="Lấy tất cả gói tập",
    description="Trả về danh sách tất cả gói tập của tất cả thành viên"
)
def get_all_memberships(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Lấy danh sách tất cả gói tập"""
    memberships = db.query(models.Membership).offset(skip).limit(limit).all()
    return memberships


@router.get(
    "/{membership_id}",
    response_model=MembershipWithPayments,
    summary="Lấy thông tin gói tập",
    description="Lấy chi tiết 1 gói tập + danh sách thanh toán"
)
def get_membership(membership_id: int, db: Session = Depends(get_db)):
    """Lấy thông tin chi tiết gói tập"""
    membership = db.query(models.Membership).filter(
        models.Membership.id == membership_id
    ).first()
    
    if not membership:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy gói tập với ID: {membership_id}"
        )
    
    return membership


@router.get(
    "/member/{member_id}",
    response_model=List[MembershipResponse],
    summary="Lấy tất cả gói tập của 1 thành viên",
    description="Lấy danh sách gói tập của 1 thành viên theo ID"
)
def get_member_memberships(member_id: int, db: Session = Depends(get_db)):
    """Lấy tất cả gói tập của 1 thành viên"""
    memberships = db.query(models.Membership).filter(
        models.Membership.member_id == member_id
    ).all()
    
    return memberships


@router.post(
    "",
    response_model=MembershipResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Tạo gói tập mới",
    description="Tạo gói tập mới cho thành viên"
)
def create_membership(membership: MembershipCreate, db: Session = Depends(get_db)):
    """
    Tạo gói tập mới
    
    Dữ liệu cần gửi (JSON):
    {
        "member_id": 1,
        "type": "monthly",
        "price": 500000,
        "start_date": "2024-01-15",
        "end_date": "2024-02-15"
    }
    """
    # Kiểm tra thành viên tồn tại
    member = db.query(models.Member).filter(
        models.Member.id == membership.member_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thành viên với ID: {membership.member_id}"
        )
    
    # Tạo gói tập
    db_membership = models.Membership(**membership.dict())
    db.add(db_membership)
    db.commit()
    db.refresh(db_membership)
    
    return db_membership


@router.put(
    "/{membership_id}",
    response_model=MembershipResponse,
    summary="Cập nhật gói tập",
    description="Cập nhật thông tin gói tập"
)
def update_membership(
    membership_id: int,
    membership_update: MembershipUpdate,
    db: Session = Depends(get_db)
):
    """Cập nhật thông tin gói tập"""
    membership = db.query(models.Membership).filter(
        models.Membership.id == membership_id
    ).first()
    
    if not membership:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy gói tập với ID: {membership_id}"
        )
    
    for field, value in membership_update.dict(exclude_unset=True).items():
        setattr(membership, field, value)
    
    db.commit()
    db.refresh(membership)
    
    return membership


@router.delete(
    "/{membership_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Xoá gói tập",
    description="Xoá gói tập khỏi hệ thống"
)
def delete_membership(membership_id: int, db: Session = Depends(get_db)):
    """Xoá gói tập"""
    membership = db.query(models.Membership).filter(
        models.Membership.id == membership_id
    ).first()
    
    if not membership:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy gói tập với ID: {membership_id}"
        )
    
    db.delete(membership)
    db.commit()
    
    return None
