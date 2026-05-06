import { useState, useRef, useEffect, useCallback } from 'react'
import { Minus, Square, X } from 'lucide-react'
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
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (windowState.isMinimized) {
      setIsDragging(false)
      setIsResizing(false)
    }
  }, [windowState.isMinimized])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setActiveWindow(windowState.id)
    setIsDragging(true)
    setDragStart({ x: e.clientX - windowState.x, y: e.clientY - windowState.y })
  }, [windowState.id, windowState.x, windowState.y, setActiveWindow])

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setActiveWindow(windowState.id)
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowState.width,
      height: windowState.height,
    })
  }, [windowState.id, windowState.width, windowState.height, setActiveWindow])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowState.isMaximized) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        updateWindowPosition(windowState.id, Math.max(0, newX), Math.max(0, newY))
      }
      if (isResizing) {
        const newWidth = resizeStart.width + (e.clientX - resizeStart.x)
        const newHeight = resizeStart.height + (e.clientY - resizeStart.y)
        updateWindowSize(windowState.id, Math.max(200, newWidth), Math.max(200, newHeight))
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
      className={`bg-window-bg border-2 border-window-border shadow-window flex flex-col ${
        windowState.isMaximized ? '' : 'cursor-move'
      }`}
      style={windowStyle}
      onClick={() => setActiveWindow(windowState.id)}
    >
      <div
        className="h-8 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-between px-2 select-none"
        onMouseDown={!windowState.isMaximized ? handleMouseDown : undefined}
      >
        <span className="text-sm font-medium text-gray-800 truncate max-w-[calc(100%-80px)]">
          {windowState.title}
        </span>
        <div className="flex items-center gap-1 window-no-drag">
          <button
            onClick={handleMinimize}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 rounded transition-colors"
            title="最小化"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={handleMaximize}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 rounded transition-colors"
            title={windowState.isMaximized ? '还原' : '最大化'}
          >
            <Square size={12} />
          </button>
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white rounded transition-colors"
            title="关闭"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin window-no-drag">
        <WindowContent appId={windowState.appId} />
      </div>
      <div
        className="h-2 w-2 bg-gray-400 cursor-se-resize absolute bottom-0 right-0"
        onMouseDown={handleResizeStart}
      />
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
    default:
      return <div className="p-4">未知应用</div>
  }
}

function ExplorerApp() {
  const { fileSystem } = useDesktopStore()

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 bg-gray-100 flex items-center px-3 border-b">
        <span className="text-sm font-medium">文件资源管理器</span>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-3 gap-4">
          {fileSystem.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-3 hover:bg-gray-100 rounded cursor-pointer transition-colors"
            >
              <div className="text-4xl mb-2">
                {item.type === 'folder' ? '📁' : '📄'}
              </div>
              <span className="text-sm text-center truncate w-full">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NotepadApp() {
  const [content, setContent] = useState('欢迎使用记事本\n\n在这里输入您的文字...')

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 bg-gray-100 flex items-center px-3 border-b">
        <span className="text-sm font-medium">记事本</span>
      </div>
      <textarea
        className="flex-1 w-full p-3 resize-none outline-none font-mono text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
    } else if (['+', '-', '*', '/'].includes(value)) {
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
      case '*': return a * b
      case '/': return a / b
      default: return b
    }
  }

  const buttons = [
    ['C', '÷', '×', '-'],
    ['7', '8', '9', '+'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '='],
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="bg-gray-800 text-right p-4 mb-2 rounded">
          <span className="text-white text-3xl font-mono">{display}</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`py-4 text-xl font-medium rounded transition-colors ${
                btn === 'C'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : ['+', '-', '×', '÷', '='].includes(btn)
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {btn === '÷' ? '/' : btn === '×' ? '*' : btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TerminalApp() {
  const [commands, setCommands] = useState<{ input: string; output: string }[]>([
    { input: '', output: '欢迎使用 Web 终端\n输入 help 查看可用命令' },
  ])
  const [currentInput, setCurrentInput] = useState('')

  const handleCommand = (input: string) => {
    let output = ''
    switch (input.toLowerCase()) {
      case 'help':
        output = '可用命令:\n- help: 显示帮助\n- ls: 列出文件\n- date: 显示日期\n- clear: 清屏\n- whoami: 显示用户'
        break
      case 'ls':
        output = '文档  图片  音乐  视频  readme.txt  notes.txt'
        break
      case 'date':
        output = new Date().toString()
        break
      case 'clear':
        setCommands([])
        return
      case 'whoami':
        output = 'webuser@virtual-desktop'
        break
      default:
        output = `命令未找到: ${input}`
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
    <div className="h-full flex flex-col bg-black text-green-400 p-2 font-mono text-sm">
      <div className="flex-1 overflow-auto whitespace-pre-wrap">
        {commands.map((cmd, index) => (
          <div key={index}>
            {cmd.input && (
              <div>
                <span className="text-blue-400">webuser@desktop:~$</span> {cmd.input}
              </div>
            )}
            <div>{cmd.output}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700">
        <span className="text-blue-400">webuser@desktop:~$</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
          placeholder="输入命令..."
        />
      </div>
    </div>
  )
}

function SettingsApp() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-lg font-medium mb-4">系统设置</div>
      <div className="space-y-4">
        <div className="p-3 bg-gray-100 rounded">
          <div className="font-medium mb-2">个性化</div>
          <div className="text-sm text-gray-600">自定义桌面外观和主题</div>
        </div>
        <div className="p-3 bg-gray-100 rounded">
          <div className="font-medium mb-2">显示</div>
          <div className="text-sm text-gray-600">调整分辨率和显示设置</div>
        </div>
        <div className="p-3 bg-gray-100 rounded">
          <div className="font-medium mb-2">声音</div>
          <div className="text-sm text-gray-600">配置音频设备和音量</div>
        </div>
      </div>
    </div>
  )
}
