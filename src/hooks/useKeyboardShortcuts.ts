import { useEffect } from 'react'
import { useDesktopStore } from '@/store/desktopStore'

export function useKeyboardShortcuts() {
  const { 
    windows, 
    activeWindowId, 
    minimizeWindow, 
    setActiveWindow, 
    closeWindow, 
    openWindow,
    setStartMenuOpen,
    startMenuOpen 
  } = useDesktopStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey
      const isAlt = e.altKey
      const key = e.key.toLowerCase()

      if (isAlt && key === 'tab') {
        e.preventDefault()
        const openWindows = windows.filter(w => !w.isMinimized && !w.isClosed)
        if (openWindows.length > 0) {
          const currentIndex = openWindows.findIndex(w => w.id === activeWindowId)
          const nextIndex = e.shiftKey 
            ? (currentIndex - 1 + openWindows.length) % openWindows.length
            : (currentIndex + 1) % openWindows.length
          setActiveWindow(openWindows[nextIndex].id)
        }
      }

      if (isCtrl && key === 'c') {
        console.log('Copy shortcut')
      }

      if (isCtrl && key === 'v') {
        console.log('Paste shortcut')
      }

      if (isCtrl && key === 'x') {
        console.log('Cut shortcut')
      }

      if (isCtrl && key === 'z') {
        console.log('Undo shortcut')
      }

      if (isCtrl && key === 's') {
        e.preventDefault()
        console.log('Save shortcut')
      }

      if (isCtrl && key === 'n') {
        e.preventDefault()
        openWindow('notepad', '新建文本文档')
      }

      if (isCtrl && key === 'w') {
        e.preventDefault()
        if (activeWindowId) {
          closeWindow(activeWindowId)
        }
      }

      if (isCtrl && key === 'l') {
        e.preventDefault()
        openWindow('explorer', '文件资源管理器')
      }

      if (isCtrl && key === 'r') {
        e.preventDefault()
        openWindow('browser', '浏览器')
      }

      if (isAlt && key === 'f4') {
        e.preventDefault()
        if (activeWindowId) {
          closeWindow(activeWindowId)
        }
      }

      if (key === 'f5') {
        e.preventDefault()
        window.location.reload()
      }

      if (isAlt && key === 'enter') {
        e.preventDefault()
        if (activeWindowId) {
          const window = windows.find(w => w.id === activeWindowId)
          if (window?.isMaximized) {
            useDesktopStore.getState().restoreWindow(activeWindowId)
          } else {
            useDesktopStore.getState().maximizeWindow(activeWindowId)
          }
        }
      }

      if (isCtrl && key === 'd') {
        e.preventDefault()
        if (activeWindowId) {
          minimizeWindow(activeWindowId)
        }
      }

      if (key === 'escape') {
        setStartMenuOpen(false)
      }

      if (key === 'meta' || key === 'super') {
        e.preventDefault()
        setStartMenuOpen(!startMenuOpen)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [windows, activeWindowId, minimizeWindow, setActiveWindow, closeWindow, openWindow, setStartMenuOpen, startMenuOpen])
}
