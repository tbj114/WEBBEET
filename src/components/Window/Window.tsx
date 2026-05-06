import { useState, useRef, useEffect, useCallback } from 'react'
import { Minus, Square, X, Maximize2 } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import type { WindowState } from '@/types'

interface WindowProps {
  window: WindowState
}

export function Window({ window: windowState }: WindowProps) {
  const {
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    closeWindow,
    updateWindowPosition,
    updateWindowSize,
    setActiveWindow,
  } = useDesktopStore()

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, winX: 0, winY: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (windowState.isMinimized) {
      setIsDragging(false)
      setIsResizing(false)
    }
  }, [windowState.isMinimized])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    e.preventDefault()
    setActiveWindow(windowState.id)
    setIsDragging(true)
    setDragStart({ x: e.clientX - windowState.x, y: e.clientY - windowState.y })
  }, [windowState.id, windowState.x, windowState.y, setActiveWindow])

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveWindow(windowState.id)
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowState.width,
      height: windowState.height,
      winX: windowState.x,
      winY: windowState.y,
    })
  }, [windowState.id, windowState.width, windowState.height, windowState.x, windowState.y, setActiveWindow])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowState.isMaximized) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        updateWindowPosition(windowState.id, Math.max(0, newX), Math.max(0, newY))
      }
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        const newWidth = Math.max(400, resizeStart.width + deltaX)
        const newHeight = Math.max(300, resizeStart.height + deltaY)
        const newX = resizeStart.winX + (e.clientX < resizeStart.x ? deltaX : 0)
        const newY = resizeStart.winY + (e.clientY < resizeStart.y ? deltaY : 0)
        updateWindowPosition(windowState.id, Math.max(0, newX), Math.max(0, newY))
        updateWindowSize(windowState.id, newWidth, newHeight)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragStart, resizeStart, windowState.id, updateWindowPosition, updateWindowSize, windowState.isMaximized])

  const handleMinimize = () => minimizeWindow(windowState.id)
  const handleMaximize = () => {
    if (windowState.isMaximized) {
      restoreWindow(windowState.id)
    } else {
      maximizeWindow(windowState.id)
    }
  }
  const handleClose = () => closeWindow(windowState.id)

  if (windowState.isMinimized) return null

  const windowStyle: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 48,
        zIndex: windowState.zIndex,
      }
    : {
        position: 'absolute',
        left: windowState.x,
        top: windowState.y,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
      }

  return (
    <div
      ref={windowRef}
      className={`bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-shadow duration-200 ${
        windowState.isMaximized ? '' : 'border border-gray-200'
      } ${isDragging ? 'cursor-grabbing' : ''}`}
      style={windowStyle}
      onClick={() => setActiveWindow(windowState.id)}
    >
      <div
        className="h-12 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between px-4 select-none border-b border-gray-200"
        onMouseDown={!windowState.isMaximized ? handleMouseDown : undefined}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl">
            {windowState.appId === 'explorer' ? '📁' :
             windowState.appId === 'notepad' ? '📝' :
             windowState.appId === 'calculator' ? '🧮' :
             windowState.appId === 'terminal' ? '💻' :
             windowState.appId === 'settings' ? '⚙️' :
             windowState.appId === 'browser' ? '🌐' :
             windowState.appId === 'music' ? '🎵' : '📄'}
          </span>
          <span className="text-sm font-medium text-gray-700 truncate">{windowState.title}</span>
        </div>
        <div className="flex items-center window-controls">
          <button
            onClick={handleMinimize}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
            title="最小化"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
            title={windowState.isMaximized ? '还原' : '最大化'}
          >
            {windowState.isMaximized ? (
              <Maximize2 size={16} className="text-gray-600" />
            ) : (
              <Square size={14} className="text-gray-600" />
            )}
          </button>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-red-500 hover:text-white rounded-lg transition-colors"
            title="关闭"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <WindowContent appId={windowState.appId} />
      </div>
      {!windowState.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500/50 rounded-full" />
        </div>
      )}
    </div>
  )
}

function WindowContent({ appId }: { appId: string }) {
  switch (appId) {
    case 'explorer':
      return <ExplorerApp />
    case 'notepad':
      return <NotepadApp />
    case 'calculator':
      return <CalculatorApp />
    case 'terminal':
      return <TerminalApp />
    case 'settings':
      return <SettingsApp />
    case 'browser':
      return <BrowserApp />
    case 'music':
      return <MusicApp />
    case 'photos':
      return <PhotosApp />
    default:
      return <div className="p-4">未知应用</div>
  }
}

