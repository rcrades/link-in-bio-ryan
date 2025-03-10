import"./style-BOjpdxKI.js";import{e,C as i,U as t,b as r,a as n,M as s,R as c,c as d,B as o,T as l,W as u}from"./lucide-D3jvrXgp.js";e({icons:{calendar:i,users:t,clock:r,clipboard:n,map:s,receipt:c,message:d,chart:o,truck:l,wrench:u}});const a=document.createElement("style");a.textContent=`
  .stealth-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    color: #0047CC;
    font-size: 2.5em;
    margin-bottom: 0.5rem;
  }

  .header p {
    color: #666;
    font-size: 1.2em;
  }

  .feature-card {
    background-color: white;
    border: 2px solid #0047CC;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: center;
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateX(10px);
    box-shadow: 0 4px 12px rgba(0, 71, 204, 0.1);
  }

  .feature-content h2 {
    color: #0047CC;
    margin: 0;
    font-size: 1.5em;
  }

  .feature-content p {
    color: #666;
    margin: 0.5rem 0 0;
    font-size: 1.1em;
    line-height: 1.4;
  }

  .feature-icon {
    color: #0047CC;
    width: 32px;
    height: 32px;
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    .stealth-container {
      padding: 1rem;
    }
  }
`;document.head.appendChild(a);document.querySelector("#app").innerHTML=`
  <div class="stealth-container">
    <div class="header">
      <h1>Field Service Management MVP</h1>
      <p>Essential features for outdoor contractors and field service teams</p>
    </div>
    
    <div class="feature-cards">
      <div class="feature-card">
        <div class="feature-content">
          <h2>Smart Scheduling & Dispatch</h2>
          <p>AI-powered scheduling system that optimizes routes and automatically assigns jobs based on technician location, skills, and availability.</p>
        </div>
        <i data-lucide="calendar" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Team Management</h2>
          <p>Manage field technicians, track certifications, assign territories, and monitor performance all in one place.</p>
        </div>
        <i data-lucide="users" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Time Tracking & Attendance</h2>
          <p>GPS-enabled time clock with job-specific tracking, break management, and overtime monitoring.</p>
        </div>
        <i data-lucide="clock" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Job Management</h2>
          <p>Digital work orders, custom forms, photo documentation, and electronic signatures for paperless operations.</p>
        </div>
        <i data-lucide="clipboard" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Location Intelligence</h2>
          <p>Real-time GPS tracking, geofencing, and route optimization to reduce travel time and fuel costs.</p>
        </div>
        <i data-lucide="map" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Invoicing & Estimates</h2>
          <p>Generate professional estimates and invoices on-site, with digital payment processing and QuickBooks integration.</p>
        </div>
        <i data-lucide="receipt" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Customer Communication</h2>
          <p>Automated notifications, real-time ETAs, and two-way messaging to keep customers informed and happy.</p>
        </div>
        <i data-lucide="message" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Reporting & Analytics</h2>
          <p>Custom dashboards and reports for job costing, team productivity, customer satisfaction, and business growth.</p>
        </div>
        <i data-lucide="chart" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Equipment Management</h2>
          <p>Track tools, vehicles, and equipment maintenance schedules to prevent downtime and extend asset life.</p>
        </div>
        <i data-lucide="truck" class="feature-icon" aria-hidden="true"></i>
      </div>

      <div class="feature-card">
        <div class="feature-content">
          <h2>Maintenance Scheduling</h2>
          <p>Automated preventive maintenance schedules, service history tracking, and parts inventory management.</p>
        </div>
        <i data-lucide="wrench" class="feature-icon" aria-hidden="true"></i>
      </div>
    </div>
  </div>
`;e();
