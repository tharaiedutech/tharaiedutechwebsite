// Manage Job Postings - THARAI EduTech Admin
// Talks to the self-hosted Flask + PostgreSQL backend (see backend/), not Supabase.

const loginSection = document.getElementById('adminLoginSection');
const jobsManageSection = document.getElementById('jobsManageSection');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginError = document.getElementById('adminLoginError');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const jobsTableBody = document.getElementById('jobsTableBody');
const jobsEmptyState = document.getElementById('jobsEmptyState');

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

function showLoggedIn() {
    loginSection.style.display = 'none';
    jobsManageSection.style.display = 'block';
    loadJobs();
}

function showLoggedOut() {
    loginSection.style.display = 'block';
    jobsManageSection.style.display = 'none';
}

async function checkAdminSession() {
    try {
        const response = await fetch(`${API_BASE}/auth/session`, { credentials: 'include' });
        const data = await response.json();
        data.account_type === 'staff' ? showLoggedIn() : showLoggedOut();
    } catch (error) {
        console.error('Error checking admin session:', error);
        showLoggedOut();
    }
}

adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    adminLoginError.style.display = 'none';

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Login failed');

        if (result.account_type !== 'staff') {
            await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
            throw new Error('This account does not have staff access.');
        }

        adminLoginForm.reset();
        showLoggedIn();
    } catch (error) {
        adminLoginError.textContent = error.message;
        adminLoginError.style.display = 'block';
    }
});

adminLogoutBtn.addEventListener('click', async () => {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
    showLoggedOut();
});

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDeadline(dateStr) {
    if (!dateStr) return 'No deadline';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Flask serializes date columns as RFC 1123 ("Wed, 30 Sep 2026 00:00:00 GMT"),
// but <input type="date"> requires a strict YYYY-MM-DD value.
function toDateInputValue(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().split('T')[0];
}

function renderJobRow(job) {
    const statusClass = job.is_active ? 'active' : 'pending';
    const statusLabel = job.is_active ? 'Active' : 'Inactive';
    const toggleLabel = job.is_active ? 'Deactivate' : 'Activate';
    const deadlineValue = toDateInputValue(job.application_deadline);

    return `
        <tr>
            <td>${escapeHtml(job.job_title)}</td>
            <td>${escapeHtml(job.job_category)}</td>
            <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
            <td>${job.applications_count}</td>
            <td>${formatDate(job.created_at)}</td>
            <td>
                <span id="deadlineText-${job.id}">${formatDeadline(job.application_deadline)}</span>
                <div id="deadlineEdit-${job.id}" style="display:none; margin-top:4px;">
                    <input type="date" id="deadlineInput-${job.id}" value="${deadlineValue}">
                    <button class="btn-action primary" onclick="saveDeadline('${job.id}')">Save</button>
                    <button class="btn-action secondary" onclick="cancelDeadlineEdit('${job.id}')">Cancel</button>
                </div>
                <div>
                    <button class="btn-action secondary" id="deadlineEditBtn-${job.id}" onclick="toggleDeadlineEdit('${job.id}')">Extend</button>
                </div>
            </td>
            <td>
                <button class="btn-action secondary" onclick="viewApplicants('${job.id}', '${escapeHtml(job.job_title).replace(/'/g, "\\'")}')">Applicants</button>
                <button class="btn-action primary" onclick="toggleJobActive('${job.id}', ${job.is_active})">${toggleLabel}</button>
                <button class="btn-action secondary" onclick="deleteJob('${job.id}', '${escapeHtml(job.job_title).replace(/'/g, "\\'")}')">Delete</button>
            </td>
        </tr>
    `;
}

function toggleDeadlineEdit(jobId) {
    document.getElementById(`deadlineEdit-${jobId}`).style.display = 'block';
    document.getElementById(`deadlineEditBtn-${jobId}`).style.display = 'none';
}

function cancelDeadlineEdit(jobId) {
    document.getElementById(`deadlineEdit-${jobId}`).style.display = 'none';
    document.getElementById(`deadlineEditBtn-${jobId}`).style.display = 'inline-block';
}

async function saveDeadline(jobId) {
    const newDeadline = document.getElementById(`deadlineInput-${jobId}`).value;

    try {
        const response = await fetch(`${API_BASE}/admin/jobs/${jobId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ application_deadline: newDeadline || null })
        });
        if (!response.ok) throw new Error('Failed to update deadline');
        loadJobs();
    } catch (error) {
        console.error('Error updating deadline:', error);
        alert('Failed to update deadline.');
    }
}

async function loadJobs() {
    try {
        const response = await fetch(`${API_BASE}/admin/jobs`, { credentials: 'include' });
        if (response.status === 401) {
            showLoggedOut();
            return;
        }
        const jobs = await response.json();

        if (jobs.length === 0) {
            jobsTableBody.innerHTML = '';
            jobsEmptyState.style.display = 'block';
            return;
        }

        jobsEmptyState.style.display = 'none';
        jobsTableBody.innerHTML = jobs.map(renderJobRow).join('');
    } catch (error) {
        console.error('Error loading jobs:', error);
        alert('Failed to load jobs. Please refresh the page.');
    }
}

async function toggleJobActive(jobId, currentlyActive) {
    try {
        const response = await fetch(`${API_BASE}/admin/jobs/${jobId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_active: !currentlyActive })
        });
        if (!response.ok) throw new Error('Failed to update job');
        loadJobs();
    } catch (error) {
        console.error('Error toggling job:', error);
        alert('Failed to update job status.');
    }
}

async function deleteJob(jobId, jobTitle) {
    if (!confirm(`Delete "${jobTitle}"? This also removes its applications. This cannot be undone.`)) return;

    try {
        const response = await fetch(`${API_BASE}/admin/jobs/${jobId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to delete job');
        loadJobs();
    } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job.');
    }
}

async function viewApplicants(jobId, jobTitle) {
    document.getElementById('applicantsModalTitle').textContent = `Applicants: ${jobTitle}`;
    const listEl = document.getElementById('applicantsList');
    listEl.innerHTML = '<p>Loading…</p>';
    document.getElementById('applicantsModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';

    try {
        const response = await fetch(`${API_BASE}/admin/jobs/${jobId}/applications`, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to load applicants');
        const applicants = await response.json();

        if (applicants.length === 0) {
            listEl.innerHTML = '<p>No applications yet for this role.</p>';
            return;
        }

        listEl.innerHTML = applicants.map(app => `
            <div style="border-bottom: 1px solid #E5E7EB; padding: 1rem 0;">
                <strong>${escapeHtml(app.applicant_name)}</strong>
                <div style="color: #6B7280; font-size: 0.9rem; margin: 0.25rem 0;">
                    ${escapeHtml(app.applicant_email)} &middot; ${escapeHtml(app.applicant_phone)} &middot; ${formatDate(app.applied_at)}
                </div>
                ${app.cover_letter ? `<p style="margin: 0.5rem 0; color: #374151;">${escapeHtml(app.cover_letter)}</p>` : ''}
                <a class="btn-action primary" style="display: inline-block; text-decoration: none;"
                   href="${API_BASE}/admin/applications/${app.id}/resume" target="_blank" rel="noopener">
                   📄 Download Resume (${escapeHtml(app.resume_original_name)})
                </a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading applicants:', error);
        listEl.innerHTML = '<p>Failed to load applicants.</p>';
    }
}

function closeApplicantsModal() {
    document.getElementById('applicantsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('applicantsModal').addEventListener('click', (e) => {
    if (e.target.id === 'applicantsModal') closeApplicantsModal();
});

checkAdminSession();
