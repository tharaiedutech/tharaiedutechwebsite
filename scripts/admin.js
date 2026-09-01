// Admin Dashboard JavaScript — self-hosted Flask + PostgreSQL backend, not Supabase.

// Check if user is admin on page load
document.addEventListener('DOMContentLoaded', async function() {
    const isStaffUser = await checkAdminAccess();
    if (isStaffUser) {
        loadEnrollments();
        setupEventListeners();
    }
});

// Check if user is admin/staff
async function checkAdminAccess() {
    try {
        const session = await checkAuth();

        if (!session) {
            window.location.href = 'index.html';
            return false;
        }

        if (session.account_type !== 'staff') {
            alert('⛔ Access Denied: Admin privileges required');
            window.location.href = 'index.html';
            return false;
        }

        document.getElementById('adminUserName').textContent = session.full_name;
        return true;

    } catch (error) {
        console.error('Admin check error:', error);
        window.location.href = 'index.html';
        return false;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Menu navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            switchSection(section);
        });
    });

    // Status filter
    document.getElementById('statusFilter').addEventListener('change', function() {
        loadEnrollments();
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

// Load enrollments
async function loadEnrollments() {
    const tableBody = document.getElementById('enrollmentsTableBody');
    const loadingState = document.getElementById('enrollmentsLoading');
    const emptyState = document.getElementById('enrollmentsEmpty');
    const statusFilter = document.getElementById('statusFilter').value;

    // Show loading
    loadingState.style.display = 'block';
    emptyState.style.display = 'none';
    tableBody.innerHTML = '';

    try {
        const url = statusFilter === 'all'
            ? `${API_BASE}/admin/enrollments`
            : `${API_BASE}/admin/enrollments?status=${encodeURIComponent(statusFilter)}`;

        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to load enrollments');
        const enrollments = await response.json();

        // Hide loading
        loadingState.style.display = 'none';

        if (enrollments.length === 0) {
            emptyState.style.display = 'block';
        } else {
            enrollments.forEach(enrollment => {
                const row = createEnrollmentRow(enrollment);
                tableBody.appendChild(row);
            });
        }

        updateStats();

    } catch (error) {
        console.error('Error loading enrollments:', error);
        loadingState.style.display = 'none';
        emptyState.style.display = 'block';
        alert('Error loading enrollments. Please try again.');
    }
}

// Create enrollment table row
function createEnrollmentRow(enrollment) {
    const row = document.createElement('tr');

    const date = new Date(enrollment.enrolled_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const statusClass = enrollment.status || 'pending';

    row.innerHTML = `
        <td>${date}</td>
        <td><strong>${enrollment.student_name || 'N/A'}</strong></td>
        <td>${enrollment.student_email || 'N/A'}</td>
        <td>${enrollment.student_phone || 'N/A'}</td>
        <td>${enrollment.course_name || 'N/A'}</td>
        <td>${enrollment.preferred_schedule || 'Not specified'}</td>
        <td><span class="status-badge ${statusClass}">${statusClass}</span></td>
        <td>
            <button class="btn-action primary" onclick="viewEnrollmentDetail('${enrollment.id}')">
                View
            </button>
            ${enrollment.status === 'pending' && !enrollment.has_account ? `
                <button class="btn-action primary" onclick="createStudentAccount('${enrollment.id}')">
                    Create Account
                </button>
            ` : ''}
        </td>
    `;

    return row;
}

// Update statistics
async function updateStats() {
    try {
        const response = await fetch(`${API_BASE}/admin/enrollments/stats`, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to load stats');
        const stats = await response.json();

        document.getElementById('pendingCount').textContent = stats.pending;
        document.getElementById('activeCount').textContent = stats.active;
        document.getElementById('completedCount').textContent = stats.completed;
        document.getElementById('todayCount').textContent = stats.today;
        document.getElementById('pendingBadge').textContent = stats.pending;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Refresh enrollments
function refreshEnrollments() {
    loadEnrollments();
}

// View enrollment detail
async function viewEnrollmentDetail(enrollmentId) {
    try {
        const response = await fetch(`${API_BASE}/admin/enrollments/${enrollmentId}`, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to load enrollment');
        const enrollment = await response.json();

        const modal = document.getElementById('enrollmentDetailModal');
        const body = document.getElementById('enrollmentDetailBody');

        const date = new Date(enrollment.enrolled_at).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        body.innerHTML = `
            <div style="padding: 1rem;">
                <div style="background: linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 100%); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                    <h3 style="color: #7C3AED; margin: 0 0 0.5rem 0; font-size: 1.3rem;">
                        ${enrollment.course_name}
                    </h3>
                    <p style="color: #6B7280; margin: 0; font-size: 0.95rem;">
                        <strong>Track:</strong> ${enrollment.track}
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Student Name</label>
                        <p style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #1F2937;">${enrollment.student_name}</p>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Status</label>
                        <p style="margin: 0;"><span class="status-badge ${enrollment.status}">${enrollment.status}</span></p>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Email</label>
                        <p style="margin: 0; color: #1F2937;"><a href="mailto:${enrollment.student_email}" style="color: #7C3AED;">${enrollment.student_email}</a></p>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Phone</label>
                        <p style="margin: 0; color: #1F2937;"><a href="tel:${enrollment.student_phone}" style="color: #7C3AED;">${enrollment.student_phone}</a></p>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Preferred Schedule</label>
                        <p style="margin: 0; color: #1F2937;">${enrollment.preferred_schedule || 'Not specified'}</p>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Enrolled Date</label>
                        <p style="margin: 0; color: #1F2937;">${date}</p>
                    </div>
                </div>

                ${enrollment.message ? `
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Message</label>
                        <p style="margin: 0; padding: 1rem; background: #F9FAFB; border-radius: 8px; color: #1F2937;">${enrollment.message}</p>
                    </div>
                ` : ''}

                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; font-size: 0.875rem; color: #6B7280; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 600;">Account Status</label>
                    <p style="margin: 0; color: #1F2937;">${enrollment.has_account ? '✅ Account Created' : '⏳ No Account Yet'}</p>
                </div>

                <div style="display: flex; gap: 1rem; padding-top: 1rem; border-top: 2px solid #E5E7EB;">
                    ${enrollment.status === 'pending' && !enrollment.has_account ? `
                        <button onclick="createStudentAccount('${enrollment.id}')" class="btn-auth-primary" style="flex: 1;">
                            Create Student Account
                        </button>
                    ` : ''}
                    <button onclick="closeEnrollmentDetail()" class="btn-secondary-modal" style="flex: 1;">
                        Close
                    </button>
                </div>
            </div>
        `;

        modal.style.display = 'flex';

    } catch (error) {
        console.error('Error loading enrollment details:', error);
        alert('Error loading enrollment details. Please try again.');
    }
}

// Close enrollment detail modal
function closeEnrollmentDetail() {
    document.getElementById('enrollmentDetailModal').style.display = 'none';
}

// Create student account
async function createStudentAccount(enrollmentId) {
    // Open account creation modal
    openAccountCreationModal(enrollmentId);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('enrollmentDetailModal');
    if (event.target === modal) {
        closeEnrollmentDetail();
    }
});
