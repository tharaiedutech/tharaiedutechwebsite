// Student Dashboard JavaScript — self-hosted Flask + PostgreSQL backend, not Supabase.
// Access-expiry/suspension is enforced server-side at login time (see backend/auth.py),
// so this page only needs to display what /api/students/me already returns.

let currentStudentData = null;

// Check if user is student on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkStudentAuthAndAccess();
    if (currentStudentData) {
        await loadStudentDashboard();
        setupEventListeners();
    }
});

// Check if user is logged in and is a student
async function checkStudentAuthAndAccess() {
    try {
        const session = await checkAuth();

        if (!session) {
            window.location.href = 'index.html?login=required';
            return;
        }

        if (session.account_type === 'staff') {
            window.location.href = 'admin-dashboard.html';
            return;
        }

        if (session.account_type !== 'student') {
            alert('⛔ Access Denied: Student account required');
            window.location.href = 'index.html';
            return;
        }

        currentStudentData = await getStudentData();

        if (!currentStudentData) {
            window.location.href = 'index.html';
            return;
        }

        document.getElementById('studentUserName').textContent = currentStudentData.full_name;

        const daysRemaining = currentStudentData.days_remaining;
        if (daysRemaining !== null && daysRemaining <= 30) {
            const endDateDisplay = new Date(currentStudentData.access_end_date).toLocaleDateString();
            const warning = `Your access will expire in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} on ${endDateDisplay}. Please contact admin for renewal.`;
            showAccessWarning(warning, daysRemaining);
        }

    } catch (error) {
        console.error('Student auth check error:', error);
        window.location.href = 'index.html';
    }
}

// Load student dashboard data
async function loadStudentDashboard() {
    try {
        const daysRemaining = currentStudentData.days_remaining;
        const endDate = new Date(currentStudentData.access_end_date);

        // Update statistics
        document.getElementById('daysRemainingCount').textContent = daysRemaining;
        document.getElementById('accessEndDateDisplay').textContent =
            endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        document.getElementById('durationDisplay').textContent =
            `${currentStudentData.access_duration_months} months`;

        // Load enrolled courses
        await loadEnrolledCourses();

        // Update welcome message
        const welcomeMsg = document.getElementById('welcomeMessage');
        if (daysRemaining <= 7) {
            welcomeMsg.innerHTML = `⚠️ <strong>Your access expires soon!</strong> You have ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining. Please contact admin for renewal.`;
        } else if (daysRemaining <= 30) {
            welcomeMsg.innerHTML = `Your access is active and will expire in ${daysRemaining} days on ${endDate.toLocaleDateString()}.`;
        } else {
            welcomeMsg.innerHTML = `Your access is active until ${endDate.toLocaleDateString()}. Enjoy your learning journey!`;
        }

        // Load profile
        loadProfile();

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Show access warning banner
function showAccessWarning(warning, daysRemaining) {
    const warningCard = document.getElementById('accessStatusCard');

    let severity = 'info';
    if (daysRemaining <= 7) {
        severity = 'danger';
    } else if (daysRemaining <= 30) {
        severity = 'warning';
    }

    warningCard.innerHTML = `
        <div class="alert alert-${severity}">
            <div class="alert-icon">${severity === 'danger' ? '🚨' : '⚠️'}</div>
            <div class="alert-content">
                <h4>Access Expiry Notice</h4>
                <p>${warning}</p>
                ${daysRemaining <= 7 ? '<p><strong>Please contact admin immediately to avoid service interruption.</strong></p>' : ''}
            </div>
        </div>
    `;
    warningCard.style.display = 'block';
}

// Load enrolled courses
async function loadEnrolledCourses() {
    try {
        const response = await fetch(`${API_BASE}/students/me/enrollments`, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to load enrollments');
        const enrollments = await response.json();

        const container = document.getElementById('enrolledCoursesList');
        document.getElementById('enrolledCoursesCount').textContent = enrollments.length;

        if (enrollments.length === 0) {
            container.innerHTML = '<p class="empty-message">No enrolled courses yet.</p>';
            return;
        }

        container.innerHTML = enrollments.map(course => `
            <div class="course-card">
                <h4>${course.course_name}</h4>
                <p class="course-track">📂 ${course.track || ''}</p>
                <p class="course-status">Status: ${course.status}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading courses:', error);
        document.getElementById('enrolledCoursesList').innerHTML =
            '<p class="error-message">Error loading courses</p>';
    }
}

// Load profile
function loadProfile() {
    const profileContent = document.getElementById('profileContent');

    profileContent.innerHTML = `
        <div class="profile-info">
            <div class="profile-field">
                <label>Full Name:</label>
                <span>${currentStudentData.full_name}</span>
            </div>
            <div class="profile-field">
                <label>Login Email:</label>
                <span>${currentStudentData.email}</span>
            </div>
            <div class="profile-field">
                <label>Personal Email:</label>
                <span>${currentStudentData.original_email || 'N/A'}</span>
            </div>
            <div class="profile-field">
                <label>Phone:</label>
                <span>${currentStudentData.phone || 'N/A'}</span>
            </div>
            <div class="profile-field">
                <label>Account Status:</label>
                <span class="status-badge ${currentStudentData.account_status}">${currentStudentData.account_status}</span>
            </div>
            <div class="profile-field">
                <label>Access Start Date:</label>
                <span>${new Date(currentStudentData.access_start_date).toLocaleDateString()}</span>
            </div>
            <div class="profile-field">
                <label>Access End Date:</label>
                <span>${new Date(currentStudentData.access_end_date).toLocaleDateString()}</span>
            </div>
            <div class="profile-field">
                <label>Duration:</label>
                <span>${currentStudentData.access_duration_months} months</span>
            </div>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
}

// Switch between sections
function switchSection(sectionName) {
    // Update menu active state
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update section visibility
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionName}-section`).classList.add('active');
}
