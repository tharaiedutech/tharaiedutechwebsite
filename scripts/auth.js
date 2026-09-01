// THARAI EduTech - Authentication System
// Talks to the self-hosted Flask + PostgreSQL backend (see backend/), not Supabase.
// Public self-signup is disabled by design — students get accounts from admin
// after enrollment (see scripts/account-creation.js), so there is no signUp() here.

// Returns the current session info ({account_type, account_id, role, full_name}) or null
async function checkAuth() {
    try {
        const response = await fetch(`${API_BASE}/auth/session`, { credentials: 'include' });
        const data = await response.json();
        return data.account_type ? data : null;
    } catch (error) {
        console.error('Error checking session:', error);
        return null;
    }
}

// Alias kept for call-site compatibility with the old Supabase-based API
async function getCurrentUser() {
    return checkAuth();
}

// Sign In - Login
async function signIn(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');

        if (data.account_type === 'student') {
            let accessWarning = null;
            if (data.days_remaining !== null && data.days_remaining <= 30 && data.days_remaining > 0) {
                const endDateDisplay = new Date(data.access_end_date).toLocaleDateString();
                accessWarning = `Your access will expire in ${data.days_remaining} day${data.days_remaining !== 1 ? 's' : ''} on ${endDateDisplay}. Please contact admin for renewal.`;
            }

            return {
                success: true,
                data,
                isStudent: true,
                accessWarning,
                daysRemaining: data.days_remaining
            };
        }

        return { success: true, data, isStudent: false };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign Out - Logout
async function signOut() {
    try {
        await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Password Reset - Send reset email
async function resetPassword(email) {
    try {
        const response = await fetch(`${API_BASE}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to send reset email');

        return { success: true, message: 'Password reset email sent!' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Check if user is admin
async function isAdmin() {
    const session = await checkAuth();
    return !!session && session.account_type === 'staff' && session.role === 'admin';
}

// Check if user is staff (staff or admin role)
async function isStaff() {
    const session = await checkAuth();
    return !!session && session.account_type === 'staff';
}

// Check if user is a student
async function isStudent() {
    const session = await checkAuth();
    return !!session && session.account_type === 'student';
}

// Get student data for current user (full profile, server-enforced access rules)
async function getStudentData() {
    try {
        const response = await fetch(`${API_BASE}/students/me`, { credentials: 'include' });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching student data:', error);
        return null;
    }
}

// Protect page - redirect if not logged in
async function protectPage() {
    const session = await checkAuth();
    if (!session) {
        window.location.href = 'index.html?login=required';
    }
}

// Show/hide UI elements based on auth status
async function updateUIForAuth() {
    const session = await checkAuth();
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');

    if (session) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (dashboardBtn) dashboardBtn.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (dashboardBtn) dashboardBtn.style.display = 'none';
    }
}
