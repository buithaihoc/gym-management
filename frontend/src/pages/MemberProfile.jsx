import React, { useState } from 'react'
import MemberLayout from '../components/MemberLayout'
import './MemberProfile.css'

function MemberProfile({ onLogout }) {
  const [editing, setEditing] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0912345678',
    gender: 'Nam',
    cccd: '079201000001',
    dob: '15/05/1998',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    emergencyContact: 'Trần Thị B',
    emergencyPhone: '0987654321',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSave = (e) => {
    e.preventDefault()
    alert('Cập nhật thông tin thành công!')
    setEditing(false)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword.length < 8) {
      alert('Mật khẩu tối thiểu 8 ký tự!')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }
    alert('Đổi mật khẩu thành công!')
    setChangingPassword(false)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <MemberLayout onLogout={onLogout}>
      <div className="member-profile-page">
        <h2 className="page-title">Tài khoản của tôi</h2>

        {/* Info card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span>👤</span>
              <button className="avatar-edit-btn" title="Đổi ảnh đại diện">📷</button>
            </div>
            <div className="profile-name-section">
              <h3>{profile.name}</h3>
              <span className="profile-badge">VIP Tháng</span>
            </div>
          </div>

          <div className="profile-body">
            {!editing ? (
              <>
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>Họ và tên</label>
                    <span>{profile.name}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Email</label>
                    <span>{profile.email}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Số điện thoại</label>
                    <span>{profile.phone}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Giới tính</label>
                    <span>{profile.gender}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>CCCD</label>
                    <span>{profile.cccd} <small className="text-muted">(Đã xác thực - không thể chỉnh sửa)</small></span>
                  </div>
                  <div className="profile-info-item">
                    <label>Ngày sinh</label>
                    <span>{profile.dob}</span>
                  </div>
                  <div className="profile-info-item full-width">
                    <label>Địa chỉ</label>
                    <span>{profile.address}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Liên hệ khẩn cấp</label>
                    <span>{profile.emergencyContact} - {profile.emergencyPhone}</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="btn-primary" onClick={() => setEditing(true)}>
                    ✏️ Cập nhật thông tin
                  </button>
                  <button className="btn-outline" onClick={() => setChangingPassword(true)}>
                    🔑 Đổi mật khẩu
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSave} className="profile-edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Họ và tên</label>
                    <input type="text" name="name" value={profile.name} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Giới tính</label>
                    <select name="gender" value={profile.gender} onChange={handleInputChange}>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input type="text" name="dob" value={profile.dob} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Địa chỉ</label>
                    <input type="text" name="address" value={profile.address} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Liên hệ khẩn cấp</label>
                    <input type="text" name="emergencyContact" value={profile.emergencyContact} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>SĐT khẩn cấp</label>
                    <input type="tel" name="emergencyPhone" value={profile.emergencyPhone} onChange={handleInputChange} />
                  </div>
                </div>
                <p className="cccd-notice">⚠️ CCCD ({profile.cccd}) đã được xác thực và không thể chỉnh sửa.</p>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Hủy</button>
                  <button type="submit" className="btn-primary">💾 Lưu thay đổi</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Change password modal */}
        {changingPassword && (
          <div className="modal-overlay" onClick={() => setChangingPassword(false)}>
            <div className="modal-content modal-sm" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>🔑 Đổi mật khẩu</h3>
                <button className="modal-close" onClick={() => setChangingPassword(false)}>✕</button>
              </div>
              <form onSubmit={handleChangePassword} className="modal-form">
                <div className="form-group">
                  <label>Mật khẩu hiện tại</label>
                  <input type="password" value={passwordForm.currentPassword} 
                         onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Mật khẩu mới <small className="text-muted">(tối thiểu 8 ký tự)</small></label>
                  <input type="password" value={passwordForm.newPassword}
                         onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} required minLength={8} />
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu mới</label>
                  <input type="password" value={passwordForm.confirmPassword}
                         onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} required minLength={8} />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setChangingPassword(false)}>Hủy</button>
                  <button type="submit" className="btn-primary">✅ Xác nhận</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MemberLayout>
  )
}

export default MemberProfile
