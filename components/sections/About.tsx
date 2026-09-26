import { APPROACH_ITEMS, MARQUEE_ITEMS } from '@/data/site'
import { Icon } from '@/components/ui/Icon'

export function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <div className="approach-top">
          <div className="rv">
            <div className="eyebrow">Our Approach</div>
            <h2 className="h2">
              Your digital presence should work{' '}
              <span className="grad">as hard as your business.</span>
            </h2>
          </div>
          <p id="wordScrub">
            We combine strategy, creativity and technology to build digital solutions that look
            incredible, perform flawlessly and drive real results.
          </p>
        </div>
        <ul className="icon-row rv-group">
          {APPROACH_ITEMS.map((item) => (
            <li className="rv" key={item.label}>
              <Icon name={item.icon} />
              {item.label}
            </li>
          ))}
        </ul>
        <div className="marquee" aria-label="Services marquee">
          <div className="mq-track" id="mq">
            <ul className="mq-set">
              {MARQUEE_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
