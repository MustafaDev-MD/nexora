export function Preloader() {
  return (
    <div id="preloader" aria-hidden="true">
      <svg className="pl-mark" viewBox="0 0 24 24">
        <path d="M4 20V6l16 12V4" />
      </svg>
      <div className="pl-bar">
        <i />
      </div>
    </div>
  )
}
