function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmpassword").value;

    // Validate username
    var usernameRegex = /^[a-zA-Z0-9]{8,15}$/;
    if (!usernameRegex.test(username)) {
        alert("Username must contain only letters and digits and be 8 to 15 characters long.");
        return false;
    }

    // Validate password
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must contain at least one uppercase letter");
        alert("Password must contain at least one lowercase letter");
        alert("Password must contain at least one digit");
        alert("Password must contain at least one special character");
        alert("Password must be 8 to 20 characters long");
        return false;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // All validation passed
    return true;
}