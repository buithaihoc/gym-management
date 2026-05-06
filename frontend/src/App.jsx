import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Members from './pages/Members'
import MemberHome from './pages/MemberHome'
import MemberProfile from './pages/MemberProfile'
import MemberQR from './pages/MemberQR'
import MemberSchedule from './pages/MemberSchedule'
import MemberHealth from './pages/MemberHealth'
import MemberSessions from './pages/MemberSessions'
import PTDashboard from './pages/PTDashboard'
import PTStudents from './pages/PTStudents'
import PTCurriculum from './pages/PTCurriculum'
import PTSchedule from './pages/PTSchedule'
import PTIncome from './pages/PTIncome'
import Memberships from './pages/Memberships'
import Payments from './pages/Payments'
import AdminCheckin from './pages/AdminCheckin'
import AdminSchedule from './pages/AdminSchedule'
import AdminHealth from './pages/AdminHealth'
import AdminSessions from './pages/AdminSessions'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/member/home" /> : <Login onLogin={handleLogin} />
        } />

        {/* Admin routes */}
        <Route path="/members" element={
          <ProtectedRoute><Members onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/memberships" element={
          <ProtectedRoute><Memberships onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/payments" element={
          <ProtectedRoute><Payments onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/checkin" element={
          <ProtectedRoute><AdminCheckin onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/schedule" element={
          <ProtectedRoute><AdminSchedule onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/health" element={
          <ProtectedRoute><AdminHealth onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/sessions" element={
          <ProtectedRoute><AdminSessions onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Navigate to="/members" /></ProtectedRoute>
        } />

        {/* Member routes */}
        <Route path="/member/home" element={
          <ProtectedRoute><MemberHome onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/member/profile" element={
          <ProtectedRoute><MemberProfile onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/member/qr" element={
          <ProtectedRoute><MemberQR onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/member/schedule" element={
          <ProtectedRoute><MemberSchedule onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/member/health" element={
          <ProtectedRoute><MemberHealth onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/member/sessions" element={
          <ProtectedRoute><MemberSessions onLogout={handleLogout} /></ProtectedRoute>
        } />

        {/* PT routes */}
        <Route path="/pt/dashboard" element={
          <ProtectedRoute><PTDashboard onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/pt/students" element={
          <ProtectedRoute><PTStudents onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/pt/curriculum" element={
          <ProtectedRoute><PTCurriculum onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/pt/schedule" element={
          <ProtectedRoute><PTSchedule onLogout={handleLogout} /></ProtectedRoute>
        } />
        <Route path="/pt/income" element={
          <ProtectedRoute><PTIncome onLogout={handleLogout} /></ProtectedRoute>
        } />

        {/* Default */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/member/home" : "/login"} />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/member/home" : "/login"} />} />
            </Routes>
    </Router>
  )
}

export default App

