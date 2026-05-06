import React, { useState } from 'react'
import MemberLayout from '../components/MemberLayout'
import './MemberSchedule.css'

function MemberSchedule({ onLogout }) {
  const [activeTab, setActiveTab] = useState('pt') // 'pt' | 'class'
  const [selectedDate, setSelectedDate] = useState('22/02/2025')
  const [showBookingModal, setShowBookingModal] = useState(null)
  const [mySessions, setMySessions] = useState([
    { id: 1, type: 'PT Cá nhân', trainer: 'HLV Minh', date: '22/02/2025', time: '08:00 - 09:00', status: 'confirmed' },
    { id: 2, type: 'Yoga', trainer: 'HLV Hương', date: '24/02/2025', time: '17:30 - 18:30', status: 'confirmed' },
    { id: 3, type: 'PT Cá nhân', trainer: 'HLV Minh', date: '20/02/2025', time: '08:00 - 09:00', status: 'completed' },
    { id: 4, type: 'Zumba', trainer: 'HLV Lan', date: '19/02/2025', time: '18:00 - 19:00', status: 'missed' },
  ])

  const availablePTs = [
    { id: 1, name: 'HLV Nguyễn Văn Minh', specialty: 'Thể hình, Giảm mỡ', rating: 4.8, sessions: 3, avatar: '👨‍🏫' },
    { id: 2, name: 'HLV Trần Thị Hương', specialty: 'Yoga, Dãn cơ', rating: 4.9, sessions: 5, avatar: '👩‍🏫' },
    { id: 3, name: 'HLV Lê Văn Tuấn', specialty: 'CrossFit, Sức bền', rating: 4.7, sessions: 2, avatar: '👨‍🏫' },
  ]

  const availableSlots = [
    { id: 1, time: '06:00 - 07:00', trainer: 'HLV Minh', available: true },
    { id: 2, time: '07:00 - 08:00', trainer: 'HLV Minh', available: true },
    { id: 3, time: '08:00 - 09:00', trainer: 'HLV Minh', available: false },
    { id: 4, time: '17:00 - 18:00', trainer: 'HLV Hương', available: true },
    { id: 5, time: '18:00 - 19:00', trainer: 'HLV Hương', available: true },
    { id: 6, time: '19:00 - 20:00', trainer: 'HLV Tuấn', available: true },
  ]

  const classSchedules = [
    { id: 1, name: 'Yoga buổi sáng', time: '06:00 - 07:00', trainer: 'HLV Hương', max: 20, booked: 15, day: 'T2, T4, T6' },
    { id: 2, name: 'Zumba', time: '17:30 - 18:30', trainer: 'HLV Lan', max: 25, booked: 22, day: 'T3, T5, T7' },
    { id: 3, name: 'Group X', time: '18:30 - 19:30', trainer: 'HLV Tuấn', max: 15, booked: 8, day: 'T2, T4' },
    { id: 4, name: 'Pilates', time: '07:00 - 08:00', trainer: 'HLV Hương', max: 12, booked: 10, day: 'T3, T5' },
    { id: 5, name: 'Body Pump', time: '19:00 - 20:00', trainer: 'HLV Minh', max: 20, booked: 18, day: 'T2, T4, T6' },
  ]

  const dates = ['22/02', '23/02', '24/02', '25/02', '26/02', '27/02', '28/02']
  const dayNames = ['T7', 'CN', 'T2', 'T3', 'T4', 'T5', 'T6']

  const handleCancel = (sessionId) => {
    if (window.confirm('Bạn có chắc muốn hủy lịch này? (Hủy trước 2h không bị trừ buổi)')) {
      setMySessions(mySessions.filter(s => s.id !== sessionId))
    }
  }

  const handleBookSlot = (slot) => {
    alert(`Đặt lịch thành công với ${slot.trainer} lúc ${slot.time}`)
    setShowBookingModal(null)
    setMySessions([...mySessions, {
      id: Date.now(),
      type: activeTab === 'pt' ? 'PT Cá nhân' : 'Lớp học',
      trainer: slot.trainer,
      date: selectedDate,
      time: slot.time,
      status: 'confirmed'
    }])
  }

  const handleBookClass = (cls) => {
    if (cls.booked >= cls.max) {
      alert('Lớp học đã đầy!')
      return
    }
    alert(`Đặt lịch thành công: ${cls.name} với ${cls.trainer}`)
    setShowBookingModal(null)
    setMySessions([...mySessions, {
      id: Date.now(),
      type: cls.name,
      trainer: cls.trainer,
      date: selectedDate,
      time: cls.time,
      status: 'confirmed'
    }])
  }

  return (
    <MemberLayout onLogout={onLogout}>
      <div className="member-schedule-page">
        <h2 className="page-title">Đặt lịch</h2>

        {/* Tabs */}
        <div className="schedule-tabs">
          <button className={`tab-btn ${activeTab === 'pt' ? 'active' : ''}`} onClick={() => setActiveTab('pt')}>
            🏋️ PT Cá nhân
          </button>
          <button className={`tab-btn ${activeTab === 'class' ? 'active' : ''}`} onClick={() => setActiveTab('class')}>
            👥 Lớp học nhóm
          </button>
        </div>

        {/* Date selector */}
        <div className="date-selector">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`date-btn ${selectedDate === `${date}/2025` ? 'active' : ''}`}
              onClick={() => setSelectedDate(`${date}/2025`)}
            >
              <span className="date-day">{dayNames[index]}</span>
              <span className="date-number">{date.split('/')[0]}</span>
              <span className="date-month">Th{date.split('/')[1]}</span>
            </button>
          ))}
        </div>

        {/* PT slots */}
        {activeTab === 'pt' && (
          <>
            <div className="section">
              <h3 className="section-title">Huấn luyện viên có sẵn</h3>
              <div className="pt-list">
                {availablePTs.map(pt => (
                  <div className="pt-card" key={pt.id}>
                    <div className="pt-avatar">{pt.avatar}</div>
                    <div className="pt-info">
                      <h4>{pt.name}</h4>
                      <p className="pt-specialty">{pt.specialty}</p>
                      <div className="pt-meta">
                        <span className="pt-rating">⭐ {pt.rating}</span>
                        <span className="pt-sessions">Còn {pt.sessions} buổi</span>
                      </div>
                    </div>
                    <button className="btn-primary btn-sm" onClick={() => setShowBookingModal(pt)}>
                      Đặt ngay
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">Khung giờ trống - {selectedDate}</h3>
              <div className="slots-grid">
                {availableSlots.map(slot => (
                  <div key={slot.id} className={`slot-card ${slot.available ? 'available' : 'booked'}`}>
                    <span className="slot-time">{slot.time}</span>
                    <span className="slot-trainer">{slot.trainer}</span>
                    {slot.available ? (
                      <button className="slot-book-btn" onClick={() => handleBookSlot(slot)}>Đặt</button>
                    ) : (
                      <span className="slot-booked-label">Hết</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Class schedules */}
        {activeTab === 'class' && (
          <div className="section">
            <h3 className="section-title">Lớp học nhóm</h3>
            <div className="class-list">
              {classSchedules.map(cls => {
                const percent = Math.round((cls.booked / cls.max) * 100)
                const isFull = cls.booked >= cls.max
                return (
                  <div className="class-card" key={cls.id}>
                    <div className="class-header">
                      <h4>{cls.name}</h4>
                      <span className={`class-status ${isFull ? 'full' : 'available'}`}>
                        {isFull ? 'Đầy' : 'Còn chỗ'}
                      </span>
                    </div>
                    <div className="class-details">
                      <span>🕐 {cls.time}</span>
                      <span>👨‍🏫 {cls.trainer}</span>
                      <span>📅 {cls.day}</span>
                    </div>
                    <div className="class-capacity">
                      <div className="capacity-bar">
                        <div className="capacity-fill" style={{ width: `${percent}%`, background: isFull ? '#ef4444' : percent > 70 ? '#f59e0b' : '#22c55e' }} />
                      </div>
                      <span className="capacity-text">{cls.booked}/{cls.max} chỗ</span>
                    </div>
                    <button className={`btn-book ${isFull ? 'disabled' : ''}`} 
                            disabled={isFull}
                            onClick={() => handleBookClass(cls)}>
                      {isFull ? 'Đã đầy' : 'Đặt lịch'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* My sessions */}
        <div className="section">
          <h3 className="section-title">Buổi tập của tôi</h3>
          {mySessions.length > 0 ? (
            <div className="my-sessions-list">
              {mySessions.map(session => (
                <div className={`my-session-item ${session.status}`} key={session.id}>
                  <div className="session-date-box">
                    <span className="session-date-day">{session.date.split('/')[0]}</span>
                    <span className="session-date-month">Th{session.date.split('/')[1]}</span>
                  </div>
                  <div className="session-info">
                    <span className="session-type">{session.type}</span>
                    <span className="session-trainer">👨‍🏫 {session.trainer}</span>
                    <span className="session-time">🕐 {session.time}</span>
                  </div>
                  <div className="session-status">
                    {session.status === 'confirmed' && (
                      <button className="btn-cancel" onClick={() => handleCancel(session.id)}>Hủy</button>
                    )}
                    {session.status === 'completed' && <span className="badge-completed">✅ Đã tập</span>}
                    {session.status === 'missed' && <span className="badge-missed">❌ Bỏ lỡ</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Bạn chưa có buổi tập nào được đặt</p>
            </div>
          )}
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberSchedule
