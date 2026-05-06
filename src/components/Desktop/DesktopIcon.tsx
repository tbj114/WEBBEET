import type { DesktopIcon as DesktopIconType } from '@/types'
import { useDesktopStore } from '@/store/desktopStore'
import { getIconByName } from '@/utils/icons'

interface DesktopIconProps {
  icon: DesktopIconType
  onDoubleClick: () => void
  onContextMenu?: (e: React.MouseEvent) => void
}

export function DesktopIcon({ icon, onDoubleClick, onContextMenu }: DesktopIconProps) {
  const { selectedIcons, setSelectedIcons, clearSelectedIcons } = useDesktopStore()
  const isSelected = selectedIcons.includes(icon.id)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (e.ctrlKey || e.metaKey) {
      if (isSelected) {
        setSelectedIcons(selectedIcons.filter(id => id !== icon.id))
      } else {
        setSelectedIcons([...selectedIcons, icon.id])
      }
    } else {
      if (!isSelected) {
        clearSelectedIcons()
        setSelectedIcons([icon.id])
      }
    }
  }

  return (
    <div
      className={`absolute flex flex-col items-center cursor-pointer select-none transition-all duration-150 ${
        isSelected ? 'scale-105' : ''
      }`}
      style={{ left: icon.x, top: icon.y }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onDoubleClick()
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isSelected) {
          clearSelectedIcons()
          setSelectedIcons([icon.id])
        }
        onContextMenu?.(e)
      }}
      onClick={handleClick}
    >
      <div className={`w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-150 ${
        isSelected 
          ? 'bg-blue-500/30 shadow-lg' 
          : 'bg-white/15 hover:bg-white/25'
      }`}>
        {getIconByName(icon.icon, 48)}
      </div>
      <div className={`mt-1 px-1.5 py-0.5 rounded text-xs font-medium text-center max-w-[68px] truncate transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-700/70 text-white'
      }`}>
        {icon.name}
      </div>
    </div>
  )
}
