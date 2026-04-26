# 📁 Frontend - Giải Thích Từng File

## 📂 Cấu trúc thư mục Frontend
```
frontend/
├── node_modules/          # Thư mục chứa các package (dependencies)
├── src/                   # Mã nguồn chính
│   ├── index.html         # File HTML chính
│   ├── main.jsx           # Entry point React
│   ├── App.jsx            # Component chính
│   ├── App.css            # CSS cho App component
│   └── index.css          # Global CSS
├── package.json           # Cấu hình dự án, dependencies, scripts
├── package-lock.json      # Lock version của packages
├── vite.config.js         # Cấu hình Vite build tool
└── run_frontend.bat       # Script chạy frontend (Windows)
```

---

## 📄 Giải Thích Chi Tiết Từng File

### 1️⃣ `package.json`
**Tác dụng:** Cấu hình chính của dự án Node.js

**Nội dung:**
- **name**: Tên dự án (`gym-management-frontend`)
- **version**: Phiên bản (`1.0.0`)
- **description**: Mô tả dự án
- **type**: `"module"` = dùng ES6 modules (import/export)

**Scripts (câu lệnh npm):**
```json
{
  "dev": "vite",              // npm run dev     -> Chạy dev server
  "build": "vite build",      // npm run build   -> Build production
  "preview": "vite preview",  // npm run preview -> Xem build production
  "lint": "eslint src --ext js,jsx"  // npm run lint -> Kiểm tra code
}
```

**Dependencies (thư viện chính):**
- `react@18.2.0` - Library UI
- `react-dom@18.2.0` - Render React vào DOM
- `react-router-dom@6.20.0` - Routing (điều hướng trang)
- `axios@1.6.0` - HTTP client (gọi API)

**DevDependencies (thư viện phát triển):**
- `vite@5.0.0` - Build tool (nhanh và hiện đại hơn Webpack)
- `@vitejs/plugin-react@4.2.0` - Plugin React cho Vite
- `eslint` - Kiểm tra lỗi code
- `eslint-plugin-react` - ESLint cho React

---

### 2️⃣ `package-lock.json`
**Tác dụng:** Khóa phiên bản của các package

**Ý nghĩa:**
- Đảm bảo khi ai đó `npm install` sẽ cài đúng phiên bản
- Không sửa bằng tay, được tạo tự động

---

### 3️⃣ `vite.config.js`
**Tác dụng:** Cấu hình Vite build tool

**Các cấu hình chính:**

```javascript
// 1. Plugins
plugins: [react()]
// -> Bật hỗ trợ JSX và React

// 2. Dev Server
server: {
  port: 5173,  // Port chạy dev server
  proxy: {     // Proxy API requests
    '/api': {
      target: 'http://localhost:8000',  // Backend URL
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')  // Xóa /api prefix
    }
  }
}
// -> Frontend (5173) có thể gọi /api/... sẽ được proxy tới Backend (8000)
// -> Giải quyết CORS issues

// 3. Build Configuration
build: {
  outDir: 'dist',      // Thư mục output
  sourcemap: false,    // Không tạo sourcemap (nhỏ hơn)
  minify: 'terser'     // Minify code bằng Terser
}
// -> Build sẽ output vào thư mục `dist` (dùng deploy)
```

**Cách dùng:**
- `npm run dev` - Chạy Vite dev server
- `npm run build` - Build production
- `npm run preview` - Xem build production trên local

---

### 4️⃣ `src/index.html`
**Tác dụng:** File HTML chính của ứng dụng

**Cấu trúc:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <!-- Metadata -->
  <meta charset="UTF-8">                          <!-- Encoding -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- Responsive -->
  <meta name="description" content="...">         <!-- SEO -->
  <meta name="theme-color" content="#1e40af">    <!-- Browser color -->
  
  <title>Gym Management System</title>             <!-- Tab title -->
  
  <!-- Global CSS -->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ...; background-color: #f5f5f5; }
  </style>
