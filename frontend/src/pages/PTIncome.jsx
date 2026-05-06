import React, { useState } from 'react'
import PTLayout from '../components/PTLayout'
import './PTIncome.css'

function PTIncome({ onLogout }) {
  const [filterMonth, setFilterMonth] = useState('02/2025')

  const [incomeSummary] = useState({
    thisMonth: '12,500,000',
    perSession: 250000,
    totalSessions: 50,
    confirmedSessions: 45,
    pendingSessions: 3,
    cancelledSessions: 2,
    lastMonth: '10,200,000',
    avgRating: 4.8,
  })

  const [sessions] = useState([
    { id: 1, date: '20/02', student: 'Nguyễn Văn A', time: '07:00 - 08:00', type: 'PT Cá nhân', amount: 250000, ptConfirmed: true, memberConfirmed: true, status: 'paid' },
    { id: 2, date: '20/02', student: 'Trần Thị B', time: '08:00 - 09:00', type: 'PT Cá nhân', amount: 250000, ptConfirmed: true, memberConfirmed: true, status: 'paid' },
    { id: 3, date: '19/02', student: 'Lê Văn C', time: '17:30 - 18:30', type: 'Yoga Group', amount: 180000, ptConfirmed: true, memberConfirmed: true, status: 'paid' },
    { id: 4, date: '18/02', student: 'Nguyễn Văn A', time: '07:00 - 08:00', type: 'PT Cá nhân', amount: 250000, ptConfirmed: true, memberConfirmed: false, status: 'pending' },
    { id: 5, date: '17/02', student: 'Phạm Thị D', time: '08:00 - 09:00', type: 'PT Cá nhân', amount: 250000, ptConfirmed: true, memberConfirmed: true, status: 'paid' },
    { id: 6, date: '15/02', student: 'Trần Thị B', time: '06:00 - 07:00', type: 'PT Cá nhân', amount: 250000, ptConfirmed: false, memberConfirmed: false, status: 'unconfirmed' },
    { id: 7, date: '14/02', student: 'Lê Văn C', time: '07:00 - 08:00', type: 'PT Cá nhân', amount: 250000, ptConfirmed: true, memberConfirmed: true, status: 'paid' },
  ])

  const [completedSessions] = useState([
    { id: 1, date: '10/02', student: 'Nguyễn Văn A', time: '07:00 - 08:00', status: 'confirmed' },
    { id: 2, date: '08/02', student: 'Trần Thị B', time: '08:00 - 09:00', status: 'confirmed' },
    { id: 3, date: '06/02', student: 'Lê Văn C', time: '17:30 - 18:30', status: 'confirmed' },
    { id: 4, date: '05/02', student: 'Phạm Thị D', time: '07:00 - 08:00', status: 'confirmed' },
    { id: 5, date: '03/02', student: 'Nguyễn Văn A', time: '08:00 - 09:00', status: 'confirmed' },
  ])

  const handleCompleteSession = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId)
    if (!session) return
    setSessions(sessions.map(s => s.id === sessionId ? { ...s, ptConfirmed: true, status: 'pending' } : s))
    alert(`✅ Đã bấm "Hoàn thành buổi tập" cho ${session.student} ngày ${session.date}!`)
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + 'đ'
  }

  return (
    <PTLayout onLogout={onLogout}>
      <div className="pt-income-page">
        <div className="pt-page-header">
          <h2>Thu nhập</h2>
          <select className="month-select" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
            <option value="02/2025">Tháng 02/2025</option>
            <option value="01/2025">Tháng 01/2025</option>
            <option value="12/2024">Tháng 12/2024</option>
          </select>
        </div>

        {/* Summary */}
        <div className="income-summary">
          <div className="income-main-card">
            <div className="income-main-header">
              <span className="im-label">Thu nhập tháng này</span>
              <span className="im-amount">{formatCurrency(incomeSummary.thisMonth)}</span>
            </div>
            <div className="income-per-session">
              <span>💰 {formatCurrency(incomeSummary.perSession)}/buổi</span>
              <span>⭐ {incomeSummary.avgRating} sao</span>
            </div>
            <div className="income-compare">
              Tháng trước: {formatCurrency(incomeSummary.lastMonth)}
              <span className="income-up"> ▲ +22.5%</span>
            </div>
          </div>

          <div className="income-stats-grid">
            <div className="income-stat"><span className="is-value">{incomeSummary.totalSessions}</span><span className="is-label">Tổng buổi</span></div>
            <div className="income-stat"><span className="is-value green">{incomeSummary.confirmedSessions}</span><span className="is-label">Đã xác nhận 2 chiều</span></div>
            <div className="income-stat"><span className="is-value orange">{incomeSummary.pendingSessions}</span><span className="is-label">Chờ xác nhận HV</span></div>
            <div className="income-stat"><span className="is-value red">{incomeSummary.cancelledSessions}</span><span className="is-label">Đã hủy</span></div>
          </div>
        </div>

        {/* Today's sessions to complete */}
        <div className="pt-section">
          <div className="pt-section-header">
            <h3 className="pt-section-title">⏳ Bấm hoàn thành buổi tập</h3>
          </div>
          {sessions.filter(s => !s.ptConfirmed).length === 0 ? (
            <p className="text-muted">Không có buổi tập nào cần xác nhận.</p>
          ) : (
            <div className="complete-list">
              {sessions.filter(s => !s.ptConfirmed).map(s => (
                <div key={s.id} className="complete-item">
                  <div className="complete-info">
                    <span className="complete-student">{s.student}</span>
                    <span className="complete-detail">{s.date} · {s.time} · {s.type}</span>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => handleCompleteSession(s.id)}>✅ Hoàn thành</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Session history */}
        <div className="pt-section">
          <h3 className="pt-section-title">Lịch sử buổi dạy</h3>
          <div className="session-history-table-wrapper">
            <table className="session-history-table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Học viên</th>
                  <th>Giờ</th>
                  <th>Loại</th>
                  <th>Số tiền</th>
                  <th>Xác nhận PT</th>
                  <th>Xác nhận HV</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id}>
                    <td>{s.date}</td>
                    <td className="td-student">{s.student}</td>
                    <td>{s.time}</td>
                    <td>{s.type}</td>
                    <td className="td-amount">{formatCurrency(s.amount)}</td>
                    <td>{s.ptConfirmed ? '✅' : '⏳'}</td>
                    <td>{s.memberConfirmed ? '✅' : '⏳'}</td>
                    <td>
                      <span className={`session-status ${s.status}`}>
                        {s.status === 'paid' ? 'Đã thanh toán' : s.status === 'pending' ? 'Chờ HV xác nhận' : 'Chưa xác nhận'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Completed sessions list */}
        <div className="pt-section">
          <div className="pt-section-header">
            <h3 className="pt-section-title">✅ Buổi đã hoàn thành</h3>
          </div>
          <div className="completed-list">
            {completedSessions.map(s => (
              <div key={s.id} className="completed-item">
                <div className="completed-date-box">
                  <span className="cd-day">{s.date.split('/')[0]}</span>
                  <span className="cd-month">Th{s.date.split('/')[1]}</span>
                </div>
                <div className="completed-info">
                  <span className="ci-student">{s.student}</span>
                  <span className="ci-time">🕐 {s.time}</span>
                </div>
                <span className="ci-status">✅ Đã xác nhận 2 chiều</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PTLayout>
  )
}

export default PTIncome
