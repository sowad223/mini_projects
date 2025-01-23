// Smooth Scroll
function scrollToBooking() {
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Booking Form
  function openBookingForm(transport) {
    document.getElementById('form-title').textContent = transport;
    document.getElementById('price').value = `$${Math.floor(Math.random() * 100) + 50}`; // Dynamic pricing
    document.getElementById('booking-form').style.display = 'block';
  }
  
  function closeBookingForm() {
    document.getElementById('booking-form').style.display = 'none';
  }
  
  function submitBooking(event) {
    event.preventDefault();
    showLoading();
    setTimeout(() => {
      hideLoading();
      alert('Booking successful!');
      closeBookingForm();
      addBookingToHistory();
    }, 2000);
  }
  
  // Login Form
  function openLoginForm() {
    document.getElementById('login-form').style.display = 'block';
  }
  
  function closeLoginForm() {
    document.getElementById('login-form').style.display = 'none';
  }
  
  function submitLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Dummy login validation
    if (username === "user" && password === "password") {
      alert('Login successful!');
      closeLoginForm();
    } else {
      alert('Invalid username or password.');
    }
  }
  
  // Booking History
  function addBookingToHistory() {
    const bookingList = document.getElementById('booking-list');
    const bookingItem = document.createElement('li');
    bookingItem.textContent = `Booked ${document.getElementById('form-title').textContent} on ${new Date().toLocaleDateString()}`;
    bookingList.appendChild(bookingItem);
  }
  
  // Search Functionality
  function searchTransport() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const options = document.querySelectorAll('.option');
  
    options.forEach(option => {
      const transportType = option.querySelector('h2').textContent.toLowerCase();
      if (transportType.includes(searchInput)) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  }
  
  // Loading Spinner
  function showLoading() {
    document.getElementById('loading-spinner').style.display = 'flex';
  }
  
  function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
  }
  
  // Dark Mode with Local Storage
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('span');
    icon.textContent = document.body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  });
  
  // Check for saved theme preference
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('span').textContent = 'light_mode';
  }
  
  // Hamburger Menu
  function toggleNav() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
  }
  
  // Dummy Data for Booking Options
  const bookingOptions = [
    { id: 'bus', icon: 'directions_bus', title: 'Bus', description: 'Book your bus tickets online.' },
    { id: 'railway', icon: 'train', title: 'Railway', description: 'Book your train tickets online.' },
    { id: 'ship', icon: 'directions_boat', title: 'Ship', description: 'Book your ship tickets online.' },
    { id: 'plane', icon: 'flight', title: 'Plane', description: 'Book your flight tickets online.' },
    { id: 'rent-car', icon: 'directions_car', title: 'Rent Car', description: 'Rent a car for your journey.' },
    { id: 'rent-bike', icon: 'motorcycle', title: 'Rent Bike', description: 'Rent a bike for your journey.' }
  ];
  
  // Populate Booking Options
  const bookingSection = document.getElementById('booking');
  bookingOptions.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.id = option.id;
    optionDiv.innerHTML = `
      <span class="material-icons">${option.icon}</span>
      <h2>${option.title}</h2>
      <p>${option.description}</p>
      <button onclick="openBookingForm('${option.title}')">Book Now</button>
    `;
    bookingSection.appendChild(optionDiv);
  });