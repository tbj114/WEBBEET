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
  wallpaperUrl: string | null
  wallpaperMode: 'cover' | 'fill' | 'center' | 'tile' | 'stretch'
  showPersonalization: boolean
  theme: 'light' | 'dark' | 'blue' | 'purple' | 'red' | 'green' | 'orange' | 'teal'
  selectedIcons: string[]
  boxSelectionStart: { x: number; y: number } | null
  boxSelectionEnd: { x: number; y: number } | null
  currentPath: string[]

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
  removeSelectedIcons: () => void
  updateDesktopIconPosition: (iconId: string, x: number, y: number) => void
  setWallpaperUrl: (url: string | null) => void
  setWallpaperMode: (mode: 'cover' | 'fill' | 'center' | 'tile' | 'stretch') => void
  setShowPersonalization: (show: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'blue' | 'purple' | 'red' | 'green' | 'orange' | 'teal') => void
  addUploadedFile: (file: FileItem) => void
  setSelectedIcons: (ids: string[]) => void
  clearSelectedIcons: () => void
  addToSelectedIcons: (id: string) => void
  setBoxSelectionStart: (pos: { x: number; y: number } | null) => void
  setBoxSelectionEnd: (pos: { x: number; y: number } | null) => void
  navigateTo: (path: string[]) => void
  executeCommand: (cmd: string) => string
}

const defaultApps: AppInfo[] = [
  { id: 'explorer', name: '文件资源管理器', icon: 'FolderOpen', description: '浏览文件系统', category: 'system' },
  { id: 'notepad', name: '记事本', icon: 'FileText', description: '简单文本编辑器', category: 'utility' },
  { id: 'calculator', name: '计算器', icon: 'Calculator', description: '基本计算功能', category: 'utility' },
  { id: 'terminal', name: '终端', icon: 'Terminal', description: '命令行界面', category: 'system' },
  { id: 'settings', name: '设置', icon: 'Settings', description: '系统设置', category: 'system' },
  { id: 'browser', name: '浏览器', icon: 'Globe', description: '网页浏览器', category: 'system' },
  { id: 'music', name: '音乐', icon: 'Music', description: '音乐播放器', category: 'media' },
  { id: 'photos', name: '照片', icon: 'Image', description: '图片查看器', category: 'media' },
]

const defaultDesktopIcons: DesktopIcon[] = [
  { id: 'icon-1', name: '我的电脑', appId: 'explorer', icon: 'HardDrive', x: 20, y: 20 },
  { id: 'icon-2', name: '回收站', appId: 'explorer', icon: 'Trash2', x: 20, y: 100 },
  { id: 'icon-3', name: '文档', appId: 'explorer', icon: 'FolderOpen', x: 20, y: 180 },
  { id: 'icon-4', name: '记事本', appId: 'notepad', icon: 'FileText', x: 20, y: 260 },
]

const defaultFileSystem: FileItem[] = [
  { id: 'f1', name: '文档', type: 'folder', modifiedAt: new Date(), icon: 'Folder', path: '/文档' },
  { id: 'f2', name: '图片', type: 'folder', modifiedAt: new Date(), icon: 'Image', path: '/图片' },
  { id: 'f3', name: '音乐', type: 'folder', modifiedAt: new Date(), icon: 'Music', path: '/音乐' },
  { id: 'f4', name: '视频', type: 'folder', modifiedAt: new Date(), icon: 'Film', path: '/视频' },
  { id: 'f5', name: '下载', type: 'folder', modifiedAt: new Date(), icon: 'Download', path: '/下载' },
  { id: 'f6', name: 'readme.txt', type: 'file', size: 1024, modifiedAt: new Date(), icon: 'FileText', path: '/readme.txt' },
  { id: 'f7', name: 'notes.txt', type: 'file', size: 512, modifiedAt: new Date(), icon: 'FileText', path: '/notes.txt' },
]

