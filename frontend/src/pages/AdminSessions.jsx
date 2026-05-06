import React, { useState } from 'react'
import Layout from '../components/Layout'
import './AdminSessions.css'

function AdminSessions({ onLogout }) {
  const [activeTab, setActiveTab] = useState('all')
  const [showDetail, setShowDetail] = useState(null)

  const [sessions] = useState([
    { id: 1, member: 'Nguyễn Văn A', trainer: 'HLV Minh', type: 'PT Cá nhân', date: '20/02/2025', time: '07:00 - 08:00', ptConfirmed: true, memberConfirmed: true, amount: 250000, status: 'completed', note: 'Hoàn thành tốt' },
    { id: 2, member: 'Trần Thị B', trainer: 'HLV Minh', type: 'PT Cá nhân', date: '19/02/2025', time: '08:00 - 09:00', ptConfirmed: true, memberConfirmed: true, amount: 250000, status: 'completed', note: '' },
    { id: 3, member: 'Lê Văn C', trainer: 'HLV Hương', type: 'Yoga Group', date: '18/02/2025', time: '17:30 - 18:30', ptConfirmed: true, memberConfirmed: false, amount: 180000, status: 'pending', note: 'Chờ HV xác nhận' },
    { id: 4, member: 'Phạm Thị D', trainer: 'HLV Tuấn', type: 'PT Cá nhân', date: '22/02/2025', time: '07:00 - 08:00', ptConfirmed: false, memberConfirmed: false, amount: 250000, status: 'upcoming', note: 'Sắp diễn ra' },
    { id: 5, member: 'Nguyễn Văn A', trainer: 'HLV Minh', type: 'PT Cá nhân', date: '17/02/2025', time: '07:00 - 08:00', ptConfirmed: true, memberConfirmed: true, amount: 250000, status: 'completed', note: '' },
    { id: 6, member: 'Hoàng Văn E', trainer: 'HLV Hương', type: 'PT Cá nhân', date: '15/02/2025', time: '08:00 - 09:00', ptConfirmed: true, memberConfirmed: true, amount: 250000, status: 'completed', note: '' },
    { id: 7, member: 'Lê Văn C', trainer: 'HLV Hương', type: 'Yoga Group', date: '14/02/2025', time: '17:30 - 18:30', ptConfirmed: true, memberConfirmed: true, amount: 180000, status: 'completed', note: '' },
  ])

  const statuses = {
    completed: { label: 'Hoàn thành', color: '#16a34a', bg: '#dcfce7' },
    pending: { label: 'Chờ HV xác nhận', color: '#d97706', bg: '#fef3c7' },
    upcoming: { label: 'Sắp diễn ra', color: '#1e40af', bg: '#eff6ff' },
  }

  const trainerStats = [
    { name: 'HLV Minh', sessions: 4, completed: 3, totalAmount: 750000, avgRating: 4.8 },
    { name: 'HLV Hương', sessions: 3, completed: 2, totalAmount: 430000, avgRating: 4.9 },
    { name: 'HLV Tuấn', sessions: 1, completed: 0, totalAmount: 0, avgRating: 4.7 },
  ]

  const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p) + 'đ'

  const filteredSessions = activeTab === 'all' ? sessions : sessions.filter(s => s.status === activeTab)

  if (showDetail) {
    return (
      <Layout onLogout={onLogout}>
        <div className="session-detail-page">
          <button className="btn-back" onClick={() => setShowDetail(null)}>← Quay lại</button>
          <div className="sd-card">
            <div className="sd-header">
              <h3>Chi tiết buổi tập</h3>
              <span className="sd-status" style={{ color: statuses[showDetail.status].color, background: statuses[showDetail.status].bg }}>
                {statuses[showDetail.status].label}
              </span>
            </div>
            <div className="sd-body">
              <div className="sd-row"><span className="sd-label">Hội viên</span><span className="sd-value">{showDetail.member}</span></div>
              <div className="sd-row"><span className="sd-label">Huấn luyện viên</span><span className="sd-value">{showDetail.trainer}</span></div>
              <div className="sd-row"><span className="sd-label">Loại</span><span className="sd-value">{showDetail.type}</span></div>
              <div className="sd-row"><span className="sd-label">Ngày</span><span className="sd-value">{showDetail.date}</span></div>
              <div className="sd-row"><span className="sd-label">Giờ</span><span className="sd-value">{showDetail.time}</span></div>
              <div className="sd-row"><span className="sd-label">Số tiền</span><span className="sd-value sd-amount">{formatPrice(showDetail.amount)}</span></div>
              <div className="sd-row"><span className="sd-label">PT xác nhận</span><span className="sd-value">{showDetail.ptConfirmed ? '✅' : '⏳'}</span></div>
              <div className="sd-row"><span className="sd-label">HV xác nhận</span><span className="sd-value">{showDetail.memberConfirmed ? '✅' : '⏳'}</span></div>
              {showDetail.note && <div className="sd-row"><span className="sd-label">Ghi chú</span><span className="sd-value">{showDetail.note}</span></div>}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onLogout={onLogout}>
      <div className="admin-sessions-page">
        <div className="page-header">
          <h2>Buổi tập PT</h2>
          <span className="total-sessions">{sessions.length} buổi</span>
        </div>

        <div className="ss-summary">
          <div className="ss-card blue"><span className="ss-value">{sessions.filter(s => s.status === 'upcoming').length}</span><span className="ss-label">Sắp diễn ra</span></div>
          <div className="ss-card green"><span className="ss-value">{sessions.filter(s => s.status === 'completed').length}</span><span className="ss-label">Hoàn thành</span></div>
          <div className="ss-card orange"><span className="ss-value">{sessions.filter(s => s.status === 'pending').length}</span><span className="ss-label">Chờ xác nhận HV</span></div>
          <div className="ss-card purple"><span className="ss-value">{formatPrice(sessions.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.amount, 0))}</span><span className="ss-label">Doanh thu từ PT</span></div>
        </div>

        <div className="st-tabs">
          <button className={`st-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Tất cả</button>
          <button className={`st-tab ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Hoàn thành</button>
          <button className={`st-tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Chờ xác nhận</button>
          <button className={`st-tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Sắp diễn ra</button>
        </div>

        <div className="table-container">
          <table className="sessions-table">
            <thead>
              <tr><th>Hội viên</th><th>PT</th><th>Loại</th><th>Ngày</th><th>Giờ</th><th>Xác nhận PT</th><th>Xác nhận HV</th><th>Trạng thái</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {filteredSessions.map(s => (
                <tr key={s.id}>
                  <td className="td-member">{s.member}</td>
                  <td>{s.trainer}</td>
                  <td>{s.type}</td>
                  <td>{s.date}</td>
                  <td>{s.time}</td>
                  <td>{s.ptConfirmed ? '✅' : '⏳'}</td>
                  <td>{s.memberConfirmed ? '✅' : '⏳'}</td>
                  <td><span className="s-status" style={{ color: statuses[s.status].color, background: statuses[s.status].bg }}>{statuses[s.status].label}</span></td>
                  <td><button className="btn-view" onClick={() => setShowDetail(s)}>👁️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trainer stats */}
        <div className="section">
          <h3 className="section-title">Thống kê theo PT</h3>
          <div className="trainer-stats">
            {trainerStats.map((t, i) => (
              <div key={i} className="ts-card">
                <h4>{t.name}</h4>
                <div className="ts-grid">
                  <div className="ts-item"><span className="ts-value">{t.sessions}</span><span className="ts-label">Buổi</span></div>
                  <div className="ts-item"><span className="ts-value green">{t.completed}</span><span className="ts-label">Hoàn thành</span></div>
                  <div className="ts-item"><span className="ts-value">{formatPrice(t.totalAmount)}</span><span className="ts-label">Doanh thu</span></div>
                  <div className="ts-item"><span className="ts-value">{t.avgRating}⭐</span><span className="ts-label">Đánh giá</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminSessions
