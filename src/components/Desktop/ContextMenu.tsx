import { FolderPlus, FileText, RefreshCw, Settings } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'

export function ContextMenu() {
  const { contextMenuPosition, setContextMenu, addDesktopIcon } = useDesktopStore()

  const handleClose = () => {
    setContextMenu(false)
  }

  const handleNewFolder = () => {
    addDesktopIcon({
      name: '新建文件夹',
      appId: 'explorer',
      icon: 'FolderOpen',
      x: 200,
      y: 200,
    })
    setContextMenu(false)
  }

  const handleNewTextFile = () => {
    addDesktopIcon({
      name: '新建文本文档.txt',
      appId: 'notepad',
      icon: 'FileText',
      x: 200,
      y: 300,
    })
    setContextMenu(false)
  }

  return (
    <div
      className="fixed bg-gray-100 border border-gray-300 rounded shadow-lg z-50 min-w-[160px]"
      style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
      onClick={handleClose}
    >
      <button onClick={handleNewFolder} className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center gap-2">
        <FolderPlus size={16} className="text-gray-600" />
        <span className="text-sm">新建文件夹</span>
      </button>
      <button onClick={handleNewTextFile} className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center gap-2">
        <FileText size={16} className="text-gray-600" />
        <span className="text-sm">新建文本文档</span>
      </button>
      <div className="border-t border-gray-200 my-1" />
      <button className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center gap-2">
        <RefreshCw size={16} className="text-gray-600" />
        <span className="text-sm">刷新</span>
      </button>
      <div className="border-t border-gray-200 my-1" />
      <button className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center gap-2">
        <Settings size={16} className="text-gray-600" />
        <span className="text-sm">个性化</span>
      </button>
    </div>
  )
}
