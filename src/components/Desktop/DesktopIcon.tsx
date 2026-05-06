import { useState, useRef } from 'react'
import type { DesktopIcon as DesktopIconType } from '@/types'
import { useDesktopStore } from '@/store/desktopStore'
import { getIconByName } from '@/utils/icons'

interface DesktopIconProps {
  icon: DesktopIconType
  onDoubleClick: () => void
  onContextMenu?: (e: React.MouseEvent) => void
}

export function DesktopIcon({ icon, onDoubleClick, onContextMenu }: DesktopIconProps) {
  const { selectedIcons, setSelectedIcons, clearSelectedIcons, updateDesktopIconPosition } = useDesktopStore()
  const isSelected = selectedIcons.includes(icon.id)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: icon.x, y: icon.y })
  const dragOffset = useRef({ x: 0, y: 0 })
  const lastClickTime = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.stopPropagation()
    
    const now = Date.now()
    if (now - lastClickTime.current < 300) {
      lastClickTime.current = now
      return
    }
    lastClickTime.current = now

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

    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - icon.x,
      y: e.clientY - icon.y
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.current.x
    const newY = e.clientY - dragOffset.current.y
    
    setPosition({ x: newX, y: newY })
    updateDesktopIconPosition(icon.id, newX, newY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`absolute flex flex-col items-center select-none transition-all duration-75 ${
        isDragging ? 'cursor-grabbing z-50 scale-110' : 'cursor-grab'
      }`}
      style={{ 
        left: position.x, 
        top: position.y,
        transition: isDragging ? 'none' : 'all 0.15s'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
