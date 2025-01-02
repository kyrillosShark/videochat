// Common scripts for all pages

// Check browser compatibility (for index.html)
if (document.getElementById('browserCheck')) {
    document.addEventListener('DOMContentLoaded', function() {
      const browserCheck = document.getElementById('browserCheck');
      browserCheck.style.display = 'block';
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        browserCheck.className = 'alert alert-danger';
        browserCheck.textContent = 'Your browser does not support webcam access. Please use a modern browser.';
      } else {
        browserCheck.className = 'alert alert-success';
        browserCheck.textContent = 'Browser supports webcam access!';
        setTimeout(() => browserCheck.style.display = 'none', 3000);
      }
    });
  }
  
  // Scripts specific to room.html
  if (document.getElementById('topToolbar')) {
    // All the JavaScript from ROOM_HTML goes here
  
    const MEETING_ID = "{{ meeting_id }}"; // This variable should be set via Jinja2
    const statusIndicator = document.getElementById('statusIndicator');
    const errorMessages = document.getElementById('errorMessages');
    const subtitlesOverlay = document.getElementById('subtitlesOverlay');
  
    // ... [Rest of the JavaScript code from ROOM_HTML]
  
    // Due to the complexity and length of the JavaScript in ROOM_HTML, 
    // it's recommended to modularize it further by splitting into multiple JS files 
    // or using ES6 modules if necessary.
  }
  