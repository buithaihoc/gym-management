import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './MemberLayout.css'

function MemberLayout({ children, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/member/home', icon: '🏠', label: 'Trang chủ' },
    { path: '/member/profile', icon: '👤', label: 'Tài khoản' },
    { path: '/member/qr', icon: '📱', label: 'Check-in QR' },
    { path: '/member/schedule', icon: '📅', label: 'Đặt lịch' },
    { path: '/member/health', icon: '❤️', label: 'Sức khỏe' },
    { path: '/member/sessions', icon: '✅', label: 'Buổi tập PT' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <div className="member-layout">
      {/* Top bar mobile */}
      <header className="member-topbar">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <div className="member-topbar-brand">
          <span className="brand-icon">💪</span>
          <span className="brand-name">GymFlow</span>
        </div>
        <div className="member-topbar-right">
          <span className="member-avatar">👤</span>
        </div>
      </header>

      {/* Sidebar overlay */}
      {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Sidebar */}
      <aside className={`member-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="member-sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">💪</span>
            <span className="logo-text">GymFlow</span>
          </div>
        </div>

        <div className="member-info-card">
          <div className="member-avatar-large">👤</div>
          <div className="member-info-text">
            <h4>Nguyễn Văn A</h4>
            <p>VIP Tháng - Còn 25 ngày</p>
          </div>
        </div>

        <nav className="member-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`member-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="member-sidebar-footer">
          <button className="member-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="member-content">
        {children}
      </main>

      {/* Bottom nav mobile */}
      <nav className="member-bottom-nav">
        {menuItems.slice(0, 5).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default MemberLayout
