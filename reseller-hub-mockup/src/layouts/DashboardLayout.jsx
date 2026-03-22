/**
 * DashboardLayout - 主要佈局（側邊欄 + 頂部列 + 內容區）
 */
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default function DashboardLayout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-merlin-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
