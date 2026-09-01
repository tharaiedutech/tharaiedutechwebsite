// Job Posting Form Handler - THARAI EduTech
// Talks to the self-hosted Flask + PostgreSQL backend (see backend/), not Supabase.

const TRACK_LABELS = {
    'ai-ml': 'AI & Machine Learning',
    'data-science': 'Data Science & ML',
    'analytics-bi': 'Data Analytics & BI',
    'data-engineering': 'Data Engineering',
    'cloud-devops': 'Cloud & DevOps',
    'fullstack': 'Full Stack Development',
    'salesforce': 'Salesforce',
    'automation': 'Automation & RPA',
    'programming': 'Programming',
    'mobile': 'Mobile App Development',
    'security': 'Cybersecurity',
    'design': 'UI/UX Design',
    'dsa': 'Data Structures & Algorithms',
    'ai-nocode': 'AI Tools (No-Code)',
    'databases': 'Databases & Data Management',
    'quantum': 'Quantum Computing',
    'general': 'General Administration',
};

// One content template per job category; {track} is substituted with the
// selected track's display name (or "the relevant domain" if not a track).
const CATEGORY_TEMPLATES = {
    trainer: (track) => ({
        short: `Deliver industry-relevant ${track} training to working professionals and career-switchers.`,
        about: `We're looking for an experienced ${track} trainer to design and deliver high-quality, hands-on training sessions for our students. You'll combine deep technical expertise with strong communication skills to help learners build real, job-ready skills in ${track}.`,
        responsibilities: [
            `Plan and deliver structured ${track} training sessions (online/hybrid)`,
            'Design hands-on projects, assignments, and assessments',
            'Mentor students through doubts, code reviews, and career guidance',
            'Keep course content updated with the latest industry practices',
            "Track students' progress and provide constructive feedback",
        ],
        requirements: [
            `Strong hands-on expertise in ${track}`,
            'Prior experience training, teaching, or mentoring (preferred)',
            'Excellent communication and presentation skills',
            'Ability to explain complex concepts in a simple, engaging way',
        ],
    }),
    content: (track) => ({
        short: `Create high-quality ${track} course content and learning material.`,
        about: `We're looking for a Content Developer to design curriculum, write course material, and build learning resources for our ${track} programs, ensuring content stays current, accurate, and engaging.`,
        responsibilities: [
            `Develop structured course content and curriculum for ${track}`,
            'Create assignments, quizzes, and hands-on project material',
            'Review and update existing content for accuracy and relevance',
            'Collaborate with trainers and subject-matter experts',
        ],
        requirements: [
            `Solid understanding of ${track} concepts and tools`,
            'Strong technical writing and instructional design skills',
            'Attention to detail and ability to simplify complex topics',
        ],
    }),
    marketing: (track) => ({
        short: `Drive marketing and enrollment growth for our ${track} programs.`,
        about: `We're looking for a Marketing & Sales professional to promote our ${track} courses, generate leads, and convert prospective students into enrolled learners.`,
        responsibilities: [
            `Plan and run marketing campaigns for ${track} courses`,
            'Generate and follow up on enrollment leads',
            'Work with the content team on promotional material',
            'Track campaign performance and enrollment conversion',
        ],
        requirements: [
            'Experience in digital marketing, sales, or ed-tech growth roles',
            'Strong communication and persuasion skills',
            'Comfort working with CRM/lead-tracking tools',
        ],
    }),
    operations: (track) => ({
        short: `Support day-to-day operations for our ${track} programs.`,
        about: `We're looking for an Operations professional to coordinate scheduling, student support, and logistics for our ${track} training programs.`,
        responsibilities: [
            'Coordinate class schedules, trainers, and student batches',
            'Handle student queries and support requests',
            'Maintain accurate records of enrollments and attendance',
            'Support smooth day-to-day program delivery',
        ],
        requirements: [
            'Strong organizational and coordination skills',
            'Comfort working with spreadsheets and admin tools',
            'Good communication skills',
        ],
    }),
    tech: (track) => ({
        short: `Build and maintain technology systems supporting our ${track} programs.`,
        about: `We're looking for a Technology/IT professional to build, maintain, and improve the systems and tools that power our ${track} programs and the wider platform.`,
        responsibilities: [
            'Develop and maintain internal tools and platform features',
            'Fix bugs and improve system reliability and performance',
            'Collaborate with the team on new feature requirements',
        ],
        requirements: [
            `Hands-on experience relevant to ${track}`,
            'Strong problem-solving and debugging skills',
            'Ability to work independently and ship reliably',
        ],
    }),
    admin: (track) => ({
        short: `Provide administrative support for the ${track} team.`,
        about: `We're looking for an Administration professional to provide day-to-day administrative support, keeping our ${track} team organized and running smoothly.`,
        responsibilities: [
            'Manage documentation, records, and correspondence',
            'Coordinate schedules and internal communication',
            'Support the team with general administrative tasks',
        ],
        requirements: [
            'Strong organizational skills and attention to detail',
            'Good written and verbal communication',
            'Proficiency with common office tools',
        ],
    }),
    other: (track) => ({
        short: `Join our team to support ${track}-related initiatives at THARAI EduTech.`,
        about: `We're looking for a motivated professional to contribute to our ${track} initiatives at THARAI EduTech.`,
        responsibilities: [
            'Contribute to the goals of the role as scoped by the team',
            'Collaborate with cross-functional teams',
        ],
        requirements: [
            'Relevant experience or skills for the role',
            'Good communication and teamwork',
        ],
    }),
};

