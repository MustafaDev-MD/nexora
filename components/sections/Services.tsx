import { SERVICES } from '@/data/services'
import { Icon } from '@/components/ui/Icon'

export function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <div className="eyebrow">Our Services</div>
            <h2 className="h2">
              Everything you need to <span className="grad">grow online.</span>
            </h2>
          </div>
          <a href="#contact" className="link-more">
            View All Services <Icon name="arrow" />
          </a>
        </div>
        <div className="svc-grid rv-group">
          {SERVICES.map((svc) => (
            <article className="svc rv" key={svc.id}>
              <span className="svc-ic">
                <Icon name={svc.icon} />
              </span>
              <div className="svc-body">
                <span className="svc-n">{String(svc.id).padStart(2, '0')}</span>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </div>
              <Icon name="arrow-ur" className="ic svc-go" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
