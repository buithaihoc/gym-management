import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

/* ============================================================================
   SHARED COMPONENTS
   ============================================================================ */

/* Header Component */
function Header({ user, onLogout, title }) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">💪 GymSystem</h1>
          {title && <p className="header-subtitle">{title}</p>}
        </div>
        <div className="header-right">
          {user && (
            <div className="user-section">
              <span className="user-name">{user.name}</span>
              <button
                className="user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  <a href="/profile">👤 Hồ sơ</a>
                  <a href="/settings">⚙️ Cài đặt</a>
                  <hr />
                  <button onClick={onLogout} className="logout-btn">
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

/* Sidebar Component */
function Sidebar({ role, isOpen, onToggle }) {
  const menuItems = {
    admin: [
      { label: '📊 Dashboard', path: '/admin/dashboard' },
      { label: '👥 Thành viên', path: '/admin/members' },
      { label: '🎯 Gói tập', path: '/admin/memberships' },
      { label: '💰 Thanh toán', path: '/admin/payments' },
      { label: '👨‍💼 Nhân viên', path: '/admin/staff' },
      { label: '📈 Báo cáo', path: '/admin/reports' },
      { label: '⚙️ Cài đặt', path: '/admin/settings' },
    ],
    receptionist: [
      { label: '📊 Dashboard', path: '/receptionist/dashboard' },
      { label: '✅ Check-in', path: '/receptionist/checkin' },
      { label: '👥 Thành viên', path: '/receptionist/members' },
      { label: '💳 Giao dịch', path: '/receptionist/transactions' },
    ],
    pt: [
      { label: '📊 Dashboard', path: '/pt/dashboard' },
      { label: '👤 Clients', path: '/pt/clients' },
      { label: '📅 Lịch tập', path: '/pt/sessions' },
      { label: '📈 Tiến độ', path: '/pt/progress' },
    ],
    customer: [
      { label: '📊 Dashboard', path: '/customer/dashboard' },
      { label: '👤 Hồ sơ', path: '/customer/profile' },
      { label: '🎯 Gói tập', path: '/customer/membership' },
      { label: '💳 Lịch sử thanh toán', path: '/customer/history' },
    ],
  }

  const items = menuItems[role] || []

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {items.map((item, idx) => (
            <a key={idx} href={item.path} className="sidebar-link">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}

/* Card Component */
function Card({ children, className = '', ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  )
}

/* Button Component */
function Button({ children, variant = 'primary', size = 'md', ...props }) {
  const className = `btn btn-${variant} btn-${size}`
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

/* Input Component */
function Input({ label, error, ...props }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  )
}

/* Table Component */
function Table({ columns, data, actions }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
            {actions && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
              {actions && (
                <td className="action-buttons">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ============================================================================
   PUBLIC PAGES
   ============================================================================ */

/* Landing Page */
function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-content">
          <h1>Welcome to GymSystem</h1>
          <p>Hệ thống quản lý phòng gym hiện đại & toàn diện</p>
          <div className="landing-buttons">
            <a href="/login" className="btn btn-primary btn-lg">
              Đăng nhập
            </a>
            <a href="/register" className="btn btn-secondary btn-lg">
              Đăng ký
            </a>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>Tính năng chính</h2>
          <div className="features-grid">
            <Card>
              <h3>👥 Quản lý thành viên</h3>
              <p>Quản lý thông tin, gói tập & thanh toán của tất cả thành viên</p>
            </Card>
            <Card>
              <h3>🎯 Quản lý gói tập</h3>
              <p>Tạo, cập nhật các gói tập luyện linh hoạt cho thành viên</p>
            </Card>
            <Card>
              <h3>💰 Quản lý thanh toán</h3>
              <p>Theo dõi thanh toán, hoá đơn & lịch sử giao dịch</p>
            </Card>
            <Card>
              <h3>👨‍💼 Quản lý nhân viên</h3>
              <p>Phân công lễ tân, huấn luyện viên & quản lý vai trò</p>
            </Card>
            <Card>
              <h3>📊 Báo cáo chi tiết</h3>
              <p>Phân tích doanh thu, thành viên & hiệu suất kinh doanh</p>
            </Card>
            <Card>
              <h3>📱 Ứng dụng di động</h3>
              <p>Truy cập từ bất kì thiết bị nào, bất kì lúc nào</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 GymSystem. All rights reserved.</p>
      </footer>
    </div>
  )
}

/* Login Page */
function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo: Login with any credentials
    if (formData.email && formData.password) {
      const roleMap = {
        'admin@gym.com': 'admin',
        'receptionist@gym.com': 'receptionist',
        'pt@gym.com': 'pt',
        'customer@gym.com': 'customer',
      }
      const role = roleMap[formData.email] || 'customer'
      onLogin({ name: 'User', email: formData.email, role })
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@gym.com"
            error={errors.email}
          />
          <Input
            label="Mật khẩu"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            error={errors.password}
          />
          <Button type="submit" className="btn-block">
            Đăng nhập
          </Button>
        </form>
        <p className="auth-link">
          Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </p>
        <div className="demo-info">
          <p><strong>Demo Accounts:</strong></p>
          <p>Admin: admin@gym.com</p>
          <p>Receptionist: receptionist@gym.com</p>
          <p>PT: pt@gym.com</p>
          <p>Customer: customer@gym.com</p>
        </div>
      </Card>
    </div>
  )
}

/* Register Page */
function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.email && formData.password) {
      onLogin({ name: formData.name, email: formData.email, role: 'customer' })
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Họ tên"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
          <Input
            label="Mật khẩu"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
          <Input
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Xác nhận mật khẩu"
          />
          <Button type="submit" className="btn-block">
            Đăng ký
          </Button>
        </form>
        <p className="auth-link">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </Card>
    </div>
  )
}

/* ============================================================================
   ROLE-BASED DASHBOARDS
   ============================================================================ */

/* Admin Dashboard */
function AdminDashboard() {
  const stats = [
    { label: 'Tổng thành viên', value: 245, icon: '👥' },
    { label: 'Gói tập hoạt động', value: 189, icon: '🎯' },
    { label: 'Doanh thu tháng', value: '₫50M', icon: '💰' },
    { label: 'Lệnh đăng ký mới', value: 12, icon: '✨' },
  ]

  return (
    <div className="dashboard">
      <h2>Bảng điều khiển Admin</h2>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <Card key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-section">
        <h3>Thành viên mới</h3>
        <Table
          columns={['Tên', 'Email', 'Gói tập', 'Ngày tham gia']}
          data={[
            { name: 'Nguyễn Văn A', email: 'nguyena@gym.com', package: 'Tháng', date: '2025-01-15' },
            { name: 'Trần Thị B', email: 'tranb@gym.com', package: '3 tháng', date: '2025-01-14' },
          ]}
        />
      </div>
    </div>
  )
}

/* Admin Members Page */
function AdminMembers() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Quản lý thành viên</h2>
        <Button variant="primary">+ Thêm thành viên</Button>
      </div>
      <Table
        columns={['ID', 'Tên', 'Email', 'Điện thoại', 'Trạng thái']}
        data={[
          { id: '1', name: 'Nguyễn Văn A', email: 'nguyena@gym.com', phone: '0912345678', status: '✅ Hoạt động' },
          { id: '2', name: 'Trần Thị B', email: 'tranb@gym.com', phone: '0987654321', status: '✅ Hoạt động' },
        ]}
      />
    </div>
  )
}

/* Receptionist Dashboard */
function ReceptionistDashboard() {
  return (
    <div className="dashboard">
      <h2>Bảng điều khiển Lễ tân</h2>
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Check-in hôm nay</p>
            <p className="stat-value">34</p>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <p className="stat-label">Hết hạn hôm nay</p>
            <p className="stat-value">3</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

/* PT Dashboard */
function PTDashboard() {
  return (
    <div className="dashboard">
      <h2>Bảng điều khiển PT</h2>
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <p className="stat-label">Clients</p>
            <p className="stat-value">12</p>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <p className="stat-label">Lịch hôm nay</p>
            <p className="stat-value">5</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

/* Customer Dashboard */
function CustomerDashboard() {
  return (
    <div className="dashboard">
      <h2>Bảng điều khiển cá nhân</h2>
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <p className="stat-label">Gói tập hiện tại</p>
            <p className="stat-value">Gói 3 tháng</p>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <p className="stat-label">Ngày hết hạn</p>
            <p className="stat-value">15/04/2025</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

/* ============================================================================
   PROTECTED ROUTE
   ============================================================================ */

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />
}

/* ============================================================================
   MAIN APP COMPONENT
   ============================================================================ */

export default function App() {
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const getPageTitle = (role) => {
    const titles = {
      admin: '👨‍💼 Quản trị viên',
      receptionist: '🎫 Lễ tân',
      pt: '🏋️ Huấn luyện viên',
      customer: '👤 Khách hàng',
    }
    return titles[role] || 'GymSystem'
  }

  return (
    <Router>
      <div className="app">
        {user && <Header user={user} onLogout={handleLogout} title={getPageTitle(user.role)} />}
        
        {user && <Sidebar role={user.role} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />}
        
        <main className={`main-content ${user ? 'with-sidebar' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute user={user}>
                  {user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/members"
              element={
                <ProtectedRoute user={user}>
                  {user?.role === 'admin' ? <AdminMembers /> : <Navigate to="/" />}
                </ProtectedRoute>
              }
            />

            {/* Receptionist Routes */}
            <Route
              path="/receptionist/dashboard"
              element={
                <ProtectedRoute user={user}>
                  {user?.role === 'receptionist' ? <ReceptionistDashboard /> : <Navigate to="/" />}
                </ProtectedRoute>
              }
            />

            {/* PT Routes */}
            <Route
              path="/pt/dashboard"
              element={
                <ProtectedRoute user={user}>
                  {user?.role === 'pt' ? <PTDashboard /> : <Navigate to="/" />}
                </ProtectedRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute user={user}>
                  {user?.role === 'customer' ? <CustomerDashboard /> : <Navigate to="/" />}
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<div className="page-not-found"><h2>404 - Không tìm thấy trang</h2></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
