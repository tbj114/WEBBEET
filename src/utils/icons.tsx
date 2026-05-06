import React from 'react'

// 基础图标组件
export function FolderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 9.79086 7.79086 8 10 8H18L22 12H38C40.2091 12 42 13.7909 42 16V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V12Z" fill="#FFC107"/>
      <path d="M6 16H42V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V16Z" fill="#FFD54F"/>
    </svg>
  )
}

export function FolderOpenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 9.79086 7.79086 8 10 8H18L22 12H38C40.2091 12 42 13.7909 42 16V20H8L6 18V12Z" fill="#FFC107"/>
      <path d="M8 20V36C8 37.1046 8.89543 38 10 38H38C39.1046 38 40 37.1046 40 36V20H8Z" fill="#FFD54F"/>
      <path d="M8 20H40L38 22H10L8 20Z" fill="#FFE082"/>
    </svg>
  )
}

export function DocumentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M12 6C12 4.89543 12.8954 4 14 4H28L38 14V42C38 43.1046 37.1046 44 36 44H14C12.8954 44 12 43.1046 12 42V6Z" fill="white"/>
      <path d="M28 4L38 14H30C28.8954 14 28 13.1046 28 12V4Z" fill="#E3F2FD"/>
      <path d="M16 22H32M16 28H32M16 34H26" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function ImageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="36" height="28" rx="2" fill="#4CAF50"/>
      <circle cx="16" cy="20" r="4" fill="#FFC107"/>
      <path d="M6 32L16 24L24 30L32 22L42 30V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V32Z" fill="#81C784"/>
    </svg>
  )
}

export function VideoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="4" fill="#9C27B0"/>
      <polygon points="20,16 32,24 20,32" fill="white"/>
    </svg>
  )
}

export function AudioIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="36" height="20" rx="4" fill="#2196F3"/>
      <circle cx="24" cy="24" r="6" fill="white"/>
      <circle cx="24" cy="24" r="2" fill="#2196F3"/>
    </svg>
  )
}

export function MusicIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="36" r="6" fill="#FF5722"/>
      <circle cx="34" cy="32" r="6" fill="#FF5722"/>
      <path d="M20 36V12L40 8V28" stroke="#FF5722" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function ArchiveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#795548"/>
      <rect x="18" y="4" width="12" height="8" rx="2" fill="#795548"/>
      <path d="M20 20H28M20 26H28M20 32H24" stroke="#A1887F" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function ExecutableIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="6" width="32" height="36" rx="4" fill="#607D8B"/>
      <path d="M16 16L24 24L16 32M28 32H36" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function CodeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#263238"/>
      <path d="M16 18L10 24L16 30M32 18L38 24L32 30M26 16L22 32" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function TerminalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#1E1E1E"/>
      <path d="M12 20L18 24L12 28M24 28H32" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PdfIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="2" fill="#F44336"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PDF</text>
    </svg>
  )
}

export function ExcelIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="2" fill="#4CAF50"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">XLS</text>
    </svg>
  )
}

export function WordIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="2" fill="#2196F3"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">DOC</text>
    </svg>
  )
}

export function PowerPointIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="2" fill="#FF5722"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PPT</text>
    </svg>
  )
}

export function HtmlIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#E44D26"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HTML</text>
    </svg>
  )
}

export function CssIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#264DE4"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CSS</text>
    </svg>
  )
}

export function JsonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#292929"/>
      <text x="24" y="28" textAnchor="middle" fill="#FFC107" fontSize="10" fontWeight="bold">{ }</text>
    </svg>
  )
}

export function MarkdownIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#263238"/>
      <text x="24" y="28" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">MD</text>
    </svg>
  )
}

export function DatabaseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="12" rx="16" ry="6" fill="#2196F3"/>
      <path d="M8 12V36C8 39.3137 15.164 42 24 42C32.836 42 40 39.3137 40 36V12" stroke="#2196F3" strokeWidth="4"/>
      <path d="M8 20C8 23.3137 15.164 26 24 26C32.836 26 40 23.3137 40 20" stroke="#2196F3" strokeWidth="4"/>
      <path d="M8 28C8 31.3137 15.164 34 24 34C32.836 34 40 31.3137 40 28" stroke="#2196F3" strokeWidth="4"/>
    </svg>
  )
}

