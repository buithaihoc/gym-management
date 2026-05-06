import React, { useState } from 'react'
import Layout from '../components/Layout'
import './AdminHealth.css'

function AdminHealth({ onLogout }) {
  const [selectedMember, setSelectedMember] = useState(null)
  const [showRecord, setShowRecord] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const members = [
    { id: 1, name: 'Nguyễn Văn A', avatar: '👤', lastCheck: '20/02/2025', weight: 72.8, fat: 20.1, muscle: 36.5, bmi: 23.8, status: 'good' },
    { id: 2, name: 'Trần Thị B', avatar: '👩', lastCheck: '12/02/2025', weight: 58.5, fat: 24.5, muscle: 28.0, bmi: 22.1, status: 'good' },
    { id: 3, name: 'Lê Văn C', avatar: '👤', lastCheck: '05/02/2025', weight: 82.3, fat: 28.2, muscle: 32.1, bmi: 27.5, status: 'warning' },
    { id: 4, name: 'Phạm Thị D', avatar: '👩', lastCheck: '29/01/2025', weight: 65.0, fat: 30.5, muscle: 25.8, bmi: 26.8, status: 'warning' },
    { id: 5, name: 'Hoàng Văn E', avatar: '👤', lastCheck: 'Chưa đo', weight: 0, fat: 0, muscle: 0, bmi: 0, status: 'none' },
  ]

  const fullHealthRecord = {
    injuryHistory: 'Chấn thương đầu gối trái (2023), đã phục hồi 90%. Thoát vị đĩa đệm L4-L5 nhẹ (2022)',
    medicalHistory: 'Hen suyễn nhẹ (kiểm soát tốt), huyết áp bình thường.',
    medications: 'Không sử dụng thuốc thường xuyên.',
    inbodyHistory: [
      { date: '20/02/2025', weight: 72.8, fat: 20.1, muscle: 36.5, bmi: 23.8 },
      { date: '12/02/2025', weight: 73.5, fat: 20.8, muscle: 36.0, bmi: 24.1 },
      { date: '29/01/2025', weight: 74.5, fat: 21.8, muscle: 35.5, bmi: 24.5 },
    ],
    ptNote: 'Cần tránh bài tập nhảy cao tác động mạnh lên đầu gối. Theo dõi hơi thở trong bài cardio.'
  }

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (selectedMember) {
    return (
      <Layout onLogout={onLogout}>
        <div className="health-detail-page">
          <button className="btn-back" onClick={() => setSelectedMember(null)}>← Quay lại danh sách</button>
          
          <div className="hd-header">
            <div className="hd-avatar">{selectedMember.avatar}</div>
            <div className="hd-info">
              <h3>{selectedMember.name}</h3>
              <p>Lần đo gần nhất: {selectedMember.lastCheck}</p>
            </div>
          </div>

          <div className="hd-inbody">
            <h4>InBody gần nhất</h4>
            <div className="inbody-stats">
              <div className="ib-stat"><span className="ib-value">{selectedMember.weight}</span><span className="ib-label">Cân nặng (kg)</span></div>
              <div className="ib-stat"><span className="ib-value">{selectedMember.fat}%</span><span className="ib-label">Mỡ cơ thể</span></div>
              <div className="ib-stat"><span className="ib-value">{selectedMember.muscle}</span><span className="ib-label">Cơ (kg)</span></div>
              <div className="ib-stat"><span className="ib-value">{selectedMember.bmi}</span><span className="ib-label">BMI</span></div>
            </div>
          </div>

          <div className="hd-section">
            <h4>⚠️ Lịch sử chấn thương</h4>
            <p>{fullHealthRecord.injuryHistory}</p>
          </div>
          <div className="hd-section">
            <h4>🩺 Tiền sử bệnh lý</h4>
            <p>{fullHealthRecord.medicalHistory}</p>
          </div>
          <div className="hd-section warning">
            <h4>📝 Lưu ý từ PT</h4>
            <p>{fullHealthRecord.ptNote}</p>
          </div>

          <div className="hd-section">
            <h4>Lịch sử InBody</h4>
            <div className="inbody-table-wrapper">
              <table className="inbody-table">
                <thead><tr><th>Ngày</th><th>Cân nặng</th><th>% Mỡ</th><th>Cơ (kg)</th><th>BMI</th></tr></thead>
                <tbody>
                  {fullHealthRecord.inbodyHistory.map((d, i) => (
                    <tr key={i}><td>{d.date}</td><td>{d.weight}</td><td>{d.fat}%</td><td>{d.muscle}</td><td>{d.bmi}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onLogout={onLogout}>
      <div className="admin-health-page">
        <div className="page-header">
          <h2>Theo dõi sức khỏe</h2>
          <div className="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Tìm kiếm hội viên..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="health-members-grid">
          {filteredMembers.map(m => (
            <div key={m.id} className={`hm-card ${m.status}`} onClick={() => setSelectedMember(m)}>
              <div className="hm-avatar">{m.avatar}</div>
              <h4>{m.name}</h4>
              <p className="hm-last">{m.lastCheck}</p>
              <div className="hm-stats">
                <span>{m.weight > 0 ? `${m.weight}kg` : '---'}</span>
                <span>{m.fat > 0 ? `${m.fat}%` : '---'}</span>
              </div>
              <span className={`hm-status ${m.status}`}>
                {m.status === 'good' ? '✅ Ổn định' : m.status === 'warning' ? '⚠️ Cần theo dõi' : '📅 Chưa đo'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default AdminHealth
