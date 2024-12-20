const usernameSection = document.querySelector('.username-section');
const passwordSection = document.querySelector('.password-section');
const usernameSubmit = document.getElementById('username-submit');
const passwordSubmit = document.getElementById('password-submit');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const timestampElement = document.getElementById('timestamp');

// Predefined username and password for authentication
const validUsername = "user123";
const validPassword = "securePass";

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
passwordSubmit.addEventListener('click', () => {
    const username = usernameInput.value.trim(); // Use the entered username
    const password = passwordInput.value.trim();

    // Reset previous error messages
    passwordError.classList.remove('visible');
    
    // Check the username-password combination
    if (username === validUsername && password === validPassword) {
        passwordError.classList.remove('visible'); // Hide error message on success
        alert("Login successful!");
        // Redirect to another page or dashboard
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
