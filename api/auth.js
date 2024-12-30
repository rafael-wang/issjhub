// auth.js

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Attach the login validation function to the login button
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", validateLogin);
});

function validateLogin() {
    const username = document.getElementById("fld-username-fld").value;
    const password = document.getElementById("fld-password-fld").value;

    console.log("Username:", username);
    console.log("Password:", password);

    // Define user roles and password mapping
    const users = {
        "sample": { role: "blocked", message: "Authorized access to this user has been terminated. Please contact support." },
        "rafael.wang": { role: "Case Manager, Super-User", password: "Rafaelwang2011@", message: "" },
        "ethan.nguyen": { role: "Presiding Case Officer", password: "Ethanpassword@", message: "Welcome, Ethan Nguyen" },
        "ethan.nguyen": { role: "Super-User", password: "Ethanpassword@", message: "Welcome, Ethan Nguyen" },
        "john.doe": { role: "Interact Member", password: "Johndoepassword@", message: "" }
    };

    // Block login for specific user (e.g., "sample")
    if (users[username] && users[username].role === "blocked") {
        document.getElementById("shs-login-message").innerHTML = `
            <div class="error-message">
                <p>Unable to log you in</p>
                <p>${users[username].message}</p>
            </div>
        `;
        return;
    }

    // Check if the username and password match
    if (users[username] && users[username].password === password) {
        // Store the logged-in user's role and username in localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("role", users[username].role);

        // Redirect to the universal portal page
        window.location.href = "/portal/";
    } else {
        // Show error message for incorrect login
        document.getElementById("shs-login-message").innerHTML = `
            <div class="error-message">
                <p>Unable to log you in</p>
                <p>Unknown username or incorrect password.</p>
            </div>
        `;
    }
}
