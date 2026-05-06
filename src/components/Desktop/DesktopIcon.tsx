import type { DesktopIcon as DesktopIconType } from '@/types'
import { useState } from 'react'

interface DesktopIconProps {
  icon: DesktopIconType
  onDoubleClick: () => void
  onContextMenu?: (e: React.MouseEvent) => void
}

export function DesktopIcon({ icon, onDoubleClick, onContextMenu }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  const getIconEmoji = () => {
    switch (icon.icon) {
      case 'HardDrive': return '💻'
      case 'Trash2': return '🗑️'
      case 'FolderOpen': return '📁'
      case 'FileText': return '📄'
      case 'Calculator': return '🧮'
      case 'Terminal': return '💻'
      case 'Settings': return '⚙️'
      case 'Globe': return '🌐'
      case 'Music': return '🎵'
      case 'Image': return '🖼️'
      default: return '📄'
    }
  }

  return (
    <div
      className={`absolute flex flex-col items-center cursor-pointer select-none group transition-all duration-150 ${
        isSelected ? 'scale-105' : ''
      }`}
      style={{ left: icon.x, top: icon.y }}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onClick={(e) => {
        e.stopPropagation()
        setIsSelected(true)
      }}
    >
      <div className={`w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-150 ${
        isSelected 
          ? 'bg-blue-500/30 ring-2 ring-blue-400 shadow-lg' 
          : 'bg-white/10 hover:bg-white/20'
      }`}>
        <span className="text-4xl filter drop-shadow-lg">{getIconEmoji()}</span>
      </div>
      <div className={`mt-1 px-1.5 py-0.5 rounded text-xs font-medium text-center max-w-[68px] truncate transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-black/40 text-white backdrop-blur-sm'
      }`}>
        {icon.name}
      </div>
    </div>
  )
}
