import { useState, useRef } from 'react'
import { X, Image, Palette, Monitor, Sun, Moon } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'

export function Personalization() {
  const { 
    setShowPersonalization, 
    setWallpaperUrl, 
    setWallpaperMode,
    wallpaperUrl,
    wallpaperMode,
    setTheme,
    theme 
  } = useDesktopStore()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState<'background' | 'theme' | 'display'>('background')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setWallpaperUrl(url)
    }
  }

  const backgroundModes = [
    { id: 'cover', label: '填充', preview: '⬜➡️' },
    { id: 'fill', label: '适合', preview: '⬜🔲' },
    { id: 'center', label: '居中', preview: '🔲⬜' },
    { id: 'tile', label: '平铺', preview: '🔲' },
    { id: 'stretch', label: '拉伸', preview: '▬' },
  ]

  const presetWallpapers = [
    { id: '1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920', label: '山脉' },
    { id: '2', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920', label: '自然' },
    { id: '3', url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920', label: '城市' },
    { id: '4', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920', label: '星空' },
    { id: '5', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920', label: '峡谷' },
    { id: '6', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920', label: '海滩' },
  ]

  const themeColors = [
    { id: 'blue', color: '#0078D4', name: 'Windows 蓝' },
    { id: 'purple', color: '#8764B8', name: '紫罗兰' },
    { id: 'red', color: '#C239B3', name: '玫红' },
    { id: 'green', color: '#107C10', name: '翠绿' },
    { id: 'orange', color: '#D83B01', name: '橙色' },
    { id: 'teal', color: '#00B7C3', name: '青色' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[900px] h-[600px] flex overflow-hidden">
        <div className="w-56 bg-gray-50 border-r border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">个性化</h2>
          <nav className="space-y-1">
            {[
              { id: 'background', label: '背景', icon: Image },
              { id: 'theme', label: '主题', icon: Palette },
              { id: 'display', label: '显示', icon: Monitor },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              {activeTab === 'background' && '选择背景'}
              {activeTab === 'theme' && '选择主题'}
              {activeTab === 'display' && '显示设置'}
            </h3>
            <button
              onClick={() => setShowPersonalization(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            {activeTab === 'background' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">上传图片</h4>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Image size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-500">点击上传图片作为壁纸</span>
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">预设壁纸</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {presetWallpapers.map((wallpaper) => (
                      <button
                        key={wallpaper.id}
                        onClick={() => setWallpaperUrl(wallpaper.url)}
                        className={`relative h-24 rounded-lg overflow-hidden group ${
                          wallpaperUrl === wallpaper.url ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <img
                          src={wallpaper.url}
                          alt={wallpaper.label}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-2">
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {wallpaper.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">图片位置</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {backgroundModes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setWallpaperMode(mode.id as any)}
                        className={`p-3 rounded-lg border transition-colors ${
                          wallpaperMode === mode.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{mode.preview}</div>
                          <span className="text-xs text-gray-600">{mode.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">主题颜色</h4>
                  <div className="flex gap-3">
                    {themeColors.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id as any)}
                        className={`w-12 h-12 rounded-full relative ${
                          theme === t.id ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: t.color }}
                        title={t.name}
                      >
                        {theme === t.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">深色模式</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex-1 p-4 rounded-xl border transition-colors ${
                        theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Sun size={24} className="mx-auto mb-2 text-yellow-500" />
                      <span className="text-sm font-medium">浅色</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex-1 p-4 rounded-xl border transition-colors ${
                        theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Moon size={24} className="mx-auto mb-2 text-blue-500" />
                      <span className="text-sm font-medium">深色</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'display' && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Monitor size={24} className="text-blue-500" />
                    <span className="font-medium">显示设置</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    屏幕分辨率：{window.innerWidth} × {window.innerHeight}
                  </p>
                  <p className="text-sm text-gray-600">
                    缩放比例：100%
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium mb-2">夜间模式</h4>
                  <p className="text-sm text-gray-600">
                    开启夜间模式可以减少蓝光，帮助保护眼睛。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
