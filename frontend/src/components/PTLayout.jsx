import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './PTLayout.css'

function PTLayout({ children, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/pt/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/pt/students', icon: '👥', label: 'Học viên' },
    { path: '/pt/curriculum', icon: '📋', label: 'Giáo án' },
    { path: '/pt/schedule', icon: '📅', label: 'Lịch dạy' },
    { path: '/pt/income', icon: '💰', label: 'Thu nhập' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <div className="pt-layout">
      {/* Top bar */}
      <header className="pt-topbar">
        <button className="menu-toggle-pt" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <div className="pt-topbar-brand">
          <span className="brand-icon">💪</span>
          <span className="brand-name">GymFlow - PT</span>
        </div>
        <div className="pt-topbar-right">
          <span className="pt-avatar">👨‍🏫</span>
          <span className="pt-name-topbar">HLV Minh</span>
        </div>
      </header>

      {/* Sidebar */}
      {menuOpen && <div className="sidebar-overlay-pt" onClick={() => setMenuOpen(false)} />}
      <aside className={`pt-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="pt-sidebar-header">
          <span className="pt-logo">💪 GymFlow</span>
          <span className="pt-role">Huấn luyện viên</span>
        </div>

        <div className="pt-info-card">
          <div className="pt-avatar-large">👨‍🏫</div>
          <div className="pt-info-text">
            <h4>HLV Nguyễn Văn Minh</h4>
            <p>Thể hình - Giảm mỡ</p>
          </div>
        </div>

        <nav className="pt-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`pt-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-sidebar-footer">
          <button className="pt-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="pt-content">{children}</main>
    </div>
  )
}

export default PTLayout
