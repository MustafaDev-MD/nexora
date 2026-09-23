import { POSTS } from '@/data/blog'
import { Icon } from '@/components/ui/Icon'

export function Blog() {
  return (
    <section className="sec" id="blog">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <div className="eyebrow">Insights</div>
            <h2 className="h2">
              Notes from the <span className="grad">studio.</span>
            </h2>
          </div>
          <a href="#contact" className="link-more">
            All posts <Icon name="arrow" />
          </a>
        </div>
        <div className="blog-grid">
          {POSTS.map((post) => (
            <a href="#blog" className="post rv" key={post.slug}>
              <div className="thumb">
                <div className={`th ${post.thumb}`}>
                  {'badge' in post && post.badge ? <b>{post.badge}</b> : null}
                </div>
                <span className="chip">{post.category}</span>
              </div>
              <div className="post-body">
                <h3>{post.title}</h3>
                <span className="read">
                  Read More <Icon name="arrow" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
