// Add an event listener to the registration form for the submit event
document.getElementById('register-form').addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
 
    // Create a FormData object from the form
    const formData = new FormData(event.target);
 
    // Construct the data object to be sent in the request
    const data = {
        user: {
            // Split the full name into first and last names
            first_name: formData.get('fullname').split(' ')[0],
            last_name: formData.get('fullname').split(' ')[1],
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        },
        age: formData.get('age'),
        contact_no: formData.get('contact_no'),
        license_no: formData.get('license_no'),
        address: formData.get('address'),
    };
 
    try {
        // Send a POST request to the registration API endpoint with the user data
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
 
        // Check if the response status is OK
        if (response.ok) {
            // Notify the user of a successful registration
            alert('Registration successful!');
            // Redirect to the login page
            window.location.href = 'login.html';
        } else {
            // Parse and display error message if the response is not OK
            const error = await response.json();
            document.getElementById('error-message').innerText = error.error || 'Registration failed';
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error:', error);
        document.getElementById('error-message').innerText = 'An unexpected error occurred. Please try again.';
        document.getElementById('error-message').style.display = 'block';
    }
});