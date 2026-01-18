/*
 * Main JavaScript file for Katia Steinfeld’s website
 *
 * This script provides utility functions to fetch Excel files from the
 * server, convert them into JSON using the xlsx library and populate
 * various sections of the website. It also initialises interactive
 * maps using Leaflet and wires up the contact form modal.
 */

// Ensure the xlsx library is loaded from CDN before this script executes.

// Utility to fetch and parse an Excel file into JSON
async function fetchExcel(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return jsonData;
}

// Home page: load featured content and reading list
async function loadFeaturedContent() {
  try {
    const items = await fetchExcel('data/featured_content.xlsx');
    const container = document.getElementById('featured-container');
    if (!container) return;
    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${item.ThumbnailURL}" alt="${item.Title}">
        <div class="card-content">
          <h3 class="card-title">${item.Title}</h3>
          <p class="card-description">${item.Description}</p>
          <span class="badge">${item.Category}</span><br>
          <a href="${item.LinkURL}" target="_blank" rel="noopener">View</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading featured content:', err);
  }
}

async function loadReadingList() {
  try {
    const items = await fetchExcel('data/what_im_reading.xlsx');
    const container = document.getElementById('reading-container');
    if (!container) return;
    // group by category
    const categories = {};
    items.forEach(item => {
      if (!categories[item.Category]) categories[item.Category] = [];
      categories[item.Category].push(item);
    });
    // create cards per item
    Object.keys(categories).forEach(cat => {
      const section = document.createElement('div');
      section.classList.add('reading-category');
      const heading = document.createElement('h3');
      heading.textContent = cat;
      section.appendChild(heading);
      const list = document.createElement('div');
      list.classList.add('grid', 'grid-two');
      categories[cat].forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${item.ImageURL}" alt="${item.Title}">
          <div class="card-content">
            <h4 class="card-title">${item.Title}</h4>
            <p class="card-description">${item.Description || ''}</p>
            <small>${item.Author}</small><br>
            <a href="${item.LinkURL}" target="_blank" rel="noopener">Read more</a>
          </div>
        `;
        list.appendChild(card);
      });
      section.appendChild(list);
      container.appendChild(section);
    });
  } catch (err) {
    console.error('Error loading reading list:', err);
  }
}

// Science page: initialise map of collaborations
async function loadScienceMap() {
  const mapContainer = document.getElementById('science-map');
  if (!mapContainer) return;
  // Create map with grayscale tiles
  const map = L.map(mapContainer).setView([20, 0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  // Load data
  const items = await fetchExcel('data/science_collaborations.xlsx');
  items.forEach(item => {
    const marker = L.marker([item.Latitude, item.Longitude]).addTo(map);
    marker.bindPopup(`<strong>${item.Name}</strong><br>${item.Description}`);
  });
}

// Founder page: initialise maps for schools, glasses and app users
async function loadFounderMaps() {
  // Helper to build a map
  async function buildMap(containerId, dataFile, markerColor) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const map = L.map(container).setView([-22.9, -43.2], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const items = await fetchExcel(dataFile);
    items.forEach(item => {
      const marker = L.circleMarker([item.Latitude, item.Longitude], {
        color: markerColor,
        radius: 8,
        fillOpacity: 0.8
      }).addTo(map);
      const name = item.Location || item.Name;
      const desc = item.Info || item.Description || '';
      marker.bindPopup(`<strong>${name}</strong><br>${desc}`);
    });
  }
  await buildMap('schools-map', 'data/escolhares_schools.xlsx', '#00a8e8');
  await buildMap('glasses-map', 'data/escolhares_glasses.xlsx', '#ffd166');
  await buildMap('app-users-map', 'data/escolhares_app_users.xlsx', '#8ecae6');
}

// Founder page: load documents list
async function loadDocuments() {
  const container = document.getElementById('documents-list');
  if (!container) return;
  try {
    const docs = await fetchExcel('data/escolhares_documents.xlsx');
    docs.forEach(doc => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${doc.LinkURL}" target="_blank" rel="noopener">${doc.Title}</a> - ${doc.Description}`;
      container.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading documents:', err);
  }
}

// Contact form: open modal with selected category
function openContactModal(category) {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.classList.add('active');
  const categoryField = document.getElementById('contact-category');
  if (categoryField) {
    categoryField.value = category;
  }
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;
  modal.classList.remove('active');
}

// Handle form submission (uses FormSubmit by default – change to your provider)
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  // Optionally integrate with EmailJS or other service by replacing the action attribute in HTML
  // Provide a success message
  alert('Thank you for your message! A confirmation email will be sent shortly.');
  form.reset();
  closeContactModal();
}

// Document ready helper
document.addEventListener('DOMContentLoaded', () => {
  // Determine which page we are on via body class
  const bodyClass = document.body.classList;
  if (bodyClass.contains('home-page')) {
    loadFeaturedContent();
    loadReadingList();
  }
  if (bodyClass.contains('science-page')) {
    loadScienceMap();
  }
  if (bodyClass.contains('technology-page')) {
    // Additional technology JS could go here
  }
  if (bodyClass.contains('founder-page')) {
    loadFounderMaps();
    loadDocuments();
  }
  // Attach form submit handler globally
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});