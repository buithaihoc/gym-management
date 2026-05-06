import React, { useState } from 'react'
import MemberLayout from '../components/MemberLayout'
import './MemberSessions.css'

function MemberSessions({ onLogout }) {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      date: '22/02/2025',
      time: '08:00 - 09:00',
      trainer: 'HLV Nguyễn Văn Minh',
      status: 'pending', // pending | confirmed | cancelled
      note: '',
      image: null,
      exercises: ['Bench Press', 'Squat', 'Deadlift'],
    },
    {
      id: 2,
      date: '19/02/2025',
      time: '08:00 - 09:00',
      trainer: 'HLV Nguyễn Văn Minh',
      status: 'confirmed',
      note: 'Hoàn thành tốt buổi tập. Tăng tạ bench press lên 5kg.',
      image: '📸',
      exercises: ['Bench Press - 3x12 @ 50kg', 'Shoulder Press - 3x10 @ 20kg', 'Lat Pulldown - 3x12 @ 40kg'],
    },
    {
      id: 3,
      date: '17/02/2025',
      time: '08:00 - 09:00',
      trainer: 'HLV Nguyễn Văn Minh',
      status: 'confirmed',
      note: 'Buổi tập chân: squat 3x10, leg press 3x12, lunges 3x10.',
      image: '📸',
      exercises: ['Squat - 3x10 @ 60kg', 'Leg Press - 3x12 @ 80kg', 'Lunges - 3x10 @ 20kg'],
    },
    {
      id: 4,
      date: '15/02/2025',
      time: '08:00 - 09:00',
      trainer: 'HLV Nguyễn Văn Minh',
      status: 'cancelled',
      note: 'Hội viên hủy lịch trước 2h.',
      image: null,
      exercises: [],
    },
  ])

  const [expandedId, setExpandedId] = useState(null)
  const [confirmImage, setConfirmImage] = useState(null)
  const [confirmNote, setConfirmNote] = useState('')

  const handleConfirm = (sessionId) => {
    if (!confirmImage) {
      alert('Vui lòng chụp ảnh minh chứng buổi tập!')
      return
    }
    setSessions(sessions.map(s => 
      s.id === sessionId 
        ? { ...s, status: 'confirmed', note: confirmNote, image: '📸' }
        : s
    ))
    setConfirmImage(null)
    setConfirmNote('')
    setExpandedId(null)
    alert('✅ Đã xác nhận buổi tập!')
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="session-badge pending">⏳ Chờ xác nhận</span>
      case 'confirmed': return <span className="session-badge confirmed">✅ Đã xác nhận</span>
      case 'cancelled': return <span className="session-badge cancelled">❌ Đã hủy</span>
      default: return null
    }
  }

  return (
    <MemberLayout onLogout={onLogout}>
      <div className="member-sessions-page">
        <h2 className="page-title">Buổi tập PT</h2>

        {/* Info banner */}
        <div className="sessions-info-banner">
          <span className="info-icon">ℹ️</span>
          <p>Buổi tập sẽ được PT xác nhận sau 24h. Bạn cần xác nhận buổi tập để hoàn tất.</p>
        </div>

        {/* Summary */}
        <div className="sessions-summary">
          <div className="summary-item">
            <span className="summary-value">{sessions.filter(s => s.status === 'confirmed').length}</span>
            <span className="summary-label">Đã xác nhận</span>
          </div>
          <div className="summary-item">
            <span className="summary-value pending">{sessions.filter(s => s.status === 'pending').length}</span>
            <span className="summary-label">Chờ xác nhận</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">8</span>
            <span className="summary-label">Còn lại trong gói</span>
          </div>
        </div>

        {/* Session list */}
        <div className="sessions-list">
          {sessions.map(session => (
            <div key={session.id} className={`session-card ${session.status}`}>
              <div className="session-main">
                <div className="session-date-box">
                  <span className="session-day">{session.date.split('/')[0]}</span>
                  <span className="session-month">Th{session.date.split('/')[1]}</span>
                </div>
                <div className="session-content">
                  <div className="session-header-row">
                    <span className="session-time">🕐 {session.time}</span>
                    {getStatusBadge(session.status)}
                  </div>
                  <span className="session-trainer">👨‍🏫 {session.trainer}</span>

                  {session.status === 'confirmed' && session.note && (
                    <div className="session-note">
                      <p>📝 {session.note}</p>
                      {session.image && <span className="session-image-proof">📷 Ảnh minh chứng</span>}
                    </div>
                  )}

                  {session.status === 'pending' && (
                    <div className="session-pending-actions">
                      <button className="btn-primary btn-sm" onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}>
                        {expandedId === session.id ? '▲ Thu gọn' : '✅ Xác nhận buổi tập'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable confirm form */}
              {expandedId === session.id && session.status === 'pending' && (
                <div className="session-confirm-form">
                  <div className="form-group">
                    <label>📸 Ảnh minh chứng <span className="required">*</span></label>
                    <div className="image-upload-box" onClick={() => document.getElementById('imageInput').click()}>
                      {confirmImage ? (
                        <div className="image-preview">
                          <span className="image-preview-icon">📸</span>
                          <span className="image-preview-name">Ảnh đã chụp</span>
                          <button className="btn-remove-image" onClick={(e) => { e.stopPropagation(); setConfirmImage(null) }}>✕</button>
                        </div>
                      ) : (
                        <div className="image-upload-placeholder">
                          <span className="upload-icon">📷</span>
                          <span>Chụp ảnh hoặc tải lên ảnh minh chứng</span>
                        </div>
                      )}
                      <input id="imageInput" type="file" accept="image/*" capture="environment" 
                             style={{ display: 'none' }}
                             onChange={(e) => {
                               if (e.target.files[0]) setConfirmImage(e.target.files[0].name)
                             }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Ghi chú (tùy chọn)</label>
                    <textarea 
                      value={confirmNote}
                      onChange={(e) => setConfirmNote(e.target.value)}
                      placeholder="Cảm nhận về buổi tập, bài tập đã thực hiện..."
                      rows="2"
                    />
                  </div>
                  <div className="form-actions">
                    <button className="btn-secondary" onClick={() => setExpandedId(null)}>Hủy</button>
                    <button className="btn-primary" onClick={() => handleConfirm(session.id)}>
                      ✅ Xác nhận hoàn tất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberSessions
