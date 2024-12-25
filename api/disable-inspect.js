// Function to disable right-click and common shortcuts for accessing developer tools
function disableContextMenuAndShortcuts() {
    // Disable right-click context menu
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // Disable common shortcuts for accessing developer tools
    document.addEventListener("keydown", function(e) {
        if (
            (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || // Ctrl+Shift+I, Ctrl+Shift+J, or Ctrl+Shift+C
            (e.ctrlKey && e.key === "U") || // Ctrl+U
            e.key === "F12" // F12
        ) {
            e.preventDefault();
        }
    });
}

// Call the function when the document is fully loaded
document.addEventListener("DOMContentLoaded", disableContextMenuAndShortcuts);
