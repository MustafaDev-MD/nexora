/** Fixed ambient layers used by the animation engine. */
export function Shell() {
  return (
    <>
      <div className="ambient" aria-hidden />
      <div className="grain" aria-hidden />
      <canvas id="gl" aria-hidden />
      <div className="progress" id="prog" aria-hidden />
      <div className="cursor-ring" id="cRing" aria-hidden />
      <div className="cursor-dot" id="cDot" aria-hidden />
    </>
  )
}
