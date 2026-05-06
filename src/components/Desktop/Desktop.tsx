import { useCallback } from 'react'
import { useDesktopStore } from '@/store/desktopStore'
import { Window } from '../Window/Window'
import { DesktopIcon } from './DesktopIcon'
import { ContextMenu } from './ContextMenu'

export function Desktop() {
  const {
    windows,
    desktopIcons,
    openWindow,
    setContextMenu,
    contextMenuOpen,
    setStartMenuOpen,
  } = useDesktopStore()

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (e.button === 0) {
        setContextMenu(false)
        setStartMenuOpen(false)
      } else if (e.button === 2) {
        e.preventDefault()
        setContextMenu(true, { x: e.clientX, y: e.clientY })
      }
    }
  }, [setContextMenu, setStartMenuOpen])

  const handleIconDoubleClick = (appId: string, name: string) => {
    openWindow(appId, name)
  }

  return (
    <div
      className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative"
      onClick={handleDesktopClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 p-5" style={{ bottom: '48px' }}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onDoubleClick={() => handleIconDoubleClick(icon.appId, icon.name)}
          />
        ))}
      </div>

      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}

      {contextMenuOpen && <ContextMenu />}
    </div>
  )
}