export function SettingsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="10" fill="#607D8B"/>
      <path d="M24 8V12M24 36V40M8 24H12M36 24H40M12.1 12.1L15.3 15.3M32.7 32.7L35.9 35.9M12.1 35.9L15.3 32.7M32.7 15.3L35.9 12.1" stroke="#607D8B" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function RecycleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M20 8H28L30 14H18L20 8Z" fill="#9E9E9E"/>
      <path d="M10 16L8 38H16L18 26H30L32 38H40L38 16H10Z" fill="#607D8B"/>
      <path d="M18 30L16 38H24L22 30H18Z" fill="#757575"/>
      <path d="M26 30L24 38H32L34 30H26Z" fill="#757575"/>
    </svg>
  )
}

export function DownloadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8V32M24 32L16 24M24 32L32 24" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 36V42H40V36" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function UploadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 32V8M24 8L16 16M24 8L32 16" stroke="#2196F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 36V42H40V36" stroke="#2196F3" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function CloudIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M36 24C40.4183 24 44 20.4183 44 16C44 11.5817 40.4183 8 36 8C35.3722 8 34.7598 8.09196 34.1778 8.26415C33.0079 4.19615 29.3409 1 25 1C19.4772 1 15 5.47715 15 11C14.997 11.0842 15.0001 11.1682 15.0092 11.2516C12.4585 12.4745 10.6958 15.0063 10.6958 18C10.6958 21.866 13.8298 25 17.6958 25H36C41.5228 25 46 29.4772 46 35C46 40.5228 41.5228 45 36 45H12C6.47715 45 2 40.5228 2 35C2 29.4772 6.47715 25 12 25" stroke="#607D8B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function BrowserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#2196F3" strokeWidth="4"/>
      <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#2196F3" strokeWidth="3"/>
      <path d="M4 24H44M24 4C30 10 30 38 24 44" stroke="#2196F3" strokeWidth="3"/>
    </svg>
  )
}

export function LockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="20" width="32" height="24" rx="4" fill="#FFC107"/>
      <path d="M16 20V14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14V20" stroke="#FFC107" strokeWidth="4"/>
      <circle cx="24" cy="32" r="4" fill="#1E1E1E"/>
    </svg>
  )
}

export function KeyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="16" cy="16" r="8" stroke="#FFC107" strokeWidth="4"/>
      <path d="M22 22L40 40M32 32L40 24M36 28L40 32" stroke="#FFC107" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function UserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="16" r="8" fill="#607D8B"/>
      <path d="M8 44C8 35.1634 15.1634 28 24 28C32.8366 28 40 35.1634 40 44" fill="#607D8B"/>
    </svg>
  )
}

export function HomeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M8 20L24 8L40 20V44H28V32H20V44H8V20Z" fill="#4CAF50"/>
    </svg>
  )
}

export function SearchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="20" cy="20" r="10" stroke="#607D8B" strokeWidth="4"/>
      <path d="M28 28L40 40" stroke="#607D8B" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function TrashIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M8 12H40M18 12V8H30V12M16 12V40H32V12" stroke="#F44336" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function FolderSharedIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 9.79086 7.79086 8 10 8H18L22 12H38C40.2091 12 42 13.7909 42 16V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V12Z" fill="#FFC107"/>
      <circle cx="36" cy="32" r="8" fill="#4CAF50"/>
      <path d="M34 32L36 34L40 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PhotoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="36" height="28" rx="2" fill="#4CAF50"/>
      <circle cx="16" cy="20" r="4" fill="#FFC107"/>
      <path d="M6 32L16 24L24 30L32 22L42 30V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V32Z" fill="#81C784"/>
    </svg>
  )
}

export function CameraIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="12" width="40" height="28" rx="4" fill="#263238"/>
      <circle cx="24" cy="26" r="10" fill="#455A64"/>
      <circle cx="24" cy="26" r="6" fill="#607D8B"/>
      <rect x="18" y="14" width="12" height="4" rx="2" fill="#4CAF50"/>
    </svg>
  )
}

export function MovieIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="4" fill="#9C27B0"/>
      <polygon points="20,16 32,24 20,32" fill="white"/>
    </svg>
  )
}

export function ClipIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#FF9800"/>
      <path d="M8 14H40M8 20H40M8 26H32M8 32H28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function PodcastIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#9C27B0"/>
      <circle cx="24" cy="24" r="8" fill="white"/>
      <circle cx="24" cy="24" r="3" fill="#9C27B0"/>
    </svg>
  )
}

export function VoiceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="16" y="8" width="16" height="28" rx="8" fill="#4CAF50"/>
      <path d="M24 36V42M16 40H32" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
      <path d="M8 24H12M36 24H40" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function ZipIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#8BC34A"/>
      <rect x="18" y="4" width="12" height="8" rx="2" fill="#8BC34A"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">ZIP</text>
    </svg>
  )
}

