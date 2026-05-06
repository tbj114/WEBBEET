import { Desktop } from './components/Desktop/Desktop'
import { Taskbar } from './components/Taskbar/Taskbar'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  useKeyboardShortcuts()

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-900">
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App
