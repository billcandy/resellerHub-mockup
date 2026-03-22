/**
 * AuthLayout - 登入頁面佈局（無側邊欄）
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-merlin-bg flex items-center justify-center relative overflow-hidden">
      {/* 右側紅色幾何裝飾 */}
      <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none">
        <div
          className="absolute right-0 top-0 h-full w-full"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, #8b0000 60%, #cc0000 80%, #1a1a1a 100%)',
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-full opacity-60"
          style={{
            background: 'linear-gradient(150deg, transparent 50%, #4a0000 70%, #2a0000 90%)',
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 25% 100%)',
          }}
        />
        {/* 金色斜線裝飾 */}
        <div
          className="absolute right-[30%] top-0 h-full w-[2px] opacity-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, #d4a017, transparent)',
            transform: 'rotate(-15deg)',
            transformOrigin: 'top center',
          }}
        />
      </div>

      {/* 主要內容 */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
