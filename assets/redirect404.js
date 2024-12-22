(function() {
    // Get the current path and remove any trailing slash
    const path = window.location.pathname.replace(/\/$/, "");

    // List of valid paths based on your directory structure, allowing trailing slashes to be optional
    const validPaths = [
        "", // Root path, which will become "/"
        "/404",
        "/assets/jquery.min.js",
        "/assets/login_background.jpg",
        "/assets/README.md",
        "/assets/sths-fa.css",
        "/assets/sths-font.css",
        "/assets/sths-fonts.css",
        "/assets/sths-login.css",
        "/assets/sths-login.js",
        "/assets/w3.css",
        "/edit-site/edit",
        "/edit-site",
        "/home",
        "/login-instructions/edit-site",
        "/site-pages/about-interact",
        "/site-pages/contact-us",
        "/site-pages/file-management",
        "/site-pages/missing-daily-notices",
        "/index.html",
        "/edit-site/edit/index.html",
        "/edit-site/index.html",
        "/interact-file-management/index.html",
        "/auth/index.html",
        "/activate-instructions/index.html"
        "/index.html" ,
        "/style.css" ,
    ];

    // Convert validPaths to ensure consistency with path
    const normalizedPaths = validPaths.map(p => p.replace(/\/$/, ""));

    // Check if the current path exists in the list of normalized paths
    if (!normalizedPaths.includes(path)) {
        // Redirect to the 404 page if the path is not valid
        window.location.href = "/404";
    }
})();
