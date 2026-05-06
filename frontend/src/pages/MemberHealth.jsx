import React, { useState } from 'react'
import MemberLayout from '../components/MemberLayout'
import './MemberHealth.css'

function MemberHealth({ onLogout }) {
  const [activeMetric, setActiveMetric] = useState('weight') // weight | fat | muscle | bmi

  // Dữ liệu chỉ số cơ thể theo thời gian
  const [metrics] = useState([
    { date: '15/01', weight: 75.2, fat: 22.5, muscle: 35.1, bmi: 24.8 },
    { date: '22/01', weight: 74.8, fat: 22.0, muscle: 35.3, bmi: 24.6 },
    { date: '29/01', weight: 74.5, fat: 21.8, muscle: 35.5, bmi: 24.5 },
    { date: '05/02', weight: 73.9, fat: 21.2, muscle: 35.8, bmi: 24.3 },
    { date: '12/02', weight: 73.5, fat: 20.8, muscle: 36.0, bmi: 24.1 },
    { date: '19/02', weight: 73.1, fat: 20.3, muscle: 36.3, bmi: 23.9 },
    { date: '20/02', weight: 72.8, fat: 20.1, muscle: 36.5, bmi: 23.8 },
  ])

  const metricConfig = {
    weight: { label: 'Cân nặng (kg)', color: '#1e40af', unit: 'kg', suffix: '' },
    fat: { label: '% Mỡ cơ thể', color: '#ef4444', unit: '%', suffix: '' },
    muscle: { label: 'Khối lượng cơ (kg)', color: '#22c55e', unit: 'kg', suffix: '' },
    bmi: { label: 'Chỉ số BMI', color: '#8b5cf6', unit: '', suffix: '' },
  }

  const current = metrics[metrics.length - 1]
  const previous = metrics[metrics.length - 2]
  const config = metricConfig[activeMetric]

  // Tính % thay đổi
  const diff = current[activeMetric] - previous[activeMetric]
  const diffPercent = ((diff / previous[activeMetric]) * 100).toFixed(1)

  // Lấy giá trị min/max
  const values = metrics.map(m => m[activeMetric])
  const min = Math.min(...values) - 2
  const max = Math.max(...values) + 2
  const range = max - min

  // Đánh giá BMI
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { label: 'Thiếu cân', color: '#f59e0b' }
    if (bmi < 25) return { label: 'Bình thường', color: '#22c55e' }
    if (bmi < 30) return { label: 'Thừa cân', color: '#f59e0b' }
    return { label: 'Béo phì', color: '#ef4444' }
  }

  const bmiStatus = getBMIStatus(current.bmi)

  const historyItems = [
    { date: '20/02/2025', by: 'HLV Minh - PT', metrics: 'Cân nặng: 72.8kg, Mỡ: 20.1%, Cơ: 36.5kg, BMI: 23.8' },
    { date: '12/02/2025', by: 'HLV Minh - PT', metrics: 'Cân nặng: 73.5kg, Mỡ: 20.8%, Cơ: 36.0kg, BMI: 24.1' },
    { date: '05/02/2025', by: 'NV Y tế', metrics: 'Cân nặng: 73.9kg, Mỡ: 21.2%, Cơ: 35.8kg, BMI: 24.3' },
    { date: '29/01/2025', by: 'HLV Minh - PT', metrics: 'Cân nặng: 74.5kg, Mỡ: 21.8%, Cơ: 35.5kg, BMI: 24.5' },
  ]

  // Vẽ biểu đồ đơn giản bằng CSS
  const chartHeight = 200
  const getY = (val) => {
    return chartHeight - ((val - min) / range) * (chartHeight - 30) - 15
  }

  return (
    <MemberLayout onLogout={onLogout}>
      <div className="member-health-page">
        <h2 className="page-title">Theo dõi sức khỏe</h2>

        {/* Current summary */}
        <div className="health-summary">
          <div className="health-summary-card weight">
            <span className="hs-value">{current.weight}</span>
            <span className="hs-unit">kg</span>
            <span className="hs-label">Cân nặng</span>
          </div>
          <div className="health-summary-card fat">
            <span className="hs-value">{current.fat}</span>
            <span className="hs-unit">%</span>
            <span className="hs-label">Mỡ cơ thể</span>
          </div>
          <div className="health-summary-card muscle">
            <span className="hs-value">{current.muscle}</span>
            <span className="hs-unit">kg</span>
            <span className="hs-label">Cơ bắp</span>
          </div>
          <div className="health-summary-card bmi" style={{ borderColor: bmiStatus.color }}>
            <span className="hs-value">{current.bmi}</span>
            <span className="hs-unit">BMI</span>
            <span className="hs-label" style={{ color: bmiStatus.color }}>{bmiStatus.label}</span>
          </div>
        </div>

        {/* Metric selector */}
        <div className="metric-tabs">
          {Object.entries(metricConfig).map(([key, cfg]) => (
            <button
              key={key}
              className={`metric-tab ${activeMetric === key ? 'active' : ''}`}
              style={activeMetric === key ? { borderColor: cfg.color, color: cfg.color } : {}}
              onClick={() => setActiveMetric(key)}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="health-chart-card">
          <div className="chart-header">
            <h3>{config.label}</h3>
            <div className="chart-change">
              <span className={diff >= 0 ? 'up' : 'down'}>
                {diff >= 0 ? '▲' : '▼'} {Math.abs(diff).toFixed(1)}{config.unit} ({diffPercent}%)
              </span>
              <span className="chart-period">7 lần đo gần nhất</span>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-y-axis">
              <span>{max.toFixed(1)}</span>
              <span>{((max + min) / 2).toFixed(1)}</span>
              <span>{min.toFixed(1)}</span>
            </div>
            <div className="chart-area" style={{ height: chartHeight }}>
              {/* Data line */}
              <svg className="chart-line" viewBox={`0 0 ${metrics.length * 60} ${chartHeight}`}>
                <polyline
                  points={metrics.map((m, i) => `${i * 60 + 30},${getY(m[activeMetric])}`).join(' ')}
                  fill="none"
                  stroke={config.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Area fill */}
                <polygon
                  points={`0,${chartHeight} ${metrics.map((m, i) => `${i * 60 + 30},${getY(m[activeMetric])}`).join(' ')} ${(metrics.length - 1) * 60 + 30},${chartHeight}`}
                  fill={config.color}
                  fillOpacity="0.1"
                />
              </svg>

              {/* Data points */}
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="chart-dot"
                  style={{
                    left: `${i * 60 + 30 - 5}px`,
                    bottom: `${getY(m[activeMetric]) - 5}px`,
                    background: config.color,
                  }}
                  title={`${m.date}: ${m[activeMetric]}${config.unit}`}
                />
              ))}
            </div>
            <div className="chart-x-axis">
              {metrics.map((m, i) => (
                <span key={i} style={{ left: `${i * 60 + 30 - 15}px` }}>{m.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* InBody comparison */}
        <div className="section">
          <h3 className="section-title">So sánh chỉ số</h3>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Chỉ số</th>
                  <th>Lần trước (12/02)</th>
                  <th>Hiện tại (20/02)</th>
                  <th>Thay đổi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cân nặng</td>
                  <td>73.5 kg</td>
                  <td className="positive">72.8 kg</td>
                  <td className="positive">▼ 0.7 kg</td>
                </tr>
                <tr>
                  <td>% Mỡ cơ thể</td>
                  <td>20.8%</td>
                  <td className="positive">20.1%</td>
                  <td className="positive">▼ 0.7%</td>
                </tr>
                <tr>
                  <td>Khối lượng cơ</td>
                  <td>36.0 kg</td>
                  <td className="positive">36.5 kg</td>
                  <td className="positive">▲ 0.5 kg</td>
                </tr>
                <tr>
                  <td>BMI</td>
                  <td>24.1</td>
                  <td className="positive">23.8</td>
                  <td className="positive">▼ 0.3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* History */}
        <div className="section">
          <h3 className="section-title">Lịch sử đo chỉ số</h3>
          <div className="health-history">
            {historyItems.map((item, index) => (
              <div className="health-history-item" key={index}>
                <div className="history-date">
                  <span className="history-day">{item.date.split('/')[0]}</span>
                  <span className="history-month">Th{item.date.split('/')[1]}</span>
                </div>
                <div className="history-content">
                  <p className="history-metrics">{item.metrics}</p>
                  <p className="history-by">👨‍⚕️ {item.by}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default MemberHealth
