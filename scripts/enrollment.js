// Course Enrollment Modal Logic — self-hosted Flask/Postgres backend + FormSubmit email notification

let selectedCourseData = {
    courseName: '',
    trackName: '',
    courseIcon: ''
};

// Open Course Enrollment Modal
function openCourseEnrollmentModal(courseName, trackName, courseIcon = '📚') {
    selectedCourseData = { courseName, trackName, courseIcon };

    const modal = document.getElementById('courseEnrollmentModal');
    const courseInfo = document.getElementById('selectedCourseInfo');
    const form = document.getElementById('courseEnrollmentForm');

    // Display selected course info
    courseInfo.innerHTML = `
        <h3><span class="course-icon">${courseIcon}</span>${courseName}</h3>
        <p><strong>Track:</strong> ${trackName}</p>
    `;

    // Set hidden fields
    document.getElementById('enrollCourseHidden').value = courseName;
    document.getElementById('enrollTrackHidden').value = trackName;

    // CRITICAL FIX: Force text colors using JavaScript
    setTimeout(() => {
        // Fix all labels
        const labels = modal.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = 'rgb(0, 0, 0)';
            label.style.fontWeight = '700';
            label.style.opacity = '1';
        });

        // Fix all selects
        const selects = modal.querySelectorAll('select');
        selects.forEach(select => {
            select.style.color = 'rgb(0, 0, 0)';
            select.style.fontWeight = '600';
            select.style.opacity = '1';
        });

        // Fix all options
        const options = modal.querySelectorAll('option');
        options.forEach(option => {
            option.style.color = 'rgb(0, 0, 0)';
            option.style.fontWeight = '600';
            option.style.opacity = '1';
        });

        // Fix checkbox label span
        const checkboxSpan = modal.querySelector('.checkbox-label span');
        if (checkboxSpan) {
            checkboxSpan.style.color = 'rgb(0, 0, 0)';
            checkboxSpan.style.fontWeight = '700';
            checkboxSpan.style.opacity = '1';
        }

        // Fix textarea
        const textarea = modal.querySelector('textarea');
        if (textarea) {
            textarea.style.color = 'rgb(0, 0, 0)';
            textarea.style.opacity = '1';
        }
    }, 100);

    form.reset();
    document.getElementById('enrollCourseHidden').value = courseName;
    document.getElementById('enrollTrackHidden').value = trackName;

    modal.style.display = 'flex';
}

// Close Course Enrollment Modal
function closeCourseEnrollmentModal() {
    const modal = document.getElementById('courseEnrollmentModal');
    modal.style.display = 'none';
    document.getElementById('courseEnrollmentForm').reset();
    document.getElementById('enrollmentError').style.display = 'none';
}

// Handle Form Submission - Export function to be called after form loads
window.attachEnrollmentFormListener = function(enrollmentForm) {
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = enrollmentForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            document.getElementById('enrollmentError').style.display = 'none';

            const formData = {
                course_name: document.getElementById('enrollCourseHidden').value,
                track: document.getElementById('enrollTrackHidden').value,
                student_name: document.getElementById('enrollFullName').value,
                student_email: document.getElementById('enrollEmailAddress').value,
                student_phone: document.getElementById('enrollPhoneNumber').value,
                mode_of_study: document.getElementById('modeOfStudy').value,
                preferred_schedule: document.getElementById('preferredSchedule').value,
                message: document.getElementById('enrollMessage').value
            };

            try {
                const response = await fetch(`${API_BASE}/enrollments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to save enrollment');

                // Also submit to FormSubmit for email notification to THARAI staff
                const formSubmitData = new FormData(enrollmentForm);
                await fetch(enrollmentForm.action, {
                    method: 'POST',
                    body: formSubmitData,
                    headers: { 'Accept': 'application/json' }
                });

                closeCourseEnrollmentModal();

                showEnrollmentSuccess(
                    '🎉 Enrollment Request Submitted!',
                    `Thank you for your interest in "${selectedCourseData.courseName}"! We'll contact you within 24 hours to discuss schedule, fees, and next steps.`
                );

            } catch (error) {
                console.error('Enrollment error:', error);
                const errorDiv = document.getElementById('enrollmentError');
                errorDiv.textContent = `Error: ${error.message}. Please check your internet connection and try again.`;
                errorDiv.style.display = 'block';
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
};

// Success Message Display
function showEnrollmentSuccess(title, message) {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'auth-modal';
    successModal.style.display = 'flex';
    successModal.innerHTML = `
        <div class="auth-modal-content" style="max-width: 500px;">
            <div class="auth-modal-body" style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h2 style="color: #10B981; margin-bottom: 1rem;">${title}</h2>
                <p style="color: #6B7280; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">${message}</p>
                <button onclick="this.closest('.auth-modal').remove()" class="btn-auth-primary" style="width: auto; padding: 1rem 2rem;">
                    Got it!
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(successModal);

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (successModal.parentNode) {
            successModal.remove();
        }
    }, 10000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('courseEnrollmentModal');
    if (modal && event.target === modal) {
        closeCourseEnrollmentModal();
    }
});
