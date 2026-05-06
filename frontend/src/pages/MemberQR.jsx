import React, { useState, useEffect } from 'react'
import MemberLayout from '../components/MemberLayout'
import './MemberQR.css'

function MemberQR({ onLogout }) {
  const [qrCode, setQrCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [showHistory, setShowHistory] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)

  // Tạo mã QR giả định (mã thay đổi mỗi 30s)
  useEffect(() => {
    generateQR()
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          generateQR()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const generateQR = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'GYM-'
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setQrCode(code)
    setTimeLeft(30)
  }

  const handleCheckin = () => {
    setCheckedIn(true)
    setTimeout(() => setCheckedIn(false), 3000)
  }

  const checkinHistory = [
    { date: '20/02/2025', timeIn: '07:30', timeOut: '09:15' },
    { date: '19/02/2025', timeIn: '08:00', timeOut: '09:45' },
    { date: '18/02/2025', timeIn: '17:30', timeOut: '19:00' },
    { date: '17/02/2025', timeIn: '07:45', timeOut: '09:30' },
    { date: '16/02/2025', timeIn: '08:15', timeOut: '10:00' },
    { date: '15/02/2025', timeIn: '07:00', timeOut: '08:50' },
    { date: '14/02/2025', timeIn: '17:00', timeOut: '18:45' },
    { date: '13/02/2025', timeIn: '08:30', timeOut: '10:15' },
  ]

  return (
    <MemberLayout onLogout={onLogout}>
      <div className="member-qr-page">
        <h2 className="page-title">Check-in QR</h2>

        {/* QR Code Display */}
        <div className="qr-display-card">
          <div className="qr-header">
            <h3>Mã QR của bạn</h3>
            <div className="qr-timer" style={{ color: timeLeft <= 10 ? '#ef4444' : '#64748b' }}>
              <span className="timer-value">{timeLeft}s</span>
              <div className="timer-bar">
                <div className="timer-fill" style={{ width: `${(timeLeft / 30) * 100}%`, background: timeLeft <= 10 ? '#ef4444' : '#22c55e' }} />
              </div>
            </div>
          </div>

          <div className="qr-code-box">
            <div className="qr-code-visual">
              {/* Mô phỏng QR code */}
              <div className="qr-grid">
                {[...Array(11)].map((_, row) => (
                  <div className="qr-row" key={row}>
                    {[...Array(11)].map((_, col) => {
                      const isBorder = row === 0 || row === 10 || col === 0 || col === 10
                      const isCorner = (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3)
                      const isCenter = row >= 4 && row <= 6 && col >= 4 && col <= 6
                      const isRandom = Math.random() > 0.5
                      const filled = isBorder || isCorner || isCenter || isRandom
                      return <div key={col} className={`qr-dot ${filled ? 'filled' : 'empty'}`} />
                    })}
                  </div>
                ))}
              </div>
              <div className="qr-center-logo">💪</div>
            </div>
          </div>

          <div className="qr-code-text">
            <span className="qr-code-value">{qrCode}</span>
            <button className="btn-refresh" onClick={generateQR} title="Tạo mã mới">🔄</button>
          </div>

          <p className="qr-notice">
            ⚠️ Mã QR tự động làm mới sau mỗi 30 giây. 
            Mã chỉ hợp lệ trong vòng 1-2 phút. Không dùng ảnh chụp màn hình.
          </p>

          <button className={`btn-checkin ${checkedIn ? 'checked' : ''}`} onClick={handleCheckin}>
            {checkedIn ? '✅ Đã check-in thành công!' : '📱 Check-in bằng mã này'}
          </button>
        </div>

        {/* QR Instructions */}
        <div className="qr-instructions">
          <h3>Hướng dẫn sử dụng</h3>
          <div className="instruction-steps">
            <div className="instruction-step">
              <span className="step-number">1</span>
              <span>Đưa mã QR lên máy quét tại quầy lễ tân</span>
            </div>
            <div className="instruction-step">
              <span className="step-number">2</span>
              <span>Máy sẽ tự động nhận diện và check-in</span>
            </div>
            <div className="instruction-step">
              <span className="step-number">3</span>
              <span>Bạn sẽ nhận được thông báo xác nhận</span>
            </div>
            <div className="instruction-step warning">
              <span className="step-number">⚠️</span>
              <span>Không dùng ảnh chụp màn hình - mã sẽ không hợp lệ</span>
            </div>
          </div>
        </div>

        {/* Check-in History */}
        <div className="section">
          <div className="section-header" onClick={() => setShowHistory(!showHistory)} style={{ cursor: 'pointer' }}>
            <h3 className="section-title">Lịch sử check-in</h3>
            <span className="section-link">{showHistory ? 'Thu gọn ▲' : 'Xem tất cả ▼'}</span>
          </div>
          
          {showHistory && (
            <div className="checkin-history-table-wrapper">
              <table className="checkin-history-table">
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Giờ vào</th>
                    <th>Giờ ra</th>
                    <th>Thời gian tập</th>
                  </tr>
                </thead>
                <tbody>
                  {checkinHistory.map((item, index) => {
                    const [hIn, mIn] = item.timeIn.split(':').map(Number)
                    const [hOut, mOut] = item.timeOut.split(':').map(Number)
                    const duration = (hOut * 60 + mOut) - (hIn * 60 + mIn)
                    const hours = Math.floor(duration / 60)
                    const mins = duration % 60
                    return (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.timeIn}</td>
                        <td>{item.timeOut}</td>
                        <td>{hours}h{mins > 0 ? `${mins}ph` : ''}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberQR
