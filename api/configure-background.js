function validateLogin() {
    const username = document.getElementById("fld-username-fld").value;
    const password = document.getElementById("fld-password-fld").value;

    console.log("Username:", username);
    console.log("Password:", password);

    // Block login for ethan.nguyen
    if (username === "sample") {
        document.getElementById("shs-login-message").innerHTML = `
            <div class="error-message">
                <p>Unable to log you in</p>
                <p>Authorised access to this user has been terminated. Please contact support for more information regarding this issue.</p>
            </div>
        `;
        return; // Stop further processing
    }

    // Check if the credentials are correct for rafael.wang
    if (username === "rafael.wang" && password === "Rafaelwang2011@") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "/portal/";
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
