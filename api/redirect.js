// redirect.js
function redirectToLoginPage() {
    // Redirect the user to the login page if they are not logged in
    window.location.href = '/auth/';
}

document.addEventListener("DOMContentLoaded", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    // Check if the user is logged in
    if (!loggedIn) {
        // Redirect unlogged-in users to the login page
        redirectToLoginPage();
    }
});
