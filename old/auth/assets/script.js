const usernameSection = document.querySelector('.username-section');
const passwordSection = document.querySelector('.password-section');
const usernameSubmit = document.getElementById('username-submit');
const passwordSubmit = document.getElementById('password-submit');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const timestampElement = document.getElementById('timestamp');

// Fetch user credentials from the users.json file
async function fetchUsers() {
    try {
        const response = await fetch('/auth/assets/users.json');
        if (!response.ok) throw new Error("Unable to fetch user data.");
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error(error.message);
        alert("Error: Unable to fetch user data. Please try again later.");
        return [];
    }
}

// Validate username and password
async function validateCredentials(username, password) {
    const users = await fetchUsers();
    
    // Check if the username exists and if the password matches (using simple encryption comparison)
    return users.some(user => user.username === username && decryptPassword(user.password) === password);
}

// Password encryption and decryption (for demonstration, use a more secure method in production)
function encryptPassword(password) {
    return btoa(password); // Simple base64 encoding (not secure for production!)
}

function decryptPassword(encryptedPassword) {
    return atob(encryptedPassword); // Simple base64 decoding (not secure for production!)
}

// Transition to password screen
usernameSubmit.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    // Reset previous error message
    usernameError.classList.remove('visible');

    // Always transition to the password screen after username input
    usernameSection.classList.remove('active');
    setTimeout(() => {
        passwordSection.classList.add('active');
        updateTimestamp();
    }, 500); // Delay for smoother transition
});

// Handle password submission and authentication
passwordSubmit.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset previous error messages
    passwordError.classList.remove('visible');

    // Validate the username-password combination
    if (await validateCredentials(username, password)) {
        passwordError.classList.remove('visible'); // Hide error message on success
        alert("Login successful!");
        
        // Optionally, store authentication info in localStorage (for persistence)
        localStorage.setItem('isAuthenticated', 'true');

        // Redirect to /portal/ after successful authentication
        window.location.href = '/portal/';
    } else {
        passwordError.textContent = "Invalid username or password. Please try again.";
        passwordError.classList.add('visible');
    }
});

// Update timestamp dynamically
function updateTimestamp() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZoneName: 'short' 
    };
    const timestamp = now.toLocaleDateString('en-AU', options);
    timestampElement.textContent = timestamp;
}

// Redirection check on the portal page (in portal.html or another script file)
if (window.location.pathname === '/portal/' && !localStorage.getItem('isAuthenticated')) {
    window.location.href = '/login/';
}
