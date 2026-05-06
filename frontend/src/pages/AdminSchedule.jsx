import React, { useState } from 'react'
import Layout from '../components/Layout'
import './AdminSchedule.css'

function AdminSchedule({ onLogout }) {
  const [viewMode, setViewMode] = useState('list')
  const [activeTab, setActiveTab] = useState('sessions')

  const [sessions] = useState([
    { id: 1, member: 'Nguyễn Văn A', trainer: 'HLV Minh', type: 'PT Cá nhân', date: '22/02/2025', time: '07:00 - 08:00', status: 'confirmed', created: '20/02' },
    { id: 2, member: 'Trần Thị B', trainer: 'HLV Hương', type: 'PT Cá nhân', date: '22/02/2025', time: '08:00 - 09:00', status: 'confirmed', created: '19/02' },
    { id: 3, member: 'Lê Văn C', trainer: 'HLV Minh', type: 'PT Cá nhân', date: '24/02/2025', time: '17:30 - 18:30', status: 'pending', created: '21/02' },
    { id: 4, member: 'Phạm Thị D', trainer: 'HLV Tuấn', type: 'Yoga Group', date: '24/02/2025', time: '18:00 - 19:00', status: 'confirmed', created: '20/02' },
    { id: 5, member: 'Nguyễn Văn A', trainer: 'HLV Minh', type: 'PT Cá nhân', date: '20/02/2025', time: '07:00 - 08:00', status: 'completed', created: '18/02' },
    { id: 6, member: 'Hoàng Văn E', trainer: 'HLV Hương', type: 'PT Cá nhân', date: '25/02/2025', time: '07:00 - 08:00', status: 'pending', created: '22/02' },
  ])

  const [classes] = useState([
    { id: 1, name: 'Yoga buổi sáng', trainer: 'HLV Hương', time: '06:00 - 07:00', days: 'T2, T4, T6', max: 20, booked: 15, status: 'active' },
    { id: 2, name: 'Zumba', trainer: 'HLV Lan', time: '17:30 - 18:30', days: 'T3, T5, T7', max: 25, booked: 22, status: 'active' },
    { id: 3, name: 'Group X', trainer: 'HLV Tuấn', time: '18:30 - 19:30', days: 'T2, T4', max: 15, booked: 8, status: 'active' },
    { id: 4, name: 'Pilates', trainer: 'HLV Hương', time: '07:00 - 08:00', days: 'T3, T5', max: 12, booked: 10, status: 'active' },
  ])

  const handleCancel = (id) => {
    if (window.confirm('Hủy lịch này?')) {
      alert('Đã hủy lịch #' + id)
    }
  }

  const formatDate = (date) => {
    const d = new Date(date.split('/').reverse().join('-'))
    return d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })
  }

  const statusLabels = {
    confirmed: { label: 'Đã xác nhận', color: '#16a34a', bg: '#dcfce7' },
    pending: { label: 'Chờ xác nhận', color: '#d97706', bg: '#fef3c7' },
    completed: { label: 'Đã hoàn thành', color: '#64748b', bg: '#f1f5f9' },
  }

  return (
    <Layout onLogout={onLogout}>
      <div className="admin-schedule-page">
        <div className="page-header">
          <h2>Quản lý lịch</h2>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>📋 Danh sách</button>
            <button className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}>📅 Lịch</button>
          </div>
        </div>

        <div className="schedule-tabs">
          <button className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>🏋️ Lịch PT ({sessions.length})</button>
          <button className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>👥 Lớp học ({classes.length})</button>
        </div>

        {viewMode === 'list' && (
          <>
            {activeTab === 'sessions' && (
              <div className="table-container">
                <table className="schedule-table">
                  <thead>
                    <tr><th>Hội viên</th><th>PT</th><th>Loại</th><th>Ngày</th><th>Giờ</th><th>Trạng thái</th><th>Thao tác</th></tr>
                  </thead>
                  <tbody>
                    {sessions.map(s => (
                      <tr key={s.id}>
                        <td className="td-member">{s.member}</td>
                        <td>{s.trainer}</td>
                        <td>{s.type}</td>
                        <td>{formatDate(s.date)}</td>
                        <td>{s.time}</td>
                        <td><span className="s-status" style={{ color: statusLabels[s.status].color, background: statusLabels[s.status].bg }}>{statusLabels[s.status].label}</span></td>
                        <td>
                          {s.status === 'pending' && <button className="btn-cancel-sm" onClick={() => handleCancel(s.id)}>Hủy</button>}
                          {s.status === 'confirmed' && <button className="btn-cancel-sm" onClick={() => handleCancel(s.id)}>Hủy</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'classes' && (
              <div className="classes-grid">
                {classes.map(c => (
                  <div key={c.id} className="class-card">
                    <div className="cc-header">
                      <h4>{c.name}</h4>
                      <span className="cc-status active">Đang mở</span>
                    </div>
                    <div className="cc-details">
                      <span>👨‍🏫 {c.trainer}</span>
                      <span>🕐 {c.time}</span>
                      <span>📅 {c.days}</span>
                    </div>
                    <div className="cc-capacity">
                      <div className="cap-bar"><div className="cap-fill" style={{ width: `${(c.booked / c.max) * 100}%` }} /></div>
                      <span className="cap-text">{c.booked}/{c.max} chỗ</span>
                    </div>
                    <div className="cc-actions">
                      <button className="btn-edit-sm">✏️ Sửa</button>
                      <button className="btn-edit-sm red">Tạm ngưng</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {viewMode === 'calendar' && (
          <div className="calendar-view">
            <div className="calendar-header">
              <button className="btn-nav">◀</button>
              <h3>Tháng 02/2025</h3>
              <button className="btn-nav">▶</button>
            </div>
            <div className="calendar-grid">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
              {[...Array(28)].map((_, i) => {
                const daySessions = sessions.filter(s => parseInt(s.date.split('/')[0]) === i + 1)
                return (
                  <div key={i} className={`cal-day ${i + 1 === 22 ? 'today' : ''}`}>
                    <span className="cal-day-number">{i + 1}</span>
                    {daySessions.length > 0 && <span className="cal-badge">{daySessions.length}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminSchedule
