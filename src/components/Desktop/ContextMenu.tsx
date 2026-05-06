import { useRef, useEffect } from 'react'
import { FolderPlus, FileText, RefreshCw, Monitor, Image, FolderOpen, Info } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'

interface ContextMenuProps {
  position: { x: number; y: number }
  onClose: () => void
  type?: 'desktop' | 'file' | 'folder' | 'icon'
  targetId?: string
}

export function ContextMenu({ position, onClose, type = 'desktop', targetId }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { 
    addDesktopIcon, 
    openWindow, 
    setShowPersonalization,
    fileSystem 
  } = useDesktopStore()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleNewFolder = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIcon = {
      name: '新建文件夹',
      appId: 'explorer',
      icon: 'FolderOpen',
      x: position.x,
      y: position.y - 48,
    }
    addDesktopIcon(newIcon)
    onClose()
  }

  const handleNewTextFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    addDesktopIcon({
      name: '新建文本文档.txt',
      appId: 'notepad',
      icon: 'FileText',
      x: position.x,
      y: position.y - 48,
    })
    onClose()
  }

  const handlePersonalization = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPersonalization(true)
    onClose()
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (targetId) {
      const icon = fileSystem.find(f => f.id === targetId)
      if (icon) {
        if (icon.type === 'folder') {
          openWindow('explorer', icon.name)
        } else {
          openWindow('notepad', icon.name)
        }
      }
    }
    onClose()
  }

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.reload()
    onClose()
  }

  const menuItems = [
    { icon: FolderPlus, label: '新建文件夹', action: handleNewFolder, shortcut: '' },
    { icon: FileText, label: '新建文本文档', action: handleNewTextFile, shortcut: '' },
    { type: 'separator' as const },
    { icon: RefreshCw, label: '刷新', action: handleRefresh, shortcut: 'F5' },
    { type: 'separator' as const },
    { icon: Monitor, label: '显示设置', action: handlePersonalization, shortcut: '' },
    { icon: Image, label: '更改桌面背景', action: handlePersonalization, shortcut: '' },
    { type: 'separator' as const },
    { icon: Info, label: '关于', action: () => { alert('Web Virtual Desktop v1.0\n现代化Web桌面环境'); onClose() }, shortcut: '' },
  ]

  if (type === 'icon') {
    menuItems.unshift(
      { icon: FolderOpen, label: '打开', action: handleOpen, shortcut: 'Enter' },
      { type: 'separator' as const }
    )
  }

  return (
    <div
      ref={menuRef}
      className="fixed bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl z-[9999] min-w-[200px] py-1 overflow-hidden"
      style={{ 
        left: Math.min(position.x, window.innerWidth - 220), 
        top: Math.min(position.y, window.innerHeight - 400) 
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => (
        item.type === 'separator' ? (
          <div key={`sep-${index}`} className="h-px bg-gray-200/50 my-1" />
        ) : (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon size={16} className="text-gray-500 group-hover:text-blue-500" />
              <span className="text-sm text-gray-700 group-hover:text-blue-600">{item.label}</span>
            </div>
            {item.shortcut && (
              <span className="text-xs text-gray-400 group-hover:text-blue-400">{item.shortcut}</span>
            )}
          </button>
        )
      ))}
    </div>
  )
}
