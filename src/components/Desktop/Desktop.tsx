import { useCallback, useState } from 'react'
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
  } = useDesktopStore()

  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu(true, { x: e.clientX, y: e.clientY })
    setStartMenuOpen(false)
  }, [setContextMenu, setStartMenuOpen])

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.desktop-area')) {
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

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={getBackgroundStyle()}
      onClick={handleDesktopClick}
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
