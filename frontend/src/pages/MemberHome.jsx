import React, { useState } from 'react'
import MemberLayout from '../components/MemberLayout'
import { Link } from 'react-router-dom'
import './MemberHome.css'

function MemberHome({ onLogout }) {
  const [member] = useState({
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'nguyenvana@gmail.com',
    plan: 'VIP Tháng',
    startDate: '10/01/2025',
    expiryDate: '10/06/2025',
    daysLeft: 25,
    status: 'active',
    checkinToday: true,
    sessionsRemaining: 8,
    sessionsTotal: 12,
  })

  const quickActions = [
    { icon: '📱', label: 'Check-in QR', path: '/member/qr', color: '#1e40af' },
    { icon: '📅', label: 'Đặt lịch PT', path: '/member/schedule', color: '#22c55e' },
    { icon: '❤️', label: 'Sức khỏe', path: '/member/health', color: '#ef4444' },
    { icon: '✅', label: 'Buổi tập PT', path: '/member/sessions', color: '#f59e0b' },
    { icon: '👤', label: 'Tài khoản', path: '/member/profile', color: '#8b5cf6' },
  ]

  const recentCheckins = [
    { date: '20/02/2025', timeIn: '07:30', timeOut: '09:15' },
    { date: '19/02/2025', timeIn: '08:00', timeOut: '09:45' },
    { date: '18/02/2025', timeIn: '17:30', timeOut: '19:00' },
    { date: '17/02/2025', timeIn: '07:45', timeOut: '09:30' },
  ]

  const upcomingSessions = [
    { date: '22/02/2025', time: '08:00 - 09:00', type: 'PT Cá nhân', trainer: 'Huấn luyện viên Minh' },
    { date: '24/02/2025', time: '17:30 - 18:30', type: 'Yoga', trainer: 'HLV Hương' },
  ]

  return (
    <MemberLayout onLogout={onLogout}>
      <div className="member-home">
        {/* Welcome banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Xin chào, {member.name}!</h2>
            <p>Chào mừng bạn đến với phòng tập hôm nay</p>
          </div>
          <div className="welcome-status">
            {member.checkinToday 
              ? <span className="checkin-badge checked-in">✅ Đã check-in hôm nay</span>
              : <span className="checkin-badge not-checked">⏳ Chưa check-in</span>
            }
          </div>
        </div>

        {/* Membership card */}
        <div className="membership-card">
          <div className="card-bg">
            <div className="card-pattern" />
          </div>
          <div className="card-content">
            <div className="card-top">
              <span className="card-brand">💪 GymFlow</span>
              <span className="card-type">{member.plan}</span>
            </div>
            <div className="card-member-name">{member.name}</div>
            <div className="card-dates">
              <div className="card-date-item">
                <span className="card-date-label">Hiệu lực</span>
                <span className="card-date-value">{member.startDate}</span>
              </div>
              <div className="card-date-item">
                <span className="card-date-label">Hết hạn</span>
                <span className="card-date-value">{member.expiryDate}</span>
              </div>
            </div>
            <div className="card-days-left">
              <div className="days-left-circle">
                <span className="days-number">{member.daysLeft}</span>
                <span className="days-label">ngày</span>
              </div>
              <span className="days-text">còn lại</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="member-stats">
          <div className="member-stat-card">
            <span className="stat-value">{member.daysLeft}/30</span>
            <span className="stat-label">Ngày trong tháng</span>
          </div>
          <div className="member-stat-card">
            <span className="stat-value">{member.sessionsRemaining}/{member.sessionsTotal}</span>
            <span className="stat-label">Buổi tập PT còn</span>
          </div>
          <div className="member-stat-card">
            <span className="stat-value">12</span>
            <span className="stat-label">Số buổi đã tập</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="section">
          <h3 className="section-title">Tiện ích nhanh</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link to={action.path} key={index} className="quick-action-card" style={{ '--accent': action.color }}>
                <span className="qa-icon">{action.icon}</span>
                <span className="qa-label">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Two columns */}
        <div className="home-columns">
          {/* Recent check-in */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">Lịch sử check-in gần đây</h3>
              <Link to="/member/qr" className="section-link">Xem tất cả →</Link>
            </div>
            <div className="checkin-list">
              {recentCheckins.map((item, index) => (
                <div className="checkin-item" key={index}>
                  <div className="checkin-date">{item.date}</div>
                  <div className="checkin-times">
                    <span className="checkin-time">Vào: {item.timeIn}</span>
                    <span className="checkin-divider">|</span>
                    <span className="checkin-time">Ra: {item.timeOut}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming sessions */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">Buổi tập sắp tới</h3>
              <Link to="/member/schedule" className="section-link">Xem tất cả →</Link>
            </div>
            {upcomingSessions.length > 0 ? (
              <div className="upcoming-list">
                {upcomingSessions.map((session, index) => (
                  <div className="upcoming-item" key={index}>
                    <div className="upcoming-date-box">
                      <span className="upcoming-day">{session.date.split('/')[0]}</span>
                      <span className="upcoming-month">Th{session.date.split('/')[1]}</span>
                    </div>
                    <div className="upcoming-info">
                      <span className="upcoming-type">{session.type}</span>
                      <span className="upcoming-trainer">👨‍🏫 {session.trainer}</span>
                      <span className="upcoming-time">🕐 {session.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Chưa có buổi tập nào được đặt</p>
                <Link to="/member/schedule" className="btn-primary btn-sm">Đặt lịch ngay</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberHome
