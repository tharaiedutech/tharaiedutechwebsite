// THARAI EduTech - Auth UI Handlers
// Handles modal opening/closing and form submissions.
// Public self-signup is disabled by design (see scripts/auth.js), so there is
// no signup modal or Google OAuth here — only login and forgot-password.

// Show Login Modal
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Login Modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('loginForm').reset();
    hideMessage('loginError');
    hideMessage('loginSuccess');
}

// Show Forgot Password Modal
function showForgotPassword() {
    closeLoginModal();
    document.getElementById('forgotPasswordModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Forgot Password Modal
function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('forgotPasswordForm').reset();
    hideMessage('resetError');
    hideMessage('resetSuccess');
}

// Switch from Forgot Password back to Login
function switchToLogin() {
    closeForgotPasswordModal();
    showLoginModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('auth-modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

// Show success message
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

// Hide message
function hideMessage(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'none';
}

// Handle Login Form Submit
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = document.getElementById('loginSubmitBtn');

    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    hideMessage('loginError');
    hideMessage('loginSuccess');

    // Call sign in function
    const result = await signIn(email, password);

    if (result.success) {
        showSuccess('loginSuccess', '✅ Login successful! Welcome back!');

        // Close modal and update UI
        setTimeout(() => {
            closeLoginModal();
            updateUIForAuth(); // This will show Dashboard/Logout buttons

            // Check if student and show expiry warning
            if (result.isStudent && result.accessWarning) {
                setTimeout(() => {
                    alert('⚠️ Access Expiry Warning\n\n' + result.accessWarning);
                }, 500);
            }

            // Redirect to appropriate dashboard
            if (result.isStudent) {
                // Redirect to student dashboard
                window.location.href = 'student-dashboard.html';
            }
            // Staff will stay on current page or go to admin dashboard manually
        }, 1500);
    } else {
        showError('loginError', '❌ ' + result.error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
}

// Handle Forgot Password
async function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('resetEmail').value;
    const submitBtn = document.getElementById('resetSubmitBtn');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    hideMessage('resetError');
    hideMessage('resetSuccess');

    const result = await resetPassword(email);

    if (result.success) {
        showSuccess('resetSuccess', '✅ Password reset email sent! Check your inbox.');
        document.getElementById('forgotPasswordForm').reset();
    } else {
        showError('resetError', '❌ ' + result.error);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Reset Link';
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔄 Initializing auth UI...');

    // Update UI based on auth status
    await updateUIForAuth();

    // Add event listeners to buttons
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');

    console.log('🔍 Found buttons:', {
        loginBtn: !!loginBtn,
        logoutBtn: !!logoutBtn,
        dashboardBtn: !!dashboardBtn
    });

    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
        console.log('✅ Login button listener attached');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to logout?')) {
                await signOut();
            }
        });
    }

    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', async () => {
            // Route to appropriate dashboard based on role
            const userIsStaff = await isStaff();
            const userIsStudent = await isStudent();

            if (userIsStaff) {
                window.location.href = 'admin-dashboard.html';
            } else if (userIsStudent) {
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Dashboard access not configured for your account.');
            }
        });
    }
});
