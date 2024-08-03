// Wait for the DOM content to be fully loaded before executing the functions
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch driver data and initialize the DataTable with specific settings
    await fetchDrivers();
    $('#driverTable').DataTable({
        searching: false, // Disable searching in the DataTable
        paging: true, // Enable pagination in the DataTable
        info: false, // Disable the info display in the DataTable
        ordering: false, // Disable ordering (sorting) in the DataTable
    });
});
 
// Another DOMContentLoaded event listener to handle menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the menu toggle button and wrapper
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
 
    // Add a click event listener to the menu toggle button
    menuToggle.addEventListener('click', function() {
        // Toggle the 'toggled' class on the wrapper element
        wrapper.classList.toggle('toggled');
    });
});
 
// Function to fetch driver data from the API and populate the driver table
async function fetchDrivers() {
    try {
        // Fetch driver data from the API
        const response = await fetch('http://127.0.0.1:8000/api/driver-list/');
        // Parse the JSON response
        const data = await response.json();
 
        // Get the tbody element of the driver table
        const driverTableBody = document.querySelector('#driverTable tbody');
        // Clear any existing rows in the table
        driverTableBody.innerHTML = '';
 
        // Add a row for each driver in the table
        data.forEach(driver => {
            const row = driverTableBody.insertRow();
            row.insertCell(0).textContent = driver.username;
            row.insertCell(1).textContent = driver.contact_no;
            row.insertCell(2).textContent = driver.email;
            row.insertCell(3).textContent = driver.vehicle_number;
        });
    } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching drivers:', error);
    }
}