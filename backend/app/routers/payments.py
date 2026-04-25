"""
=== FILE ROUTER PAYMENTS (routers/payments.py) ===
Tác dụng: Định nghĩa tất cả API endpoints liên quan đến PAYMENTS (thanh toán)
Tại sao cần: Quản lý lịch sử thanh toán của thành viên
Cách dùng:
- GET /api/payments -> Lấy tất cả thanh toán
- POST /api/payments -> Tạo thanh toán mới
- GET /api/payments/{id} -> Lấy thông tin thanh toán
- PUT /api/payments/{id} -> Cập nhật thanh toán
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas import (
    PaymentCreate,
    PaymentUpdate,
    PaymentResponse
)
from app import models


# Tạo router cho Payments API
router = APIRouter(
    prefix="/api/payments",
    tags=["Payments"],
    responses={404: {"description": "Không tìm thấy thanh toán"}}
)


# ============================================
# ENDPOINTS PAYMENTS
# ============================================

@router.get(
    "",
    response_model=List[PaymentResponse],
    summary="Lấy tất cả thanh toán",
    description="Trả về danh sách tất cả lịch sử thanh toán"
)
def get_all_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Lấy danh sách tất cả thanh toán"""
    payments = db.query(models.Payment).offset(skip).limit(limit).all()
    return payments


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
    summary="Lấy thông tin thanh toán",
    description="Lấy chi tiết 1 thanh toán"
)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    """Lấy thông tin chi tiết thanh toán"""
    payment = db.query(models.Payment).filter(
        models.Payment.id == payment_id
    ).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thanh toán với ID: {payment_id}"
        )
    
    return payment


@router.get(
    "/member/{member_id}",
    response_model=List[PaymentResponse],
    summary="Lấy lịch sử thanh toán của 1 thành viên",
    description="Lấy danh sách tất cả thanh toán của 1 thành viên"
)
def get_member_payments(member_id: int, db: Session = Depends(get_db)):
    """Lấy lịch sử thanh toán của thành viên"""
    payments = db.query(models.Payment).filter(
        models.Payment.member_id == member_id
    ).all()
    
    return payments


@router.post(
    "",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Tạo thanh toán mới",
    description="Ghi nhận thanh toán mới cho thành viên"
)
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    """
    Tạo thanh toán mới
    
    Dữ liệu cần gửi (JSON):
    {
        "member_id": 1,
        "membership_id": 1,
        "amount": 500000,
        "payment_method": "cash",
        "status": "completed",
        "note": "Thanh toán gói tháng 1"
    }
    """
    # Kiểm tra thành viên tồn tại
    member = db.query(models.Member).filter(
        models.Member.id == payment.member_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thành viên với ID: {payment.member_id}"
        )
    
    # Tạo thanh toán
    db_payment = models.Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    
    return db_payment


@router.put(
    "/{payment_id}",
    response_model=PaymentResponse,
    summary="Cập nhật thanh toán",
    description="Cập nhật trạng thái hoặc ghi chú thanh toán"
)
def update_payment(
    payment_id: int,
    payment_update: PaymentUpdate,
    db: Session = Depends(get_db)
):
    """Cập nhật thông tin thanh toán"""
    payment = db.query(models.Payment).filter(
        models.Payment.id == payment_id
    ).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy thanh toán với ID: {payment_id}"
        )
    
    for field, value in payment_update.dict(exclude_unset=True).items():
        setattr(payment, field, value)
    
    db.commit()
    db.refresh(payment)
    
    return payment
