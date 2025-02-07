const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("u");

document.getElementById("username").textContent = username;