</head>
<body>
  <!-- Root element - React sẽ mount ứng dụng vào đây -->
  <div id="root"></div>
  
  <!-- Import main.jsx - Entry point -->
  <script type="module" src="./main.jsx"></script>
</body>
</html>
```

**Ý nghĩa:**
- Đây là "nơi chứa" React app
- React sẽ render toàn bộ giao diện vào `<div id="root"></div>`

---

### 5️⃣ `src/main.jsx`
**Tác dụng:** Entry point của React Application

**Code:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Bước 1: Tìm element có id="root"
// Bước 2: Tạo React root
// Bước 3: Render component <App />
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Ý nghĩa:**
- File này chạy TRƯỚC tất cả
- Nó bootstrap (khởi động) React application
- Render `<App />` component vào `#root` element

**Quy trình:**
1. Browser load `index.html`
2. `index.html` import `main.jsx`
3. `main.jsx` render `<App />`
4. `<App />` hiển thị giao diện

---

### 6️⃣ `src/App.jsx`
**Tác dụng:** Component chính của ứng dụng

**Cấu trúc:**
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* Header */}
        <header className="app-header">
          <h1>💪 Gym Management System</h1>
          <p>Welcome to the Gym Management System</p>
        </header>
        
        {/* Main content - Routes */}
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />           <!-- Trang chủ -->
            <Route path="/members" element={<...>} />           <!-- Quản lý thành viên -->
            <Route path="/memberships" element={<...>} />       <!-- Quản lý gói tập -->
            <Route path="/payments" element={<...>} />          <!-- Quản lý thanh toán -->
            <Route path="/settings" element={<...>} />          <!-- Cài đặt -->
            <Route path="*" element={<...>} />                  <!-- 404 Not Found -->
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2026 Gym Management System</p>
        </footer>
        
      </div>
    </Router>
  )
}
```

**Chức năng:**
- `<Router>` - Bật routing
- `<Routes>` - Định nghĩa các tuyến đường (routes)
- Mỗi `<Route>` là một trang

**Routes hiện tại:**
| Path | Component | Ý nghĩa |
|------|-----------|---------|
| `/` | `<Dashboard />` | Trang chủ |
| `/members` | Members Management | Quản lý thành viên |
| `/memberships` | Memberships Management | Quản lý gói tập |
| `/payments` | Payments Management | Quản lý thanh toán |
| `/settings` | Settings | Cài đặt |
| `*` | 404 Not Found | Trang không tồn tại |

---

### 7️⃣ `src/App.css`
**Tác dụng:** CSS styling cho `App.jsx`

**Các class chính:**

```css
/* Layout chính */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;              /* Chiều cao = 100% viewport height */
  background-color: #f5f5f5;
}

/* Header */
.app-header {
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);  /* Gradient blue */
  color: white;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);  /* Drop shadow */
}

/* Main content */
.app-content {
  flex: 1;                    /* Chiếm toàn bộ không gian */
  overflow-y: auto;           /* Cuộn được nếu vượt quá chiều cao */
  padding: 2rem;
}

/* Dashboard cards */
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* Responsive grid */
  gap: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #1e40af;  /* Accent border */
}
```

**Responsive:**
```css
@media (max-width: 768px) {
  /* Trên mobile (< 768px) */
  .app-content { padding: 1rem; }
  .dashboard-cards { grid-template-columns: 1fr; }  /* 1 cột */
}
```

---

### 8️⃣ `src/index.css`
**Tác dụng:** Global CSS cho toàn bộ ứng dụng

**Bao gồm:**

#### CSS Variables (Biến CSS)
```css
:root {
  /* Colors */
  --primary-color: #1e40af;
  --secondary-color: #0ea5e9;
  --success-color: #22c55e;
  --warning-color: #eab308;
  --danger-color: #ef4444;
  --info-color: #06b6d4;
  
  /* Gray scale */
  --gray-50 to --gray-900;
  
  /* Fonts */
  --font-family: ...;
  --font-size-sm to --font-size-2xl;
  
  /* Spacing */
  --spacing-xs to --spacing-xl;
  
  /* Border Radius */
  --radius-sm to --radius-xl;
  
  /* Shadows */
  --shadow-sm to --shadow-lg;
}
```

#### Reset & Base Styles
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-family); ... }
```

