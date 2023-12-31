<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION["username"])) {
    // If not logged in, redirect to the login page
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
    />

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css" />

    <style>
      /* Additional Styles */
      .table-container {
        max-width: 800px;
        margin: 0 auto;
    }

    /* Adjustments for Admin Appearance */
    body {
        background-color: #f8f9fa; /* Light gray background */
    }

    .sidebar {
        background-color: #343a40; /* Dark background color for the sidebar */
        color: #dee2e6; /* Light text color for the sidebar */
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Subtle box shadow for the sidebar */
    }

    .list-group a {
        color: #adb5bd; /* Light text color for sidebar links */
    }

    .list-group a:hover {
        background-color: #495057; /* Darker background color on hover */
    }

    .welcome-message {
        background-color: #ffffff; /* White background for the main content area */
        padding: 20px;
        border-radius: 8px; /* Rounded corners for the content area */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle box shadow for the content area */
        margin-top: 20px;
    }

    .welcome-message h4 {
        color: #343a40; /* Dark text color for the welcome message header */
    }

    .welcome-message p {
        color: #6c757d; /* Gray text color for the welcome message paragraph */
    }

    .edit-button {
        background-color: #007bff; /* Blue background color for the edit button */
        color: #ffffff; /* White text color for the edit button */
        border: none;
    }

    .edit-button:hover {
        background-color: #0056b3; /* Darker blue background on hover */
    }

    .avatar-image {
        width: 100%; /* Make the avatar image fill its container */
    }

    /* Volunteer List Table Styles */
    .volunteer-table {
        margin-top: 30px;
    }

    .volunteer-table th, .volunteer-table td {
        border-color: #dee2e6; /* Lighter border color for table cells */
    }

    .pagination {
        margin-top: 20px;
    }

    .pagination .page-item .page-link {
        color: #007bff; /* Blue color for pagination links */
    }

    .pagination .page-item .page-link:hover {
        background-color: #007bff; /* Darker blue background on hover */
        border-color: #007bff;
    }
    </style>
  </head>

  <body>
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav class="col-12 col-md-3 col-lg-2 sidebar">
          <a href="index.html">
            <img src="images/CrisisCrew.png" alt="logo" class="img-fluid" />
          </a>

          <!-- Sidebar Navigation Links -->
          <div class="list-group mt-3">
            <a href="admin_dashboard.html">Dashboard</a>
            <a href="disaster_event.html">Disaster Event</a>
            <a href="task_management.html">Task Management</a>
            <a href="resource_management.html">Resource Management</a>
          </div>

          <!-- Logout Link -->
          <footer class="mt-3">
            <a href="index.html" style="color: #adb5bd">Logout</a>
          </footer>
        </nav>

        <!-- Main Content Area -->
        <div class="col-lg-10 col-md-9 col-12">
          <div class="welcome-message">
            <h4 style="color: #343a40">Welcome, Admin John Smith!</h4>
            <p style="color: #6c757d">
              You have administrative privileges to manage Crisis Crew
              activities.
            </p>

            <!-- Badge Images -->
            <!-- Admin Personal Details with Edit Option -->
<div class="row">
  <div class="col-lg-8 col-md-8 col-12">
 
<div class="container mt-4">
  <h5>User Search</h5>
  
  <div class="row mb-3">
      <div class="col-md-6">
          <select id="searchOption" class="form-control">
              <option value="location">Location</option>
              <option value="age">Age</option>
              <option value="bloodGroup">Blood Group</option>
          </select>
      </div>
      <div class="col-md-6">
        <input type="text" id="searchInput" class="form-control" placeholder="Search...">
    </div>
  </div>

  <table class="table table-bordered">
      <thead>
      <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Age</th>
          <th>Blood Group</th>
      </tr>
      </thead>
      <tbody id="userTableBody">
          <!-- Table rows will be added here -->
      </tbody>
  </table>
</div>



<script>
  // Sample user data
  const users = [
      { id: 1, name: 'John Doe', location: 'City A', age: 30, bloodGroup: 'A+' },
      { id: 2, name: 'Jane Doe', location: 'City B', age: 25, bloodGroup: 'O-' },
      // Add more user data as needed
  ];

  // Function to render the table rows based on the search criteria
  function renderTable(option, searchText) {
      const tableBody = document.getElementById('userTableBody');
      tableBody.innerHTML = '';

      // Filter users based on the selected option and search text
      const filteredUsers = users.filter(user => {
          const searchValue = user[option].toString().toLowerCase();
          return searchValue.includes(searchText.toLowerCase());
      });

      // Populate the table with filtered users
      filteredUsers.forEach(user => {
          const row = `<tr>
                          <td>${user.id}</td>
                          <td>${user.name}</td>
                          <td>${user.location}</td>
                          <td>${user.age}</td>
                          <td>${user.bloodGroup}</td>
                      </tr>`;
          tableBody.innerHTML += row;
      });
  }

  // Event listener for input changes in the search bar
  document.getElementById('searchInput').addEventListener('input', function() {
      const selectedOption = document.getElementById('searchOption').value;
      const searchText = this.value;
      renderTable(selectedOption, searchText);
  });

  // Event listener for dropdown changes
  document.getElementById('searchOption').addEventListener('change', function() {
      const selectedOption = this.value;
      const searchText = document.getElementById('searchInput').value;
      renderTable(selectedOption, searchText);
  });

  // Initial rendering of the table
  renderTable('location', '');
</script>



  </div>
  <div class="col-lg-4 col-md-4 col-12">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-12">
        <img
          src="images/ceo.jpg"
          alt="Admin Avatar"
          class="img-fluid badge-img rounded-circle"
        />
      </div>
      <div class="col-lg-8 col-md-8 col-12">
        <h5 style="color: #343a40">Tanvir Jawad</h5>
        <p style="color: #6c757d">
          Role: admin<br />
          Email:jawad@example.com<br />
          Phone: +1 123-456-7890
        </p>
        <!-- Edit Button -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#editAdminModal"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Training Badge and Fire Incidents Table -->
<div class="row" style="padding: 30px">
  <div class="table-container">
      <h5 class="mb-4">Volunteer List</h5>
      <div class="table-responsive">
          <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                  <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Blood Group</th>
                      <th scope="col">Location</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                  </tr>
              </thead>
              <tbody>
                  <!-- Volunteer Row 1 -->
                  <tr id="volunteer1">
                      <td>1</td>
                      <td>Volunteer 1</td>
                      <td>25</td>
                      <td>O+</td>
                      <td>City Park</td>
                      <td>volunteer1@example.com</td>
                      <td>+1 123-456-7890</td>
                  </tr>
                  <!-- Volunteer Row 2 -->
                  <tr id="volunteer2">
                      <td>2</td>
                      <td>Volunteer 2</td>
                      <td>30</td>
                      <td>A-</td>
                      <td>Residential Area</td>
                      <td>volunteer2@example.com</td>
                      <td>+1 987-654-3210</td>
                  </tr>
                  <!-- Add more rows for additional volunteers -->
              </tbody>
          </table>
      </div>

      <!-- Pagination -->
      <nav aria-label="Volunteer List Pagination">
          <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <!-- Add more pagination links as needed -->
          </ul>
      </nav>
  </div>
</div>



<!-- Bootstrap JS and Custom Script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="myscript.js"></script>
</body>
</html>
<?php
echo '<a href="logout.php">Logout</a>';
?>