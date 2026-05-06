import React, { useState } from 'react'
import Layout from '../components/Layout'
import './Payments.css'

function Payments({ onLogout }) {
  const [activeTab, setActiveTab] = useState('all')
  const [showDetail, setShowDetail] = useState(null)

  const [payments] = useState([
    { id: 1, member: 'Nguyễn Văn A', plan: 'VIP Tháng', amount: 600000, date: '20/02/2025', method: 'Chuyển khoản', status: 'paid', code: 'GYM-2025-001', note: 'Thanh toán đúng hạn' },
    { id: 2, member: 'Trần Thị B', plan: 'Cơ bản Tháng', amount: 300000, date: '19/02/2025', method: 'Tiền mặt', status: 'paid', code: 'GYM-2025-002', note: '' },
    { id: 3, member: 'Lê Văn C', plan: 'Nâng cao 3 tháng', amount: 1500000, date: '18/02/2025', method: 'Chuyển khoản', status: 'pending', code: 'GYM-2025-003', note: 'Chờ xác nhận giao dịch' },
    { id: 4, member: 'Phạm Thị D', plan: 'VIP Năm', amount: 5000000, date: '15/02/2025', method: 'Thẻ tín dụng', status: 'paid', code: 'GYM-2025-004', note: '' },
    { id: 5, member: 'Hoàng Văn E', plan: 'Cơ bản Tháng', amount: 300000, date: '14/02/2025', method: 'Tiền mặt', status: 'overdue', code: 'GYM-2025-005', note: 'Quá hạn 6 ngày' },
    { id: 6, member: 'Đặng Thị F', plan: 'VIP Tháng', amount: 600000, date: '12/02/2025', method: 'Chuyển khoản', status: 'paid', code: 'GYM-2025-006', note: '' },
    { id: 7, member: 'Nguyễn Văn A', plan: 'VIP Tháng', amount: 600000, date: '20/01/2025', method: 'Chuyển khoản', status: 'paid', code: 'GYM-2025-007', note: '' },
    { id: 8, member: 'Trần Thị B', plan: 'Cơ bản Tháng', amount: 300000, date: '19/01/2025', method: 'Tiền mặt', status: 'paid', code: 'GYM-2025-008', note: '' },
  ])

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const pendingRevenue = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)
  const overdueCount = payments.filter(p => p.status === 'overdue').length

  const filteredPayments = activeTab === 'all' ? payments : payments.filter(p => p.status === activeTab)

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

  const statusLabels = {
    paid: { label: 'Đã thanh toán', color: '#16a34a', bg: '#dcfce7' },
    pending: { label: 'Chờ xác nhận', color: '#d97706', bg: '#fef3c7' },
    overdue: { label: 'Quá hạn', color: '#dc2626', bg: '#fef2f2' },
  }

  if (showDetail) {
    return (
      <Layout onLogout={onLogout}>
        <div className="payment-detail-page">
          <button className="btn-back" onClick={() => setShowDetail(null)}>← Quay lại</button>
          <div className="payment-detail-card">
            <div className="pd-header">
              <h3>Chi tiết giao dịch</h3>
              <span className={`pd-status`} style={{ color: statusLabels[showDetail.status].color, background: statusLabels[showDetail.status].bg, padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                {statusLabels[showDetail.status].label}
              </span>
            </div>
            <div className="pd-body">
              <div className="pd-row">
                <span className="pd-label">Mã giao dịch</span>
                <span className="pd-value">{showDetail.code}</span>
              </div>
              <div className="pd-row">
                <span className="pd-label">Hội viên</span>
                <span className="pd-value">{showDetail.member}</span>
              </div>
              <div className="pd-row">
                <span className="pd-label">Gói tập</span>
                <span className="pd-value">{showDetail.plan}</span>
              </div>
              <div className="pd-row">
                <span className="pd-label">Số tiền</span>
                <span className="pd-value pd-amount">{formatPrice(showDetail.amount)}</span>
              </div>
              <div className="pd-row">
                <span className="pd-label">Ngày thanh toán</span>
                <span className="pd-value">{showDetail.date}</span>
              </div>
              <div className="pd-row">
                <span className="pd-label">Phương thức</span>
                <span className="pd-value">{showDetail.method}</span>
              </div>
              <div className="pd-row">
                <span className="pd-label">Ghi chú</span>
                <span className="pd-value">{showDetail.note || '---'}</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onLogout={onLogout}>
      <div className="payments-page">
        <div className="page-header">
          <h2>Quản lý thanh toán</h2>
          <button className="btn-primary">📥 Xuất báo cáo</button>
        </div>

        <div className="payment-summary">
          <div className="ps-card blue">
            <span className="ps-icon">💰</span>
            <div>
              <span className="ps-value">{formatPrice(totalRevenue)}</span>
              <span className="ps-label">Tổng doanh thu</span>
            </div>
          </div>
          <div className="ps-card orange">
            <span className="ps-icon">⏳</span>
            <div>
              <span className="ps-value">{formatPrice(pendingRevenue)}</span>
              <span className="ps-label">Chờ xác nhận</span>
            </div>
          </div>
          <div className="ps-card red">
            <span className="ps-icon">⚠️</span>
            <div>
              <span className="ps-value">{overdueCount}</span>
              <span className="ps-label">Quá hạn</span>
            </div>
          </div>
          <div className="ps-card green">
            <span className="ps-icon">✅</span>
            <div>
              <span className="ps-value">{payments.filter(p => p.status === 'paid').length}</span>
              <span className="ps-label">Giao dịch thành công</span>
            </div>
          </div>
        </div>

        <div className="payment-tabs">
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Tất cả ({payments.length})</button>
          <button className={`tab-btn ${activeTab === 'paid' ? 'active' : ''}`} onClick={() => setActiveTab('paid')}>Đã thanh toán ({payments.filter(p => p.status === 'paid').length})</button>
          <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Chờ xác nhận ({payments.filter(p => p.status === 'pending').length})</button>
          <button className={`tab-btn ${activeTab === 'overdue' ? 'active' : ''}`} onClick={() => setActiveTab('overdue')}>Quá hạn ({overdueCount})</button>
        </div>

        <div className="table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Mã GD</th>
                <th>Hội viên</th>
                <th>Gói tập</th>
                <th>Số tiền</th>
                <th>Ngày</th>
                <th>Phương thức</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(p => (
                <tr key={p.id}>
                  <td className="td-code">{p.code}</td>
                  <td className="td-member">{p.member}</td>
                  <td>{p.plan}</td>
                  <td className="td-amount">{formatPrice(p.amount)}</td>
                  <td>{p.date}</td>
                  <td>{p.method}</td>
                  <td><span className="p-status" style={{ color: statusLabels[p.status].color, background: statusLabels[p.status].bg }}>{statusLabels[p.status].label}</span></td>
                  <td><button className="btn-view" onClick={() => setShowDetail(p)}>👁️ Chi tiết</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Payments
