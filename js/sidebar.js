const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const sidebarButton = document.getElementById("sidebar-button");

let isOpen = false;

sidebarButton.addEventListener("click", () => {
    if (isOpen) {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("open");
        sidebarButton.classList.remove("open");
    } else {
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("open");
        sidebarButton.classList.add("open");
    }
    isOpen = !isOpen;
})

sidebarOverlay.addEventListener("click", () => {
    if (isOpen) {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("open");
        sidebarButton.classList.remove("open");
        isOpen = false;
    }
})