import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/members', icon: '👥', label: 'Hội viên' },
    { path: '/memberships', icon: '🏋️', label: 'Gói tập' },
    { path: '/payments', icon: '💰', label: 'Thanh toán' },
    { path: '/checkin', icon: '📱', label: 'Check-in' },
    { path: '/schedule', icon: '📅', label: 'Lịch tập' },
    { path: '/health', icon: '❤️', label: 'Sức khỏe' },
    { path: '/sessions', icon: '✅', label: 'Buổi tập PT' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">💪</span>
            {sidebarOpen && <span className="logo-text">GymFlow</span>}
          </div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span className="nav-label">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h2>{menuItems.find(item => item.path === location.pathname)?.label || 'GymFlow'}</h2>
          </div>
          <div className="topbar-right">
            <div className="user-info">
              <span className="user-avatar">👤</span>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

