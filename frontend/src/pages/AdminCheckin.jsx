import React, { useState } from 'react'
import Layout from '../components/Layout'
import './AdminCheckin.css'

function AdminCheckin({ onLogout }) {
  const [scanMode, setScanMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [manualCode, setManualCode] = useState('')
  const [message, setMessage] = useState('')

  const [checkins] = useState([
    { id: 1, member: 'Nguyễn Văn A', timeIn: '07:30', timeOut: '09:15', date: '20/02/2025', method: 'QR' },
    { id: 2, member: 'Trần Thị B', timeIn: '08:00', timeOut: '09:45', date: '20/02/2025', method: 'QR' },
    { id: 3, member: 'Phạm Thị D', timeIn: '08:15', timeOut: null, date: '20/02/2025', method: 'Thủ công' },
    { id: 4, member: 'Lê Văn C', timeIn: '17:30', timeOut: '19:00', date: '20/02/2025', method: 'QR' },
    { id: 5, member: 'Nguyễn Văn A', timeIn: '07:00', timeOut: '08:50', date: '19/02/2025', method: 'QR' },
    { id: 6, member: 'Trần Thị B', timeIn: '08:30', timeOut: '10:00', date: '19/02/2025', method: 'QR' },
  ])

  const todayCount = checkins.filter(c => c.date === '20/02/2025').length
  const activeCount = checkins.filter(c => c.date === '20/02/2025' && !c.timeOut).length

  const handleManualCheckin = () => {
    if (!manualCode.trim()) return
    setMessage(`✅ Check-in thành công cho mã ${manualCode}`)
    setManualCode('')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCheckout = (id) => {
    setMessage('✅ Check-out thành công!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleQRScan = () => {
    setScanMode(!scanMode)
    if (!scanMode) setMessage('📷 Đang chờ quét QR...')
  }

  const filteredCheckins = checkins.filter(c =>
    c.member.toLowerCase().includes(searchTerm.toLowerCase()) && c.date === '20/02/2025'
  )

  return (
    <Layout onLogout={onLogout}>
      <div className="checkin-page">
        <div className="page-header">
          <h2>Check-in</h2>
          <button className={`btn-primary ${scanMode ? 'scanning' : ''}`} onClick={handleQRScan}>
            {scanMode ? '⏹ Dừng quét' : '📷 Quét QR'}
          </button>
        </div>

        {message && <div className="checkin-message">{message}</div>}

        <div className="checkin-stats">
          <div className="cs-card blue"><span className="cs-value">{todayCount}</span><span className="cs-label">Check-in hôm nay</span></div>
          <div className="cs-card green"><span className="cs-value">{activeCount}</span><span className="cs-label">Đang tập</span></div>
          <div className="cs-card orange"><span className="cs-value">{checkins.filter(c => c.date === '20/02/2025' && c.timeOut).length}</span><span className="cs-label">Đã ra</span></div>
        </div>

        {scanMode && (
          <div className="qr-scanner-area">
            <div className="scanner-frame">
              <div className="scanner-line" />
              <span className="scanner-placeholder">📷</span>
            </div>
            <p>Đưa mã QR của hội viên vào khung hình</p>
          </div>
        )}

        <div className="checkin-tools">
          <div className="manual-checkin">
            <h4>Check-in thủ công</h4>
            <div className="manual-input-group">
              <input type="text" value={manualCode} onChange={e => setManualCode(e.target.value)} placeholder="Nhập mã hội viên hoặc SĐT" />
              <button className="btn-primary btn-sm" onClick={handleManualCheckin}>✅ Check-in</button>
            </div>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm hội viên..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="table-container">
          <table className="checkin-table">
            <thead>
              <tr><th>STT</th><th>Hội viên</th><th>Giờ vào</th><th>Giờ ra</th><th>Phương thức</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {filteredCheckins.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td className="td-member">{c.member}</td>
                  <td className="td-time">{c.timeIn}</td>
                  <td>{c.timeOut || <span className="text-active">Đang tập</span>}</td>
                  <td>{c.method}</td>
                  <td>
                    {!c.timeOut ? (
                      <button className="btn-checkout" onClick={() => handleCheckout(c.id)}>🚪 Check-out</button>
                    ) : <span className="text-muted">Đã ra</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default AdminCheckin
