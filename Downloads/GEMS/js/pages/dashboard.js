// ============================================
// PAGES - LOGIN & DASHBOARD
// ============================================

const Pages = {
  // Login Page
  login() {
    return `
      <div class="login-page">
        <div class="login-card">
          <div class="login-logo">
            <div class="login-logo-icon"><span class="material-symbols-outlined">school</span></div>
            <h1 class="login-title">PESITM</h1>
            <p class="login-subtitle">Management System</p>
          </div>
          <form class="login-form" onsubmit="App.login(event)">
            <div class="form-group">
              <label class="form-label" for="username">Username</label>
              <input type="text" id="username" class="form-input" placeholder="Enter username" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input type="password" id="password" class="form-input" placeholder="Enter password" required>
            </div>
            <div id="login-error" class="hidden" style="color:var(--danger);font-size:var(--text-sm);margin-bottom:var(--space-4)">
              Invalid username or password
            </div>
            <button type="submit" class="btn btn-primary btn-lg">Login</button>
          </form>
          <div class="login-divider">Demo Credentials</div>
          <div class="login-demo">
            <div class="login-demo-item"><span>Admin:</span><strong>admin_demo / admin123</strong></div>
            <div class="login-demo-item"><span>Faculty:</span><strong>faculty_demo / faculty123</strong></div>
            <div class="login-demo-item"><span>Student:</span><strong>student_demo / student123</strong></div>
          </div>
        </div>
      </div>
    `;
  },

  // Dashboard
  dashboard() {
    const role = App.currentUser?.role || 'student';
    if (role === 'admin') return this.adminDashboard();
    if (role === 'faculty') return this.facultyDashboard();
    return this.studentDashboard();
  },

  adminDashboard() {
    return `
      ${Components.breadcrumbs([{ label: 'Dashboard' }])}
      <div class="dashboard-grid cols-4">
        ${Components.kpiCard({ icon: 'school', value: Data.students.length, label: 'Total Students' })}
        ${Components.kpiCard({ icon: 'person', value: Data.faculty.length, label: 'Total Faculty' })}
        ${Components.kpiCard({ icon: 'menu_book', value: Data.programs.filter(p => p.is_active).length, label: 'Active Programs' })}
        ${Components.kpiCard({ icon: 'event', value: Data.classSessions.filter(s => s.session_date === '2026-02-06').length, label: "Today's Classes" })}
      </div>
      <div class="dashboard-row two-thirds mt-6">
        ${Components.card({ title: "Today's Schedule", content: this.renderTodaySchedule() })}
        ${Components.card({ title: 'Upcoming Exams', content: this.renderUpcomingExams() })}
      </div>
      <div class="mt-6">
        ${Components.card({ title: 'Recent Announcements', content: this.renderRecentAnnouncements() })}
      </div>
    `;
  },

  facultyDashboard() {
    const faculty = Data.faculty.find(f => f.user_id === App.currentUser?.id);
    const myCOs = Data.courseOfferings.filter(co => co.faculty_id === faculty?.id);
    return `
      ${Components.breadcrumbs([{ label: 'Dashboard' }])}
      <div class="dashboard-grid cols-4">
        ${Components.kpiCard({ icon: 'class', value: myCOs.length, label: 'My Courses' })}
        ${Components.kpiCard({ icon: 'event', value: 3, label: "Today's Classes" })}
        ${Components.kpiCard({ icon: 'pending_actions', value: 2, label: 'Pending Attendance' })}
        ${Components.kpiCard({ icon: 'assignment', value: Data.assignments.filter(a => a.created_by === faculty?.id).length, label: 'Active Assignments' })}
      </div>
      <div class="mt-6">
        ${Components.card({
      title: 'Quick Actions', content: `
          <div class="quick-actions">
            ${Components.quickActionBtn({ icon: 'fact_check', label: 'Mark Attendance', onClick: "App.navigate('attendance')" })}
            ${Components.quickActionBtn({ icon: 'add_task', label: 'Create Assignment', onClick: "App.openModal('add-assignment-modal')" })}
            ${Components.quickActionBtn({ icon: 'campaign', label: 'Post Announcement', onClick: "App.openModal('add-announcement-modal')" })}
            ${Components.quickActionBtn({ icon: 'upload_file', label: 'Upload Resource', onClick: "App.navigate('resources')" })}
          </div>
        `})}
      </div>
      <div class="dashboard-row half mt-6">
        ${Components.card({ title: "Today's Classes", content: this.renderTodaySchedule() })}
        ${Components.card({ title: 'Upcoming Exams', content: this.renderUpcomingExams() })}
      </div>
    `;
  },

  studentDashboard() {
    const student = Data.students.find(s => s.user_id === App.currentUser?.id);
    const att = Data.getStudentAttendanceSummary(student?.id || 1);
    return `
      ${Components.breadcrumbs([{ label: 'Dashboard' }])}
      <div class="dashboard-grid cols-4">
        <div class="kpi-card" style="justify-content:center">
          ${Components.progressRing({ value: att.percentage, max: 100, size: 100 })}
          <div class="kpi-content" style="margin-left:var(--space-4)">
            <div class="kpi-label">Attendance</div>
            <div style="font-size:var(--text-sm);color:var(--text-secondary)">${att.present}/${att.total} classes</div>
          </div>
        </div>
        ${Components.kpiCard({ icon: 'assignment', value: 2, label: 'Pending Assignments' })}
        ${Components.kpiCard({ icon: 'quiz', value: 1, label: 'Upcoming Exams' })}
        ${Components.kpiCard({ icon: 'campaign', value: Data.announcements.length, label: 'Announcements' })}
      </div>
      <div class="dashboard-row half mt-6">
        ${Components.card({ title: "Today's Timetable", content: this.renderTodaySchedule() })}
        ${Components.card({
      title: 'Upcoming', content: `
          <h5 style="margin-bottom:var(--space-3)">Assignments</h5>
          ${Data.assignments.slice(0, 2).map(a => {
        const subj = Data.subjects.find(s => s.id === Data.courseOfferings.find(co => co.id === a.course_offering_id)?.subject_id);
        return Components.assignmentCard({ id: a.id, subject: subj?.name || '', title: a.title, dueDate: a.due_date, status: 'pending', maxMarks: a.max_marks });
      }).join('')}
          <h5 style="margin:var(--space-4) 0 var(--space-3)">Exams</h5>
          ${this.renderUpcomingExams()}
        `})}
      </div>
      <div class="mt-6">${Components.card({ title: 'Announcements', content: this.renderRecentAnnouncements() })}</div>
    `;
  },

  renderTodaySchedule() {
    const sessions = [
      { subject: 'Data Structures', faculty: 'Dr. Rajesh Kumar', room: 'CSE-101', startTime: '09:00', endTime: '10:00', status: 'completed' },
      { subject: 'DBMS', faculty: 'Dr. Sunita Sharma', room: 'CSE-102', startTime: '10:00', endTime: '11:00', status: 'ongoing' },
      { subject: 'Operating Systems', faculty: 'Prof. Sanjay Patel', room: 'CSE-103', startTime: '11:15', endTime: '12:15', status: 'upcoming' }
    ];
    return sessions.map(s => Components.scheduleItem(s)).join('');
  },

  renderUpcomingExams() {
    return Data.exams.slice(0, 3).map(e => {
      const co = Data.getCourseOfferingDetails(e.course_offering_id);
      const d = new Date(e.exam_date);
      return `<div class="exam-item">
        <div class="exam-date"><div class="exam-date-day">${d.getDate()}</div><div class="exam-date-month">${d.toLocaleString('en', { month: 'short' })}</div></div>
        <div class="exam-info"><div class="exam-subject">${co?.subject?.name || ''}</div><div class="exam-type">${Data.examTypes.find(t => t.id === e.exam_type_id)?.name || ''}</div></div>
      </div>`;
    }).join('');
  },

  renderRecentAnnouncements() {
    return `<div class="grid gap-4" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">
      ${Data.announcements.slice(0, 4).map(a => {
      const author = Data.faculty.find(f => f.id === a.created_by)?.name || 'Admin';
      return Components.announcementCard({ id: a.id, author, date: a.created_at, title: a.title, content: a.message, tags: [a.target_type] });
    }).join('')}
    </div>`;
  }
};

window.Pages = Pages;
