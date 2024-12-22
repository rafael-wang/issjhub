function validateLogin() {
    const username = document.getElementById("fld-username-fld").value;
    const password = document.getElementById("fld-password-fld").value;

    console.log("Username:", username);
    console.log("Password:", password);

    // Custom error for ethan.nguyen
    if (username === "ethan.nguyen") {
        document.getElementById("shs-login-message").innerHTML = `
            <div class="error-message">
                <p>Unable to log you in</p>
                <p>Access for this user has been disabled.</p>
            </div>
        `;
        return; // Stop further processing
    }

    // Check if the credentials are correct for other users
    if (username === "rafael.wang" && password === "Rafaelwang2011@") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("validSession", "true");
        localStorage.setItem("validIdentifier", "true");
        window.location.href = "/console/";
    } else {
        // Default error message for incorrect credentials
        document.getElementById("shs-login-message").innerHTML = `
            <div class="error-message">
                <p>Unable to log you in</p>
                <p>Unknown user name or bad password.</p>
            </div>
        `;
    }
}
