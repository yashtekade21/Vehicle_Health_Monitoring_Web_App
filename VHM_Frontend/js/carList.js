// Wait for the DOM content to be fully loaded before executing the functions
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display users and cars data
    await fetchUsers();
    await fetchCars();
  });
   
  // Function to fetch user data and populate the driver select dropdown
  async function fetchUsers() {
    try {
        // Fetch user data from the API
        const response = await fetch('http://127.0.0.1:8000/api/users/');
        // Parse the JSON response
        const users = await response.json();
        // Get the select element for assigned drivers
        const driverSelect = document.getElementById('assignedDriver');
        // Create and append an option for each user in the select dropdown
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = user.username;
            driverSelect.appendChild(option);
        });
    } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching users:', error);
    }
  }
   
  // Function to fetch car data and display it in the table
  async function fetchCars() {
    try {
        // Fetch car data from the API
        const response = await fetch('http://127.0.0.1:8000/api/cars/');
        // Parse the JSON response
        const cars = await response.json();
        // Store the fetched cars data globally for later use
        window.carsData = cars;
        // Display the cars data in the table
        displayCars(cars);
    } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching cars:', error);
    }
  }
   
  // Function to display cars data in a table
  function displayCars(cars) {
    // Get the tbody element of the cars table
    const carsTable = document.getElementById('carsTable').getElementsByTagName('tbody')[0];
    // Clear any existing rows in the table
    carsTable.innerHTML = '';
    // Add a row for each car
    cars.forEach(car => {
        const row = carsTable.insertRow();
        row.insertCell(0).textContent = car.id;
        row.insertCell(1).textContent = car.model_name;
        row.insertCell(2).textContent = car.number_plate;
        row.insertCell(3).textContent = car.assigned_driver;
        row.insertCell(4).innerHTML = `<button class="btn btn-warning" onclick="editRow(${car.id})">Edit</button>`;
        row.insertCell(5).innerHTML = `<button class="btn btn-danger" onclick="deleteRow(${car.id})">Delete</button>`;
    });
  }
   
  // Function to show or hide the add vehicle form and clear the form fields
  function showAddVehicleForm() {
    document.getElementById('addVehicleForm').classList.toggle('d-none');
    clearForm();
  }
   
  // Function to save a new or updated vehicle
  async function saveVehicle() {
    // Get the form field values
    const vehicleModel = document.getElementById('vehicleModel').value;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const assignedDriver = document.getElementById('assignedDriver').value;
    const vehicleId = document.getElementById('vehicleId').value;
   
    // Create the data object to be sent to the API
    const data = {
        model_name: vehicleModel,
        number_plate: vehicleNumber,
        assigned_driver: assignedDriver,
    };
   
    try {
        let response;
        if (vehicleId) {
            // Update an existing vehicle if vehicleId exists
            response = await fetch(`http://127.0.0.1:8000/api/cars/${vehicleId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } else {
            // Add a new vehicle if vehicleId does not exist
            response = await fetch('http://127.0.0.1:8000/api/cars/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
   
        if (response.ok) {
            // Refresh the cars list and hide the form after saving
            await fetchCars();
            showAddVehicleForm();
        } else {
            // Log any errors that occur during saving
            console.error('Error saving vehicle:', await response.json());
        }
    } catch (error) {
        // Log any errors that occur during saving
        console.error('Error saving vehicle:', error);
    }
  }
   
  // Function to show the add vehicle form and populate it with data for editing
  function editRow(id) {
    showAddVehicleForm();
    populateForm(id);
  }
   
  // Function to populate the form with details of a specific car for editing
  async function populateForm(id) {
    try {
        // Fetch the details of the car with the given id
        const response = await fetch(`http://127.0.0.1:8000/api/cars/${id}/`);
        const car = await response.json();
        // Fill the form fields with the car's data
        document.getElementById('vehicleId').value = car.id;
        document.getElementById('vehicleModel').value = car.model_name;
        document.getElementById('vehicleNumber').value = car.number_plate;
        document.getElementById('assignedDriver').value = car.assigned_driver;
    } catch (error) {
        // Log any errors that occur during fetching car details
        console.error('Error fetching car details:', error);
    }
  }
   
  // Function to clear the form fields
  function clearForm() {
    document.getElementById('vehicleId').value = '';
    document.getElementById('vehicleModel').value = '';
    document.getElementById('vehicleNumber').value = '';
    document.getElementById('assignedDriver').value = '';
  }
   
  // Function to confirm and delete a car
  function deleteRow(id) {
    if (confirm('Are you sure you want to delete this car?')) {
        deleteVehicle(id);
    }
  }
   
  // Function to delete a car from the API
  async function deleteVehicle(id) {
    try {
        // Send a DELETE request to the API to remove the car
        const response = await fetch(`http://127.0.0.1:8000/api/cars/${id}/`, {
            method: 'DELETE',
        });
   
        if (response.ok) {
            // Refresh the cars list after deletion
            await fetchCars();
        } else {
            // Log any errors that occur during deletion
            console.error('Error deleting vehicle:', await response.json());
        }
    } catch (error) {
        // Log any errors that occur during deletion
        console.error('Error deleting vehicle:', error);
    }
  }
   
  // Add search functionality to filter cars based on user input
  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // Filter the cars data based on the search term
    const filteredCars = window.carsData.filter(car =>
        car.model_name.toLowerCase().includes(searchTerm) ||
        car.number_plate.toLowerCase().includes(searchTerm) ||
        car.assigned_driver.toLowerCase().includes(searchTerm)
    );
    // Display the filtered cars
    displayCars(filteredCars);
  });