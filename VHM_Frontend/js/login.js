// Add an event listener to the login form for the submit event
document.getElementById('login-form').addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
 
    // Create a FormData object from the form
    const formData = new FormData(event.target);
    // Extract username and password from the FormData object
    const data = {
        username: formData.get('username'),
        password: formData.get('password'),
    };
 
    try {
        // Send a POST request to the login API endpoint with the username and password
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
 
        // Check if the response status is OK
        if (response.ok) {
            // Notify the user of a successful login
            alert('Login successful!');
            // Get the username from the data object
            const username = data.username;
            // Redirect based on the username
            if (username === 'Admin') {
                // Redirect to the admin dashboard if the username is 'Admin'
                window.location.href = 'admin-dashboard.html';
            } else {
                // Redirect to the driver dashboard for other usernames
                window.location.href = 'driver_dashboard.html';
            }
        } else {
            // Parse and display error message if the response is not OK
            const error = await response.json();
            alert(`Login failed: ${error.error}`);
        }
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error:', error);
    }
});