const loginSection = document.getElementById('adminLoginSection');
const jobPostingSection = document.getElementById('jobPostingSection');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginError = document.getElementById('adminLoginError');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

function showLoggedIn() {
    loginSection.style.display = 'none';
    jobPostingSection.style.display = 'block';
}

function showLoggedOut() {
    loginSection.style.display = 'block';
    jobPostingSection.style.display = 'none';
}

async function checkAdminSession() {
    try {
        const response = await fetch(`${API_BASE}/auth/session`, { credentials: 'include' });
        const data = await response.json();
        if (data.account_type === 'staff') {
            showLoggedIn();
        } else {
            showLoggedOut();
        }
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

checkAdminSession();

// Form submission handler
document.getElementById('jobPostingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = '⏳ Posting...';

    try {
        // Collect form data
        const formData = new FormData(e.target);

        // Convert responsibilities and requirements to arrays
        const responsibilities = formData.get('responsibilities')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const requirements = formData.get('requirements')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const niceToHave = formData.get('nice_to_have')
            ? formData.get('nice_to_have').split('\n').map(line => line.trim()).filter(line => line.length > 0)
            : [];

        const benefits = formData.get('benefits')
            ? formData.get('benefits').split('\n').map(line => line.trim()).filter(line => line.length > 0)
            : [];

        // Handle custom department
        let department = formData.get('department');
        if (department === 'other') {
            const customDept = formData.get('custom_department');
            if (!customDept || customDept.trim() === '') {
                throw new Error('Please specify the custom department/domain');
            }
            department = customDept.trim();
        }

        // Prepare job data
        const jobData = {
            job_title: formData.get('job_title'),
            job_category: formData.get('job_category'),
            department: department,
            employment_type: formData.get('employment_type'),
            work_mode: formData.get('work_mode'),
            location: formData.get('location') || 'Remote',
            min_experience: parseInt(formData.get('min_experience')),
            max_experience: formData.get('max_experience') ? parseInt(formData.get('max_experience')) : null,
            education: formData.get('education'),
            certifications: formData.get('certifications') || null,
            short_description: formData.get('short_description'),
            about_role: formData.get('about_role'),
            responsibilities: responsibilities,
            requirements: requirements,
            nice_to_have: niceToHave,
            min_salary: formData.get('min_salary') ? parseInt(formData.get('min_salary')) : null,
            max_salary: formData.get('max_salary') ? parseInt(formData.get('max_salary')) : null,
            salary_negotiable: formData.get('salary_negotiable') === 'on',
            benefits: benefits,
            positions: parseInt(formData.get('positions')),
            application_deadline: formData.get('application_deadline') || null,
            contact_email: formData.get('contact_email'),
            is_active: formData.get('is_active') === 'on'
        };

        console.log('📝 Job data to save:', jobData);

        const response = await fetch(`${API_BASE}/admin/jobs`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });

        if (response.status === 401) {
            showLoggedOut();
            throw new Error('Your admin session expired. Please log in again.');
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to post job');

        console.log('✅ Job posted successfully:', data);

        // Show success message
        alert(`✅ Job posted successfully!\n\nTitle: ${jobData.job_title}\nCategory: ${jobData.job_category}\n\nThe job is now ${jobData.is_active ? 'live' : 'saved as draft'} on the careers page.`);

        // Reset form
        e.target.reset();

        // Redirect to careers page
        if (confirm('View the job posting on the careers page?')) {
            window.location.href = 'careers.html';
        }

    } catch (error) {
        console.error('❌ Error posting job:', error);
        alert(`❌ Failed to post job: ${error.message}\n\nPlease check the console for details.`);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '📤 Post Job Opening';
    }
});

// Experience validation
document.getElementById('minExperience').addEventListener('change', function() {
    const maxExp = document.getElementById('maxExperience');
    if (maxExp.value && parseInt(this.value) > parseInt(maxExp.value)) {
        alert('Minimum experience cannot be greater than maximum experience');
        this.value = '';
    }
});

document.getElementById('maxExperience').addEventListener('change', function() {
    const minExp = document.getElementById('minExperience');
    if (this.value && parseInt(minExp.value) > parseInt(this.value)) {
        alert('Maximum experience cannot be less than minimum experience');
        this.value = '';
    }
});

// Salary validation
document.getElementById('minSalary').addEventListener('change', function() {
    const maxSal = document.getElementById('maxSalary');
    if (maxSal.value && parseInt(this.value) > parseInt(maxSal.value)) {
        alert('Minimum salary cannot be greater than maximum salary');
        this.value = '';
    }
});

document.getElementById('maxSalary').addEventListener('change', function() {
    const minSal = document.getElementById('minSalary');
    if (this.value && parseInt(minSal.value) > parseInt(this.value)) {
        alert('Maximum salary cannot be less than minimum salary');
        this.value = '';
    }
});

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});

