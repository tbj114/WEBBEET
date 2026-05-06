import { useState, useEffect } from 'react'
import { LayoutGrid, Wifi, Volume2, Battery, Clock } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { StartMenu } from '../StartMenu/StartMenu'

export function Taskbar() {
  const { windows, activeWindowId, minimizeWindow, setStartMenuOpen, startMenuOpen, systemTrayItems } = useDesktopStore()
  const [time, setTime] = useState(new Date())

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
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-taskbar-bg flex items-center px-2 z-50">
        <button
          onClick={handleStartClick}
          className="h-10 w-10 bg-windows-blue hover:bg-windows-blue-dark flex items-center justify-center rounded mr-2 transition-colors"
        >
          <LayoutGrid className="text-white" size={20} />
        </button>

        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => handleWindowClick(window.id)}
              className={`h-10 px-3 flex items-center gap-2 rounded transition-colors min-w-[120px] ${
                activeWindowId === window.id
                  ? 'bg-windows-blue text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">
                {window.appId === 'explorer' ? '📁' :
                 window.appId === 'notepad' ? '📝' :
                 window.appId === 'calculator' ? '🧮' :
                 window.appId === 'terminal' ? '💻' : '⚙️'}
              </span>
              <span className="text-sm truncate">{window.title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center gap-2">
            {systemTrayItems.map((item) => (
              <button
                key={item.id}
                className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title={item.tooltip}
              >
                {item.icon === 'Wifi' && <Wifi size={16} />}
                {item.icon === 'Volume2' && <Volume2 size={16} />}
                {item.icon === 'Battery' && <Battery size={16} />}
              </button>
            ))}
          </div>

          <div className="text-white/80 text-right">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-sm font-medium">{formatTime(time)}</span>
            </div>
            <span className="text-xs">{formatDate(time)}</span>
          </div>
        </div>
      </div>

      {startMenuOpen && <StartMenu />}
    </>
  )
}
