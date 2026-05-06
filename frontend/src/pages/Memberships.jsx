import React, { useState } from 'react'
import Layout from '../components/Layout'
import './Memberships.css'

function Memberships({ onLogout }) {
  const [showForm, setShowForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [plans, setPlans] = useState([
    { id: 1, name: 'Cơ bản Tháng', price: 300000, duration: '1 tháng', type: 'basic', sessions: 0, ptIncluded: false, status: 'active', members: 12, features: ['Tập tự do', 'Sử dụng máy móc', 'Giờ hành chính'] },
    { id: 2, name: 'VIP Tháng', price: 600000, duration: '1 tháng', type: 'vip', sessions: 4, ptIncluded: true, status: 'active', members: 28, features: ['Tập tự do', 'Sử dụng máy móc', 'Giờ linh hoạt', '4 buổi PT/tháng', 'InBody hàng tháng'] },
    { id: 3, name: 'Nâng cao 3 tháng', price: 1500000, duration: '3 tháng', type: 'premium', sessions: 12, ptIncluded: true, status: 'active', members: 15, features: ['Tập tự do', 'Sử dụng máy móc', 'Giờ linh hoạt', '12 buổi PT/gói', 'InBody hàng tháng', 'Ưu tiên đặt lịch'] },
    { id: 4, name: 'VIP Năm', price: 5000000, duration: '12 tháng', type: 'vip', sessions: 48, ptIncluded: true, status: 'active', members: 8, features: ['Tập tự do', 'Sử dụng máy móc', 'Giờ linh hoạt 24/7', '48 buổi PT/năm', 'InBody hàng tháng', 'Ưu tiên đặt lịch', '1 tháng miễn phí giới thiệu bạn'] },
    { id: 5, name: 'Cơ bản 6 tháng', price: 1500000, duration: '6 tháng', type: 'basic', sessions: 0, ptIncluded: false, status: 'inactive', members: 0, features: ['Tập tự do', 'Sử dụng máy móc', 'Giờ hành chính'] },
  ])

  const [formData, setFormData] = useState({
    name: '', price: '', duration: '', type: 'basic', sessions: 0, ptIncluded: false, status: 'active', features: ['']
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFeatureChange = (index, value) => {
    const features = [...formData.features]
    features[index] = value
    setFormData({ ...formData, features })
  }

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] })
  const removeFeature = (index) => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })

  const openAddForm = () => {
    setEditingPlan(null)
    setFormData({ name: '', price: '', duration: '', type: 'basic', sessions: 0, ptIncluded: false, status: 'active', features: [''] })
    setShowForm(true)
  }

  const openEditForm = (plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name, price: plan.price, duration: plan.duration, type: plan.type,
      sessions: plan.sessions, ptIncluded: plan.ptIncluded, status: plan.status, features: [...plan.features, '']
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validFeatures = formData.features.filter(f => f.trim())
    const data = { ...formData, price: parseInt(formData.price), features: validFeatures }

    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...data } : p))
    } else {
      setPlans([...plans, { id: Date.now(), ...data, members: 0 }])
    }
    setShowForm(false)
    setEditingPlan(null)
  }

  const toggleStatus = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p))
  }

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

  const planIcons = { basic: '🏋️', vip: '💎', premium: '⭐' }

  return (
    <Layout onLogout={onLogout}>
      <div className="plans-page">
        <div className="page-header">
          <h2>Quản lý gói tập</h2>
          <button className="btn-primary" onClick={openAddForm}>➕ Thêm gói tập</button>
        </div>

        <div className="plans-grid">
          {plans.filter(p => p.status === 'active').map(plan => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <span className="plan-icon">{planIcons[plan.type]}</span>
                <span className={`plan-type-badge ${plan.type}`}>{plan.type === 'basic' ? 'Cơ bản' : plan.type === 'vip' ? 'VIP' : 'Nâng cao'}</span>
              </div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="plan-price-value">{formatPrice(plan.price)}</span>
                <span className="plan-price-duration">/{plan.duration}</span>
              </div>
              <div className="plan-stats">
                <div className="plan-stat"><span className="ps-value">{plan.members}</span><span className="ps-label">Hội viên</span></div>
                <div className="plan-stat"><span className="ps-value">{plan.sessions > 0 ? `${plan.sessions} PT` : 'Tự do'}</span><span className="ps-label">Buổi PT</span></div>
              </div>
              <ul className="plan-features">
                {plan.features.map((f, i) => <li key={i}>✅ {f}</li>)}
              </ul>
              <div className="plan-actions">
                <button className="btn-edit" onClick={() => openEditForm(plan)}>✏️ Sửa</button>
                <button className="btn-toggle" onClick={() => toggleStatus(plan.id)}>
                  {plan.status === 'active' ? '🔒 Tạm ngưng' : '🔓 Kích hoạt'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inactive plans */}
        {plans.filter(p => p.status === 'inactive').length > 0 && (
          <div className="section">
            <h3 className="section-title">Gói tập đã tạm ngưng</h3>
            <div className="inactive-plans">
              {plans.filter(p => p.status === 'inactive').map(plan => (
                <div key={plan.id} className="inactive-plan-item">
                  <span className="ip-name">{planIcons[plan.type]} {plan.name}</span>
                  <span className="ip-price">{formatPrice(plan.price)}</span>
                  <button className="btn-toggle" onClick={() => toggleStatus(plan.id)}>🔓 Kích hoạt lại</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingPlan ? 'Cập nhật gói tập' : 'Thêm gói tập mới'}</h3>
                <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit} className="plan-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên gói <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="VIP Tháng" />
                  </div>
                  <div className="form-group">
                    <label>Loại gói</label>
                    <select name="type" value={formData.type} onChange={handleInputChange}>
                      <option value="basic">🏋️ Cơ bản</option>
                      <option value="vip">💎 VIP</option>
                      <option value="premium">⭐ Nâng cao</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Giá (VNĐ) <span className="required">*</span></label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" placeholder="600000" />
                  </div>
                  <div className="form-group">
                    <label>Thời hạn <span className="required">*</span></label>
                    <select name="duration" value={formData.duration} onChange={handleInputChange} required>
                      <option value="">Chọn thời hạn</option>
                      <option value="1 tháng">1 tháng</option>
                      <option value="3 tháng">3 tháng</option>
                      <option value="6 tháng">6 tháng</option>
                      <option value="12 tháng">12 tháng</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Buổi PT kèm</label>
                    <input type="number" name="sessions" value={formData.sessions} onChange={handleInputChange} min="0" placeholder="0 = tập tự do" />
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input type="checkbox" name="ptIncluded" checked={formData.ptIncluded} onChange={handleInputChange} />
                      Có kèm PT
                    </label>
                  </div>
                </div>
                <div className="form-section">
                  <h4>Tính năng</h4>
                  {formData.features.map((f, i) => (
                    <div key={i} className="feature-input-row">
                      <input type="text" value={f} onChange={e => handleFeatureChange(i, e.target.value)} placeholder="Tập tự do" />
                      {formData.features.length > 1 && <button type="button" className="btn-remove" onClick={() => removeFeature(i)}>✕</button>}
                    </div>
                  ))}
                  <button type="button" className="btn-add-row" onClick={addFeature}>➕ Thêm tính năng</button>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                  <button type="submit" className="btn-primary">{editingPlan ? '💾 Cập nhật' : '✅ Tạo gói tập'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Memberships
