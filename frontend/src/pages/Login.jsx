import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [role, setRole] = useState('') // admin | member | pt
  const navigate = useNavigate()

  // ===== TÀI KHOẢN DEMO =====
  const accounts = [
    { email: 'admin@gym.com', password: 'admin123', role: 'Admin', redirect: '/members', label: 'Quản trị viên', color: '#1e40af' },
    { email: 'member@gym.com', password: 'member123', role: 'Hội viên', redirect: '/member/home', label: 'Nguyễn Văn A', color: '#1e40af' },
    { email: 'pt@gym.com', password: 'pt123', role: 'Huấn luyện viên', redirect: '/pt/dashboard', label: 'HLV Nguyễn Văn Minh', color: '#059669' },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const found = accounts.find(acc => acc.email === email && acc.password === password)

    if (found) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userRole', found.role)
      localStorage.setItem('userName', found.label)
      onLogin()
      navigate(found.redirect)
    } else {
      setError('Email hoặc mật khẩu không đúng!')
    }
  }

  const quickSelect = (acc) => {
    setEmail(acc.email)
    setPassword(acc.password)
    setRole(acc.role)
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <div className="brand-icon">💪</div>
          <h1>GymFlow</h1>
          <p className="brand-subtitle">Hệ thống quản lý phòng gym chuyên nghiệp</p>
        </div>
        <div className="brand-features">
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <div>
              <h4>Quản lý thành viên</h4>
              <p>Theo dõi thông tin và lịch sử hội viên</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏋️</span>
            <div>
              <h4>Gói tập linh hoạt</h4>
              <p>Đa dạng gói tập theo nhu cầu</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <div>
              <h4>Thanh toán thông minh</h4>
              <p>Quản lý doanh thu dễ dàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h2>Đăng nhập</h2>
            <p>Chào mừng bạn trở lại!</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Đăng nhập
            </button>
          </form>

          {/* ===== GỢI Ý TÀI KHOẢN ===== */}
          <div className="demo-accounts">
            <p className="demo-title">🔑 Chọn tài khoản dùng thử:</p>
            <div className="demo-account-list">
              {accounts.map((acc, index) => (
                <button
                  key={index}
                  className={`demo-account-btn ${role === acc.role ? 'selected' : ''}`}
                  style={{ '--accent': acc.color }}
                  onClick={() => quickSelect(acc)}
                  type="button"
                >
                  <span className="demo-role-icon">
                    {acc.role === 'Admin' ? '🛠️' : acc.role === 'Hội viên' ? '🏋️' : '👨‍🏫'}
                  </span>
                  <div className="demo-info">
                    <span className="demo-role">{acc.role}</span>
                    <span className="demo-name">{acc.label}</span>
                    <span className="demo-email">{acc.email}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="login-footer">
            <p className="footer-note">⚠️ Tài khoản demo - sẽ xóa khi triển khai thực tế</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
