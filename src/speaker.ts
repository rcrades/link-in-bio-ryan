import './style.css'

// Create HTML content
const content = `
  <div class="max-w-2xl mx-auto p-6 sm:p-8">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Speaker Inquiry</h1>
      <p class="text-gray-600">Fill out the form below to inquire about speaking engagements</p>
    </div>

    <!-- Form -->
    <form class="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
      <!-- Event Details -->
      <div>
        <label for="eventDetails" class="block text-sm font-medium text-gray-700 mb-2">
          Event Details
        </label>
        <textarea
          id="eventDetails"
          name="eventDetails"
          rows="4"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          placeholder="Please describe your event, including the topic, audience, and format..."
        ></textarea>
      </div>

      <!-- Event Date -->
      <div>
        <label for="eventDate" class="block text-sm font-medium text-gray-700 mb-2">
          Event Date
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        >
      </div>

      <!-- Contact Information -->
      <div>
        <label for="contactInfo" class="block text-sm font-medium text-gray-700 mb-2">
          How to reach you?
        </label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          placeholder="Email, phone, or preferred contact method"
        >
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Submit Inquiry
        </button>
      </div>
    </form>

    <!-- Back Link -->
    <div class="mt-6 text-center">
      <a href="/" class="text-sm text-blue-600 hover:text-blue-800 transition-colors">
        ← Back to home
      </a>
    </div>
  </div>
`

// Add content to DOM
document.querySelector('#app')!.innerHTML = content

// Add form submission handler
document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  // TODO: Handle form submission
  console.log('Form submitted')
}) 