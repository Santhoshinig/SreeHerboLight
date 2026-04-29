import * as Icons from 'lucide-react'

export default function Icon({ name, color, size = 24, fill = "none", strokeWidth = 1.5, className = "" }) {
  const LucideIcon = Icons[name]
  if (!LucideIcon) return null
  return <LucideIcon color={color} size={size} fill={fill} strokeWidth={strokeWidth} className={className} />
}