export function RarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#7B1FA2"/>
      <rect x="18" y="4" width="12" height="8" rx="2" fill="#7B1FA2"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">RAR</text>
    </svg>
  )
}

export function AppIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#2196F3"/>
      <circle cx="24" cy="36" r="4" fill="white"/>
    </svg>
  )
}

export function ScriptIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#1E1E1E"/>
      <path d="M14 18L10 24L14 30M34 18L38 24L34 30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function SystemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#607D8B"/>
      <path d="M12 24H36M24 12V36" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function ConfigIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#607D8B"/>
      <path d="M12 20H36M12 28H28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

export function FontIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#9C27B0"/>
      <text x="24" y="34" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">A</text>
    </svg>
  )
}

export function Model3dIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4L44 16V32L24 44L4 32V16L24 4Z" fill="#FF5722"/>
      <path d="M24 4L24 44M4 16L44 32M44 16L4 32" stroke="#FFCCBC" strokeWidth="2"/>
    </svg>
  )
}

export function DriveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#455A64"/>
      <rect x="8" y="12" width="32" height="24" fill="#263238"/>
      <circle cx="36" cy="16" r="2" fill="#4CAF50"/>
    </svg>
  )
}

export function HardDiskIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="12" width="40" height="24" rx="4" fill="#607D8B"/>
      <rect x="8" y="16" width="32" height="16" fill="#263238"/>
      <circle cx="32" cy="24" r="4" fill="#4CAF50"/>
    </svg>
  )
}

export function UsbIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="8" width="24" height="32" rx="4" fill="#607D8B"/>
      <rect x="18" y="4" width="12" height="8" fill="#455A64"/>
      <rect x="18" y="28" width="12" height="8" fill="#FFC107"/>
    </svg>
  )
}

export function EmailIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="4" fill="#2196F3"/>
      <path d="M4 14L24 26L44 14" stroke="white" strokeWidth="3"/>
    </svg>
  )
}

export function ChatIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M8 8H40V32H20L8 40V8Z" fill="#4CAF50"/>
      <circle cx="16" cy="18" r="2" fill="white"/>
      <circle cx="24" cy="18" r="2" fill="white"/>
      <circle cx="32" cy="18" r="2" fill="white"/>
    </svg>
  )
}

export function MessageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="24" rx="4" fill="#2196F3"/>
      <path d="M4 32L16 24H44V32" fill="#1976D2"/>
    </svg>
  )
}

export function CloudUploadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M36 24C40.4183 24 44 20.4183 44 16C44 11.5817 40.4183 8 36 8C35.3722 8 34.7598 8.09196 34.1778 8.26415C33.0079 4.19615 29.3409 1 25 1C19.4772 1 15 5.47715 15 11C14.997 11.0842 15.0001 11.1682 15.0092 11.2516" stroke="#2196F3" strokeWidth="4" strokeLinecap="round"/>
      <path d="M24 28V42M24 42L16 34M24 42L32 34" stroke="#2196F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function CloudDownloadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M36 24C40.4183 24 44 20.4183 44 16C44 11.5817 40.4183 8 36 8C35.3722 8 34.7598 8.09196 34.1778 8.26415C33.0079 4.19615 29.3409 1 25 1C19.4772 1 15 5.47715 15 11C14.997 11.0842 15.0001 11.1682 15.0092 11.2516" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
      <path d="M24 16V30M24 30L16 22M24 30L32 22" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function LinkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M20 28C18.8954 26.8954 18.8954 25.1046 20 24L28 16" stroke="#2196F3" strokeWidth="4" strokeLinecap="round"/>
      <path d="M28 20C29.1046 21.1046 29.1046 22.8954 28 24L20 32" stroke="#2196F3" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function ToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M40 8L20 28M20 28L12 36L8 40L12 36L20 28" stroke="#607D8B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 16L40 24" stroke="#607D8B" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  )
}

export function UnknownIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#9E9E9E"/>
      <text x="24" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">?</text>
    </svg>
  )
}

export function TemplateIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#E91E63"/>
      <path d="M14 14H34V20H14V14ZM14 24H34V30H14V24ZM14 34H24V38H14V34Z" fill="white"/>
    </svg>
  )
}

export function BackupIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#FF9800"/>
      <path d="M24 12V28M24 28L16 20M24 28L32 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function LogIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="4" fill="#263238"/>
      <path d="M12 14H36M12 22H36M12 30H28M12 38H24" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function WarningIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4L44 40H4L24 4Z" fill="#FFC107"/>
      <text x="24" y="36" textAnchor="middle" fill="black" fontSize="20" fontWeight="bold">!</text>
    </svg>
  )
}

