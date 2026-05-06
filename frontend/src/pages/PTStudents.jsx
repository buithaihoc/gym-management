import React, { useState } from 'react'
import PTLayout from '../components/PTLayout'
import './PTStudents.css'

function PTStudents({ onLogout }) {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [activeTab, setActiveTab] = useState('profile') // profile | health | notes | inbody
  const [noteText, setNoteText] = useState('')
  const [studentNotes, setStudentNotes] = useState({})

  const students = [
    { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', phone: '0912345678', email: 'nguyenvana@gmail.com', startDate: '10/01/2025', sessions: 12, avatar: '👤' },
    { id: 2, name: 'Trần Thị B', gender: 'Nữ', phone: '0987654321', email: 'tranthib@gmail.com', startDate: '01/02/2025', sessions: 8, avatar: '👩' },
    { id: 3, name: 'Lê Văn C', gender: 'Nam', phone: '0977112233', email: 'levanc@gmail.com', startDate: '15/12/2024', sessions: 20, avatar: '👤' },
    { id: 4, name: 'Phạm Thị D', gender: 'Nữ', phone: '0966889900', email: 'phamthid@gmail.com', startDate: '05/01/2025', sessions: 15, avatar: '👩' },
    { id: 5, name: 'Hoàng Văn E', gender: 'Nam', phone: '0933556677', email: 'hoangvane@gmail.com', startDate: '20/02/2025', sessions: 3, avatar: '👤' },
    { id: 6, name: 'Đặng Thị F', gender: 'Nữ', phone: '0900112233', email: 'dangthif@gmail.com', startDate: '10/03/2025', sessions: 1, avatar: '👩' },
  ]

  const healthRecord = {
    injuryHistory: 'Chấn thương đầu gối trái (2023), đã phục hồi 90%. Thoát vị đĩa đệm L4-L5 nhẹ (2022)',
    medicalHistory: 'Hen suyễn nhẹ (kiểm soát tốt), huyết áp bình thường. Không dị ứng thuốc.',
    medications: 'Không sử dụng thuốc thường xuyên. Có mang thuốc hen dự phòng.',
    note: 'Cần tránh bài tập nhảy cao tác động mạnh lên đầu gối. Theo dõi hơi thở trong bài cardio.',
  }

  const inbodyData = [
    { date: '20/02/2025', weight: 72.8, fat: 20.1, muscle: 36.5, bmi: 23.8 },
    { date: '12/02/2025', weight: 73.5, fat: 20.8, muscle: 36.0, bmi: 24.1 },
    { date: '29/01/2025', weight: 74.5, fat: 21.8, muscle: 35.5, bmi: 24.5 },
  ]

  const handleAddNote = () => {
    if (!noteText.trim()) return
    const studentId = selectedStudent.id
    const newNote = { text: noteText, date: new Date().toLocaleDateString('vi-VN'), by: 'HLV Minh' }
    setStudentNotes({ ...studentNotes, [studentId]: [...(studentNotes[studentId] || []), newNote] })
    setNoteText('')
  }

  if (selectedStudent) {
    const notes = studentNotes[selectedStudent.id] || []
    return (
      <PTLayout onLogout={onLogout}>
        <div className="pt-student-detail">
          <button className="btn-back" onClick={() => setSelectedStudent(null)}>← Quay lại danh sách</button>

          <div className="pt-student-header">
            <div className="pt-student-avatar">{selectedStudent.avatar}</div>
            <div className="pt-student-info">
              <h2>{selectedStudent.name}</h2>
              <p>{selectedStudent.gender} · {selectedStudent.phone} · {selectedStudent.email}</p>
              <p>Tham gia: {selectedStudent.startDate} · Đã tập: {selectedStudent.sessions} buổi</p>
            </div>
          </div>

          <div className="pt-student-tabs">
            <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Hồ sơ</button>
            <button className={`tab-btn ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>Sức khỏe</button>
            <button className={`tab-btn ${activeTab === 'inbody' ? 'active' : ''}`} onClick={() => setActiveTab('inbody')}>InBody</button>
            <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>Ghi chú</button>
          </div>

          <div className="pt-section">
            {activeTab === 'profile' && (
              <div className="profile-detail-grid">
                <div className="profile-detail-item"><label>Họ tên</label><span>{selectedStudent.name}</span></div>
                <div className="profile-detail-item"><label>Giới tính</label><span>{selectedStudent.gender}</span></div>
                <div className="profile-detail-item"><label>SĐT</label><span>{selectedStudent.phone}</span></div>
                <div className="profile-detail-item"><label>Email</label><span>{selectedStudent.email}</span></div>
                <div className="profile-detail-item"><label>Ngày tham gia</label><span>{selectedStudent.startDate}</span></div>
                <div className="profile-detail-item"><label>Số buổi đã tập</label><span>{selectedStudent.sessions}</span></div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="health-detail">
                <div className="health-section">
                  <h4>⚠️ Lịch sử chấn thương</h4>
                  <p>{healthRecord.injuryHistory}</p>
                </div>
                <div className="health-section">
                  <h4>🩺 Tiền sử bệnh lý</h4>
                  <p>{healthRecord.medicalHistory}</p>
                </div>
                <div className="health-section">
                  <h4>💊 Thuốc đang sử dụng</h4>
                  <p>{healthRecord.medications}</p>
                </div>
                <div className="health-section warning">
                  <h4>⚠️ Lưu ý cho PT</h4>
                  <p>{healthRecord.note}</p>
                </div>
                <p className="health-disclaimer">🔒 Dữ liệu bệnh lý nhạy cảm - không được chia sẻ hay xuất file.</p>
              </div>
            )}

            {activeTab === 'inbody' && (
              <div className="inbody-section">
                <div className="inbody-summary">
                  {inbodyData[inbodyData.length - 1] && (
                    <div className="inbody-current">
                      <h4>Chỉ số mới nhất ({inbodyData[inbodyData.length - 1].date})</h4>
                      <div className="inbody-grid">
                        <div className="inbody-item"><span className="ib-value">{inbodyData[inbodyData.length - 1].weight}</span><span className="ib-label">Cân nặng (kg)</span></div>
                        <div className="inbody-item"><span className="ib-value">{inbodyData[inbodyData.length - 1].fat}%</span><span className="ib-label">Mỡ cơ thể</span></div>
                        <div className="inbody-item"><span className="ib-value">{inbodyData[inbodyData.length - 1].muscle}</span><span className="ib-label">Cơ (kg)</span></div>
                        <div className="inbody-item"><span className="ib-value">{inbodyData[inbodyData.length - 1].bmi}</span><span className="ib-label">BMI</span></div>
                      </div>
                    </div>
                  )}
                </div>
                <table className="inbody-table">
                  <thead><tr><th>Ngày</th><th>Cân nặng</th><th>% Mỡ</th><th>Cơ (kg)</th><th>BMI</th></tr></thead>
                  <tbody>
                    {inbodyData.map((d, i) => (
                      <tr key={i}>
                        <td>{d.date}</td>
                        <td>{d.weight}</td>
                        <td>{d.fat}%</td>
                        <td>{d.muscle}</td>
                        <td>{d.bmi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="notes-section">
                <div className="add-note-form">
                  <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Ghi chú sau buổi tập..." rows="3" />
                  <button className="btn-primary btn-sm" onClick={handleAddNote}>📝 Thêm ghi chú</button>
                </div>
                <div className="notes-list">
                  {notes.length === 0 && <p className="text-muted">Chưa có ghi chú nào cho học viên này.</p>}
                  {notes.map((note, i) => (
                    <div key={i} className="note-card">
                      <div className="note-header"><span className="note-author">{note.by}</span><span className="note-date">{note.date}</span></div>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </PTLayout>
    )
  }

  return (
    <PTLayout onLogout={onLogout}>
      <div className="pt-students-page">
        <div className="pt-page-header">
          <h2>Học viên của tôi</h2>
          <span className="student-count">{students.length} học viên</span>
        </div>

        <div className="student-list">
          {students.map(student => (
            <div key={student.id} className="student-card" onClick={() => setSelectedStudent(student)}>
              <div className="student-avatar">{student.avatar}</div>
              <div className="student-card-info">
                <h4>{student.name}</h4>
                <p>{student.gender} · {student.phone}</p>
                <div className="student-meta">
                  <span>📅 {student.startDate}</span>
                  <span>🏋️ {student.sessions} buổi</span>
                </div>
              </div>
              <span className="student-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </PTLayout>
  )
}

export default PTStudents
