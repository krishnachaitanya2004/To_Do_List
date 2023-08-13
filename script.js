
const userEmail = sessionStorage.getItem("userEmail");


if (userEmail) {
    const emailDisplay = document.getElementById("user-email");
    emailDisplay.textContent = `Welcome, ${userEmail}!`;
} else {
    // Redirect the user to the login page if no email is stored
    window.location.href = "login.html";
}

