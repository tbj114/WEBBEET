import { create } from 'zustand'
import type { WindowState, DesktopIcon, AppInfo, FileItem, SystemTrayItem } from '@/types'

interface DesktopStore {
  windows: WindowState[]
  desktopIcons: DesktopIcon[]
  activeWindowId: string | null
  startMenuOpen: boolean
  contextMenuOpen: boolean
  contextMenuPosition: { x: number; y: number }
  fileSystem: FileItem[]
  apps: AppInfo[]
  systemTrayItems: SystemTrayItem[]
  nextZIndex: number

  openWindow: (appId: string, title: string) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  maximizeWindow: (windowId: string) => void
  restoreWindow: (windowId: string) => void
  setActiveWindow: (windowId: string | null) => void
  updateWindowPosition: (windowId: string, x: number, y: number) => void
  updateWindowSize: (windowId: string, width: number, height: number) => void
  setStartMenuOpen: (open: boolean) => void
  setContextMenu: (open: boolean, position?: { x: number; y: number }) => void
  addDesktopIcon: (icon: Omit<DesktopIcon, 'id'>) => void
  removeDesktopIcon: (iconId: string) => void
  updateDesktopIconPosition: (iconId: string, x: number, y: number) => void
}

const defaultApps: AppInfo[] = [
  { id: 'explorer', name: '文件资源管理器', icon: 'FolderOpen', description: '浏览文件系统', category: 'system' },
  { id: 'notepad', name: '记事本', icon: 'FileText', description: '简单文本编辑器', category: 'utility' },
  { id: 'calculator', name: '计算器', icon: 'Calculator', description: '基本计算功能', category: 'utility' },
  { id: 'terminal', name: '终端', icon: 'Terminal', description: '命令行界面', category: 'system' },
  { id: 'settings', name: '设置', icon: 'Settings', description: '系统设置', category: 'system' },
]

const defaultDesktopIcons: DesktopIcon[] = [
  { id: 'icon-1', name: '文档', appId: 'explorer', icon: 'FolderOpen', x: 20, y: 20 },
  { id: 'icon-2', name: '记事本', appId: 'notepad', icon: 'FileText', x: 20, y: 100 },
  { id: 'icon-3', name: '计算器', appId: 'calculator', icon: 'Calculator', x: 20, y: 180 },
  { id: 'icon-4', name: '终端', appId: 'terminal', icon: 'Terminal', x: 20, y: 260 },
]

const defaultFileSystem: FileItem[] = [
  { id: 'f1', name: '文档', type: 'folder', modifiedAt: new Date(), icon: 'Folder', path: '/文档' },
  { id: 'f2', name: '图片', type: 'folder', modifiedAt: new Date(), icon: 'Image', path: '/图片' },
  { id: 'f3', name: '音乐', type: 'folder', modifiedAt: new Date(), icon: 'Music', path: '/音乐' },
  { id: 'f4', name: '视频', type: 'folder', modifiedAt: new Date(), icon: 'Film', path: '/视频' },
  { id: 'f5', name: 'readme.txt', type: 'file', size: 1024, modifiedAt: new Date(), icon: 'FileText', path: '/readme.txt' },
  { id: 'f6', name: 'notes.txt', type: 'file', size: 512, modifiedAt: new Date(), icon: 'FileText', path: '/notes.txt' },
]

const defaultSystemTrayItems: SystemTrayItem[] = [
  { id: 'tray-1', icon: 'Wifi', tooltip: '网络连接' },
  { id: 'tray-2', icon: 'Volume2', tooltip: '音量' },
  { id: 'tray-3', icon: 'Battery', tooltip: '电池' },
]

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: [],
  desktopIcons: defaultDesktopIcons,
  activeWindowId: null,
  startMenuOpen: false,
  contextMenuOpen: false,
  contextMenuPosition: { x: 0, y: 0 },
  fileSystem: defaultFileSystem,
  apps: defaultApps,
  systemTrayItems: defaultSystemTrayItems,
  nextZIndex: 100,

  openWindow: (appId: string, title: string) => {
    const { windows, nextZIndex } = get()
    const existingWindow = windows.find(w => w.appId === appId && !w.isClosed)
    
    if (existingWindow) {
      set({ activeWindowId: existingWindow.id })
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map(w => 
            w.id === existingWindow.id ? { ...w, isMinimized: false } : w
          )
        })
      }
      return
    }

    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      appId,
      title,
      x: 50 + (windows.length * 30),
      y: 50 + (windows.length * 30),
      width: 800,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      zIndex: nextZIndex,
    }

    set({
      windows: [...windows, newWindow],
      activeWindowId: newWindow.id,
      nextZIndex: nextZIndex + 1,
    })
  },

  closeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== windowId),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }))
  },

  minimizeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }))
  },

  maximizeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, isMaximized: true, isMinimized: false } : w
      ),
    }))
  },

  restoreWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, isMaximized: false } : w
      ),
    }))
  },

  setActiveWindow: (windowId: string | null) => {
    if (windowId) {
      const { windows, nextZIndex } = get()
      set({
        windows: windows.map(w =>
          w.id === windowId ? { ...w, zIndex: nextZIndex } : w
        ),
        activeWindowId: windowId,
        nextZIndex: nextZIndex + 1,
      })
    } else {
      set({ activeWindowId: null })
    }
  },

  updateWindowPosition: (windowId: string, x: number, y: number) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, x, y } : w
      ),
    }))
  },

  updateWindowSize: (windowId: string, width: number, height: number) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, width, height, isMaximized: false } : w
      ),
    }))
  },

  setStartMenuOpen: (open: boolean) => {
    set({ startMenuOpen: open })
  },

  setContextMenu: (open: boolean, position?: { x: number; y: number }) => {
    set({
      contextMenuOpen: open,
      contextMenuPosition: position || { x: 0, y: 0 },
    })
  },

  addDesktopIcon: (icon: Omit<DesktopIcon, 'id'>) => {
    set(state => ({
      desktopIcons: [...state.desktopIcons, { ...icon, id: `icon-${Date.now()}` }],
    }))
  },

  removeDesktopIcon: (iconId: string) => {
    set(state => ({
      desktopIcons: state.desktopIcons.filter(i => i.id !== iconId),
    }))
  },

  updateDesktopIconPosition: (iconId: string, x: number, y: number) => {
    set(state => ({
      desktopIcons: state.desktopIcons.map(i =>
        i.id === iconId ? { ...i, x, y } : i
      ),
    }))
  },
}))
