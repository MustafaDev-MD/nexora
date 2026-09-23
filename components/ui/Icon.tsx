type IconProps = {
  name: string
  className?: string
}

export function Icon({ name, className = 'ic' }: IconProps) {
  return (
    <svg className={className} aria-hidden focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  )
}
