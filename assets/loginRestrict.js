// Function to show the blur effect and overlay
function showRestrictionOverlay() {
    // Create a blurred background div if it doesn't already exist
    if (!document.getElementById("blurBackground")) {
        const blurBackground = document.createElement("div");
        blurBackground.id = "blurBackground";
        blurBackground.style.position = "fixed";
        blurBackground.style.top = "0";
        blurBackground.style.left = "0";
        blurBackground.style.width = "100%";
        blurBackground.style.height = "100%";
        blurBackground.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // High opacity for strong cover
        blurBackground.style.filter = "blur(200px)"; // High blur radius to fully obscure content
        blurBackground.style.zIndex = "2147483646"; // High z-index to appear above embeds
        blurBackground.style.pointerEvents = "none"; // Allows interaction with overlay only
        document.body.appendChild(blurBackground);
    }

    // Create the overlay with message if it doesn't already exist
    if (!document.getElementById("restrictionOverlay")) {
        const overlay = document.createElement("div");
        overlay.id = "restrictionOverlay";

        // Style the overlay
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "2147483647"; // Higher z-index to ensure overlay appears above all elements
        overlay.style.color = "#fff";
        overlay.style.fontSize = "24px";
        overlay.style.fontWeight = "bold";
        overlay.style.cursor = "pointer";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Overlay background for complete cover

        // Overlay message
        overlay.textContent = "This screen has been covered for security reasons. Click here or 'Escape' to return to login.";

        // Add click listener to overlay to remove blur and itself
        overlay.addEventListener("click", hideRestrictionOverlay);

        
        
        document.body.appendChild(overlay);
    }
}

// Function to remove the blur and overlay on click or 'Escape' press
function hideRestrictionOverlay() {
    // Remove overlay
    const overlay = document.getElementById("restrictionOverlay");
    if (overlay) overlay.remove();

    // Remove blurred background
    const blurBackground = document.getElementById("blurBackground");
    if (blurBackground) blurBackground.remove();
}

// Keydown event listener to detect Option (Alt), Control, or Command key press
document.addEventListener("keydown", function(event) {
    // Show overlay if Control, Command (Meta), or Option (Alt) is pressed
    if (event.ctrlKey || event.metaKey || event.altKey) {
        showRestrictionOverlay();

        // Prevent fullscreen while blurred
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        // Prevent default screenshot action if specific keys are pressed
        if (event.key === 'Shift' || event.key.toLowerCase() === 's') {
            event.preventDefault();
        }
    }

    // Hide overlay if 'Escape' key is pressed
    if (event.key === 'Escape') {
        hideRestrictionOverlay();
    }
});

// Visibility change listener to blur when focus is lost and unblur when focused
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
        showRestrictionOverlay(); // Show blur effect when tab is not visible
    } else {
        hideRestrictionOverlay(); // Remove blur effect when tab is visible
    }
});

// Extra listener to prevent fullscreen activation while blurred
document.addEventListener("fullscreenchange", function() {
    if (document.fullscreenElement && document.getElementById("blurBackground")) {
        document.exitFullscreen();
    }
});
