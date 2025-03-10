import './style.css'
import * as lucide from 'lucide'

// Initialize icons
lucide.createIcons({
  icons: {
    'arrow-up-right': lucide.ArrowUpRight,
  }
})

// Load saved values from localStorage or use defaults
const savedValues = JSON.parse(localStorage.getItem('profileImageSettings') || '{}')
const defaultValues = {
  x: 39,
  y: 50,
  scale: 1
}
const values = { ...defaultValues, ...savedValues }

// Update CSS variables
function updateImagePosition() {
  document.documentElement.style.setProperty('--img-position-x', `${values.x}%`)
  document.documentElement.style.setProperty('--img-position-y', `${values.y}%`)
  document.documentElement.style.setProperty('--img-scale', values.scale.toString())
  // Save to localStorage
  localStorage.setItem('profileImageSettings', JSON.stringify(values))
}

// Initialize the page
document.querySelector('#app')!.innerHTML = `
  <div class="admin-container">
    <div class="preview-section">
      <h2>Preview</h2>
      <div class="profile">
        <img src="/profile.jpg" alt="Profile Preview" />
      </div>
    </div>
    
    <div class="controls-section">
      <h2>Image Position Controls</h2>
      
      <div class="control-group">
        <label>
          Horizontal Position (X):
          <input type="range" id="x-position" min="0" max="100" value="${values.x}" />
          <span id="x-value">${values.x}%</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Vertical Position (Y):
          <input type="range" id="y-position" min="0" max="100" value="${values.y}" />
          <span id="y-value">${values.y}%</span>
        </label>
      </div>

      <div class="control-group">
        <label>
          Scale:
          <input type="range" id="scale" min="1" max="2" step="0.1" value="${values.scale}" />
          <span id="scale-value">${values.scale}x</span>
        </label>
      </div>

      <button id="reset" class="reset-button">Reset to Default</button>
    </div>
  </div>
`

// Add event listeners
document.getElementById('x-position')?.addEventListener('input', (e) => {
  values.x = Number((e.target as HTMLInputElement).value)
  document.getElementById('x-value')!.textContent = `${values.x}%`
  updateImagePosition()
})

document.getElementById('y-position')?.addEventListener('input', (e) => {
  values.y = Number((e.target as HTMLInputElement).value)
  document.getElementById('y-value')!.textContent = `${values.y}%`
  updateImagePosition()
})

document.getElementById('scale')?.addEventListener('input', (e) => {
  values.scale = Number((e.target as HTMLInputElement).value)
  document.getElementById('scale-value')!.textContent = `${values.scale}x`
  updateImagePosition()
})

document.getElementById('reset')?.addEventListener('click', () => {
  Object.assign(values, defaultValues)
  
  // Update slider positions
  const xSlider = document.getElementById('x-position') as HTMLInputElement
  const ySlider = document.getElementById('y-position') as HTMLInputElement
  const scaleSlider = document.getElementById('scale') as HTMLInputElement
  
  xSlider.value = values.x.toString()
  ySlider.value = values.y.toString()
  scaleSlider.value = values.scale.toString()
  
  // Update display values
  document.getElementById('x-value')!.textContent = `${values.x}%`
  document.getElementById('y-value')!.textContent = `${values.y}%`
  document.getElementById('scale-value')!.textContent = `${values.scale}x`
  
  updateImagePosition()
})

// Initial update
updateImagePosition() 