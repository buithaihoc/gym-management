/**
 * APP.JSX - MAIN REACT COMPONENT
 * 
 * Tác dụng: Component gốc của ứng dụng
 * Tại sao cần: Nơi định nghĩa routing, layout chính, context provider
 * 
 * Cấu trúc:
 * - Router setup
 * - Main layout (Header, Sidebar, Main, Footer)
 * - Page routes
 * 
 * Imports:
 * - React components
 * - Pages
 * - Context/State
 * - CSS
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// ===== COMPONENTS =====
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

// ===== PAGES =====
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Memberships from './pages/Memberships'
import Payments from './pages/Payments'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

/**
 * APP COMPONENT - COMPONENT CHÍNH CỦA ỨNG DỤNG
 * 
 * Props: Không có
 * State: Quản lý bởi Redux/Context
 * 
 * Render:
 * - Header (Navigation bar)
 * - Container chính
 *   - Sidebar (Menu bên trái)
 *   - Main content area (Routes)
 * - Footer
 */

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* ===== HEADER / NAVIGATION ===== */}
        <Header />
        
        {/* ===== MAIN LAYOUT ===== */}
        <div className="app-main">
          {/* ===== SIDEBAR / MENU ===== */}
          <Sidebar />
          
          {/* ===== MAIN CONTENT AREA ===== */}
          <main className="app-content">
            <Routes>
              {/* Dashboard - Trang chủ */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Members Management - Quản lý thành viên */}
              <Route path="/members" element={<Members />} />
              
              {/* Memberships Management - Quản lý gói tập */}
              <Route path="/memberships" element={<Memberships />} />
              
              {/* Payments Management - Quản lý thanh toán */}
              <Route path="/payments" element={<Payments />} />
              
              {/* Settings - Cài đặt */}
              <Route path="/settings" element={<Settings />} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        
        {/* ===== FOOTER ===== */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
