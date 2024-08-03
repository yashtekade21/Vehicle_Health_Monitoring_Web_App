// Wait for the DOM content to be fully loaded before executing the functions
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display users and bikes data
    await fetchUsers();
    await fetchBikes();
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
 
// Function to fetch bike data and display it in the table
async function fetchBikes() {
    try {
        // Fetch bike data from the API
        const response = await fetch('http://127.0.0.1:8000/api/bikes/');
        // Parse the JSON response
        const bikes = await response.json();
        // Store the fetched bikes data globally for later use
        window.bikesData = bikes;
        // Display the bikes data in the table
        displayBikes(bikes);
    } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching bikes:', error);
    }
}
 
// Function to display bikes data in a table
function displayBikes(bikes) {
    // Get the tbody element of the bikes table
    const bikesTable = document.getElementById('bikesTable').getElementsByTagName('tbody')[0];
    // Clear any existing rows in the table
    bikesTable.innerHTML = '';
    // Add a row for each bike
    bikes.forEach(bike => {
        const row = bikesTable.insertRow();
        row.insertCell(0).textContent = bike.id;
        row.insertCell(1).textContent = bike.model_name;
        row.insertCell(2).textContent = bike.number_plate;
        row.insertCell(3).textContent = bike.assigned_driver;
        row.insertCell(4).innerHTML = `<button class="btn btn-warning" onclick="editRow(${bike.id})">Edit</button>`;
        row.insertCell(5).innerHTML = `<button class="btn btn-danger" onclick="deleteRow(${bike.id})">Delete</button>`;
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
            response = await fetch(`http://127.0.0.1:8000/api/bikes/${vehicleId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } else {
            // Add a new vehicle if vehicleId does not exist
            response = await fetch('http://127.0.0.1:8000/api/bikes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
 
        if (response.ok) {
            // Refresh the bikes list and hide the form after saving
            await fetchBikes();
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
 
// Function to populate the form with details of a specific bike for editing
async function populateForm(id) {
    try {
        // Fetch the details of the bike with the given id
        const response = await fetch(`http://127.0.0.1:8000/api/bikes/${id}/`);
        const bike = await response.json();
        // Fill the form fields with the bike's data
        document.getElementById('vehicleId').value = bike.id;
        document.getElementById('vehicleModel').value = bike.model_name;
        document.getElementById('vehicleNumber').value = bike.number_plate;
        document.getElementById('assignedDriver').value = bike.assigned_driver;
    } catch (error) {
        // Log any errors that occur during fetching bike details
        console.error('Error fetching bike details:', error);
    }
}
 
// Function to clear the form fields
function clearForm() {
    document.getElementById('vehicleId').value = '';
    document.getElementById('vehicleModel').value = '';
    document.getElementById('vehicleNumber').value = '';
    document.getElementById('assignedDriver').value = '';
}
 
// Function to confirm and delete a vehicle
function deleteRow(id) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        deleteVehicle(id);
    }
}
 
// Function to delete a vehicle from the API
async function deleteVehicle(id) {
    try {
        // Send a DELETE request to the API to remove the vehicle
        const response = await fetch(`http://127.0.0.1:8000/api/bikes/${id}/`, {
            method: 'DELETE',
        });
 
        if (response.ok) {
            // Refresh the bikes list after deletion
            await fetchBikes();
        } else {
            // Log any errors that occur during deletion
            console.error('Error deleting vehicle:', await response.json());
        }
    } catch (error) {
        // Log any errors that occur during deletion
        console.error('Error deleting vehicle:', error);
    }
}
 
// Add search functionality to filter bikes based on user input
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // Filter the bikes data based on the search term
    const filteredBikes = window.bikesData.filter(bike =>
        bike.model_name.toLowerCase().includes(searchTerm) ||
        bike.number_plate.toLowerCase().includes(searchTerm) ||
        bike.assigned_driver.toLowerCase().includes(searchTerm)
    );
    // Display the filtered bikes
    displayBikes(filteredBikes);
});