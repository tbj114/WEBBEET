import { useState } from 'react'
import { Search, Power, Settings, FolderOpen, FileText, Calculator, Terminal } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'

export function StartMenu() {
  const { apps, openWindow, setStartMenuOpen } = useDesktopStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAppClick = (app: typeof apps[0]) => {
    openWindow(app.id, app.name)
    setStartMenuOpen(false)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FolderOpen': return <FolderOpen size={24} />
      case 'FileText': return <FileText size={24} />
      case 'Calculator': return <Calculator size={24} />
      case 'Terminal': return <Terminal size={24} />
      case 'Settings': return <Settings size={24} />
      default: return <FolderOpen size={24} />
    }
  }

  const groupedApps = {
    system: apps.filter((app) => app.category === 'system'),
    utility: apps.filter((app) => app.category === 'utility'),
    productivity: apps.filter((app) => app.category === 'productivity'),
  }

  return (
    <div className="fixed bottom-12 left-0 w-80 bg-start-menu-bg rounded-t-lg shadow-xl z-50 max-h-[calc(100vh-6rem)] overflow-hidden flex flex-col">
      <div className="p-3 border-b border-gray-600">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索应用..."
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-windows-blue text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {searchQuery ? (
          <div className="space-y-1">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-start-menu-hover text-white transition-colors"
              >
                <span className="text-blue-400">{getIcon(app.icon)}</span>
                <span>{app.name}</span>
              </button>
            ))}
            {filteredApps.length === 0 && (
              <div className="text-gray-400 text-center py-4">未找到应用</div>
            )}
          </div>
        ) : (
          <>
            <div className="text-gray-400 text-xs px-3 mb-2">系统工具</div>
            <div className="space-y-1 mb-4">
              {groupedApps.system.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-start-menu-hover text-white transition-colors"
                >
                  <span className="text-blue-400">{getIcon(app.icon)}</span>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>

            <div className="text-gray-400 text-xs px-3 mb-2">实用工具</div>
            <div className="space-y-1">
              {groupedApps.utility.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-start-menu-hover text-white transition-colors"
                >
                  <span className="text-green-400">{getIcon(app.icon)}</span>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="border-t border-gray-600 p-2 flex justify-between items-center">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-start-menu-hover text-white transition-colors">
          <Settings size={18} />
          <span className="text-sm">设置</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-500/20 text-red-400 transition-colors">
          <Power size={18} />
          <span className="text-sm">关机</span>
        </button>
      </div>
    </div>
  )
}
