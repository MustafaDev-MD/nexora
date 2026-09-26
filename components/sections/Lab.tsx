import { LAB, LAB_STREAMS } from '@/data/lab'
import { Icon } from '@/components/ui/Icon'

export function Lab() {
  return (
    <section className="lab sec" id="lab" aria-labelledby="lab-title">
      <div className="lab-bg" aria-hidden />
      <div className="wrap">
        <div className="lab-head">
          <div className="lab-head-copy">
            <div className="eyebrow">{LAB.eyebrow}</div>
            <h2 className="h2" id="lab-title">
              {LAB.title} <span className="grad">{LAB.titleGrad}</span>
            </h2>
            <p className="lab-sub">{LAB.sub}</p>
          </div>
          <div className="lab-badge" aria-hidden>
            <span className="lab-pulse" />
            LIVE SYSTEM
          </div>
        </div>

        <div className="lab-board">
          <div className="lab-rail" aria-hidden>
            <span>INPUT</span>
            <span className="lab-rail-line" />
            <span>PROCESS</span>
            <span className="lab-rail-line" />
            <span>OUTPUT</span>
          </div>

          <ol className="lab-streams">
            {LAB_STREAMS.map((s, i) => (
              <li className="lab-stream" key={s.id} style={{ ['--i' as string]: i }}>
                <div className="lab-stream-top">
                  <span className="lab-id">{s.id}</span>
                  <span className="lab-tag">{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="lab-metric">
                  <strong>{s.metric}</strong>
                  <span>{s.metricLabel}</span>
                </div>
                <div className="lab-stream-glow" aria-hidden />
              </li>
            ))}
          </ol>
        </div>

        <div className="lab-foot">
          <p>
            Prefer a walkthrough? We run a 30‑minute lab session on your product goals — no deck required.
          </p>
          <a href="/#contact" className="btn btn-pri">
            Book a lab session <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
