// Account Creation Logic — self-hosted Flask + PostgreSQL backend, not Supabase.
// The server generates the login username/password atomically (see
// backend/routes_enrollments.py:create_student_account) instead of the browser
// calling auth.signUp() directly, and emails the credentials to the student.

let currentEnrollmentData = null;

// Open Account Creation Modal
async function openAccountCreationModal(enrollmentId) {
    try {
        const response = await fetch(`${API_BASE}/admin/enrollments/${enrollmentId}`, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to load enrollment');
        const enrollment = await response.json();

        currentEnrollmentData = enrollment;

        // Populate student info (read-only)
        document.getElementById('accountStudentName').textContent = enrollment.student_name || 'N/A';
        document.getElementById('accountStudentEmail').textContent = enrollment.student_email || 'N/A';
        document.getElementById('accountStudentPhone').textContent = enrollment.student_phone || 'N/A';
        document.getElementById('accountCourseName').textContent = enrollment.course_name || 'N/A';
        document.getElementById('accountTrackName').textContent = enrollment.track || 'N/A';
        document.getElementById('accountSchedule').textContent = enrollment.preferred_schedule || 'Not specified';

        // Set hidden fields
        document.getElementById('enrollmentIdHidden').value = enrollmentId;

        // Set default start date to today
        document.getElementById('accessStartDate').value = new Date().toISOString().split('T')[0];

        // Show modal
        document.getElementById('accountCreationModal').style.display = 'flex';

    } catch (error) {
        console.error('Error loading enrollment:', error);
        alert('Error loading enrollment details. Please try again.');
    }
}

// Close Account Creation Modal
function closeAccountCreationModal() {
    document.getElementById('accountCreationModal').style.display = 'none';
    document.getElementById('accountCreationForm').reset();
    document.getElementById('accountCreationError').style.display = 'none';
    document.getElementById('accountCreationSuccess').style.display = 'none';
    currentEnrollmentData = null;
}

// Calculate End Date (client-side preview only — the server computes the
// authoritative end date the same way when the account is actually created)
function calculateEndDate() {
    const duration = parseInt(document.getElementById('accessDuration').value);
    const startDate = document.getElementById('accessStartDate').value;

    if (duration && startDate) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setMonth(end.getMonth() + duration);

        document.getElementById('accessEndDate').value = end.toISOString().split('T')[0];
    }
}

// Handle Account Creation Form Submission
// Uses event delegation on `document` because the modal (and its form) is
// injected asynchronously via fetch() *after* DOMContentLoaded has already
// fired, so a direct listener on the form element would silently never attach.
document.addEventListener('submit', async function(e) {
    if (e.target.id !== 'accountCreationForm') return;

    const form = e.target;
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;

    const errorDiv = document.getElementById('accountCreationError');
    const successDiv = document.getElementById('accountCreationSuccess');
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    try {
        const enrollmentId = document.getElementById('enrollmentIdHidden').value;
        const duration = parseInt(document.getElementById('accessDuration').value);
        const startDate = document.getElementById('accessStartDate').value;
        const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
        const paymentStatus = document.getElementById('paymentStatus').value;

        const response = await fetch(`${API_BASE}/admin/enrollments/${enrollmentId}/create-account`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_duration_months: duration,
                access_start_date: startDate,
                payment_amount: paymentAmount,
                payment_status: paymentStatus
            })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Failed to create account');

        const personalEmail = currentEnrollmentData ? currentEnrollmentData.student_email : '';

        successDiv.innerHTML = `
            <strong>✅ Account Created Successfully!</strong><br>
            <br>
            <strong>Login Credentials:</strong><br>
            Username: ${result.username}<br>
            Password: ${result.password}<br>
            Access: ${result.access_start_date} to ${result.access_end_date}<br>
            <br>
            <strong>Note:</strong> These credentials have also been emailed to ${personalEmail}.
        `;
        successDiv.style.display = 'block';

        // Reset form after a few seconds and close modal
        setTimeout(() => {
            closeAccountCreationModal();
            // Refresh enrollments table
            if (typeof loadEnrollments === 'function') {
                loadEnrollments();
            }
        }, 5000);

    } catch (error) {
        console.error('Account creation error:', error);
        errorDiv.textContent = error.message || 'Failed to create account. Please try again.';
        errorDiv.style.display = 'block';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('accountCreationModal');
    if (event.target === modal) {
        closeAccountCreationModal();
    }
});
