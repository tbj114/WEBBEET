import { useCallback, useState, useRef } from 'react'
import { useDesktopStore } from '@/store/desktopStore'
import { Window } from '../Window/Window'
import { DesktopIcon } from './DesktopIcon'
import { ContextMenu } from './ContextMenu'
import { Personalization } from './Personalization'
import { DropZone } from './DropZone'

export function Desktop() {
  const {
    windows,
    desktopIcons,
    openWindow,
    contextMenuOpen,
    contextMenuPosition,
    setContextMenu,
    setStartMenuOpen,
    wallpaperUrl,
    wallpaperMode,
    showPersonalization,
    addUploadedFile,
    clearSelectedIcons,
    boxSelectionStart,
    boxSelectionEnd,
    setBoxSelectionStart,
    setBoxSelectionEnd,
    setSelectedIcons,
  } = useDesktopStore()

  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)

  const handleDesktopMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      const target = e.target as HTMLElement
      if (target.classList.contains('desktop-area') || target === desktopRef.current) {
        clearSelectedIcons()
        setContextMenu(false)
        setStartMenuOpen(false)
        setBoxSelectionStart({ x: e.clientX, y: e.clientY })
        setBoxSelectionEnd({ x: e.clientX, y: e.clientY })
      }
    }
  }, [clearSelectedIcons, setContextMenu, setStartMenuOpen, setBoxSelectionStart, setBoxSelectionEnd])

  const handleDesktopMouseMove = useCallback((e: React.MouseEvent) => {
    if (boxSelectionStart) {
      setBoxSelectionEnd({ x: e.clientX, y: e.clientY })
      
      const desktopArea = desktopRef.current
      if (desktopArea) {
        const rect = desktopArea.getBoundingClientRect()
        const minX = Math.min(boxSelectionStart.x - rect.left, e.clientX - rect.left)
        const maxX = Math.max(boxSelectionStart.x - rect.left, e.clientX - rect.left)
        const minY = Math.min(boxSelectionStart.y - rect.top - 48, e.clientY - rect.top - 48)
        const maxY = Math.max(boxSelectionStart.y - rect.top - 48, e.clientY - rect.top - 48)
        
        const selectedIds: string[] = []
        desktopIcons.forEach((icon) => {
          const iconX = icon.x
          const iconY = icon.y
          const iconW = 64
          const iconH = 80
          
          if (
            iconX < maxX &&
            iconX + iconW > minX &&
            iconY < maxY &&
            iconY + iconH > minY
          ) {
            selectedIds.push(icon.id)
          }
        })
        
        if (selectedIds.length > 0) {
          setSelectedIcons(selectedIds)
        }
      }
    }
  }, [boxSelectionStart, desktopIcons, setBoxSelectionEnd, setSelectedIcons])

  const handleDesktopMouseUp = useCallback(() => {
    if (boxSelectionStart) {
      setBoxSelectionStart(null)
      setBoxSelectionEnd(null)
    }
  }, [boxSelectionStart, setBoxSelectionStart, setBoxSelectionEnd])

  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu(true, { x: e.clientX, y: e.clientY })
    setStartMenuOpen(false)
  }, [setContextMenu, setStartMenuOpen])

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('desktop-area') || target === desktopRef.current) {
      if (e.button === 0) {
        setContextMenu(false)
        setStartMenuOpen(false)
      }
    }
  }, [setContextMenu, setStartMenuOpen])

  const handleIconDoubleClick = (appId: string, name: string) => {
    openWindow(appId, name)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      files.forEach(file => {
        const fileUrl = URL.createObjectURL(file)
        addUploadedFile({
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: 'file',
          size: file.size,
          modifiedAt: new Date(),
          icon: file.type.startsWith('image/') ? 'Image' : 'FileText',
          path: `/上传文件/${file.name}`,
          url: fileUrl,
          isUploaded: true,
        })
      })
      openWindow('explorer', '文件资源管理器')
    }
  }, [addUploadedFile, openWindow])

  const getBackgroundStyle = () => {
    if (wallpaperUrl) {
      if (wallpaperMode === 'cover') {
        return {
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      } else if (wallpaperMode === 'fill') {
        return {
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }
      } else if (wallpaperMode === 'center') {
        return {
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      } else if (wallpaperMode === 'tile') {
        return {
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
        }
      } else if (wallpaperMode === 'stretch') {
        return {
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }
      }
    }
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    }
  }

  const getBoxSelectionStyle = () => {
    if (!boxSelectionStart || !boxSelectionEnd) return null
    
    const desktopArea = desktopRef.current
    if (!desktopArea) return null
    
    const rect = desktopArea.getBoundingClientRect()
    const left = Math.min(boxSelectionStart.x - rect.left, boxSelectionEnd.x - rect.left)
    const top = Math.min(boxSelectionStart.y - rect.top - 48, boxSelectionEnd.y - rect.top - 48)
    const width = Math.abs(boxSelectionEnd.x - boxSelectionStart.x)
    const height = Math.abs(boxSelectionEnd.y - boxSelectionStart.y)
    
    return {
      left,
      top,
      width,
      height,
    }
  }

  const boxSelectionStyle = getBoxSelectionStyle()

  return (
    <div
      ref={desktopRef}
      className="w-full h-full relative overflow-hidden"
      style={getBackgroundStyle()}
      onClick={handleDesktopClick}
      onMouseDown={handleDesktopMouseDown}
      onMouseMove={handleDesktopMouseMove}
      onMouseUp={handleDesktopMouseUp}
      onMouseLeave={handleDesktopMouseUp}
      onContextMenu={handleDesktopContextMenu}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDraggingOver && <DropZone />}

      <div className="absolute inset-0 desktop-area p-5" style={{ bottom: '48px' }}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onDoubleClick={() => handleIconDoubleClick(icon.appId, icon.name)}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setContextMenu(true, { x: e.clientX, y: e.clientY })
            }}
          />
        ))}
        
        {boxSelectionStyle && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-500/10 pointer-events-none z-50"
            style={boxSelectionStyle}
          />
        )}
      </div>

      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}

      {contextMenuOpen && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => setContextMenu(false)}
        />
      )}

      {showPersonalization && <Personalization />}
    </div>
  )
}
