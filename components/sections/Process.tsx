import { PROCESS_STEPS } from '@/data/process'

export function Process() {
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <div className="proc-head rv">
          <div>
            <div className="eyebrow">Our Process</div>
            <h2 className="h2">
              From idea to
              <br />
              <span style={{ color: 'var(--b1)' }}>digital experience.</span>
            </h2>
          </div>
          <p>
            A proven process that turns your ideas into powerful digital solutions, on time and on
            target.
          </p>
        </div>
        <div className="tl" id="tl">
          <div className="tl-line" />
          <div className="tl-fill" />
          {PROCESS_STEPS.map((step) => (
            <div className="step" key={step.n}>
              <div className="step-n">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