const defaultSystemTrayItems: SystemTrayItem[] = [
  { id: 'tray-1', icon: 'Wifi', tooltip: '网络已连接' },
  { id: 'tray-2', icon: 'Volume2', tooltip: '音量: 80%' },
  { id: 'tray-3', icon: 'Battery', tooltip: '电池: 100%' },
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
  wallpaperUrl: null,
  wallpaperMode: 'fill',
  showPersonalization: false,
  theme: 'blue',
  selectedIcons: [],
  boxSelectionStart: null,
  boxSelectionEnd: null,
  currentPath: ['/'],

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
      x: Math.random() * 200 + 50,
      y: Math.random() * 100 + 50,
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

  setWallpaperUrl: (url: string | null) => {
    set({ wallpaperUrl: url })
  },

  setWallpaperMode: (mode) => {
    set({ wallpaperMode: mode })
  },

  setShowPersonalization: (show) => {
    set({ showPersonalization: show })
  },

  setTheme: (theme) => {
    set({ theme })
  },

  addUploadedFile: (file) => {
    set(state => ({
      fileSystem: [file, ...state.fileSystem],
    }))
  },

  setSelectedIcons: (ids) => {
    set({ selectedIcons: ids })
  },

  clearSelectedIcons: () => {
    set({ selectedIcons: [] })
  },

  addToSelectedIcons: (id) => {
    set(state => ({
      selectedIcons: [...state.selectedIcons, id],
    }))
  },

  removeSelectedIcons: () => {
    set(state => ({
      desktopIcons: state.desktopIcons.filter(i => !state.selectedIcons.includes(i.id)),
      selectedIcons: [],
    }))
  },

  setBoxSelectionStart: (pos) => {
    set({ boxSelectionStart: pos })
  },

  setBoxSelectionEnd: (pos) => {
    set({ boxSelectionEnd: pos })
  },

  navigateTo: (path) => {
    set({ currentPath: path })
  },

  executeCommand: (cmd) => {
    const args = cmd.trim().split(' ')
    const command = args[0]
    const params = args.slice(1)

    switch (command) {
      case 'ls':
        return get().fileSystem.map(f => f.name).join('  ')
      case 'pwd':
        return get().currentPath.join('/')
      case 'cd':
        if (params[0] === '..') {
          const newPath = get().currentPath.slice(0, -1)
          set({ currentPath: newPath.length ? newPath : ['/'] })
          return ''
        } else if (params[0]) {
          set({ currentPath: [...get().currentPath, params[0]] })
          return ''
        }
        return ''
      case 'cat':
        if (params[0]) {
          const file = get().fileSystem.find(f => f.name === params[0])
          return file?.url ? `File: ${file.name}\nPath: ${file.path}\nSize: ${file.size} bytes` : `cat: ${params[0]}: No such file`
        }
        return 'cat: missing file operand'
      case 'rm':
        if (params[0]) {
          set(state => ({
            desktopIcons: state.desktopIcons.filter(i => i.name !== params[0]),
          }))
          return ''
        }
        return 'rm: missing file operand'
      case 'mkdir':
        if (params[0]) {
          const newIcon: DesktopIcon = {
            id: `icon-${Date.now()}`,
            name: params[0],
            appId: 'explorer',
            icon: 'FolderOpen',
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
          }
          set(state => ({ desktopIcons: [...state.desktopIcons, newIcon] }))
          return ''
        }
        return 'mkdir: missing directory name'
      case 'touch':
        if (params[0]) {
          const newFile: DesktopIcon = {
            id: `icon-${Date.now()}`,
            name: params[0],
            appId: 'notepad',
            icon: 'FileText',
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
          }
          set(state => ({ desktopIcons: [...state.desktopIcons, newFile] }))
          return ''
        }
        return 'touch: missing file name'
      case 'clear':
        return 'CLEAR'
      case 'help':
        return `Available commands:
  ls          - List files
  pwd         - Print working directory
  cd <dir>    - Change directory
  cat <file>  - Display file content
  rm <name>   - Remove file
  mkdir <dir> - Create directory
  touch <file>- Create file
  clear       - Clear screen
  help        - Show this help`
      default:
        return `${command}: command not found`
    }
  },
}))
