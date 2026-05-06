import { useState, useEffect } from 'react'
import { Wifi, Volume2, Battery, Search, ChevronUp } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { StartMenu } from '../StartMenu/StartMenu'

export function Taskbar() {
  const { windows, activeWindowId, minimizeWindow, setStartMenuOpen, startMenuOpen, systemTrayItems } = useDesktopStore()
  const [time, setTime] = useState(new Date())
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleWindowClick = (windowId: string) => {
    const window = windows.find(w => w.id === windowId)
    if (window) {
      if (window.isMinimized) {
        minimizeWindow(windowId)
      } else {
        setStartMenuOpen(false)
      }
    }
  }

  const handleStartClick = () => {
    setStartMenuOpen(!startMenuOpen)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 flex items-center justify-center z-50">
        <div className="absolute left-4 flex items-center gap-1">
          <button
            onClick={handleStartClick}
            className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
              startMenuOpen 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                : 'hover:bg-gray-100'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" fill="currentColor"/>
            </svg>
          </button>
          
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Search size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-1 px-2">
          {windows.slice(0, 5).map((window) => (
            <button
              key={window.id}
              onClick={() => handleWindowClick(window.id)}
              className={`h-10 px-3 flex items-center gap-2 rounded-xl transition-all duration-200 ${
                activeWindowId === window.id
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">
                {window.appId === 'explorer' ? '📁' :
                 window.appId === 'notepad' ? '📝' :
                 window.appId === 'calculator' ? '🧮' :
                 window.appId === 'terminal' ? '💻' :
                 window.appId === 'settings' ? '⚙️' :
                 window.appId === 'browser' ? '🌐' :
                 window.appId === 'music' ? '🎵' : '📄'}
              </span>
            </button>
          ))}
        </div>

        <div className="absolute right-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {systemTrayItems.slice(0, 3).map((item) => (
              <button
                key={item.id}
                className="h-9 px-2 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                title={item.tooltip}
              >
                {item.icon === 'Wifi' && <Wifi size={16} className="text-gray-600" />}
                {item.icon === 'Volume2' && <Volume2 size={16} className="text-gray-600" />}
                {item.icon === 'Battery' && <Battery size={16} className="text-gray-600" />}
              </button>
            ))}
          </div>

          <button className="h-10 px-4 flex flex-col items-end justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-xs font-medium text-gray-700">{formatTime(time)}</span>
            <span className="text-[10px] text-gray-500">{formatDate(time)}</span>
          </button>

          <button className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors group">
            <ChevronUp size={16} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>
      </div>

      {startMenuOpen && <StartMenu />}
    </>
  )
}
