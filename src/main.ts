import './style.css'
import * as lucide from 'lucide'

// Initialize icons
lucide.createIcons({
  icons: {
    'arrow-up-right': lucide.ArrowUpRight,
    'linkedin': lucide.Linkedin,
    'twitter': lucide.Twitter
  }
})

document.querySelector('#app')!.innerHTML = `
  <div>
    <div class="profile">
      <img src="https://placehold.co/200x200/0047CC/FFFFFF/png?text=YP" alt="Your Profile" />
      <h1>Ryan Rademann</h1>
      <p>Technology Consultant at Wipfli</p>
    </div>
    <div class="links-container">
      <a href="your-linkedin-url" class="link-card" target="_blank">
        <h2>LinkedIn</h2>
        <i data-lucide="linkedin" class="link-icon" aria-hidden="true"></i>
        <p>Follow me on LinkedIn.</p>
      </a>
      <a href="your-twitter-url" class="link-card" target="_blank">
        <h2>Twitter</h2>
        <i data-lucide="twitter" class="link-icon" aria-hidden="true"></i>
        <p>I retweet on more technical software and I topics.</p>
      </a>
      <a href="your-wipfli-url" class="link-card" target="_blank">
        <h2>Wipfli Bio</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>Wipfli is a tech, succession, and transition powerhouse.</p>
      </a>
      <a href="your-calendar-url" class="link-card" target="_blank">
        <h2>Schedule a Meeting</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>Book a teams, zoom, or phone call.</p>
      </a>
      <a href="your-podcast-url" class="link-card" target="_blank">
        <h2>Latest Podcast</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>Constructive Podcast on YouTube - 2025 February.</p>
      </a>
      <a href="your-article-url" class="link-card" target="_blank">
        <h2>Latest Article</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>AI Agents on For Construction Pros.</p>
      </a>
    </div>
  </div>
`