export function ErrorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#F44336"/>
      <path d="M16 16L32 32M32 16L16 32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}

export function SuccessIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#4CAF50"/>
      <path d="M14 24L22 32L34 16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function InfoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#2196F3"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">i</text>
    </svg>
  )
}

// 默认导出
export const icons = {
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
  ImageIcon,
  VideoIcon,
  AudioIcon,
  MusicIcon,
  ArchiveIcon,
  ExecutableIcon,
  CodeIcon,
  TerminalIcon,
  PdfIcon,
  ExcelIcon,
  WordIcon,
  PowerPointIcon,
  HtmlIcon,
  CssIcon,
  JsonIcon,
  MarkdownIcon,
  DatabaseIcon,
  SettingsIcon,
  RecycleIcon,
  DownloadIcon,
  UploadIcon,
  CloudIcon,
  BrowserIcon,
  LockIcon,
  KeyIcon,
  UserIcon,
  HomeIcon,
  SearchIcon,
  TrashIcon,
  FolderSharedIcon,
  PhotoIcon,
  CameraIcon,
  MovieIcon,
  ClipIcon,
  PodcastIcon,
  VoiceIcon,
  ZipIcon,
  RarIcon,
  AppIcon,
  ScriptIcon,
  SystemIcon,
  ConfigIcon,
  FontIcon,
  Model3dIcon,
  DriveIcon,
  HardDiskIcon,
  UsbIcon,
  EmailIcon,
  ChatIcon,
  MessageIcon,
  CloudUploadIcon,
  CloudDownloadIcon,
  LinkIcon,
  ToolIcon,
  UnknownIcon,
  TemplateIcon,
  BackupIcon,
  LogIcon,
  WarningIcon,
  ErrorIcon,
  SuccessIcon,
  InfoIcon,
}

export function getIconByName(name: string, size = 48): React.ReactNode {
  const IconComponent = icons[name as keyof typeof icons]
  if (IconComponent) {
    return <IconComponent size={size} />
  }
  return <UnknownIcon size={size} />
}

export function getIconByExtension(ext: string, size = 48): React.ReactNode {
  const extension = ext.toLowerCase().replace('.', '')
  const iconMap: Record<string, string> = {
    pdf: 'PdfIcon',
    doc: 'WordIcon',
    docx: 'WordIcon',
    xls: 'ExcelIcon',
    xlsx: 'ExcelIcon',
    ppt: 'PowerPointIcon',
    pptx: 'PowerPointIcon',
    txt: 'DocumentIcon',
    md: 'MarkdownIcon',
    js: 'CodeIcon',
    ts: 'CodeIcon',
    jsx: 'CodeIcon',
    tsx: 'CodeIcon',
    py: 'CodeIcon',
    java: 'CodeIcon',
    html: 'HtmlIcon',
    css: 'CssIcon',
    json: 'JsonIcon',
    xml: 'JsonIcon',
    jpg: 'ImageIcon',
    jpeg: 'ImageIcon',
    png: 'ImageIcon',
    gif: 'ImageIcon',
    svg: 'ImageIcon',
    mp3: 'AudioIcon',
    wav: 'AudioIcon',
    mp4: 'VideoIcon',
    avi: 'VideoIcon',
    mkv: 'VideoIcon',
    zip: 'ZipIcon',
    rar: 'RarIcon',
    '7z': 'ArchiveIcon',
    tar: 'ArchiveIcon',
    gz: 'ArchiveIcon',
    exe: 'ExecutableIcon',
    app: 'AppIcon',
    dmg: 'AppIcon',
    sh: 'ScriptIcon',
    bash: 'ScriptIcon',
    ps1: 'ScriptIcon',
    dll: 'SystemIcon',
    sys: 'SystemIcon',
    ini: 'ConfigIcon',
    conf: 'ConfigIcon',
    ttf: 'FontIcon',
    otf: 'FontIcon',
    sql: 'DatabaseIcon',
    db: 'DatabaseIcon',
    url: 'LinkIcon',
    lnk: 'LinkIcon',
    log: 'LogIcon',
    bak: 'BackupIcon',
    tmp: 'UnknownIcon',
    temp: 'UnknownIcon',
  }
  const iconName = iconMap[extension]
  if (iconName) {
    return getIconByName(iconName, size)
  }
  return <UnknownIcon size={size} />
}
