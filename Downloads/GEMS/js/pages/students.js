// ============================================
// PAGES - STUDENTS
// ============================================

Pages.students = function (params = {}) {
    const students = Data.students;
    return `
    ${Components.breadcrumbs([{ label: 'Students' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Students</h2>
        <p class="page-subtitle">Manage all students in the institution</p>
      </div>
      <button class="btn btn-primary" onclick="App.openDrawer('add-student-drawer')">
        <span class="material-symbols-outlined">add</span>Add Student
      </button>
    </div>
    <div class="card">
      <div class="table-actions">
        ${Components.searchInput({ placeholder: 'Search students...', onSearch: 'Pages.filterStudents(this.value)' })}
        <div class="table-filters">
          <select class="form-select" style="width:auto" onchange="Pages.filterByProgram(this.value)">
            <option value="">All Programs</option>
            ${Data.programs.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
          <select class="form-select" style="width:auto">
            <option value="">All Sections</option>
            ${Data.sections.map(s => `<option value="${s.id}">Section ${s.name}</option>`).join('')}
          </select>
        </div>
      </div>
      ${Components.table({
        columns: [
            { key: 'usn', label: 'USN', sortable: true },
            { key: 'name', label: 'Name', sortable: true, render: (v, row) => `<div class="flex items-center gap-3">${Components.avatar({ name: v, size: 'sm' })}<span>${v}</span></div>` },
            { key: 'program', label: 'Program', render: (v, row) => Data.getProgramName(Data.getBatchInfo(row.batch_id)?.program?.id) || '-' },
            { key: 'batch_id', label: 'Batch', render: (v) => { const b = Data.batches.find(x => x.id === v); return b ? `${b.start_year}-${b.end_year}` : '-'; } },
            { key: 'section_id', label: 'Section', render: (v) => Data.sections.find(s => s.id === v)?.name || '-' },
            { key: 'mentor_id', label: 'Mentor', render: (v) => Data.faculty.find(f => f.id === v)?.name || '-' },
            { key: 'is_active', label: 'Status', render: (v) => Components.chip({ text: v ? 'Active' : 'Inactive', type: v ? 'success' : 'neutral' }) }
        ],
        data: students,
        onRowClick: 'Pages.viewStudent'
    })}
      ${Components.pagination({ currentPage: 1, totalPages: 1 })}
    </div>
    ${this.addStudentDrawer()}
  `;
};

Pages.viewStudent = function (id) {
    App.navigate('student-detail', { id });
};

Pages.studentDetail = function (params) {
    const student = Data.students.find(s => s.id === params.id) || Data.students[0];
    const batch = Data.getBatchInfo(student.batch_id);
    const section = Data.sections.find(s => s.id === student.section_id);
    const mentor = Data.faculty.find(f => f.id === student.mentor_id);
    const att = Data.getStudentAttendanceSummary(student.id);

    return `
    ${Components.breadcrumbs([
        { label: 'Students', onClick: "App.navigate('students')" },
        { label: student.name }
    ])}
    <div class="detail-view">
      <div class="detail-header">
        <div class="detail-avatar">${Components.getInitials(student.name)}</div>
        <div class="detail-info">
          <h2 class="detail-name">${student.name}</h2>
          <div class="detail-meta">
            <div class="detail-meta-item"><span class="material-symbols-outlined">badge</span>${student.usn}</div>
            <div class="detail-meta-item"><span class="material-symbols-outlined">email</span>${student.email}</div>
            <div class="detail-meta-item"><span class="material-symbols-outlined">phone</span>${student.phone}</div>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-secondary"><span class="material-symbols-outlined">edit</span>Edit</button>
        </div>
      </div>

      ${Components.tabs({
        tabs: [
            { label: 'Profile', icon: 'person' },
            { label: 'Academics', icon: 'school' },
            { label: 'Attendance', icon: 'fact_check' },
            { label: 'Marks', icon: 'grade' },
            { label: 'Assignments', icon: 'assignment' }
        ]
    })}

      <div class="tab-panel active">
        <div class="card"><div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><div class="detail-label">Full Name</div><div class="detail-value">${student.name}</div></div>
            <div class="detail-field"><div class="detail-label">USN</div><div class="detail-value">${student.usn}</div></div>
            <div class="detail-field"><div class="detail-label">Email</div><div class="detail-value">${student.email}</div></div>
            <div class="detail-field"><div class="detail-label">Phone</div><div class="detail-value">${student.phone}</div></div>
            <div class="detail-field"><div class="detail-label">Gender</div><div class="detail-value">${student.gender}</div></div>
            <div class="detail-field"><div class="detail-label">Date of Birth</div><div class="detail-value">${Components.formatDate(student.dob)}</div></div>
            <div class="detail-field"><div class="detail-label">Admission Year</div><div class="detail-value">${student.admission_year}</div></div>
            <div class="detail-field"><div class="detail-label">Mentor</div><div class="detail-value">${mentor?.name || '-'}</div></div>
          </div>
        </div></div>
      </div>

      <div class="tab-panel">
        <div class="card"><div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><div class="detail-label">Program</div><div class="detail-value">${batch?.program?.name || '-'}</div></div>
            <div class="detail-field"><div class="detail-label">Batch</div><div class="detail-value">${batch?.start_year}-${batch?.end_year || ''}</div></div>
            <div class="detail-field"><div class="detail-label">Section</div><div class="detail-value">${section?.name || '-'}</div></div>
            <div class="detail-field"><div class="detail-label">Current Semester</div><div class="detail-value">3</div></div>
          </div>
        </div></div>
      </div>

      <div class="tab-panel">
        <div class="card"><div class="card-body">
          <div class="flex items-center gap-6 mb-6">
            ${Components.progressRing({ value: att.percentage, max: 100, size: 100 })}
            <div><div style="font-size:var(--text-lg);font-weight:var(--font-semibold)">${att.percentage}% Attendance</div>
            <div style="color:var(--text-secondary)">${att.present} present out of ${att.total} classes</div></div>
          </div>
        </div></div>
      </div>

      <div class="tab-panel"><div class="card"><div class="card-body"><p>Marks will be displayed here</p></div></div></div>
      <div class="tab-panel"><div class="card"><div class="card-body"><p>Assignments will be displayed here</p></div></div></div>
    </div>
  `;
};

Pages.addStudentDrawer = function () {
    return Components.drawer({
        id: 'add-student-drawer',
        title: 'Add New Student',
        content: `
      <form>
        ${Components.formInput({ label: 'Full Name', name: 'name', required: true })}
        ${Components.formInput({ label: 'USN', name: 'usn', required: true })}
        ${Components.formInput({ label: 'Email', name: 'email', type: 'email', required: true })}
        ${Components.formInput({ label: 'Phone', name: 'phone', type: 'tel' })}
        ${Components.formSelect({ label: 'Gender', name: 'gender', options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }] })}
        ${Components.formInput({ label: 'Date of Birth', name: 'dob', type: 'date' })}
        ${Components.formSelect({ label: 'Program', name: 'program', options: Data.programs.map(p => ({ value: p.id, label: p.name })) })}
        ${Components.formSelect({ label: 'Section', name: 'section', options: Data.sections.map(s => ({ value: s.id, label: 'Section ' + s.name })) })}
      </form>
    `,
        footer: `<button class="btn btn-ghost" onclick="App.closeDrawer('add-student-drawer')">Cancel</button>
             <button class="btn btn-primary">Save Student</button>`
    });
};

Pages.filterStudents = function (query) { console.log('Filter:', query); };
Pages.filterByProgram = function (progId) { console.log('Program:', progId); };
