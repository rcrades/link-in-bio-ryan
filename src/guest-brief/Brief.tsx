import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export function Brief() {
  const { signOut } = useAuthActions();

  function toggleTheme() {
    const next = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <div className="gb-page">
      <header className="gb-topbar">
        <div className="gb-eyebrow">Guest brief · rolling out 2026</div>
        <div className="gb-topbar-right">
          <button type="button" className="gb-ghost" onClick={toggleTheme}>
            Switch theme
          </button>
          <button type="button" className="gb-ghost" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <article className="gb-article">
        <section className="gb-hero">
          <h1>A new podcast for the people building things.</h1>
          <p className="gb-lede">
            We're rolling out a podcast in 2026 for construction leaders — and
            the ones becoming them. This page exists so you know exactly what
            you're walking into before the prep call, before we record, before
            we ask you to block a calendar. No fine print.
          </p>
        </section>

        <Section title="Who it's for">
          <p>
            <strong>Construction leaders.</strong> GCs, trades, developers,
            owners' reps, the tech-forward operators actually moving dirt and
            steel.
          </p>
          <p>
            <strong>And the ones becoming them.</strong> People running jobsites,
            desks, and crews — doing the work that pushes the industry forward,
            even if the title hasn't caught up yet.
          </p>
          <p className="gb-muted">
            It's a specific audience, and that's on purpose. A narrow room lets
            you say things that aren't safe to say on a stage.
          </p>
        </Section>

        <Section title="What we're trying to do">
          <p>We play two roles on every episode:</p>
          <ol className="gb-list">
            <li>
              <strong>Advocate for you.</strong> Your story, your work, your
              thesis. We prep hard so you sound like yourself on your best day —
              not a rehearsed version of yourself.
            </li>
            <li>
              <strong>Advocate for the audience.</strong> We ask the questions
              they'd ask if they had the mic. The useful ones, not the polite
              ones.
            </li>
          </ol>
          <p>
            If those two ever pull against each other, we lean toward the
            audience. They're the reason anyone stays with the episode after it
            drops — and they're the reason being on the show means something.
          </p>
        </Section>

        <Section title="Two kinds of guests">
          <div className="gb-grid-two">
            <div className="gb-subcard">
              <h3>Seasoned podcasters</h3>
              <p>You've done this. Maybe a lot. Here's what that looks like with us:</p>
              <ul className="gb-bullets">
                <li>We won't ask the same five questions every other host did. We do the homework.</li>
                <li>Prep call is short — or skip it if you'd rather.</li>
                <li>You'll get the raw file, the edited episode, and your clips on a cadence that fits your posting rhythm.</li>
                <li>Your team can drop in with notes at any stage of the cut.</li>
              </ul>
            </div>
            <div className="gb-subcard">
              <h3>First-time guests</h3>
              <p>People whose voice the world hasn't heard yet, but needs to:</p>
              <ul className="gb-bullets">
                <li>Longer prep call. We walk through exactly what to expect.</li>
                <li>We'll help you find your two or three anchor stories so you don't blank on mic.</li>
                <li>No gotchas. You'll know the shape of the conversation before we hit record.</li>
                <li>If you're nervous going in, you won't be five minutes after we start.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="What every guest gets">
          <ul className="gb-bullets">
            <li>A conversation that sounds like you — not a canned interview.</li>
            <li>Pro audio/video from your own room. No studio trip.</li>
            <li>Short clips ready for LinkedIn within a week of recording.</li>
            <li>Full episode on YouTube and every major podcast platform.</li>
            <li>
              <strong>Kill rights on the edit.</strong> Anything you don't want
              in, doesn't go in. No questions.
            </li>
          </ul>
        </Section>

        <Section title="The white-glove tech check">
          <p className="gb-lede-sm">
            We handle the tech so you handle the story. Before we record, we
            walk through three things with you — together, on a short call. If
            any of this is off, we'd rather move the recording than push
            through. You only record once you're ready.
          </p>

          <TechItem
            title="1. Hardwired connection"
            summary="Why we ask you to plug in, and what Wi-Fi is quietly doing to the conversation."
          >
            <p>
              We want you in a complete flow state during the interview. To
              capture your best energy and natural timing, we have to eliminate
              the mechanical barriers that Wi-Fi introduces. Here's exactly what
              happens behind the scenes when a connection isn't hardwired, and
              why we avoid it to protect your on-camera presence.
            </p>
            <h4>The "half-duplex" delay</h4>
            <p>
              Wi-Fi is inherently a "half-duplex" technology. Your router can
              only send or receive data at any given microsecond — it cannot do
              both simultaneously. A hardwired Ethernet connection is
              "full-duplex," meaning data flows both ways at the exact same
              time. On Wi-Fi, that microscopic wait creates a 100–300
              millisecond delay. Fine for a corporate meeting; in a recorded
              conversation, it forces a "walkie-talkie" rhythm where we end up
              accidentally talking over each other.
            </p>
            <h4>Algorithmic audio ducking</h4>
            <p>
              When recording platforms detect Wi-Fi latency, their software
              tries to manage the traffic collision with "audio ducking" —
              muting one speaker's mic the millisecond it detects noise from
              the other. If you're telling a great story and I naturally agree
              with a quick "yeah," the Wi-Fi delay causes the software to
              temporarily mute your audio track. It chops up your sentences and
              kills the momentum of your story.
            </p>
            <h4>The hesitation factor</h4>
            <p>
              Charisma relies on timing. When a guest experiences micro-delays
              or audio clipping, human psychology kicks in: you start
              hesitating. You subconsciously wait an extra second to make sure
              I'm done talking — and the conversation feels stiff, robotic,
              over-rehearsed.
            </p>
            <h4>The bottom line</h4>
            <p>
              A hardwired cable removes the software's need to guess who's
              speaking. It lets us have a rapid-fire, high-energy conversation
              where we can react to each other in real time — so you come
              across as confident, natural, and authoritative.
            </p>
          </TechItem>

          <TechItem
            title="2. Framing"
            summary="Camera, angle, and headroom — so you look like yourself, not a floating head."
          >
            <ul className="gb-bullets">
              <li>
                <strong>Eye-level camera.</strong> Not pointed down at a laptop.
                A stack of books, a box, or a cheap laptop stand is enough to
                get the lens up where your eyes are.
              </li>
              <li>
                <strong>A little off-center is fine.</strong> You don't need to
                stare straight down the barrel. A slight turn keeps it human,
                not "proof of life."
              </li>
              <li>
                <strong>Shoulders in frame, headroom dialed.</strong> Not a
                mugshot, not a floating head. We want you filling the frame the
                way a good LinkedIn headshot does.
              </li>
              <li>
                <strong>Background is yours to choose.</strong> Real room,
                office, jobsite trailer — whatever feels like you. We'll flag
                anything that's going to pull the eye.
              </li>
            </ul>
            <p className="gb-muted">
              We'll send you a 60-second Loom with your exact setup the day
              before recording. No guessing.
            </p>
          </TechItem>

          <TechItem
            title="3. Audio"
            summary="A real mic, a quiet room, headphones on. The three things that make an episode listenable."
          >
            <ul className="gb-bullets">
              <li>
                <strong>A real microphone.</strong> Not your laptop, not AirPods.
                If you don't have one, we'll ship one to you ahead of the
                session — yours to keep for the next one.
              </li>
              <li>
                <strong>A quiet room.</strong> Carpet, curtains, closed doors
                beat any software noise suppressor on the planet. If the room
                has an echo, we'll help you tame it with whatever you've got —
                a blanket over a chair works.
              </li>
              <li>
                <strong>Headphones on. Always.</strong> Open mic plus open
                speakers equals echo. Echo kills the episode. Any pair of wired
                headphones is fine.
              </li>
              <li>
                <strong>We level-check at the top of every session.</strong>
                Sixty seconds. If anything is off, we fix it before the clock
                starts.
              </li>
            </ul>
          </TechItem>
        </Section>

        <Section title="What happens next">
          <ol className="gb-list">
            <li>A short scheduling note to find the prep call.</li>
            <li>Prep call — 30–45 minutes depending on which path above you're on.</li>
            <li>Tech check — 15 minutes, usually a day or two before we record.</li>
            <li>We record.</li>
            <li>You get the cut, the clips, and the full episode in your inbox.</li>
          </ol>
          <p>Usually two to three weeks, end to end.</p>
          <p className="gb-muted gb-small">
            Questions before any of that? Reply to the email that sent you
            here. Real human, same day.
          </p>
        </Section>
      </article>

      <footer className="gb-footer">
        <span>Ryan Rademann · Podcast guest brief</span>
        <span className="gb-muted">Draft. We'll update this as the show takes shape.</span>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="gb-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function TechItem({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`gb-tech ${open ? "gb-tech-open" : ""}`}>
      <button
        type="button"
        className="gb-tech-head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="gb-tech-title">{title}</span>
        <span className="gb-tech-summary">{summary}</span>
        <span className="gb-tech-caret" aria-hidden>
          {open ? "–" : "+"}
        </span>
      </button>
      {open && <div className="gb-tech-body">{children}</div>}
    </div>
  );
}
