import React from 'react' // eslint-disable-next-line @typescript-eslint/no-unused-vars

export function FolderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 9.79086 7.79086 8 10 8H18L22 12H38C40.2091 12 42 13.7909 42 16V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V12Z" fill="#FFC107" />
      <path d="M6 16H42V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V16Z" fill="#FFD54F" />
    </svg>
  )
}

export function FolderOpenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 9.79086 7.79086 8 10 8H18L22 12H38C40.2091 12 42 13.7909 42 16V20H8L6 18V12Z" fill="#FFC107" />
      <path d="M8 20V36C8 37.1046 8.89543 38 10 38H38C39.1046 38 40 37.1046 40 36V20H8Z" fill="#FFD54F" />
    </svg>
  )
}

export function DocumentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="2" width="32" height="44" rx="4" fill="white" />
      <path d="M28 2L38 12H30C28.8954 12 28 11.1046 28 10V2Z" fill="#E3F2FD" />
      <path d="M14 20H34M14 28H34M14 36H26" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ImageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="6" width="40" height="36" rx="4" fill="#4CAF50" />
      <circle cx="16" cy="18" r="5" fill="#FFC107" />
      <path d="M4 34L14 24L24 32L34 22L44 32V40C44 41.1046 43.1046 42 42 42H6C4.89543 42 4 41.1046 4 40V34Z" fill="#81C784" />
    </svg>
  )
}

export function VideoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="2" y="8" width="44" height="32" rx="6" fill="#9C27B0" />
      <polygon points="20,18 34,24 20,30" fill="white" />
    </svg>
  )
}

export function MusicIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="12" cy="36" r="7" fill="#FF5722" />
      <circle cx="36" cy="32" r="7" fill="#FF5722" />
      <path d="M18 36V8L42 4V28" stroke="#FF5722" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function RecycleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M20 6H28L30 14H18L20 6Z" fill="#757575" />
      <path d="M8 16L6 40H18L20 28H28L30 40H42L40 16H8Z" fill="#90A4AE" />
    </svg>
  )
}

export function DownloadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 4V32M24 32L16 22M24 32L32 22" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 36V44H44V36" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function TerminalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="2" y="6" width="44" height="36" rx="6" fill="#1E1E1E" />
      <path d="M10 18L18 24L10 30M24 30H36" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SettingsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="10" fill="#607D8B" />
      <path d="M24 4V10M24 38V44M4 24H10M38 24H44M7.51472 7.51472L11.7574 11.7574M36.2426 36.2426L40.4853 40.4853M7.51472 40.4853L11.7574 36.2426M36.2426 11.7574L40.4853 7.51472" stroke="#607D8B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function BrowserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#2196F3" strokeWidth="4" />
      <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#2196F3" strokeWidth="3" />
    </svg>
  )
}

export function HardDiskIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="6" fill="#607D8B" />
      <rect x="8" y="14" width="32" height="20" fill="#455A64" />
      <circle cx="34" cy="24" r="5" fill="#4CAF50" />
    </svg>
  )
}

export function ExecutableIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="6" fill="#2196F3" />
      <path d="M14 16L24 24L14 32M28 32H36" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const iconComponents = {
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  RecycleIcon,
  DownloadIcon,
  TerminalIcon,
  SettingsIcon,
  BrowserIcon,
  HardDiskIcon,
  ExecutableIcon,
}

export function getIconByName(name: string, size = 48) {
  const IconComponent = iconComponents[name as keyof typeof iconComponents]
  if (IconComponent) {
    return <IconComponent size={size} />
  }
  return <DocumentIcon size={size} />
}

// Just to prevent unused React import
React.Fragment
