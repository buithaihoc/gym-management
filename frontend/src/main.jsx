/*
MAIN.JSX - ENTRY POINT CHO REACT APPLICATION

Tác dụng: File JavaScript chính để khởi tạo ứng dụng React
Tại sao cần: 
- Import tất cả dependencies
- Render React App vào DOM
- Cấu hình Router, Theme, Context, v.v

Cách dùng:
- npm run dev: Chạy development server
- npm run build: Build production
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * BOOTSTRAP GYM MANAGEMENT FRONTEND
 * 
 * Các bước:
 * 1. Tìm element có id="root" từ index.html
 * 2. Tạo React root
 * 3. Render component <App />
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
