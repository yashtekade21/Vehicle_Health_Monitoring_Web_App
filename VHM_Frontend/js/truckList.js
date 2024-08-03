// When the DOM is fully loaded, fetch the users and trucks data
document.addEventListener('DOMContentLoaded', async () => {
    await fetchUsers(); // Fetch the list of users
    await fetchTrucks(); // Fetch the list of trucks
});
 
// Function to fetch users from the API
async function fetchUsers() {
    try {
        // Send a GET request to fetch users
        const response = await fetch('http://127.0.0.1:8000/api/users/');
        const users = await response.json(); // Parse the JSON response
        const driverSelect = document.getElementById('assignedDriver');
        // Populate the dropdown with users
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = user.username;
            driverSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching users:', error); // Log errors if any
    }
}
 
// Function to fetch trucks from the API
async function fetchTrucks() {
    try {
        // Send a GET request to fetch trucks
        const response = await fetch('http://127.0.0.1:8000/api/trucks/');
        const trucks = await response.json(); // Parse the JSON response
        const trucksTable = document.getElementById('trucksTable').getElementsByTagName('tbody')[0];
        trucksTable.innerHTML = '';  // Clear existing rows in the table
        // Populate the table with trucks
        trucks.forEach(truck => {
            const row = trucksTable.insertRow();
            row.insertCell(0).textContent = truck.id;
            row.insertCell(1).textContent = truck.model_name;
            row.insertCell(2).textContent = truck.number_plate;
            row.insertCell(3).textContent = truck.assigned_driver;
            row.insertCell(4).innerHTML = `<button class="btn btn-warning" onclick="editRow(${truck.id})">Edit</button>`;
            row.insertCell(5).innerHTML = `<button class="btn btn-danger" onclick="deleteRow(${truck.id})">Delete</button>`;
        });
    } catch (error) {
        console.error('Error fetching trucks:', error); // Log errors if any
    }
}
 
// Function to toggle the visibility of the add truck form
function showAddTruckForm() {
    document.getElementById('addTruckForm').classList.toggle('d-none');
}
 
// Function to save a truck (either add or update)
async function saveTruck() {
    const truckId = document.getElementById('truckId').value;
    const truckModel = document.getElementById('truckModel').value;
    const truckNumber = document.getElementById('truckNumber').value;
    const assignedDriver = document.getElementById('assignedDriver').value;
 
    // Data object to send in the request
    const data = {
        model_name: truckModel,
        number_plate: truckNumber,
        assigned_driver: assignedDriver,
    };
 
    try {
        // Determine the method and URL based on whether we're updating or adding
        const method = truckId ? 'PUT' : 'POST';
        const url = truckId ? `http://127.0.0.1:8000/api/trucks/${truckId}/` : 'http://127.0.0.1:8000/api/trucks/';
        // Send the request to save the truck
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
 
        if (response.ok) {
            await fetchTrucks(); // Refresh the trucks list
            showAddTruckForm();  // Hide form after saving
        } else {
            console.error('Error saving truck:', await response.json()); // Log errors if any
        }
    } catch (error) {
        console.error('Error saving truck:', error); // Log errors if any
    }
}
 
// Function to populate the form with truck details for editing
async function editRow(id) {
    try {
        // Send a GET request to fetch the truck details
        const response = await fetch(`http://127.0.0.1:8000/api/trucks/${id}/`);
        const truck = await response.json(); // Parse the JSON response
        // Populate the form with truck details
        document.getElementById('truckId').value = truck.id;
        document.getElementById('truckModel').value = truck.model_name;
        document.getElementById('truckNumber').value = truck.number_plate;
        document.getElementById('assignedDriver').value = truck.assigned_driver;
        showAddTruckForm();  // Show form for editing
    } catch (error) {
        console.error('Error fetching truck for editing:', error); // Log errors if any
    }
}
 
// Function to delete a truck
async function deleteRow(id) {
    try {
        // Send a DELETE request to remove the truck
        const response = await fetch(`http://127.0.0.1:8000/api/trucks/${id}/`, {
            method: 'DELETE',
        });
 
        if (response.ok) {
            await fetchTrucks(); // Refresh the trucks list
        } else {
            console.error('Error deleting truck:', await response.json()); // Log errors if any
        }
    } catch (error) {
        console.error('Error deleting truck:', error); // Log errors if any
    }
}