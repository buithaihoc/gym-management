import React, { useState } from 'react'
import Layout from '../components/Layout'
import './Members.css'

function Members({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [showDetail, setShowDetail] = useState(null)

  // Dữ liệu mẫu
  const [members, setMembers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0912345678', gender: 'Nam', cccd: '079201000001', dob: '1998-05-15', status: 'active', plan: 'VIP Tháng', joinDate: '2025-01-10', expiryDate: '2025-06-10' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0987654321', gender: 'Nữ', cccd: '079201000002', dob: '2000-03-22', status: 'active', plan: 'Cơ bản Tháng', joinDate: '2025-02-01', expiryDate: '2025-03-01' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0977112233', gender: 'Nam', cccd: '079201000003', dob: '1995-11-10', status: 'expired', plan: 'Nâng cao 3 tháng', joinDate: '2024-10-01', expiryDate: '2025-01-01' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0966889900', gender: 'Nữ', cccd: '079201000004', dob: '2002-07-08', status: 'active', plan: 'VIP Năm', joinDate: '2025-01-01', expiryDate: '2025-12-31' },
  ])

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', gender: 'Nam', cccd: '', dob: '',
    address: '', emergencyContact: '', emergencyPhone: '', note: ''
  })

  // Form đăng ký / cập nhật hội viên
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const openAddForm = () => {
    setEditingMember(null)
    setFormData({
      name: '', email: '', phone: '', gender: 'Nam', cccd: '', dob: '',
      address: '', emergencyContact: '', emergencyPhone: '', note: ''
    })
    setShowForm(true)
  }

  const openEditForm = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      gender: member.gender,
      cccd: member.cccd || '',
      dob: member.dob || '',
      address: member.address || '',
      emergencyContact: member.emergencyContact || '',
      emergencyPhone: member.emergencyPhone || '',
      note: member.note || ''
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m))
    } else {
      const newMember = {
        id: members.length + 1,
        ...formData,
        status: 'active',
        plan: 'Chưa có',
        joinDate: new Date().toISOString().split('T')[0],
        expiryDate: ''
      }
      setMembers([...members, newMember])
    }
    setShowForm(false)
    setEditingMember(null)
  }

  // Reset mật khẩu
  const handleResetPassword = (memberId) => {
    alert(`Mật khẩu của hội viên #${memberId} đã được reset về 12345678`)
  }

  // Khóa/Mở tài khoản
  const toggleStatus = (memberId) => {
    setMembers(members.map(m => 
      m.id === memberId 
        ? { ...m, status: m.status === 'active' ? 'locked' : 'active' } 
        : m
    ))
  }

  // Lọc tìm kiếm
  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.phone.includes(searchTerm) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Đếm thống kê
  const totalMembers = members.length
  const activeMembers = members.filter(m => m.status === 'active').length
  const expiredMembers = members.filter(m => m.status === 'expired' || m.status === 'locked').length

  if (showDetail) {
    return (
      <Layout onLogout={onLogout}>
        <div className="member-detail-page">
          <button className="btn-back" onClick={() => setShowDetail(null)}>← Quay lại</button>
          
          <div className="detail-header">
            <div className="detail-avatar">
              <span className="avatar-placeholder">👤</span>
            </div>
            <div className="detail-info">
              <h2>{showDetail.name}</h2>
              <span className={`status-badge ${showDetail.status}`}>
                {showDetail.status === 'active' ? 'Đang hoạt động' : 
                 showDetail.status === 'locked' ? 'Đã khóa' : 'Hết hạn'}
              </span>
              <p className="detail-plan">Gói: <strong>{showDetail.plan}</strong></p>
              <p className="detail-date">Hạn dùng: {showDetail.expiryDate || 'Chưa xác định'}</p>
            </div>
          </div>

          <div className="detail-tabs">
            <div className="tab active">Thông tin cá nhân</div>
            <div className="tab">Gói tập</div>
            <div className="tab">Lịch sử thanh toán</div>
            <div className="tab">Check-in</div>
            <div className="tab">Sức khỏe</div>
            <div className="tab">Buổi tập PT</div>
          </div>

          <div className="detail-section">
            <div className="info-grid">
              <div className="info-item">
                <label>Họ và tên</label>
                <span>{showDetail.name}</span>
              </div>
              <div className="info-item">
                <label>Email</label>
                <span>{showDetail.email}</span>
              </div>
              <div className="info-item">
                <label>Số điện thoại</label>
                <span>{showDetail.phone}</span>
              </div>
              <div className="info-item">
                <label>Giới tính</label>
                <span>{showDetail.gender}</span>
              </div>
              <div className="info-item">
                <label>CCCD</label>
                <span>{showDetail.cccd || '---'}</span>
              </div>
              <div className="info-item">
                <label>Ngày sinh</label>
                <span>{showDetail.dob || '---'}</span>
              </div>
              <div className="info-item">
                <label>Ngày tham gia</label>
                <span>{showDetail.joinDate}</span>
              </div>
              <div className="info-item">
                <label>Trạng thái</label>
                <span className={`status-badge ${showDetail.status}`}>
                  {showDetail.status === 'active' ? 'Đang hoạt động' : 
                   showDetail.status === 'locked' ? 'Đã khóa' : 'Hết hạn'}
                </span>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-primary" onClick={() => { setShowDetail(null); openEditForm(showDetail) }}>
                ✏️ Chỉnh sửa
              </button>
              <button className="btn-warning" onClick={() => handleResetPassword(showDetail.id)}>
                🔑 Reset mật khẩu
              </button>
              <button className={`btn-${showDetail.status === 'active' ? 'danger' : 'success'}`} 
                      onClick={() => { toggleStatus(showDetail.id); setShowDetail({...showDetail, status: showDetail.status === 'active' ? 'locked' : 'active'}) }}>
                {showDetail.status === 'active' ? '🔒 Khóa tài khoản' : '🔓 Mở khóa'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onLogout={onLogout}>
      <div className="members-page">
        {/* Thống kê */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-number">{totalMembers}</span>
              <span className="stat-label">Tổng hội viên</span>
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">{activeMembers}</span>
              <span className="stat-label">Đang hoạt động</span>
            </div>
          </div>
          <div className="stat-card red">
            <div className="stat-icon">⛔</div>
            <div className="stat-info">
              <span className="stat-number">{expiredMembers}</span>
              <span className="stat-label">Hết hạn / Khóa</span>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <span className="stat-number">{members.filter(m => {
                const expiry = new Date(m.expiryDate)
                const now = new Date()
                const diff = (expiry - now) / (1000 * 60 * 60 * 24)
                return diff > 0 && diff <= 30
              }).length}</span>
              <span className="stat-label">Sắp hết hạn (30 ngày)</span>
            </div>
          </div>
        </div>

        {/* Thanh công cụ */}
        <div className="toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, SĐT, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn-export">📥 Xuất Excel</button>
            <button className="btn-primary" onClick={openAddForm}>
              ➕ Thêm hội viên
            </button>
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingMember ? 'Cập nhật hội viên' : 'Đăng ký hội viên mới'}</h3>
                <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit} className="member-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Họ và tên <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@example.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Số điện thoại <span className="required">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="0912345678" />
                  </div>
                  <div className="form-group">
                    <label>Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>CCCD</label>
                    <input type="text" name="cccd" value={formData.cccd} onChange={handleInputChange} 
                           placeholder="079201000001" disabled={editingMember && editingMember.cccd} 
                           title={editingMember && editingMember.cccd ? 'Không thể chỉnh sửa CCCD sau khi xác thực' : ''} />
                    {editingMember && editingMember.cccd && <small className="text-muted">CCCD không thể chỉnh sửa sau khi xác thực</small>}
                  </div>
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Địa chỉ</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Số nhà, đường, quận, thành phố" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Liên hệ khẩn cấp</label>
                    <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} placeholder="Người thân" />
                  </div>
                  <div className="form-group">
                    <label>SĐT liên hệ khẩn cấp</label>
                    <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleInputChange} placeholder="SĐT người thân" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Ghi chú</label>
                    <textarea name="note" value={formData.note} onChange={handleInputChange} rows="2" placeholder="Ghi chú về hội viên (nếu có)"></textarea>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                  <button type="submit" className="btn-primary">
                    {editingMember ? '💾 Lưu thay đổi' : '✅ Tạo tài khoản'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bảng hội viên */}
        <div className="table-container">
          <table className="members-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>SĐT</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Gói tập</th>
                <th>Ngày tham gia</th>
                <th>Hạn dùng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="member-name-link" onClick={() => setShowDetail(member)}>
                      {member.name}
                    </span>
                  </td>
                  <td>{member.phone}</td>
                  <td>{member.email}</td>
                  <td>{member.gender}</td>
                  <td><span className="plan-badge">{member.plan}</span></td>
                  <td>{member.joinDate}</td>
                  <td className={new Date(member.expiryDate) < new Date() ? 'text-danger' : ''}>
                    {member.expiryDate || '---'}
                  </td>
                  <td>
                    <span className={`status-badge ${member.status}`}>
                      {member.status === 'active' ? 'Hoạt động' : 
                       member.status === 'locked' ? 'Đã khóa' : 'Hết hạn'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon" title="Xem chi tiết" onClick={() => setShowDetail(member)}>👁️</button>
                      <button className="btn-icon" title="Chỉnh sửa" onClick={() => openEditForm(member)}>✏️</button>
                      <button className="btn-icon" title="Reset mật khẩu" onClick={() => handleResetPassword(member.id)}>🔑</button>
                      <button className="btn-icon" title={member.status === 'active' ? 'Khóa' : 'Mở khóa'} 
                              onClick={() => toggleStatus(member.id)}>
                        {member.status === 'active' ? '🔒' : '🔓'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center text-muted">Không tìm thấy hội viên nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Members
