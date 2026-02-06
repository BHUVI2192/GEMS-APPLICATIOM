// ============================================
// COLLEGE MANAGEMENT SYSTEM - MAIN APP
// ============================================

const App = {
    currentPage: 'login',
    currentUser: null,
    sidebarOpen: false,

    init() {
        const storedUser = localStorage.getItem('cms_user');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            Data.currentUser = this.currentUser;
            this.navigate('dashboard');
        } else {
            this.navigate('login');
        }
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { this.closeAllModals(); this.closeSidebar(); }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) this.closeSidebar();
        });
    },

    navigate(page, params = {}) {
        this.currentPage = page;
        const appRoot = document.getElementById('app');
        if (page === 'login') {
            appRoot.innerHTML = Pages.login();
        } else {
            appRoot.innerHTML = this.renderLayout(page, params);
        }
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
        window.scrollTo(0, 0);
    },

    renderLayout(page, params) {
        return `
      <div class="app">
        ${Layout.sidebar(this.currentUser?.role, this.currentPage)}
        <div class="sidebar-overlay" onclick="App.closeSidebar()"></div>
        <main class="app-main">
          ${Layout.appBar(this.currentUser, this.getPageTitle())}
          <div class="app-content">${this.getPageContent(page, params)}</div>
        </main>
      </div>
      ${Layout.notificationsPanel(this.currentUser?.id)}
    `;
    },

    getPageContent(page, params) {
        const routes = {
            dashboard: () => Pages.dashboard(),
            students: () => Pages.students(params),
            'student-detail': () => Pages.studentDetail(params),
            faculty: () => Pages.faculty(params),
            parents: () => Pages.parents(),
            programs: () => Pages.programs(),
            subjects: () => Pages.subjects(),
            'course-offerings': () => Pages.courseOfferings(),
            timetable: () => Pages.timetable(params),
            attendance: () => Pages.attendance(params),
            exams: () => Pages.exams(),
            assignments: () => Pages.assignments(),
            resources: () => Pages.resources(),
            announcements: () => Pages.announcements(),
            calendar: () => Pages.calendar(),
            settings: () => Pages.settings()
        };
        return routes[page] ? routes[page]() : Pages.dashboard();
    },

    getPageTitle() {
        const titles = {
            dashboard: 'Dashboard', students: 'Students', faculty: 'Faculty', parents: 'Parents',
            programs: 'Programs & Batches', subjects: 'Subjects', 'course-offerings': 'Course Offerings',
            timetable: 'Timetable', attendance: 'Attendance', exams: 'Exams & Marks',
            assignments: 'Assignments', resources: 'Resources', announcements: 'Announcements',
            calendar: 'Academic Calendar', settings: 'Settings'
        };
        return titles[this.currentPage] || 'Dashboard';
    },

    login(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = Data.users.find(u => u.username === username && u.password === password);
        if (user) {
            let profile = { ...user };
            if (user.role === 'faculty') {
                const f = Data.faculty.find(f => f.user_id === user.id);
                if (f) profile = { ...profile, ...f };
            } else if (user.role === 'student') {
                const s = Data.students.find(s => s.user_id === user.id);
                if (s) profile = { ...profile, ...s };
            } else { profile.name = 'Administrator'; }
            this.currentUser = profile;
            Data.currentUser = profile;
            localStorage.setItem('cms_user', JSON.stringify(profile));
            this.navigate('dashboard');
        } else {
            document.getElementById('login-error').classList.remove('hidden');
        }
    },

    logout() {
        this.currentUser = null; Data.currentUser = null;
        localStorage.removeItem('cms_user');
        this.navigate('login');
    },

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        document.getElementById('sidebar')?.classList.toggle('open', this.sidebarOpen);
        document.querySelector('.sidebar-overlay')?.classList.toggle('active', this.sidebarOpen);
    },

    closeSidebar() {
        this.sidebarOpen = false;
        document.getElementById('sidebar')?.classList.remove('open');
        document.querySelector('.sidebar-overlay')?.classList.remove('active');
    },

    toggleDropdown(el) { event.stopPropagation(); el.classList.toggle('active'); },
    toggleNotifications() { document.getElementById('notifications-panel')?.classList.toggle('active'); },
    openModal(id) { document.getElementById(id)?.classList.add('active'); },
    closeModal(id) { document.getElementById(id)?.classList.remove('active'); },
    closeAllModals() { document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active')); },
    openDrawer(id) { document.getElementById(id)?.classList.add('active'); document.getElementById(id + '-overlay')?.classList.add('active'); },
    closeDrawer(id) { document.getElementById(id)?.classList.remove('active'); document.getElementById(id + '-overlay')?.classList.remove('active'); },
    switchTab(idx) {
        document.querySelectorAll('.tab-item').forEach((t, i) => t.classList.toggle('active', i === idx));
        document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
    },
    capitalizeFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
