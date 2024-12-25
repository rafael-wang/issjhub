// Display a personalized greeting based on the time of day
function displayGreeting() {
    const userName = localStorage.getItem("userName") || "Guest";
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good Morning" :
                     currentHour < 18 ? "Good Afternoon" : "Good Evening";

    const greetingElement = document.getElementById("greeting-message");
    if (greetingElement) {
        greetingElement.textContent = `${greeting}, ${userName}`;
    }
}

// Call displayGreeting when the page is loaded
document.addEventListener("DOMContentLoaded", displayGreeting);
