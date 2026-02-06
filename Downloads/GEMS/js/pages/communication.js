// ============================================
// PAGES - ANNOUNCEMENTS
// ============================================

Pages.announcements = function () {
    return `
    ${Components.breadcrumbs([{ label: 'Announcements' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Announcements</h2>
        <p class="page-subtitle">Campus news and updates</p>
      </div>
      ${App.currentUser?.role !== 'student' ? `<button class="btn btn-primary"><span class="material-symbols-outlined">add</span>New Announcement</button>` : ''}
    </div>
    <div class="table-filters mb-4">
      <select class="form-select" style="width:auto">
        <option value="">All Types</option>
        <option value="institution">Institution</option>
        <option value="department">Department</option>
        <option value="program">Program</option>
        <option value="section">Section</option>
      </select>
    </div>
    <div class="grid gap-4" style="grid-template-columns:repeat(auto-fill,minmax(400px,1fr))">
      ${Data.announcements.map(a => {
        const author = Data.faculty.find(f => f.id === a.created_by)?.name || 'Administrator';
        return Components.announcementCard({
            id: a.id, author, date: a.created_at, title: a.title, content: a.message, tags: [a.target_type]
        });
    }).join('')}
    </div>
  `;
};

// ============================================
// PAGES - ACADEMIC CALENDAR
// ============================================

Pages.calendar = function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = 1; // February (0-indexed)
    const currentYear = 2026;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const events = Data.calendarEvents.filter(e => e.date.startsWith('2026-02'));

    return `
    ${Components.breadcrumbs([{ label: 'Academic Calendar' }])}
    <div class="page-header">
      <h2 class="page-title">Academic Calendar</h2>
      <p class="page-subtitle">Important dates and events</p>
    </div>
    <div class="dashboard-row two-thirds">
      <div class="calendar">
        <div class="calendar-header">
          <div class="calendar-nav">
            <button class="btn btn-ghost btn-icon"><span class="material-symbols-outlined">chevron_left</span></button>
            <h3 class="calendar-title">${months[currentMonth]} ${currentYear}</h3>
            <button class="btn btn-ghost btn-icon"><span class="material-symbols-outlined">chevron_right</span></button>
          </div>
          <div class="table-filters">
            <select class="form-select" style="width:auto">
              <option>2024-25</option>
            </select>
            <select class="form-select" style="width:auto">
              <option>Even Semester</option>
            </select>
          </div>
        </div>
        <div class="calendar-grid">
          ${days.map(d => `<div class="calendar-day-header">${d}</div>`).join('')}
          ${Array(firstDay).fill().map(() => '<div class="calendar-day other-month"></div>').join('')}
          ${Array(daysInMonth).fill().map((_, i) => {
        const day = i + 1;
        const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
        const dayEvents = Data.calendarEvents.filter(e => e.date === dateStr);
        const isToday = day === 6;
        return `
              <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="calendar-day-number">${day}</div>
                ${dayEvents.map(e => `<div class="calendar-event ${e.type}">${e.title}</div>`).join('')}
              </div>
            `;
    }).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3 class="card-title">Upcoming Events</h3></div>
        <div class="card-body" style="padding:0">
          <div class="list">
            ${Data.calendarEvents.slice(0, 6).map(e => {
        const d = new Date(e.date);
        return `
                <div class="list-item">
                  <div class="exam-date">
                    <div class="exam-date-day">${d.getDate()}</div>
                    <div class="exam-date-month">${d.toLocaleString('en', { month: 'short' })}</div>
                  </div>
                  <div class="list-item-content">
                    <div class="list-item-title">${e.title}</div>
                    <div class="list-item-subtitle">${Components.chip({ text: e.type, type: e.type === 'exam' ? 'danger' : e.type === 'holiday' ? 'success' : 'primary' })}</div>
                  </div>
                </div>
              `;
    }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

// ============================================
// PAGES - SETTINGS
// ============================================

Pages.settings = function () {
    const user = App.currentUser || {};
    return `
    ${Components.breadcrumbs([{ label: 'Settings' }])}
    <div class="page-header">
      <h2 class="page-title">Profile & Settings</h2>
      <p class="page-subtitle">Manage your account</p>
    </div>
    <div class="dashboard-row half">
      <div class="card">
        <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
        <div class="card-body">
          <div class="flex items-center gap-6 mb-6">
            <div class="detail-avatar" style="width:80px;height:80px;font-size:var(--text-2xl)">${Components.getInitials(user.name || 'User')}</div>
            <div>
              <h3 style="margin-bottom:var(--space-1)">${user.name || 'User'}</h3>
              <p style="color:var(--text-secondary)">${App.capitalizeFirst(user.role || 'Guest')}</p>
            </div>
          </div>
          <form>
            ${Components.formInput({ label: 'Full Name', name: 'name', value: user.name || '' })}
            ${Components.formInput({ label: 'Email', name: 'email', type: 'email', value: user.email || '' })}
            ${Components.formInput({ label: 'Phone', name: 'phone', value: user.phone || '' })}
          </form>
        </div>
        <div class="card-footer flex justify-end">
          <button class="btn btn-primary">Save Changes</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3 class="card-title">Change Password</h3></div>
        <div class="card-body">
          <form>
            ${Components.formInput({ label: 'Current Password', name: 'current_password', type: 'password' })}
            ${Components.formInput({ label: 'New Password', name: 'new_password', type: 'password' })}
            ${Components.formInput({ label: 'Confirm Password', name: 'confirm_password', type: 'password' })}
          </form>
        </div>
        <div class="card-footer flex justify-end">
          <button class="btn btn-secondary">Update Password</button>
        </div>
      </div>
    </div>
  `;
};
