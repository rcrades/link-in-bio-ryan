import { Fragment, useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import type { GuestBriefBlock, GuestBriefContent } from './types'

export function Brief({ brief }: { brief: GuestBriefContent }) {
  const { signOut } = useAuthActions()

  function toggleTheme() {
    const next = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="gb-page">
      <header className="gb-topbar">
        <div className="gb-eyebrow">
          <span className="gb-badge-desktop">{brief.badgeDesktop}</span>
          <span className="gb-badge-mobile">{brief.badgeMobile}</span>
        </div>
        <div className="gb-topbar-right">
          <button type="button" className="gb-ghost" onClick={toggleTheme}>
            Theme
          </button>
          <button type="button" className="gb-ghost" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <article className="gb-article">
        <section className="gb-hero">
          <div className="gb-eyebrow gb-hero-eyebrow">{brief.eyebrow}</div>
          <h1>{brief.title}</h1>
          <p className="gb-lede">{brief.intro}</p>
        </section>

        {brief.sections.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.blocks.map((block, index) => (
              <BriefBlockView key={`${section.title}-${index}`} block={block} />
            ))}
          </Section>
        ))}
      </article>

      <footer className="gb-footer">{brief.footer}</footer>
    </div>
  )
}

function BriefBlockView({ block }: { block: GuestBriefBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={block.muted ? 'gb-muted' : undefined}>
          {block.segments.map((segment, index) =>
            segment.strong ? (
              <strong key={index}>{segment.text}</strong>
            ) : (
              <Fragment key={index}>{segment.text}</Fragment>
            )
          )}
        </p>
      )
    case 'calloutGrid':
      return (
        <div className="gb-grid-two">
          {block.items.map((item) => (
            <div className="gb-subcard" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )
    case 'cardGrid':
      return (
        <div className="gb-grid-two">
          {block.items.map((card) => (
            <div className="gb-subcard" key={card.title}>
              <h3>{card.title}</h3>
              <p className="gb-muted">{card.body}</p>
              <ul className="gb-bullets">
                {card.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'checkList':
      return (
        <ul className="gb-bullets">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )
    case 'accordion':
      return (
        <div>
          {block.items.map((item) => (
            <TechItem key={item.value} title={item.title}>
              {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </TechItem>
          ))}
        </div>
      )
    case 'steps':
      return (
        <>
          <ol className="gb-list">
            {block.items.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="gb-muted">{block.note}</p>
        </>
      )
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="gb-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function TechItem({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`gb-tech ${open ? 'gb-tech-open' : ''}`}>
      <button
        type="button"
        className="gb-tech-head"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="gb-tech-title">{title}</span>
        <span className="gb-tech-caret" aria-hidden>{open ? '–' : '+'}</span>
      </button>
      {open && <div className="gb-tech-body">{children}</div>}
    </div>
  )
}
