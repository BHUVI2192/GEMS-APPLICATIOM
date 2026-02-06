// ============================================
// COLLEGE MANAGEMENT SYSTEM - COMPONENTS
// ============================================

const Components = {
    // Generate initials from name
    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    },

    // Format date
    formatDate(dateStr, format = 'short') {
        const date = new Date(dateStr);
        if (format === 'short') {
            return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        } else if (format === 'long') {
            return date.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
        } else if (format === 'relative') {
            const now = new Date();
            const diff = now - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            if (days === 0) return 'Today';
            if (days === 1) return 'Yesterday';
            if (days < 7) return `${days} days ago`;
            return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        }
        return dateStr;
    },

    // Format time
    formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${minutes} ${ampm}`;
    },

    // KPI Card
    kpiCard({ icon, value, label, trend = null, trendDirection = 'up' }) {
        return `
      <div class="kpi-card">
        <div class="kpi-icon">
          <span class="material-symbols-outlined">${icon}</span>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">${value}</div>
          <div class="kpi-label">${label}</div>
          ${trend ? `<div class="kpi-trend ${trendDirection}">${trend}</div>` : ''}
        </div>
      </div>
    `;
    },

    // Card
    card({ title = '', actions = '', content = '', footer = '', className = '' }) {
        return `
      <div class="card ${className}">
        ${title || actions ? `
          <div class="card-header">
            ${title ? `<h3 class="card-title">${title}</h3>` : ''}
            ${actions ? `<div class="card-actions">${actions}</div>` : ''}
          </div>
        ` : ''}
        <div class="card-body">${content}</div>
        ${footer ? `<div class="card-footer">${footer}</div>` : ''}
      </div>
    `;
    },

    // Button
    btn({ text, icon = '', type = 'primary', size = '', onClick = '', className = '', disabled = false }) {
        const iconHtml = icon ? `<span class="material-symbols-outlined">${icon}</span>` : '';
        return `
      <button class="btn btn-${type} ${size ? 'btn-' + size : ''} ${className}" ${onClick ? `onclick="${onClick}"` : ''} ${disabled ? 'disabled' : ''}>
        ${iconHtml}${text}
      </button>
    `;
    },

    // Avatar
    avatar({ name, photo = null, size = 'md' }) {
        if (photo) {
            return `<div class="avatar avatar-${size}"><img src="${photo}" alt="${name}"></div>`;
        }
        return `<div class="avatar avatar-${size}">${this.getInitials(name)}</div>`;
    },

    // Chip/Badge
    chip({ text, type = 'primary' }) {
        return `<span class="chip chip-${type}">${text}</span>`;
    },

    // Breadcrumbs
    breadcrumbs(items) {
        return `
      <nav class="breadcrumbs">
        ${items.map((item, index) => `
          <span class="breadcrumb-item ${index === items.length - 1 ? 'active' : ''}">
            ${index > 0 ? '<span class="breadcrumb-separator">/</span>' : ''}
            ${index === items.length - 1 ? item.label : `<a href="#" onclick="${item.onClick || ''}">${item.label}</a>`}
          </span>
        `).join('')}
      </nav>
    `;
    },

    // Table
    table({ columns, data, actions = null, onRowClick = null }) {
        return `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              ${columns.map(col => `<th ${col.sortable ? 'class="sortable"' : ''}>${col.label}</th>`).join('')}
              ${actions ? '<th>Actions</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${data.length === 0 ? `
              <tr><td colspan="${columns.length + (actions ? 1 : 0)}" class="text-center text-muted p-6">No data available</td></tr>
            ` : data.map((row, idx) => `
              <tr ${onRowClick ? `onclick="${onRowClick}(${row.id})" style="cursor:pointer"` : ''}>
                ${columns.map(col => `<td>${col.render ? col.render(row[col.key], row) : row[col.key] || '-'}</td>`).join('')}
                ${actions ? `<td>${actions(row)}</td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    },

    // Form Input
    formInput({ label, name, type = 'text', value = '', placeholder = '', required = false, error = '', helpText = '' }) {
        return `
      <div class="form-group">
        <label class="form-label ${required ? 'required' : ''}" for="${name}">${label}</label>
        <input 
          type="${type}" 
          id="${name}" 
          name="${name}" 
          class="form-input ${error ? 'error' : ''}" 
          value="${value}" 
          placeholder="${placeholder}"
          ${required ? 'required' : ''}
        >
        ${helpText ? `<div class="form-helper">${helpText}</div>` : ''}
        ${error ? `<div class="form-error">${error}</div>` : ''}
      </div>
    `;
    },

    // Form Select
    formSelect({ label, name, options, value = '', required = false, placeholder = 'Select...' }) {
        return `
      <div class="form-group">
        <label class="form-label ${required ? 'required' : ''}" for="${name}">${label}</label>
        <select id="${name}" name="${name}" class="form-select" ${required ? 'required' : ''}>
          <option value="">${placeholder}</option>
          ${options.map(opt => `<option value="${opt.value}" ${opt.value == value ? 'selected' : ''}>${opt.label}</option>`).join('')}
        </select>
      </div>
    `;
    },

    // Search Input
    searchInput({ placeholder = 'Search...', onSearch = '' }) {
        return `
      <div class="input-wrapper table-search">
        <span class="material-symbols-outlined input-icon">search</span>
        <input type="text" class="form-input" placeholder="${placeholder}" oninput="${onSearch}">
      </div>
    `;
    },

    // Tabs
    tabs({ tabs, activeTab = 0, onTabChange = 'App.switchTab' }) {
        return `
      <div class="tab-bar">
        ${tabs.map((tab, idx) => `
          <button class="tab-item ${idx === activeTab ? 'active' : ''}" onclick="${onTabChange}(${idx})">
            ${tab.icon ? `<span class="material-symbols-outlined">${tab.icon}</span>` : ''}
            ${tab.label}
          </button>
        `).join('')}
      </div>
    `;
    },

    // Modal
    modal({ id, title, content, footer = '', size = '' }) {
        return `
      <div class="modal-overlay" id="${id}">
        <div class="modal ${size ? 'modal-' + size : ''}">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="App.closeModal('${id}')">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modal-body">${content}</div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    `;
    },

    // Drawer
    drawer({ id, title, content, footer = '' }) {
        return `
      <div class="drawer-overlay" id="${id}-overlay" onclick="App.closeDrawer('${id}')"></div>
      <div class="drawer" id="${id}">
        <div class="drawer-header">
          <h3 class="drawer-title">${title}</h3>
          <button class="modal-close" onclick="App.closeDrawer('${id}')">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="drawer-body">${content}</div>
        ${footer ? `<div class="drawer-footer">${footer}</div>` : ''}
      </div>
    `;
    },

    // Empty State
    emptyState({ icon = 'inbox', title, text, action = null }) {
        return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <span class="material-symbols-outlined">${icon}</span>
        </div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-text">${text}</p>
        ${action ? action : ''}
      </div>
    `;
    },

    // Progress Bar
    progressBar({ value, max = 100, type = '' }) {
        const percentage = (value / max) * 100;
        return `
      <div class="progress">
        <div class="progress-bar ${type}" style="width: ${percentage}%"></div>
      </div>
    `;
    },

    // Progress Ring
    progressRing({ value, max = 100, size = 120, strokeWidth = 8 }) {
        const percentage = (value / max) * 100;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return `
      <div class="progress-ring">
        <svg width="${size}" height="${size}">
          <circle class="progress-ring-bg" cx="${size / 2}" cy="${size / 2}" r="${radius}" 
            fill="none" stroke-width="${strokeWidth}"/>
          <circle class="progress-ring-value" cx="${size / 2}" cy="${size / 2}" r="${radius}" 
            fill="none" stroke-width="${strokeWidth}" 
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <span class="progress-ring-text">${Math.round(percentage)}%</span>
      </div>
    `;
    },

    // Notification Item
    notificationItem({ id, title, message, time, icon = 'notifications', read = false }) {
        return `
      <div class="notification-item ${read ? '' : 'unread'}" onclick="App.markNotificationRead(${id})">
        <div class="notification-icon">
          <span class="material-symbols-outlined">${icon}</span>
        </div>
        <div class="notification-content">
          <div class="notification-title">${title}</div>
          <div class="notification-text">${message}</div>
          <div class="notification-time">${this.formatDate(time, 'relative')}</div>
        </div>
      </div>
    `;
    },

    // Schedule Item
    scheduleItem({ subject, faculty, room, startTime, endTime, status = 'upcoming' }) {
        return `
      <div class="schedule-item">
        <div class="schedule-time">
          <div class="schedule-time-start">${this.formatTime(startTime)}</div>
          <div class="schedule-time-end">${this.formatTime(endTime)}</div>
        </div>
        <div class="schedule-divider"></div>
        <div class="schedule-info">
          <div class="schedule-subject">${subject}</div>
          <div class="schedule-details">${faculty} • ${room}</div>
        </div>
        <span class="schedule-status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </div>
    `;
    },

    // Announcement Card
    announcementCard({ id, author, date, title, content, tags = [] }) {
        return `
      <div class="announcement-card" onclick="App.viewAnnouncement(${id})">
        <div class="announcement-header">
          ${this.avatar({ name: author, size: 'sm' })}
          <div class="announcement-meta">
            <div class="announcement-author">${author}</div>
            <div class="announcement-date">${this.formatDate(date, 'relative')}</div>
          </div>
        </div>
        <h4 class="announcement-title">${title}</h4>
        <p class="announcement-content">${content.substring(0, 150)}${content.length > 150 ? '...' : ''}</p>
        ${tags.length > 0 ? `
          <div class="announcement-tags">
            ${tags.map(tag => this.chip({ text: tag, type: 'neutral' })).join('')}
          </div>
        ` : ''}
      </div>
    `;
    },

    // Assignment Card
    assignmentCard({ id, subject, title, dueDate, status = 'pending', maxMarks }) {
        const now = new Date();
        const due = new Date(dueDate);
        const isOverdue = due < now && status === 'pending';

        return `
      <div class="assignment-card ${isOverdue ? 'urgent' : ''} ${status === 'submitted' ? 'completed' : ''}">
        <div class="assignment-header">
          <div>
            <div class="assignment-subject">${subject}</div>
            <div class="assignment-title">${title}</div>
          </div>
          ${this.chip({ text: status.charAt(0).toUpperCase() + status.slice(1), type: status === 'submitted' ? 'success' : (isOverdue ? 'danger' : 'warning') })}
        </div>
        <div class="assignment-footer">
          <div class="assignment-due ${isOverdue ? 'overdue' : ''}">
            <span class="material-symbols-outlined">schedule</span>
            Due: ${this.formatDate(dueDate)}
          </div>
          <div class="assignment-stats">Max Marks: ${maxMarks}</div>
        </div>
      </div>
    `;
    },

    // Quick Action Button
    quickActionBtn({ icon, label, onClick }) {
        return `
      <button class="quick-action-btn" onclick="${onClick}">
        <div class="quick-action-icon">
          <span class="material-symbols-outlined">${icon}</span>
        </div>
        <span class="quick-action-label">${label}</span>
      </button>
    `;
    },

    // Pagination
    pagination({ currentPage = 1, totalPages = 1, onPageChange = 'App.changePage' }) {
        return `
      <div class="table-pagination">
        <span>Page ${currentPage} of ${totalPages}</span>
        <div class="pagination-controls">
          <button ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChange}(${currentPage - 1})">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChange}(${currentPage + 1})">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    `;
    }
};

// Export for use
window.Components = Components;
