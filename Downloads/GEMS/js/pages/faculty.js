// ============================================
// PAGES - FACULTY
// ============================================

Pages.faculty = function (params = {}) {
    return `
    ${Components.breadcrumbs([{ label: 'Faculty' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Faculty</h2>
        <p class="page-subtitle">Manage faculty members</p>
      </div>
      <button class="btn btn-primary" onclick="App.openDrawer('add-faculty-drawer')">
        <span class="material-symbols-outlined">add</span>Add Faculty
      </button>
    </div>
    <div class="card">
      <div class="table-actions">
        ${Components.searchInput({ placeholder: 'Search faculty...' })}
        <div class="table-filters">
          <select class="form-select" style="width:auto">
            <option value="">All Departments</option>
            ${Data.departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
          </select>
        </div>
      </div>
      ${Components.table({
        columns: [
            { key: 'employee_code', label: 'Emp Code', sortable: true },
            { key: 'name', label: 'Name', sortable: true, render: (v) => `<div class="flex items-center gap-3">${Components.avatar({ name: v, size: 'sm' })}<span>${v}</span></div>` },
            { key: 'department_id', label: 'Department', render: (v) => Data.getDepartmentName(v) },
            { key: 'designation', label: 'Designation' },
            { key: 'subjects', label: 'Subjects', render: (v, row) => Data.courseOfferings.filter(co => co.faculty_id === row.id).length },
            { key: 'is_active', label: 'Status', render: (v) => Components.chip({ text: v ? 'Active' : 'Inactive', type: v ? 'success' : 'neutral' }) }
        ],
        data: Data.faculty,
        onRowClick: 'Pages.viewFaculty'
    })}
    </div>
    ${Components.drawer({
        id: 'add-faculty-drawer',
        title: 'Add New Faculty',
        content: `
        <form>
          ${Components.formInput({ label: 'Full Name', name: 'name', required: true })}
          ${Components.formInput({ label: 'Employee Code', name: 'emp_code', required: true })}
          ${Components.formInput({ label: 'Email', name: 'email', type: 'email', required: true })}
          ${Components.formInput({ label: 'Phone', name: 'phone', type: 'tel' })}
          ${Components.formSelect({ label: 'Department', name: 'dept', options: Data.departments.map(d => ({ value: d.id, label: d.name })) })}
          ${Components.formSelect({
            label: 'Designation', name: 'designation', options: [
                { value: 'Professor', label: 'Professor' },
                { value: 'Associate Professor', label: 'Associate Professor' },
                { value: 'Assistant Professor', label: 'Assistant Professor' }
            ]
        })}
        </form>
      `,
        footer: `<button class="btn btn-ghost" onclick="App.closeDrawer('add-faculty-drawer')">Cancel</button>
               <button class="btn btn-primary">Save Faculty</button>`
    })}
  `;
};

Pages.viewFaculty = function (id) { console.log('View faculty:', id); };

// ============================================
// PAGES - PARENTS
// ============================================

Pages.parents = function () {
    return `
    ${Components.breadcrumbs([{ label: 'Parents' }])}
    <div class="page-header flex justify-between items-center">
      <div>
        <h2 class="page-title">Parents</h2>
        <p class="page-subtitle">Manage parent/guardian information</p>
      </div>
      <button class="btn btn-primary"><span class="material-symbols-outlined">add</span>Add Parent</button>
    </div>
    <div class="card">
      ${Components.table({
        columns: [
            { key: 'name', label: 'Name', render: (v) => `<div class="flex items-center gap-3">${Components.avatar({ name: v, size: 'sm' })}<span>${v}</span></div>` },
            { key: 'occupation', label: 'Occupation' },
            { key: 'phone', label: 'Phone' },
            { key: 'email', label: 'Email' },
            {
                key: 'students', label: 'Students', render: (v, row) => {
                    const sp = Data.studentParents.filter(x => x.parent_id === row.id);
                    return sp.map(x => Data.students.find(s => s.id === x.student_id)?.name).join(', ') || '-';
                }
            }
        ],
        data: Data.parents
    })}
    </div>
  `;
};