// Show/hide custom department field
document.getElementById('department').addEventListener('change', function() {
    const customDeptGroup = document.getElementById('customDepartmentGroup');
    const customDeptInput = document.getElementById('customDepartment');

    if (this.value === 'other') {
        customDeptGroup.style.display = 'block';
        customDeptInput.required = true;
    } else {
        customDeptGroup.style.display = 'none';
        customDeptInput.required = false;
        customDeptInput.value = '';
    }
});

// Auto-fill suggested description/responsibilities/requirements based on
// the selected Job Category + Track. Only overwrites fields the admin hasn't
// already typed into (or after explicit confirmation), so it's a starting
// point, not something that clobbers manual edits.
document.getElementById('autoFillBtn').addEventListener('click', function() {
    const category = document.getElementById('jobCategory').value;
    const departmentValue = document.getElementById('department').value;

    if (!category) {
        alert('Please select a Job Category first.');
        return;
    }
    if (!departmentValue || departmentValue === 'other') {
        alert('Please select a Track/Domain first (or choose a specific track instead of "Other").');
        return;
    }

    const templateFn = CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES.other;
    const trackLabel = TRACK_LABELS[departmentValue] || departmentValue;
    const template = templateFn(trackLabel);

    const shortDescEl = document.getElementById('shortDescription');
    const aboutRoleEl = document.getElementById('aboutRole');
    const responsibilitiesEl = document.getElementById('responsibilities');
    const requirementsEl = document.getElementById('requirements');

    const hasExistingContent = [shortDescEl, aboutRoleEl, responsibilitiesEl, requirementsEl]
        .some(el => el.value.trim().length > 0);

    if (hasExistingContent && !confirm('This will replace the description, responsibilities, and requirements you\'ve already entered. Continue?')) {
        return;
    }

    const jobTitleEl = document.getElementById('jobTitle');
    if (!jobTitleEl.value.trim()) {
        jobTitleEl.value = `${trackLabel} Trainer`.length <= 100 && category === 'trainer'
            ? `${trackLabel} Trainer`
            : jobTitleEl.value;
    }

    shortDescEl.value = template.short;
    aboutRoleEl.value = template.about;
    responsibilitiesEl.value = template.responsibilities.join('\n');
    requirementsEl.value = template.requirements.join('\n');

    // Trigger the auto-resize listeners already wired on textareas
    [shortDescEl, aboutRoleEl, responsibilitiesEl, requirementsEl].forEach(el => {
        el.dispatchEvent(new Event('input'));
    });
});

console.log('✅ Job Posting Form initialized');
