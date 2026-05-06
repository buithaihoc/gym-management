import React, { useState } from 'react'
import PTLayout from '../components/PTLayout'
import './PTCurriculum.css'

function PTCurriculum({ onLogout }) {
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('program') // program | nutrition
  const [editingCurriculum, setEditingCurriculum] = useState(null)
  const [history, setHistory] = useState({})

  const students = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E']

  const [curriculums, setCurriculums] = useState([
    {
      id: 1, student: 'Nguyễn Văn A', type: 'program', name: 'Giáo án tăng cơ - Giai đoạn 1',
      goal: 'Tăng cơ, giảm mỡ trong 8 tuần',
      version: 1, status: 'active', assignedDate: '01/02/2025',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '10-12', note: 'Tạ 40kg' },
        { name: 'Squat', sets: 4, reps: '12', note: 'Tạ 60kg' },
        { name: 'Deadlift', sets: 3, reps: '8-10', note: 'Tạ 80kg' },
        { name: 'Shoulder Press', sets: 3, reps: '12', note: 'Tạ 16kg' },
        { name: 'Lat Pulldown', sets: 3, reps: '12', note: 'Cáp 35kg' },
      ]
    },
    {
      id: 2, student: 'Trần Thị B', type: 'nutrition', name: 'Thực đơn giảm mỡ 1500 calo',
      goal: 'Giảm 5% mỡ cơ thể trong 4 tuần',
      version: 1, status: 'active', assignedDate: '05/02/2025',
      meals: [
        { time: 'Sáng (7:00)', foods: '2 trứng ốp la, 1 lát bánh mì đen, 1 ly sữa không đường', cal: 350 },
        { time: 'Phụ sáng (9:30)', foods: '1 quả táo, 10 hạt hạnh nhân', cal: 150 },
        { time: 'Trưa (12:00)', foods: '150g ức gà, 1 chén cơm gạo lứt, rau xanh', cal: 450 },
        { time: 'Phụ chiều (15:00)', foods: '1 hũ sữa chua không đường, 1 thìa hạt chia', cal: 120 },
        { time: 'Tối (18:00)', foods: '150g cá hồi áp chảo, salad rau củ, 1/2 chén cơm', cal: 430 },
      ]
    },
    {
      id: 3, student: 'Lê Văn C', type: 'program', name: 'Giáo án cải thiện sức bền',
      goal: 'Tăng VO2 max, cải thiện endurance', version: 1, status: 'draft', assignedDate: '',
      exercises: [
        { name: 'HIIT Cardio', sets: 5, reps: '2 phút', note: 'Chạy nước rút 30s + nghỉ 30s' },
        { name: 'Rowing Machine', sets: 3, reps: '5 phút', note: 'Giữ nhịp 28-30 strokes/min' },
      ]
    }
  ])

  const [formData, setFormData] = useState({
    student: '', type: 'program', name: '', goal: '', notes: '',
    exercises: [{ name: '', sets: '', reps: '', note: '' }],
    meals: [{ time: '', foods: '', cal: '' }],
  })

  const handleAddExercise = () => {
    setFormData({ ...formData, exercises: [...formData.exercises, { name: '', sets: '', reps: '', note: '' }] })
  }
  const handleAddMeal = () => {
    setFormData({ ...formData, meals: [...formData.meals, { time: '', foods: '', cal: '' }] })
  }

  const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value })

  const handleExerciseChange = (index, field, value) => {
    const exercises = [...formData.exercises]
    exercises[index][field] = value
    setFormData({ ...formData, exercises })
  }

  const handleMealChange = (index, field, value) => {
    const meals = [...formData.meals]
    meals[index][field] = value
    setFormData({ ...formData, meals })
  }

  const openCreateForm = () => {
    setEditingCurriculum(null)
    setFormData({ student: '', type: activeTab, name: '', goal: '', notes: '', exercises: [{ name: '', sets: '', reps: '', note: '' }], meals: [{ time: '', foods: '', cal: '' }] })
    setShowForm(true)
  }

  const openEditForm = (cur) => {
    setEditingCurriculum(cur)
    setFormData({
      student: cur.student, type: cur.type, name: cur.name, goal: cur.goal, notes: cur.notes || '',
      exercises: cur.exercises || [{ name: '', sets: '', reps: '', note: '' }],
      meals: cur.meals || [{ time: '', foods: '', cal: '' }],
    })
    setShowForm(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingCurriculum) {
      // Tạo phiên bản mới, không xóa
      const newVersion = { ...editingCurriculum, id: Date.now(), version: editingCurriculum.version + 1, ...formData, status: 'active', assignedDate: new Date().toLocaleDateString('vi-VN') }
      setCurriculums([...curriculums, newVersion])
      setHistory({ ...history, [editingCurriculum.id]: [...(history[editingCurriculum.id] || []), editingCurriculum] })
      alert(`✅ Đã tạo phiên bản ${newVersion.version} cho "${editingCurriculum.name}"!`)
    } else {
      const newCur = { id: Date.now(), ...formData, version: 1, status: 'active', assignedDate: new Date().toLocaleDateString('vi-VN') }
      setCurriculums([...curriculums, newCur])
    }
    setShowForm(false)
    setEditingCurriculum(null)
  }

  const filtered = curriculums.filter(c => c.type === activeTab)

  return (
    <PTLayout onLogout={onLogout}>
      <div className="pt-curriculum-page">
        <div className="pt-page-header">
          <h2>Giáo án & Dinh dưỡng</h2>
          <button className="btn-primary" onClick={openCreateForm}>➕ Tạo mới</button>
        </div>

        <div className="curriculum-tabs">
          <button className={`tab-btn ${activeTab === 'program' ? 'active' : ''}`} onClick={() => setActiveTab('program')}>🏋️ Giáo án tập luyện</button>
          <button className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`} onClick={() => setActiveTab('nutrition')}>🥗 Thực đơn dinh dưỡng</button>
        </div>

        <div className="curriculum-list">
          {filtered.map(cur => (
            <div key={cur.id} className={`curriculum-card ${cur.status}`}>
              <div className="curriculum-header">
                <div className="curriculum-top">
                  <h4>{cur.name}</h4>
                  <span className={`cur-status ${cur.status}`}>{cur.status === 'active' ? 'Đang áp dụng' : 'Bản nháp'}</span>
                </div>
                <p className="cur-student">👤 {cur.student}</p>
                <p className="cur-goal">🎯 {cur.goal}</p>
                <div className="cur-meta">
                  <span>Phiên bản v{cur.version}</span>
                  {cur.assignedDate && <span>Giao ngày: {cur.assignedDate}</span>}
                </div>
              </div>

              {cur.type === 'program' && cur.exercises && (
                <div className="cur-exercises">
                  <h5>Bài tập</h5>
                  {cur.exercises.map((ex, i) => (
                    <div key={i} className="ex-item">
                      <span className="ex-name">{ex.name}</span>
                      <span className="ex-detail">{ex.sets} sets × {ex.reps}</span>
                      {ex.note && <span className="ex-note">📌 {ex.note}</span>}
                    </div>
                  ))}
                </div>
              )}

              {cur.type === 'nutrition' && cur.meals && (
                <div className="cur-meals">
                  <h5>Thực đơn</h5>
                  {cur.meals.map((meal, i) => (
                    <div key={i} className="meal-item">
                      <span className="meal-time">{meal.time}</span>
                      <span className="meal-foods">{meal.foods}</span>
                      <span className="meal-cal">{meal.cal} cal</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="cur-actions">
                <button className="btn-outline btn-sm" onClick={() => openEditForm(cur)}>📝 Tạo phiên bản mới</button>
                {cur.status === 'draft' && (
                  <button className="btn-primary btn-sm" onClick={() => setCurriculums(curriculums.map(c => c.id === cur.id ? { ...c, status: 'active', assignedDate: new Date().toLocaleDateString('vi-VN') } : c))}>
                    ✅ Giao cho học viên
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content modal-lg" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingCurriculum ? `📝 Tạo phiên bản mới (v${editingCurriculum.version + 1})` : `➕ Tạo ${activeTab === 'program' ? 'giáo án' : 'thực đơn'} mới`}</h3>
                <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <form onSubmit={handleSave} className="curriculum-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Học viên <span className="required">*</span></label>
                    <select value={formData.student} onChange={e => handleInputChange('student', e.target.value)} required>
                      <option value="">Chọn học viên</option>
                      {students.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tên {activeTab === 'program' ? 'giáo án' : 'thực đơn'} <span className="required">*</span></label>
                    <input type="text" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required placeholder={activeTab === 'program' ? 'Giáo án tăng cơ GĐ1' : 'Thực đơn 1500 calo'} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Mục tiêu</label>
                  <input type="text" value={formData.goal} onChange={e => handleInputChange('goal', e.target.value)} placeholder="Tăng cơ, giảm mỡ trong 8 tuần" />
                </div>

                {activeTab === 'program' && (
                  <div className="form-section">
                    <h4>Bài tập</h4>
                    {formData.exercises.map((ex, i) => (
                      <div key={i} className="exercise-row">
                        <input type="text" placeholder="Tên bài tập" value={ex.name} onChange={e => handleExerciseChange(i, 'name', e.target.value)} />
                        <input type="text" placeholder="Sets" className="input-sm" value={ex.sets} onChange={e => handleExerciseChange(i, 'sets', e.target.value)} />
                        <input type="text" placeholder="Reps" className="input-sm" value={ex.reps} onChange={e => handleExerciseChange(i, 'reps', e.target.value)} />
                        <input type="text" placeholder="Ghi chú" className="input-md" value={ex.note} onChange={e => handleExerciseChange(i, 'note', e.target.value)} />
                        {formData.exercises.length > 1 && <button type="button" className="btn-remove" onClick={() => setFormData({ ...formData, exercises: formData.exercises.filter((_, idx) => idx !== i) })}>✕</button>}
                      </div>
                    ))}
                    <button type="button" className="btn-add-row" onClick={handleAddExercise}>➕ Thêm bài tập</button>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="form-section">
                    <h4>Bữa ăn</h4>
                    {formData.meals.map((meal, i) => (
                      <div key={i} className="meal-row">
                        <input type="text" placeholder="Bữa (Sáng 7h)" className="input-time" value={meal.time} onChange={e => handleMealChange(i, 'time', e.target.value)} />
                        <input type="text" placeholder="Món ăn" className="input-foods" value={meal.foods} onChange={e => handleMealChange(i, 'foods', e.target.value)} />
                        <input type="number" placeholder="Calo" className="input-cal" value={meal.cal} onChange={e => handleMealChange(i, 'cal', e.target.value)} />
                        {formData.meals.length > 1 && <button type="button" className="btn-remove" onClick={() => setFormData({ ...formData, meals: formData.meals.filter((_, idx) => idx !== i) })}>✕</button>}
                      </div>
                    ))}
                    <button type="button" className="btn-add-row" onClick={handleAddMeal}>➕ Thêm bữa ăn</button>
                  </div>
                )}

                <div className="form-group">
                  <label>Ghi chú thêm</label>
                  <textarea value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} rows="2" placeholder="Lưu ý về giáo án..." />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                  <button type="submit" className="btn-primary">
                    {editingCurriculum ? '📝 Tạo phiên bản mới' : '💾 Lưu & Giao cho học viên'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PTLayout>
  )
}

export default PTCurriculum
