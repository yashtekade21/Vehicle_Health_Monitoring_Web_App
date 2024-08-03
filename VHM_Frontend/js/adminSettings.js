// Function to change the theme of the webpage
function changeTheme(theme) {
    // Update the body class to apply the new theme
    document.body.className = theme + '-theme';
}
 
// Function to save the user's profile information
function saveProfile() {
    // Get the name input value
    const name = document.getElementById('editName').value;
    // Get the profile picture input element
    const profilePicInput = document.getElementById('editProfilePic');
    // Get the selected file from the input element
    const profilePicFile = profilePicInput.files[0];
 
    // Check if the name is empty
    if (name.trim() === '') {
        // Alert the user that the name is required
        alert('Name is required.');
        return;
    }
 
    // Update the profile name display with the new name
    document.getElementById('profileName').innerText = name;
 
    // Check if a profile picture file is selected
    if (profilePicFile) {
        // Create a FileReader object to read the file
        const reader = new FileReader();
        // Define the onload event handler for the FileReader
        reader.onload = function(event) {
            // Update the profile picture source with the file data URL
            document.getElementById('profilePic').src = event.target.result;
        };
        // Read the file as a data URL
        reader.readAsDataURL(profilePicFile);
    }
 
    // Alert the user that the profile has been updated successfully
    alert('Profile updated successfully!');
}