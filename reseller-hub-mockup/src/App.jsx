/**
 * App - 路由設定
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import MyOrgPage from './pages/MyOrgPage'
import ClientsPage from './pages/ClientsPage'
import UsagePage from './pages/UsagePage'
import ActivityLogPage from './pages/ActivityLogPage'

export default function App() {
  return (
    <Routes>
      {/* 登入頁 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 主要佈局（含側邊欄 + 頂部列） */}
      <Route element={<DashboardLayout />}>
        <Route path="/my-org" element={<MyOrgPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/usage" element={<UsagePage />} />
        <Route path="/activity-log" element={<ActivityLogPage />} />
      </Route>

      {/* 預設重導至登入頁 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