function ExplorerApp() {
  const { fileSystem, openWindow } = useDesktopStore()
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState('/')

  const handleDoubleClick = (file: typeof fileSystem[0]) => {
    if (file.type === 'folder') {
      setCurrentPath(file.path)
      openWindow('explorer', file.name)
    } else {
      openWindow('notepad', file.name)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 bg-gray-50 flex items-center px-4 border-b gap-4">
        <button 
          onClick={() => setCurrentPath('/')}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
        >
          主页
        </button>
        <div className="flex-1 bg-white rounded-lg px-4 py-2 text-sm border border-gray-200">
          {currentPath}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {fileSystem.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFile(item.id)}
              onDoubleClick={() => handleDoubleClick(item)}
              className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all ${
                selectedFile === item.id
                  ? 'bg-blue-50 ring-2 ring-blue-400'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-5xl mb-2">
                {item.type === 'folder' ? '📁' : 
                 item.icon === 'Image' ? '🖼️' : 
                 item.icon === 'Music' ? '🎵' : '📄'}
              </span>
              <span className="text-sm text-center font-medium text-gray-700 truncate max-w-full">{item.name}</span>
              <span className="text-xs text-gray-400 mt-1">
                {item.size ? `${(item.size / 1024).toFixed(1)} KB` : item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-8 bg-gray-50 border-t flex items-center px-4 text-xs text-gray-500">
        {fileSystem.length} 个项目
      </div>
    </div>
  )
}

function NotepadApp() {
  const [content, setContent] = useState('欢迎使用记事本\n\n双击文件可以在此打开编辑')

  const handleSave = () => {
    localStorage.setItem('notepad-content', content)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 bg-gray-50 flex items-center justify-between px-4 border-b">
        <span className="text-sm text-gray-600">未保存</span>
        <button
          onClick={handleSave}
          className="px-4 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
        >
          保存
        </button>
      </div>
      <textarea
        className="flex-1 w-full p-4 resize-none outline-none font-mono text-sm bg-white"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
        placeholder="在这里输入文字..."
      />
    </div>
  )
}

function CalculatorApp() {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0')
      setStoredValue(null)
      setOperator(null)
    } else if (['+', '-', '×', '÷'].includes(value)) {
      setStoredValue(display)
      setOperator(value)
      setDisplay('0')
    } else if (value === '=') {
      if (storedValue && operator) {
        const result = calculate(parseFloat(storedValue), parseFloat(display), operator)
        setDisplay(result.toString())
        setStoredValue(null)
        setOperator(null)
      }
    } else if (value === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.')
      }
    } else {
      setDisplay(display === '0' ? value : display + value)
    }
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return a / b
      default: return b
    }
  }

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-xs">
        <div className="bg-gray-800 text-right p-6 mb-2 rounded-xl">
          <span className="text-white text-4xl font-mono">{display}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(btn)}
              className={`py-4 text-xl font-medium rounded-xl transition-all active:scale-95 ${
                btn === 'C'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : ['+', '-', '×', '÷', '='].includes(btn)
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-800'
              } ${btn === '0' ? 'col-span-1' : ''}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TerminalApp() {
  const [commands, setCommands] = useState<{ input: string; output: string }[]>([
    { input: '', output: 'Web Terminal v1.0\nType "help" for available commands\n' },
  ])
  const [currentInput, setCurrentInput] = useState('')

  const handleCommand = (input: string) => {
    let output = ''
    switch (input.toLowerCase()) {
      case 'help':
        output = 'Available commands:\n- help: Show this help\n- ls: List files\n- pwd: Print working directory\n- date: Show current date\n- whoami: Show current user\n- clear: Clear screen\n- neofetch: System info'
        break
      case 'ls':
        output = '📁 Documents  📁 Pictures  📁 Music  📁 Videos\n📄 readme.txt  📄 notes.txt'
        break
      case 'pwd':
        output = '/home/webuser'
        break
      case 'date':
        output = new Date().toLocaleString()
        break
      case 'whoami':
        output = 'webuser@virtual-desktop'
        break
      case 'clear':
        setCommands([])
        return
      case 'neofetch':
        output = `
        .--.        webuser@desktop
       |o_o |       ----------------
       |:_/ |       OS: Web Desktop 1.0
      //   \\ \\      Host: Browser
     (|     | |)     Kernel: JavaScript
    /'\\_   _/\`\\      Shell: WebTerminal
    \\___)=(___/      Resolution: ${window.innerWidth}x${window.innerHeight}
        `
        break
      default:
        output = `Command not found: ${input}\nType "help" for available commands`
    }
    setCommands([...commands, { input, output }])
    setCurrentInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 p-4 font-mono text-sm">
      <div className="flex-1 overflow-auto text-green-400 whitespace-pre-wrap">
        {commands.map((cmd, index) => (
          <div key={index}>
            {cmd.input && (
              <div className="flex gap-2">
                <span className="text-blue-400">webuser@desktop:~$</span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="text-gray-300">{cmd.output}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
        <span className="text-blue-400">webuser@desktop:~$</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  )
}

function SettingsApp() {
  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">系统设置</h2>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold mb-2">显示设置</h3>
          <p className="text-sm text-gray-600">配置屏幕分辨率和显示选项</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold mb-2">声音设置</h3>
          <p className="text-sm text-gray-600">调整系统音量和音频输出</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold mb-2">网络设置</h3>
          <p className="text-sm text-gray-600">配置网络连接和代理</p>
        </div>
      </div>
    </div>
  )
}

function BrowserApp() {
  const [, setUrl] = useState('https://www.example.com')
  const [inputUrl, setInputUrl] = useState('https://www.example.com')

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 bg-gray-100 flex items-center gap-2 px-4 border-b">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setUrl(inputUrl)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm"
          placeholder="输入网址..."
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
          前往
        </button>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="text-center text-gray-400">
          <span className="text-6xl mb-4 block">🌐</span>
          <p>浏览器演示</p>
          <p className="text-sm mt-2">输入网址访问网页</p>
        </div>
      </div>
    </div>
  )
}

function MusicApp() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 text-center text-white">
        <span className="text-8xl mb-6 block">🎵</span>
        <h3 className="text-2xl font-bold mb-2">音乐播放器</h3>
        <p className="text-white/80 mb-6">暂无可播放的音乐</p>
        <div className="flex gap-4 justify-center">
          <button className="w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors">⏮️</button>
          <button className="w-16 h-16 bg-white rounded-full hover:scale-105 transition-transform">▶️</button>
          <button className="w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors">⏭️</button>
        </div>
      </div>
    </div>
  )
}

function PhotosApp() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100">
      <span className="text-8xl mb-6">🖼️</span>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">照片查看器</h3>
      <p className="text-gray-600">拖拽图片到桌面即可查看</p>
    </div>
  )
}