#### Typography
```css
h1, h2, h3 { font-weight: 600; margin-bottom: var(--spacing-md); }
a { color: var(--primary-color); transition: color 0.2s ease; }
```

#### Buttons
```css
.btn-primary { background-color: var(--primary-color); color: white; }
.btn-success { background-color: var(--success-color); color: white; }
.btn-danger { background-color: var(--danger-color); color: white; }
```

#### Forms
```css
input, textarea, select {
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
}

input:focus { 
  outline: none; 
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}
```

#### Utility Classes
```css
.text-center { text-align: center; }
.mt-1, .mt-2, .mt-4 { margin-top: ... }
.mb-1, .mb-2, .mb-4 { margin-bottom: ... }
.p-2, .p-4 { padding: ... }
.rounded { border-radius: var(--radius-md); }
.shadow { box-shadow: var(--shadow-md); }
```

---

### 9️⃣ `node_modules/`
**Tác dụng:** Thư mục chứa các package (dependencies)

**Ý nghĩa:**
- Được tạo tự động khi chạy `npm install`
- Chứa tất cả mã source của các packages
- **Không nên commit vào git** (thêm vào `.gitignore`)
- Có thể xóa và tái tạo bằng `npm install`

---

### 🔟 `run_frontend.bat` (Windows only)
**Tác dụng:** Script tự động khởi động frontend

**Làm gì:**
1. Di chuyển vào thư mục `frontend`
2. Kiểm tra `node_modules` - nếu không có sẽ chạy `npm install`
3. Chạy `npm run dev`
4. Mở dev server tại http://localhost:5173

**Cách dùng:**
- Double-click file để chạy

---

## 🎯 Luồng Khởi Động Frontend

```
1. run_frontend.bat
   ↓
2. npm install (nếu cần)
   ↓
3. npm run dev
   ↓
4. Vite dev server khởi động
   ↓
5. index.html được load
   ↓
6. main.jsx được load
   ↓
7. App.jsx được render
   ↓
8. Browser hiển thị giao diện
   ↓
9. Available tại http://localhost:5173
```

---

## 📊 Tóm Tắt Tác Dụng Từng File

| File | Tác Dụng | Loại |
|------|----------|------|
| `package.json` | Cấu hình dự án, dependencies, scripts | Config |
| `package-lock.json` | Khóa phiên bản packages | Config |
| `vite.config.js` | Cấu hình Vite build tool | Config |
| `index.html` | File HTML chính | HTML |
| `main.jsx` | Entry point React | JavaScript |
| `App.jsx` | Component chính | JavaScript |
| `App.css` | Styling cho App | CSS |
| `index.css` | Global CSS | CSS |
| `node_modules/` | Packages (auto-generated) | Dependencies |
| `run_frontend.bat` | Script khởi động (Windows) | Script |

---

## 🚀 Các Lệnh Thường Dùng

```bash
# Cài đặt dependencies
npm install
npm install --legacy-peer-deps  # Nếu có lỗi version conflict

# Phát triển
npm run dev         # Chạy dev server (http://localhost:5173)

# Production
npm run build       # Build production (tạo thư mục `dist`)
npm run preview     # Xem build production trên local

# Kiểm tra code
npm run lint        # Chạy ESLint để kiểm tra lỗi
```

---

## ✅ Hiểu Rõ Frontend Structure = Dễ Phát Triển Hơn

Bây giờ bạn hiểu:
- Từng file làm gì
- Luồng khởi động thế nào
- Cách mở rộng thêm features (thêm routes, components, pages)
- Cách styling
- Cách chạy và build

Happy coding! 🎉
