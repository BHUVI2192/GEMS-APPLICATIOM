// ============================================
// PAGES - PROGRAMS & SUBJECTS
// ============================================

Pages.programs = function () {
    return `
    ${Components.breadcrumbs([{ label: 'Programs & Batches' }])}
    <div class="page-header">
      <h2 class="page-title">Programs & Batches</h2>
      <p class="page-subtitle">Manage academic programs and batches</p>
    </div>
    <div class="grid gap-6" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
      ${Data.programs.filter(p => p.is_active).map(p => {
        const dept = Data.departments.find(d => d.id === p.department_id);
        const batches = Data.batches.filter(b => b.program_id === p.id);
        const students = Data.students.filter(s => batches.some(b => b.id === s.batch_id));
        return `
          <div class="program-card" onclick="Pages.viewProgramBatches(${p.id})">
            <div class="program-header">
              <div>
                <div class="program-name">${p.name}</div>
                <div class="program-code">${p.code} • ${dept?.name || ''}</div>
              </div>
              ${Components.chip({ text: p.is_active ? 'Active' : 'Inactive', type: p.is_active ? 'success' : 'neutral' })}
            </div>
            <div class="program-stats">
              <div class="program-stat"><div class="program-stat-value">${p.duration_years}</div><div class="program-stat-label">Years</div></div>
              <div class="program-stat"><div class="program-stat-value">${batches.length}</div><div class="program-stat-label">Batches</div></div>
              <div class="program-stat"><div class="program-stat-value">${students.length}</div><div class="program-stat-label">Students</div></div>
            </div>
          </div>
        `;
    }).join('')}
    </div>
    <div class="mt-8">
      <h3 class="page-title" style="font-size:var(--text-xl)">Batches</h3>
      <div class="card mt-4">
        ${Components.table({
        columns: [
            { key: 'id', label: 'Batch', render: (v, row) => `${row.start_year} - ${row.end_year}` },
            { key: 'program_id', label: 'Program', render: (v) => Data.programs.find(p => p.id === v)?.name || '-' },
            { key: 'sections', label: 'Sections', render: (v, row) => Data.sections.filter(s => s.batch_id === row.id).length },
            { key: 'students', label: 'Students', render: (v, row) => Data.students.filter(s => s.batch_id === row.id).length },
            { key: 'is_active', label: 'Status', render: (v) => Components.chip({ text: v ? 'Active' : 'Inactive', type: v ? 'success' : 'neutral' }) }
        ],
        data: Data.batches
    })}
      </div>
    </div>
  `;
};

Pages.viewProgramBatches = function (progId) { console.log('View program:', progId); };

Pages.subjects = function () {
    return `
    ${Components.breadcrumbs([{ label: 'Subjects' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Subjects</h2>
        <p class="page-subtitle">Manage subjects across departments</p>
      </div>
      <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Add Subject</button>
    </div>
    <div class="card">
      <div class="table-actions">
        ${Components.searchInput({ placeholder: 'Search subjects...' })}
        <div class="table-filters">
          <select class="form-select" style="width:auto">
            <option value="">All Departments</option>
            ${Data.departments.map(d => `<option value="${d.id}">${d.code}</option>`).join('')}
          </select>
          <select class="form-select" style="width:auto">
            <option value="">All Semesters</option>
            ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `<option value="${s}">Semester ${s}</option>`).join('')}
          </select>
        </div>
      </div>
      ${Components.table({
        columns: [
            { key: 'code', label: 'Code', sortable: true },
            { key: 'name', label: 'Subject Name', sortable: true },
            { key: 'credits', label: 'Credits' },
            { key: 'semester', label: 'Semester' },
            { key: 'department_id', label: 'Department', render: (v) => Data.departments.find(d => d.id === v)?.code || '-' },
            { key: 'is_active', label: 'Status', render: (v) => Components.chip({ text: v ? 'Active' : 'Inactive', type: v ? 'success' : 'neutral' }) }
        ],
        data: Data.subjects
    })}
    </div>
  `;
};

Pages.courseOfferings = function () {
    return `
    ${Components.breadcrumbs([{ label: 'Course Offerings' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Course Offerings</h2>
        <p class="page-subtitle">Manage course offerings for the current semester</p>
      </div>
      <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Add Offering</button>
    </div>
    <div class="card">
      <div class="table-actions">
        ${Components.searchInput({ placeholder: 'Search...' })}
        <div class="table-filters">
          <select class="form-select" style="width:auto">
            <option value="">2024-25</option>
          </select>
          <select class="form-select" style="width:auto">
            <option value="">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="3">Semester 3</option>
          </select>
        </div>
      </div>
      ${Components.table({
        columns: [
            { key: 'subject_id', label: 'Subject', render: (v) => Data.subjects.find(s => s.id === v)?.name || '-' },
            { key: 'batch_id', label: 'Batch', render: (v) => { const b = Data.batches.find(x => x.id === v); return b ? `${b.start_year}-${b.end_year}` : '-'; } },
            { key: 'section_id', label: 'Section', render: (v) => Data.sections.find(s => s.id === v)?.name || '-' },
            { key: 'faculty_id', label: 'Faculty', render: (v) => Data.faculty.find(f => f.id === v)?.name || '-' },
            { key: 'academic_year', label: 'Year' },
            { key: 'semester', label: 'Sem' }
        ],
        data: Data.courseOfferings
    })}
    </div>
  `;
};
