// ============================================
// COLLEGE MANAGEMENT SYSTEM - LAYOUT
// ============================================

const Layout = {
  sidebar(role = 'student', currentPage = 'dashboard') {
    const menu = this.getSidebarMenu(role);
    return `
      <aside class="app-sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <div class="sidebar-logo-icon">V</div>
            <div class="sidebar-logo-text">PESITM<small>Management System</small></div>
          </div>
        </div>
        <nav class="sidebar-nav">
          ${menu.map(sec => `
            <div class="sidebar-section">
              <div class="sidebar-section-title">${sec.title}</div>
              <div class="sidebar-menu">
                ${sec.items.map(item => `
                  <a href="#" class="sidebar-item ${currentPage === item.page ? 'active' : ''}" 
                     data-page="${item.page}" onclick="App.navigate('${item.page}'); App.closeSidebar();">
                    <span class="material-symbols-outlined">${item.icon}</span>${item.label}
                    ${item.badge ? `<span class="sidebar-item-badge">${item.badge}</span>` : ''}
                  </a>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <button class="btn btn-ghost" style="width:100%" onclick="App.logout()">
            <span class="material-symbols-outlined">logout</span>Logout
          </button>
        </div>
      </aside>
    `;
  },

  getSidebarMenu(role) {
    const main = [{ title: 'Main', items: [{ page: 'dashboard', icon: 'dashboard', label: 'Dashboard' }] }];
    if (role === 'admin') {
      return [...main,
      {
        title: 'People', items: [
          { page: 'students', icon: 'school', label: 'Students' },
          { page: 'faculty', icon: 'person', label: 'Faculty' },
          { page: 'parents', icon: 'family_restroom', label: 'Parents' }
        ]
      },
      {
        title: 'Academics', items: [
          { page: 'programs', icon: 'menu_book', label: 'Programs & Batches' },
          { page: 'subjects', icon: 'library_books', label: 'Subjects' },
          { page: 'course-offerings', icon: 'class', label: 'Course Offerings' },
          { page: 'timetable', icon: 'calendar_month', label: 'Timetable' }
        ]
      },
      {
        title: 'Assessments', items: [
          { page: 'attendance', icon: 'fact_check', label: 'Attendance' },
          { page: 'exams', icon: 'quiz', label: 'Exams & Marks' },
          { page: 'assignments', icon: 'assignment', label: 'Assignments' },
          { page: 'resources', icon: 'folder', label: 'Resources' }
        ]
      },
      {
        title: 'Communication', items: [
          { page: 'announcements', icon: 'campaign', label: 'Announcements' },
          { page: 'calendar', icon: 'event', label: 'Academic Calendar' }
        ]
      },
      { title: 'System', items: [{ page: 'settings', icon: 'settings', label: 'Settings' }] }
      ];
    } else if (role === 'faculty') {
      return [...main,
      {
        title: 'Teaching', items: [
          { page: 'timetable', icon: 'calendar_month', label: 'My Timetable' },
          { page: 'attendance', icon: 'fact_check', label: 'Attendance', badge: '2' },
          { page: 'students', icon: 'school', label: 'My Students' }
        ]
      },
      {
        title: 'Assessments', items: [
          { page: 'exams', icon: 'quiz', label: 'Exams & Marks' },
          { page: 'assignments', icon: 'assignment', label: 'Assignments' },
          { page: 'resources', icon: 'folder', label: 'Resources' }
        ]
      },
      {
        title: 'Communication', items: [
          { page: 'announcements', icon: 'campaign', label: 'Announcements' },
          { page: 'calendar', icon: 'event', label: 'Calendar' }
        ]
      },
      { title: 'Account', items: [{ page: 'settings', icon: 'settings', label: 'Settings' }] }
      ];
    }
    return [...main,
    {
      title: 'Academic', items: [
        { page: 'timetable', icon: 'calendar_month', label: 'My Timetable' },
        { page: 'attendance', icon: 'fact_check', label: 'My Attendance' },
        { page: 'exams', icon: 'quiz', label: 'Exams & Marks' }
      ]
    },
    {
      title: 'Learning', items: [
        { page: 'assignments', icon: 'assignment', label: 'Assignments', badge: '2' },
        { page: 'resources', icon: 'folder', label: 'Resources' }
      ]
    },
    {
      title: 'Updates', items: [
        { page: 'announcements', icon: 'campaign', label: 'Announcements' },
        { page: 'calendar', icon: 'event', label: 'Calendar' }
      ]
    },
    { title: 'Account', items: [{ page: 'settings', icon: 'settings', label: 'Settings' }] }
    ];
  },

  appBar(user, pageTitle) {
    const unread = Data.getUnreadNotifications(user?.id || 0).length;
    return `
      <header class="app-header">
        <div class="appbar">
          <div class="appbar-left">
            <button class="appbar-icon-btn menu-toggle" onclick="App.toggleSidebar()">
              <span class="material-symbols-outlined">menu</span>
            </button>
            <h1 class="appbar-title">${pageTitle}</h1>
          </div>
          <div class="appbar-right">
            <button class="appbar-icon-btn" onclick="App.toggleNotifications()">
              <span class="material-symbols-outlined">notifications</span>
              ${unread > 0 ? `<span class="badge">${unread}</span>` : ''}
            </button>
            <button class="appbar-icon-btn" onclick="App.navigate('settings')">
              <span class="material-symbols-outlined">settings</span>
            </button>
            <div class="appbar-user dropdown" onclick="App.toggleDropdown(this)">
              ${Components.avatar({ name: user?.name || 'User', size: 'sm' })}
              <div class="appbar-user-info hide-mobile">
                <div class="appbar-user-name">${user?.name || 'User'}</div>
                <div class="appbar-user-role">${App.capitalizeFirst(user?.role || 'Guest')}</div>
              </div>
              <div class="dropdown-menu">
                <div class="dropdown-item" onclick="App.navigate('settings')">
                  <span class="material-symbols-outlined">person</span>Profile
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item" onclick="App.logout()">
                  <span class="material-symbols-outlined">logout</span>Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  notificationsPanel(userId) {
    const notifs = Data.notifications.filter(n => n.user_id === userId).slice(0, 5);
    return `
      <div class="modal-overlay" id="notifications-panel">
        <div class="modal" style="position:fixed;top:70px;right:20px;width:380px;max-width:calc(100vw - 40px);">
          <div class="modal-header">
            <h3 class="modal-title">Notifications</h3>
            <button class="modal-close" onclick="App.closeModal('notifications-panel')">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modal-body" style="padding:0;max-height:400px;overflow-y:auto;">
            ${notifs.length === 0 ? `<div class="empty-state" style="padding:40px"><p style="color:var(--text-muted)">No notifications</p></div>` :
        notifs.map(n => Components.notificationItem({
          id: n.id, title: n.title, message: n.message, time: n.created_at,
          icon: n.type === 'assignment' ? 'assignment' : n.type === 'exam' ? 'quiz' : 'campaign',
          read: !!n.read_at
        })).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

window.Layout = Layout;
