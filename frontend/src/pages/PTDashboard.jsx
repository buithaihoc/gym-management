import React from 'react'
import PTLayout from '../components/PTLayout'
import { Link } from 'react-router-dom'
import './PTDashboard.css'

function PTDashboard({ onLogout }) {
  const stats = {
    totalStudents: 12,
    todaySessions: 3,
    pendingConfirm: 2,
    monthlyIncome: '12,500,000',
    rating: 4.8,
  }

  const todaySchedule = [
    { time: '07:00 - 08:00', student: 'Nguyễn Văn A', type: 'PT Cá nhân', status: 'completed' },
    { time: '08:00 - 09:00', student: 'Trần Thị B', type: 'PT Cá nhân', status: 'upcoming' },
    { time: '17:30 - 18:30', student: 'Lê Văn C', type: 'Yoga Group', status: 'upcoming' },
  ]

  const recentStudents = [
    { name: 'Nguyễn Văn A', date: '20/02', note: 'Buổi tập ngực - vai. Tiến bộ rõ rệt.' },
    { name: 'Trần Thị B', date: '19/02', note: 'Tập chân. Cần cải thiện tư thế squat.' },
    { name: 'Phạm Thị D', date: '18/02', note: 'InBody: mỡ giảm 0.5%, cơ tăng 0.3kg.' },
  ]

  return (
    <PTLayout onLogout={onLogout}>
      <div className="pt-dashboard">
        <div className="pt-welcome">
          <h2>Xin chào, HLV Nguyễn Văn Minh! 👋</h2>
          <p>Hôm nay bạn có {stats.todaySessions} buổi tập. Hãy chuẩn bị thật tốt nhé!</p>
        </div>

        {/* Stats */}
        <div className="pt-stats-grid">
          <div className="pt-stat-card green">
            <div className="pt-stat-icon">👥</div>
            <div>
              <span className="pt-stat-value">{stats.totalStudents}</span>
              <span className="pt-stat-label">Học viên</span>
            </div>
          </div>
          <div className="pt-stat-card blue">
            <div className="pt-stat-icon">📅</div>
            <div>
              <span className="pt-stat-value">{stats.todaySessions}</span>
              <span className="pt-stat-label">Hôm nay</span>
            </div>
          </div>
          <div className="pt-stat-card orange">
            <div className="pt-stat-icon">⏳</div>
            <div>
              <span className="pt-stat-value">{stats.pendingConfirm}</span>
              <span className="pt-stat-label">Chờ xác nhận</span>
            </div>
          </div>
          <div className="pt-stat-card purple">
            <div className="pt-stat-icon">⭐</div>
            <div>
              <span className="pt-stat-value">{stats.rating}</span>
              <span className="pt-stat-label">Đánh giá</span>
            </div>
          </div>
        </div>

        <div className="pt-dashboard-columns">
          {/* Today schedule */}
          <div className="pt-section">
            <div className="pt-section-header">
              <h3>📅 Lịch hôm nay</h3>
              <Link to="/pt/schedule" className="pt-section-link">Xem chi tiết →</Link>
            </div>
            <div className="today-list">
              {todaySchedule.map((item, i) => (
                <div key={i} className={`today-item ${item.status}`}>
                  <div className="today-time">{item.time}</div>
                  <div className="today-info">
                    <span className="today-student">{item.student}</span>
                    <span className="today-type">{item.type}</span>
                  </div>
                  <span className={`today-status ${item.status}`}>
                    {item.status === 'completed' ? '✅' : '⏳'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent notes */}
          <div className="pt-section">
            <div className="pt-section-header">
              <h3>📝 Ghi chép gần đây</h3>
              <Link to="/pt/students" className="pt-section-link">Xem tất cả →</Link>
            </div>
            <div className="recent-notes">
              {recentStudents.map((item, i) => (
                <div key={i} className="note-item">
                  <div className="note-header">
                    <span className="note-student">{item.name}</span>
                    <span className="note-date">{item.date}</span>
                  </div>
                  <p className="note-text">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="pt-section">
          <h3 className="pt-section-title">Thao tác nhanh</h3>
          <div className="pt-quick-actions">
            <Link to="/pt/students" className="pt-qa-card">
              <span className="qa-icon">👥</span>
              <span>Xem học viên</span>
            </Link>
            <Link to="/pt/curriculum" className="pt-qa-card">
              <span className="qa-icon">📋</span>
              <span>Tạo giáo án</span>
            </Link>
            <Link to="/pt/schedule" className="pt-qa-card">
              <span className="qa-icon">📅</span>
              <span>Quản lý lịch</span>
            </Link>
            <Link to="/pt/income" className="pt-qa-card">
              <span className="qa-icon">💰</span>
              <span>Thu nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </PTLayout>
  )
}

export default PTDashboard
