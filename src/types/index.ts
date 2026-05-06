export interface WindowState {
  id: string
  appId: string
  title: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  isClosed: boolean
  zIndex: number
}

export interface DesktopIcon {
  id: string
  name: string
  appId: string
  icon: string
  x: number
  y: number
}

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: number
  modifiedAt: Date
  icon: string
  path: string
}

export interface AppInfo {
  id: string
  name: string
  icon: string
  description: string
  category: 'system' | 'utility' | 'productivity'
}

export interface TaskbarItem {
  windowId: string
  appId: string
  title: string
  icon: string
  isActive: boolean
}

export interface StartMenuSection {
  name: string
  apps: AppInfo[]
}

export interface ContextMenuOption {
  id: string
  label: string
  icon?: string
  onClick: () => void
  separator?: boolean
}

export interface SystemTrayItem {
  id: string
  icon: string
  tooltip: string
  onClick?: () => void
}
