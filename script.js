// Initialize map
var map = L.map('map').setView([28.6139, 77.2090], 12); // Delhi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

// Store resources
let resources = JSON.parse(localStorage.getItem("resources")) || [];

// Show existing markers
resources.forEach(r => addMarker(r));

// Form submission
document.getElementById("resourceForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let resource = {
    type: document.getElementById("type").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    lat: 28.61 + Math.random()/100,
    lng: 77.20 + Math.random()/100
  };

  resources.push(resource);
  let aiMessage = generateAIResponse(resource.description);
document.getElementById("aiOutput").innerText = aiMessage;
  localStorage.setItem("resources", JSON.stringify(resources));

  addMarker(resource);
});

// Add marker
function addMarker(r) {
  let color = "blue";

  if (r.type.toLowerCase().includes("food")) color = "green";
  if (r.type.toLowerCase().includes("medical")) color = "red";
  if (r.type.toLowerCase().includes("shelter")) color = "orange";

  L.circleMarker([r.lat, r.lng], {
    color: color,
    radius: 8
  })
  .addTo(map)
  .bindPopup(`<b>${r.type}</b><br>${r.description}`);
}
function emergency() {
  alert("Showing nearest help (demo)");
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      // Store temporarily
      window.currentLat = lat;
      window.currentLng = lng;

      document.getElementById("location").value = "Current Location";
      L.marker([lat, lng])
  .addTo(map)
  .bindPopup("You are here")
  .openPopup();

      alert("Location captured successfully!");
      
    }, function() {
      alert("Unable to fetch location");
    });

  } else {
    alert("Geolocation not supported");
  }
}