// redirect.js

function redirectToLoginPage() {
    // Redirect the user to the login page if they are not logged in
    window.location.href = '/auth/'; // Make sure this points to the correct login page
}

document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in from localStorage
    const loggedIn = localStorage.getItem("loggedIn");

    // If the user is not logged in, redirect them to the login page
    if (!loggedIn || loggedIn !== 'true') {
        redirectToLoginPage();
    }
});
