import React, { useState } from 'react'
import PTLayout from '../components/PTLayout'
import './PTSchedule.css'

function PTSchedule({ onLogout }) {
  const [viewMode, setViewMode] = useState('week') // week | month
  const [currentWeek, setCurrentWeek] = useState(0)

  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const dates = ['17', '18', '19', '20', '21', '22', '23']

  const [bookings, setBookings] = useState([
    { id: 1, student: 'Nguyễn Văn A', date: '17', time: '07:00 - 08:00', type: 'PT Cá nhân', status: 'confirmed', confirmedAt: '16/02 14:30' },
    { id: 2, student: 'Trần Thị B', date: '18', time: '08:00 - 09:00', type: 'PT Cá nhân', status: 'pending', confirmedAt: '' },
    { id: 3, student: 'Lê Văn C', date: '19', time: '17:30 - 18:30', type: 'Yoga Group', status: 'pending', confirmedAt: '' },
    { id: 4, student: 'Phạm Thị D', date: '20', time: '07:00 - 08:00', type: 'PT Cá nhân', status: 'confirmed', confirmedAt: '18/02 09:00' },
    { id: 5, student: 'Nguyễn Văn A', date: '22', time: '08:00 - 09:00', type: 'PT Cá nhân', status: 'pending', confirmedAt: '' },
  ])

  const handleConfirm = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'confirmed', confirmedAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) } : b))
  }

  const handleReject = (id) => {
    if (window.confirm('Bạn có chắc muốn từ chối lịch này?')) {
      setBookings(bookings.filter(b => b.id !== id))
    }
  }

  const handleSuggestReschedule = (id) => {
    const newTime = prompt('Đề xuất giờ mới (VD: 09:00 - 10:00):')
    if (newTime) {
      alert(`Đã gửi đề xuất đổi giờ sang ${newTime} cho học viên.`)
    }
  }

  const pendingCount = bookings.filter(b => b.status === 'pending').length

  return (
    <PTLayout onLogout={onLogout}>
      <div className="pt-schedule-page">
        <div className="pt-page-header">
          <h2>Lịch dạy</h2>
          {pendingCount > 0 && <span className="pending-alert">⏳ {pendingCount} lịch chờ xác nhận</span>}
        </div>

        {/* View toggle */}
        <div className="schedule-controls">
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>Tuần</button>
            <button className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>Tháng</button>
          </div>
          <div className="week-nav">
            <button className="btn-nav" onClick={() => setCurrentWeek(currentWeek - 1)}>◀</button>
            <span className="week-label">Tuần {currentWeek + 1}</span>
            <button className="btn-nav" onClick={() => setCurrentWeek(currentWeek + 1)}>▶</button>
          </div>
        </div>

        {/* Week view */}
        {viewMode === 'week' && (
          <>
            <div className="week-header">
              {days.map((day, i) => (
                <div key={i} className={`week-day ${dates[i] === '20' ? 'today' : ''}`}>
                  <span className="wd-name">{day}</span>
                  <span className="wd-date">{dates[i]}/02</span>
                </div>
              ))}
            </div>

            <div className="week-grid">
              {days.map((_, dayIdx) => {
                const dayBookings = bookings.filter(b => b.date === dates[dayIdx])
                return (
                  <div key={dayIdx} className={`week-cell ${dayBookings.length === 0 ? 'empty' : ''}`}>
                    {dayBookings.length > 0 ? dayBookings.map(b => (
                      <div key={b.id} className={`booking-card ${b.status}`}>
                        <span className="booking-time">{b.time}</span>
                        <span className="booking-student">{b.student}</span>
                        <span className="booking-type">{b.type}</span>
                        {b.status === 'pending' && (
                          <div className="booking-actions">
                            <button className="btn-confirm" onClick={() => handleConfirm(b.id)}>✅ Xác nhận</button>
                            <button className="btn-reschedule" onClick={() => handleSuggestReschedule(b.id)}>🔄 Đề xuất giờ khác</button>
                            <button className="btn-reject" onClick={() => handleReject(b.id)}>❌</button>
                          </div>
                        )}
                        {b.status === 'confirmed' && (
                          <span className="confirmed-info">✅ Đã xác nhận {b.confirmedAt}</span>
                        )}
                      </div>
                    )) : <span className="empty-slot">Trống</span>}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Pending requests */}
        <div className="pt-section">
          <h3 className="pt-section-title">Yêu cầu chờ xác nhận</h3>
          {bookings.filter(b => b.status === 'pending').length === 0 ? (
            <p className="text-muted">Không có lịch nào chờ xác nhận.</p>
          ) : (
            <div className="pending-list">
              {bookings.filter(b => b.status === 'pending').map(b => (
                <div key={b.id} className="pending-item">
                  <div className="pending-info">
                    <span className="pending-student">{b.student}</span>
                    <span className="pending-detail">{b.date}/02 - {b.time} · {b.type}</span>
                  </div>
                  <div className="pending-actions">
                    <button className="btn-confirm" onClick={() => handleConfirm(b.id)}>✅ Xác nhận</button>
                    <button className="btn-reschedule" onClick={() => handleSuggestReschedule(b.id)}>🔄 Đề xuất giờ khác</button>
                    <button className="btn-reject" onClick={() => handleReject(b.id)}>❌ Từ chối</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="pt-section">
          <h3 className="pt-section-title">Thống kê lịch dạy</h3>
          <div className="schedule-stats">
            <div className="ss-item"><span className="ss-value">{bookings.filter(b => b.status === 'confirmed').length}</span><span className="ss-label">Đã xác nhận</span></div>
            <div className="ss-item"><span className="ss-value pending">{pendingCount}</span><span className="ss-label">Chờ xác nhận</span></div>
            <div className="ss-item"><span className="ss-value">{bookings.length}</span><span className="ss-label">Tổng lịch tuần này</span></div>
          </div>
        </div>
      </div>
    </PTLayout>
  )
}

export default PTSchedule
