import { Desktop } from './components/Desktop/Desktop'
import { Taskbar } from './components/Taskbar/Taskbar'

function App() {
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-900">
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App
