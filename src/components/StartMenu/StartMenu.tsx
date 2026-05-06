import { useState, useMemo } from 'react'
import { Search, Settings, Power, FileText, Calculator, Terminal, FolderOpen, Globe, Music, Image, Trash2 } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'

export function StartMenu() {
  const { apps, openWindow, setStartMenuOpen } = useDesktopStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = useMemo(() => {
    if (!searchQuery) return apps
    return apps.filter((app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [apps, searchQuery])

  const handleAppClick = (app: typeof apps[0]) => {
    openWindow(app.id, app.name)
    setStartMenuOpen(false)
  }

  const getIcon = (iconName: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      FolderOpen: <FolderOpen size={20} />,
      FileText: <FileText size={20} />,
      Calculator: <Calculator size={20} />,
      Terminal: <Terminal size={20} />,
      Settings: <Settings size={20} />,
      Globe: <Globe size={20} />,
      Music: <Music size={20} />,
      Image: <Image size={20} />,
      Trash2: <Trash2 size={20} />,
    }
    return icons[iconName] || <FolderOpen size={20} />
  }

  const getIconColor = (category: string) => {
    const colors: Record<string, string> = {
      system: 'text-blue-500',
      utility: 'text-green-500',
      media: 'text-purple-500',
      productivity: 'text-orange-500',
    }
    return colors[category] || 'text-gray-500'
  }

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[600px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200/50 animate-slide-up">
      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索应用、设置和文档..."
            className="w-full bg-gray-100 text-gray-800 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
            autoFocus
          />
        </div>

        {!searchQuery && (
          <>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">已固定</h3>
              <div className="grid grid-cols-4 gap-2">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 transition-all group"
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-blue-100 transition-all ${getIconColor(app.category)}`}>
                      {getIcon(app.icon)}
                    </div>
                    <span className="text-xs mt-2 text-gray-700 font-medium truncate w-full text-center">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">推荐</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: '快速入门', desc: '了解新功能', icon: '📖' },
                  { name: '最近使用', desc: '查看常用应用', icon: '🕐' },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all text-left"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {searchQuery && (
          <div className="space-y-1">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 ${getIconColor(app.category)}`}>
                    {getIcon(app.icon)}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-800">{app.name}</div>
                    <div className="text-xs text-gray-500">{app.description}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>未找到 "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 p-4 flex items-center justify-between bg-gray-50/50">
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
          <Settings size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">设置</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
          <Power size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">电源</span>
        </button>
      </div>
    </div>
  )
}
