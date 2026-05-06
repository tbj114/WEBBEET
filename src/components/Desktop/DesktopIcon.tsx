import type { DesktopIcon as DesktopIconType } from '@/types'

interface DesktopIconProps {
  icon: DesktopIconType
  onDoubleClick: () => void
}

export function DesktopIcon({ icon, onDoubleClick }: DesktopIconProps) {
  const getIconEmoji = () => {
    switch (icon.icon) {
      case 'FolderOpen': return '📁'
      case 'FileText': return '📝'
      case 'Calculator': return '🧮'
      case 'Terminal': return '💻'
      case 'Settings': return '⚙️'
      default: return '📄'
    }
  }

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{ left: icon.x, top: icon.y }}
      onDoubleClick={onDoubleClick}
    >
      <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
        <span className="text-3xl">{getIconEmoji()}</span>
      </div>
      <span className="text-xs text-white mt-1 text-center max-w-[72px] truncate">
        {icon.name}
      </span>
    </div>
  )
}
