import React from 'react'

// 更美观的图标 - 使用简洁的现代设计风格

export function FolderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 10.3431 7.34315 9 9 9H20L24 15H39C40.6569 15 42 16.3431 42 18V36C42 37.6569 40.6569 39 39 39H9C7.34315 39 6 37.6569 6 36V12Z" fill="#FBBF24" />
      <path d="M6 18H42V36C42 37.6569 40.6569 39 39 39H9C7.34315 39 6 37.6569 6 36V18Z" fill="#FCD34D" />
    </svg>
  )
}

export function FolderOpenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 12C6 10.3431 7.34315 9 9 9H20L24 15H39C40.6569 15 42 16.3431 42 18V22H8L6 20V12Z" fill="#F59E0B" />
      <path d="M8 22V36C8 37.6569 9.34315 39 11 39H37C38.6569 39 40 37.6569 40 36V22H8Z" fill="#FCD34D" />
    </svg>
  )
}

export function DocumentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="10" y="4" width="28" height="40" rx="3" fill="white" />
      <rect x="10" y="4" width="28" height="10" rx="3" fill="#3B82F6" />
      <path d="M16 18H32M16 24H32M16 30H32" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ImageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="6" width="40" height="36" rx="4" fill="#10B981" />
      <circle cx="16" cy="18" r="4" fill="#FBBF24" />
      <path d="M4 34L14 24L24 32L32 24L44 32V38C44 39.6569 42.6569 41 41 41H7C5.34315 41 4 39.6569 4 38V34Z" fill="#34D399" />
    </svg>
  )
}

export function VideoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="5" fill="#8B5CF6" />
      <rect x="8" y="14" width="32" height="20" rx="3" fill="#A78BFA" />
      <polygon points="22,18 34,24 22,30" fill="white" />
    </svg>
  )
}

export function MusicIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="36" r="6" fill="#F43F5E" />
      <circle cx="34" cy="32" r="6" fill="#FB7185" />
      <path d="M20 36V10L40 6V28" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function RecycleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="12" y="6" width="24" height="6" rx="2" fill="#64748B" />
      <rect x="8" y="12" width="32" height="30" rx="4" fill="#475569" />
      <path d="M16 22L24 32L32 22M24 32V20" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DownloadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#3B82F6" />
      <path d="M24 14V30M24 30L18 24M24 30L30 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="34" width="28" height="4" rx="2" fill="#60A5FA" />
    </svg>
  )
}

export function TerminalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="6" width="40" height="36" rx="5" fill="#0F172A" />
      <circle cx="12" cy="14" r="2" fill="#EF4444" />
      <circle cx="20" cy="14" r="2" fill="#F59E0B" />
      <circle cx="28" cy="14" r="2" fill="#10B981" />
      <path d="M12 24L18 28L12 32M24 30H36" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SettingsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="11" fill="#64748B" />
      <path d="M24 6V12M24 36V42M6 24H12M36 24H42M9.85786 9.85786L14.0711 14.0711M33.9289 33.9289L38.1421 38.1421M9.85786 38.1421L14.0711 33.9289M33.9289 14.0711L38.1421 9.85786" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4" fill="#94A3B8" />
    </svg>
  )
}

export function BrowserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="#0EA5E9" strokeWidth="4" />
      <circle cx="24" cy="24" r="6" stroke="#0EA5E9" strokeWidth="3" />
      <path d="M24 6V12M24 36V42M6 24H12M36 24H42" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function HardDiskIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="12" width="40" height="24" rx="4" fill="#475569" />
      <rect x="8" y="16" width="32" height="16" rx="2" fill="#334155" />
      <circle cx="36" cy="24" r="4" fill="#10B981" />
      <rect x="10" y="22" width="12" height="4" rx="1" fill="#64748B" />
    </svg>
  )
}

export function ExecutableIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="5" fill="#059669" />
      <rect x="10" y="10" width="28" height="28" rx="3" fill="#34D399" />
      <path d="M18 18L28 24L18 30M30 30H34" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
