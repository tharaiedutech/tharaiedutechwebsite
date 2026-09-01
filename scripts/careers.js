// THARAI EduTech — Careers page: dynamic job listings + apply flow
// Talks to the self-hosted Flask + PostgreSQL backend (see backend/), not Supabase.

const DEPARTMENT_ICONS = {
    'ai-ml': '🤖',
    'data-science': '📈',
    'fullstack': '🌐',
    'cloud-devops': '☁️',
    'salesforce': '💼',
    'database': '💾',
    'cybersecurity': '🔒',
    'mobile': '📱',
    'general': '🏢'
};

const EMPLOYMENT_TYPE_LABELS = {
    'full-time': 'Full-Time',
    'part-time': 'Part-Time',
    'contract': 'Contract',
    'freelance': 'Freelance',
    'internship': 'Internship'
};

const WORK_MODE_LABELS = {
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site'
};

let currentJobs = [];

function departmentIcon(department) {
    return DEPARTMENT_ICONS[department] || '💼';
}

function formatEmploymentType(type) {
    return EMPLOYMENT_TYPE_LABELS[type] || type;
}

function formatLocation(job) {
    const modeLabel = WORK_MODE_LABELS[job.work_mode] || job.work_mode;
    if (job.location && job.location !== 'Remote') {
        return `📍 ${modeLabel} — ${job.location}`;
    }
    return `📍 ${modeLabel}`;
}

function formatExperience(job) {
    if (job.max_experience) {
        return `💼 ${job.min_experience}-${job.max_experience} years experience`;
    }
    return `💼 ${job.min_experience}+ years experience`;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

function renderJobCard(job) {
    const requirements = (job.requirements || [])
        .map(req => `<li>${escapeHtml(req)}</li>`)
        .join('');

    return `
        <div class="job-card">
            <div class="job-header">
                <div class="job-badge">${escapeHtml(formatEmploymentType(job.employment_type))}</div>
                <div class="job-icon">${departmentIcon(job.department)}</div>
            </div>
            <h3>${escapeHtml(job.job_title)}</h3>
            <div class="job-location">${formatLocation(job)}</div>
            <div class="job-experience">${formatExperience(job)}</div>
            <p class="job-description">${escapeHtml(job.short_description)}</p>
            <ul class="job-requirements">${requirements}</ul>
            <button type="button" class="job-apply-btn" onclick="openApplyModal('${job.id}')">Apply Now →</button>
        </div>
    `;
}

async function loadJobs() {
    const grid = document.getElementById('jobOpeningsGrid');

    try {
        const response = await fetch(`${API_BASE}/jobs`);
        if (!response.ok) throw new Error('Failed to load jobs');

        currentJobs = await response.json();

        if (currentJobs.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <p>No open positions right now. Check back soon, or email your resume to
                    <a href="mailto:tharaiedutech@gmail.com">tharaiedutech@gmail.com</a>.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = currentJobs.map(renderJobCard).join('');
    } catch (error) {
        console.error('Error loading jobs:', error);
        grid.innerHTML = `
            <div class="empty-state">
                <p>Couldn't load job openings right now. Please refresh the page or try again later.</p>
            </div>
        `;
    }
}

function openApplyModal(jobId) {
    const job = currentJobs.find(j => j.id === jobId);
    if (!job) return;

    const form = document.getElementById('applyJobForm');
    form.reset();
    form.dataset.jobId = jobId;

    document.getElementById('applyModalJobTitle').textContent = `Apply: ${job.job_title}`;
    document.getElementById('applyError').style.display = 'none';

    document.getElementById('applyJobModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeApplyModal() {
    document.getElementById('applyJobModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showApplicationSuccess(jobTitle) {
    const successModal = document.createElement('div');
    successModal.className = 'auth-modal';
    successModal.style.display = 'flex';
    successModal.innerHTML = `
        <div class="auth-modal-content" style="max-width: 480px; text-align: center; padding: 3rem 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h2 style="margin-bottom: 1rem;">Application Submitted!</h2>
            <p style="color: #6B7280;">Thanks for applying to <strong>${escapeHtml(jobTitle)}</strong>. Our team will review your application and get back to you soon.</p>
        </div>
    `;
    document.body.appendChild(successModal);

    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) successModal.remove();
    });

    setTimeout(() => successModal.remove(), 8000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadJobs();

    document.getElementById('applyJobModal').addEventListener('click', (e) => {
        if (e.target.id === 'applyJobModal') closeApplyModal();
    });

    document.getElementById('applyJobForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const jobId = form.dataset.jobId;
        const job = currentJobs.find(j => j.id === jobId);
        const submitBtn = document.getElementById('applySubmitBtn');
        const errorBox = document.getElementById('applyError');

        errorBox.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const formData = new FormData(form);
            const response = await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to submit application');

            closeApplyModal();
            showApplicationSuccess(job ? job.job_title : 'this role');
        } catch (error) {
            console.error('Error submitting application:', error);
            errorBox.textContent = error.message;
            errorBox.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
        }
    });
});
