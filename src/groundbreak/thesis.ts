import './groundbreak.css'
import { SPEAKER, TALK } from './data'
import {
  applyTheme,
  renderAltSwitcher,
  renderGroundbreakBadge,
  renderPreviousEngagement
} from './shared'

applyTheme()

const html = `
  <main class="gb-page">
    <header style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem;">
      ${renderGroundbreakBadge()}
      <a href="/pages/groundbreak/" class="gb-alts-home" style="font-size:0.82rem;">← The pitch</a>
    </header>

    <article class="gb-thesis">
      <div class="gb-thesis-kicker">A preview of the talk · long read, ~6 min</div>
      <h1 class="gb-thesis-title">The San&nbsp;Francisco Consensus</h1>
      <p class="gb-thesis-dek">
        ${TALK.tagline}
      </p>
      <div class="gb-thesis-byline">
        <span>By ${SPEAKER.name} · ${SPEAKER.firm}</span>
        <span>Groundbreak 2026 proposal</span>
      </div>

      <div class="gb-thesis-body">
        <p>
          A father and daughter meet for lunch downtown most Sundays. He
          drives in from the East Bay — president of a $400M general
          contractor, sixty-one, still pours concrete in his sleep. She
          walks over from her side of town — late twenties, Stanford CS,
          Member of Technical Staff at Anthropic. She can't tell him what
          she's working on. She <em>can</em> tell him where the puck is
          going. This talk is an overhearing of that advice, translated
          for a room full of people with cranes.
        </p>
        <p>
          There is a ten-block radius around Market Street where a small
          number of people have stopped arguing about what AI is. The
          frontier labs, the teams shipping agents into production, the
          investors underwriting the next decade of software: they've
          aligned on a handful of claims most industries haven't even read
          yet.
        </p>
        <p>
          Call it the <em>San Francisco Consensus</em>. The model itself is the
          product, not a feature bolted on top. Agents will eat applications.
          Context is the new moat. Code is being generated faster than it can
          be reviewed, and the reviewers are becoming models themselves. What
          you can <em>do</em> at your desk this month is genuinely different
          from what you could do last quarter.
        </p>

        <blockquote class="gb-thesis-pull">
          The daughter to the father: "Dad, skate to where the puck is going."
          The rest of this talk is forty-five minutes of what the puck is doing.
        </blockquote>

        <h2 class="gb-thesis-h2">Why construction is downstream</h2>
        <p>
          Consensus propagates on a lag. Fintech gets it in eighteen months;
          enterprise SaaS gets it in thirty. Construction — because of
          fragmentation, thin margins, the rightful conservatism of anyone
          responsible for a crane above a sidewalk — typically gets it in three
          to five years. We are not late. We are on time for an industry like
          ours. But the window to <em>pre-position</em> is closing faster than
          the window to adopt.
        </p>
        <p>
          The industry's current AI dialogue is largely two things: a
          displacement anxiety ("will the robot take my crew's job?") and a
          marketing veneer ("we've added AI to the thing you already bought").
          Both are distractions. The actual question for owners, GCs, and
          specialty contractors is closer to: what changes when every
          superintendent, PM, and preconstruction lead has a research-grade
          assistant with memory, tools, and a budget?
        </p>

        <div class="gb-thesis-proof">
          ${renderPreviousEngagement('inline')}
          <div class="gb-thesis-proof-caption">
            I've made an earlier version of this argument on a Groundbreak stage.
            This proposal is the 2026 update — after two more years inside the consensus.
          </div>
        </div>

        <h2 class="gb-thesis-h2">The four moves the talk makes</h2>
        ${TALK.claims
          .map(
            c => `
          <p><strong>${c.header}.</strong> ${c.body}</p>
        `
          )
          .join('')}

        <div class="gb-thesis-takeaways">
          <h3>What a Groundbreak audience walks out with</h3>
          <ol>
            ${TALK.takeaways.map(t => `<li>${t}</li>`).join('')}
          </ol>
        </div>

        <p style="margin-top:2rem;">
          This talk is designed for the exact room Groundbreak assembles: the
          three buyer roles (Owner / GC / Specialty) sitting next to Procore's
          product organization, with enough signal in the audience to ask hard
          questions back. The goal isn't inspiration. The goal is that a
          construction firm's COO flies home with three specific moves for
          Monday.
        </p>
      </div>
    </article>

    ${renderAltSwitcher('thesis/')}
  </main>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html
