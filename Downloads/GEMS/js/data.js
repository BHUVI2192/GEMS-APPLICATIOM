// ============================================
// COLLEGE MANAGEMENT SYSTEM - DUMMY DATA
// ============================================

const Data = {
  // Current user (set after login)
  currentUser: null,

  // Institution
  institution: {
    id: 1,
    name: "PESITM College of Engineering",
    code: "VCE",
    address: "123 Technology Park, Bangalore, Karnataka 560001",
    phone: "+91 80 1234 5678",
    email: "info@pesitm.edu.in",
    website: "www.pesitm.edu.in"
  },

  // Departments
  departments: [
    { id: 1, name: "Computer Science & Engineering", code: "CSE", is_active: true },
    { id: 2, name: "Electronics & Communication Engineering", code: "ECE", is_active: true },
    { id: 3, name: "Mechanical Engineering", code: "ME", is_active: true }
  ],

  // Programs
  programs: [
    { id: 1, department_id: 1, name: "B.Tech Computer Science & Engineering", code: "BTCSE", duration_years: 4, is_active: true },
    { id: 2, department_id: 1, name: "M.Tech Computer Science", code: "MTCSE", duration_years: 2, is_active: true },
    { id: 3, department_id: 2, name: "B.Tech Electronics & Communication", code: "BTECE", duration_years: 4, is_active: true },
    { id: 4, department_id: 3, name: "B.Tech Mechanical Engineering", code: "BTME", duration_years: 4, is_active: true }
  ],

  // Batches
  batches: [
    { id: 1, program_id: 1, start_year: 2023, end_year: 2027, is_active: true },
    { id: 2, program_id: 1, start_year: 2024, end_year: 2028, is_active: true },
    { id: 3, program_id: 2, start_year: 2024, end_year: 2026, is_active: true },
    { id: 4, program_id: 3, start_year: 2023, end_year: 2027, is_active: true },
    { id: 5, program_id: 4, start_year: 2024, end_year: 2028, is_active: true }
  ],

  // Sections
  sections: [
    { id: 1, batch_id: 1, name: "A", max_strength: 60 },
    { id: 2, batch_id: 1, name: "B", max_strength: 60 },
    { id: 3, batch_id: 1, name: "C", max_strength: 60 },
    { id: 4, batch_id: 2, name: "A", max_strength: 60 },
    { id: 5, batch_id: 2, name: "B", max_strength: 60 },
    { id: 6, batch_id: 3, name: "A", max_strength: 30 },
    { id: 7, batch_id: 4, name: "A", max_strength: 60 },
    { id: 8, batch_id: 5, name: "A", max_strength: 60 }
  ],

  // Users
  users: [
    { id: 1, username: "admin_demo", password: "admin123", email: "admin@pesitm.edu.in", phone: "9876543210", role: "admin", is_active: true },
    { id: 2, username: "faculty_demo", password: "faculty123", email: "faculty@pesitm.edu.in", phone: "9876543211", role: "faculty", is_active: true },
    { id: 3, username: "student_demo", password: "student123", email: "student@pesitm.edu.in", phone: "9876543212", role: "student", is_active: true }
  ],

  // Students
  students: [
    { id: 1, user_id: 3, usn: "1VE23CS001", name: "Aarav Kumar", email: "aarav.kumar@pesitm.edu.in", phone: "9876543001", gender: "Male", dob: "2005-03-15", admission_year: 2023, batch_id: 1, section_id: 1, mentor_id: 1, is_active: true, photo: null },
    { id: 2, user_id: null, usn: "1VE23CS002", name: "Priya Sharma", email: "priya.sharma@pesitm.edu.in", phone: "9876543002", gender: "Female", dob: "2005-07-22", admission_year: 2023, batch_id: 1, section_id: 1, mentor_id: 1, is_active: true, photo: null },
    { id: 3, user_id: null, usn: "1VE23CS003", name: "Rahul Verma", email: "rahul.verma@pesitm.edu.in", phone: "9876543003", gender: "Male", dob: "2005-01-10", admission_year: 2023, batch_id: 1, section_id: 1, mentor_id: 2, is_active: true, photo: null },
    { id: 4, user_id: null, usn: "1VE23CS004", name: "Sneha Patel", email: "sneha.patel@pesitm.edu.in", phone: "9876543004", gender: "Female", dob: "2005-05-18", admission_year: 2023, batch_id: 1, section_id: 2, mentor_id: 2, is_active: true, photo: null },
    { id: 5, user_id: null, usn: "1VE23CS005", name: "Arjun Reddy", email: "arjun.reddy@pesitm.edu.in", phone: "9876543005", gender: "Male", dob: "2004-11-25", admission_year: 2023, batch_id: 1, section_id: 2, mentor_id: 1, is_active: true, photo: null },
    { id: 6, user_id: null, usn: "1VE23CS006", name: "Kavya Nair", email: "kavya.nair@pesitm.edu.in", phone: "9876543006", gender: "Female", dob: "2005-09-08", admission_year: 2023, batch_id: 1, section_id: 1, mentor_id: 2, is_active: true, photo: null },
    { id: 7, user_id: null, usn: "1VE24CS001", name: "Vikram Singh", email: "vikram.singh@pesitm.edu.in", phone: "9876543007", gender: "Male", dob: "2006-02-14", admission_year: 2024, batch_id: 2, section_id: 4, mentor_id: 1, is_active: true, photo: null },
    { id: 8, user_id: null, usn: "1VE24CS002", name: "Ananya Iyer", email: "ananya.iyer@pesitm.edu.in", phone: "9876543008", gender: "Female", dob: "2006-04-30", admission_year: 2024, batch_id: 2, section_id: 4, mentor_id: 2, is_active: true, photo: null },
    { id: 9, user_id: null, usn: "1VE23EC001", name: "Karthik Menon", email: "karthik.menon@pesitm.edu.in", phone: "9876543009", gender: "Male", dob: "2005-06-12", admission_year: 2023, batch_id: 4, section_id: 7, mentor_id: 3, is_active: true, photo: null },
    { id: 10, user_id: null, usn: "1VE24ME001", name: "Deepa Rao", email: "deepa.rao@pesitm.edu.in", phone: "9876543010", gender: "Female", dob: "2006-08-20", admission_year: 2024, batch_id: 5, section_id: 8, mentor_id: 4, is_active: true, photo: null }
  ],

  // Faculty
  faculty: [
    { id: 1, user_id: 2, employee_code: "VCE-FAC-001", name: "Dr. Rajesh Kumar", email: "rajesh.kumar@pesitm.edu.in", phone: "9876540001", designation: "Professor", department_id: 1, is_active: true, photo: null },
    { id: 2, user_id: null, employee_code: "VCE-FAC-002", name: "Dr. Sunita Sharma", email: "sunita.sharma@pesitm.edu.in", phone: "9876540002", designation: "Associate Professor", department_id: 1, is_active: true, photo: null },
    { id: 3, user_id: null, employee_code: "VCE-FAC-003", name: "Prof. Amit Verma", email: "amit.verma@pesitm.edu.in", phone: "9876540003", designation: "Assistant Professor", department_id: 2, is_active: true, photo: null },
    { id: 4, user_id: null, employee_code: "VCE-FAC-004", name: "Dr. Meera Nair", email: "meera.nair@pesitm.edu.in", phone: "9876540004", designation: "Professor", department_id: 3, is_active: true, photo: null },
    { id: 5, user_id: null, employee_code: "VCE-FAC-005", name: "Prof. Sanjay Patel", email: "sanjay.patel@pesitm.edu.in", phone: "9876540005", designation: "Assistant Professor", department_id: 1, is_active: true, photo: null }
  ],

  // Parents
  parents: [
    { id: 1, user_id: null, name: "Ramesh Kumar", occupation: "Engineer", phone: "9876550001", email: "ramesh.kumar@email.com", address: "123 Main Street, Bangalore" },
    { id: 2, user_id: null, name: "Lakshmi Sharma", occupation: "Teacher", phone: "9876550002", email: "lakshmi.sharma@email.com", address: "456 Park Avenue, Bangalore" },
    { id: 3, user_id: null, name: "Suresh Verma", occupation: "Business Owner", phone: "9876550003", email: "suresh.verma@email.com", address: "789 Lake Road, Bangalore" }
  ],

  // Student-Parent Relations
  studentParents: [
    { id: 1, student_id: 1, parent_id: 1, relation: "Father" },
    { id: 2, student_id: 2, parent_id: 2, relation: "Mother" },
    { id: 3, student_id: 3, parent_id: 3, relation: "Father" }
  ],

  // Subjects
  subjects: [
    { id: 1, code: "CS101", name: "Programming Fundamentals", credits: 4, semester: 1, department_id: 1, is_active: true },
    { id: 2, code: "CS102", name: "Data Structures", credits: 4, semester: 2, department_id: 1, is_active: true },
    { id: 3, code: "CS201", name: "Database Management Systems", credits: 3, semester: 3, department_id: 1, is_active: true },
    { id: 4, code: "CS202", name: "Operating Systems", credits: 4, semester: 3, department_id: 1, is_active: true },
    { id: 5, code: "CS301", name: "Computer Networks", credits: 3, semester: 5, department_id: 1, is_active: true },
    { id: 6, code: "CS302", name: "Machine Learning", credits: 4, semester: 5, department_id: 1, is_active: true },
    { id: 7, code: "MA101", name: "Engineering Mathematics I", credits: 4, semester: 1, department_id: 1, is_active: true },
    { id: 8, code: "EC101", name: "Basic Electronics", credits: 3, semester: 1, department_id: 2, is_active: true },
    { id: 9, code: "ME101", name: "Engineering Mechanics", credits: 4, semester: 1, department_id: 3, is_active: true }
  ],

  // Course Offerings
  courseOfferings: [
    { id: 1, subject_id: 1, batch_id: 2, section_id: 4, faculty_id: 1, academic_year: "2024-25", semester: 1 },
    { id: 2, subject_id: 7, batch_id: 2, section_id: 4, faculty_id: 2, academic_year: "2024-25", semester: 1 },
    { id: 3, subject_id: 2, batch_id: 1, section_id: 1, faculty_id: 1, academic_year: "2024-25", semester: 3 },
    { id: 4, subject_id: 3, batch_id: 1, section_id: 1, faculty_id: 2, academic_year: "2024-25", semester: 3 },
    { id: 5, subject_id: 4, batch_id: 1, section_id: 1, faculty_id: 5, academic_year: "2024-25", semester: 3 },
    { id: 6, subject_id: 2, batch_id: 1, section_id: 2, faculty_id: 1, academic_year: "2024-25", semester: 3 },
    { id: 7, subject_id: 3, batch_id: 1, section_id: 2, faculty_id: 2, academic_year: "2024-25", semester: 3 }
  ],

  // Weekly Timetable
  weeklyTimetable: [
    { id: 1, course_offering_id: 3, day_of_week: 1, period_no: 1, room: "CSE-101", academic_year: "2024-25", semester: 3 },
    { id: 2, course_offering_id: 4, day_of_week: 1, period_no: 2, room: "CSE-102", academic_year: "2024-25", semester: 3 },
    { id: 3, course_offering_id: 5, day_of_week: 1, period_no: 3, room: "CSE-103", academic_year: "2024-25", semester: 3 },
    { id: 4, course_offering_id: 3, day_of_week: 2, period_no: 2, room: "CSE-101", academic_year: "2024-25", semester: 3 },
    { id: 5, course_offering_id: 4, day_of_week: 2, period_no: 3, room: "CSE-102", academic_year: "2024-25", semester: 3 },
    { id: 6, course_offering_id: 5, day_of_week: 3, period_no: 1, room: "CSE-103", academic_year: "2024-25", semester: 3 },
    { id: 7, course_offering_id: 3, day_of_week: 3, period_no: 3, room: "CSE-101", academic_year: "2024-25", semester: 3 },
    { id: 8, course_offering_id: 4, day_of_week: 4, period_no: 1, room: "CSE-102", academic_year: "2024-25", semester: 3 },
    { id: 9, course_offering_id: 5, day_of_week: 4, period_no: 2, room: "CSE-103", academic_year: "2024-25", semester: 3 },
    { id: 10, course_offering_id: 3, day_of_week: 5, period_no: 1, room: "CSE-101", academic_year: "2024-25", semester: 3 }
  ],

  // Period Timings
  periodTimings: [
    { period: 1, start: "09:00", end: "10:00" },
    { period: 2, start: "10:00", end: "11:00" },
    { period: 3, start: "11:15", end: "12:15" },
    { period: 4, start: "12:15", end: "13:15" },
    { period: 5, start: "14:00", end: "15:00" },
    { period: 6, start: "15:00", end: "16:00" }
  ],

  // Class Sessions
  classSessions: [
    { id: 1, course_offering_id: 3, session_date: "2026-02-06", start_time: "09:00", end_time: "10:00", session_type: "Lecture", created_by: 1 },
    { id: 2, course_offering_id: 4, session_date: "2026-02-06", start_time: "10:00", end_time: "11:00", session_type: "Lecture", created_by: 2 },
    { id: 3, course_offering_id: 5, session_date: "2026-02-06", start_time: "11:15", end_time: "12:15", session_type: "Lab", created_by: 5 },
    { id: 4, course_offering_id: 3, session_date: "2026-02-05", start_time: "10:00", end_time: "11:00", session_type: "Lecture", created_by: 1 },
    { id: 5, course_offering_id: 4, session_date: "2026-02-05", start_time: "11:15", end_time: "12:15", session_type: "Lecture", created_by: 2 }
  ],

  // Attendance
  attendance: [
    { id: 1, session_id: 4, student_id: 1, status: "present", marked_by: 1, marked_at: "2026-02-05T10:05:00" },
    { id: 2, session_id: 4, student_id: 2, status: "present", marked_by: 1, marked_at: "2026-02-05T10:05:00" },
    { id: 3, session_id: 4, student_id: 3, status: "absent", marked_by: 1, marked_at: "2026-02-05T10:05:00" },
    { id: 4, session_id: 4, student_id: 6, status: "late", marked_by: 1, marked_at: "2026-02-05T10:05:00" },
    { id: 5, session_id: 5, student_id: 1, status: "present", marked_by: 2, marked_at: "2026-02-05T11:20:00" },
    { id: 6, session_id: 5, student_id: 2, status: "present", marked_by: 2, marked_at: "2026-02-05T11:20:00" },
    { id: 7, session_id: 5, student_id: 3, status: "present", marked_by: 2, marked_at: "2026-02-05T11:20:00" },
    { id: 8, session_id: 5, student_id: 6, status: "present", marked_by: 2, marked_at: "2026-02-05T11:20:00" }
  ],

  // Exam Types
  examTypes: [
    { id: 1, name: "Internal Assessment 1", weightage: 15 },
    { id: 2, name: "Internal Assessment 2", weightage: 15 },
    { id: 3, name: "Mid Semester", weightage: 20 },
    { id: 4, name: "End Semester", weightage: 50 }
  ],

  // Exams
  exams: [
    { id: 1, course_offering_id: 3, exam_type_id: 1, exam_date: "2026-02-15", max_marks: 30, description: "IA1 - Data Structures" },
    { id: 2, course_offering_id: 4, exam_type_id: 1, exam_date: "2026-02-16", max_marks: 30, description: "IA1 - DBMS" },
    { id: 3, course_offering_id: 3, exam_type_id: 3, exam_date: "2026-03-10", max_marks: 50, description: "Mid Sem - Data Structures" },
    { id: 4, course_offering_id: 4, exam_type_id: 3, exam_date: "2026-03-11", max_marks: 50, description: "Mid Sem - DBMS" }
  ],

  // Marks
  marks: [
    { id: 1, exam_id: 1, student_id: 1, marks_obtained: 27, grade: "A", entered_by: 1, entered_at: "2026-02-17" },
    { id: 2, exam_id: 1, student_id: 2, marks_obtained: 25, grade: "A", entered_by: 1, entered_at: "2026-02-17" },
    { id: 3, exam_id: 1, student_id: 3, marks_obtained: 22, grade: "B", entered_by: 1, entered_at: "2026-02-17" },
    { id: 4, exam_id: 1, student_id: 6, marks_obtained: 18, grade: "C", entered_by: 1, entered_at: "2026-02-17" }
  ],

  // Assignments
  assignments: [
    { id: 1, course_offering_id: 3, title: "Implement Binary Search Tree", description: "Write a program to implement BST with insert, delete, and search operations", due_date: "2026-02-20", max_marks: 20, created_by: 1, created_at: "2026-02-01" },
    { id: 2, course_offering_id: 4, title: "ER Diagram Design", description: "Design an ER diagram for a library management system", due_date: "2026-02-18", max_marks: 15, created_by: 2, created_at: "2026-02-02" },
    { id: 3, course_offering_id: 5, title: "Process Scheduling Simulation", description: "Simulate FCFS, SJF, and Round Robin scheduling algorithms", due_date: "2026-02-25", max_marks: 25, created_by: 5, created_at: "2026-02-05" }
  ],

  // Assignment Submissions
  assignmentSubmissions: [
    { id: 1, assignment_id: 1, student_id: 1, submitted_at: "2026-02-18T14:30:00", file_url: null, answer_text: "Code submitted via GitHub", marks_obtained: 18, evaluated_by: 1, evaluated_at: "2026-02-19" },
    { id: 2, assignment_id: 1, student_id: 2, submitted_at: "2026-02-19T10:00:00", file_url: null, answer_text: "Code submitted", marks_obtained: null, evaluated_by: null, evaluated_at: null },
    { id: 3, assignment_id: 2, student_id: 1, submitted_at: "2026-02-17T16:45:00", file_url: null, answer_text: "ER diagram attached", marks_obtained: 14, evaluated_by: 2, evaluated_at: "2026-02-18" }
  ],

  // Resources
  resources: [
    { id: 1, course_offering_id: 3, title: "Data Structures Notes - Unit 1", description: "Introduction to DS and Arrays", file_url: "ds_unit1.pdf", file_type: "pdf", created_by: 1, created_at: "2026-01-15" },
    { id: 2, course_offering_id: 3, title: "Linked List Lecture Video", description: "Video lecture on linked lists", file_url: "ll_video.mp4", file_type: "video", created_by: 1, created_at: "2026-01-20" },
    { id: 3, course_offering_id: 4, title: "DBMS Reference Book", description: "Link to online textbook", file_url: "https://example.com/dbms", file_type: "link", created_by: 2, created_at: "2026-01-10" },
    { id: 4, course_offering_id: 4, title: "SQL Practice Questions", description: "50 SQL queries for practice", file_url: "sql_practice.docx", file_type: "doc", created_by: 2, created_at: "2026-01-25" }
  ],

  // Announcements
  announcements: [
    { id: 1, created_by: 1, title: "Welcome to New Academic Year 2024-25", message: "Dear students, welcome to the new academic year. Classes will begin from February 1st, 2026. Please check your timetables.", target_type: "institution", target_id: null, created_at: "2026-01-28T09:00:00" },
    { id: 2, created_by: 1, title: "Internal Assessment 1 Schedule", message: "IA1 exams will be held from February 15-20. Please prepare accordingly. Detailed schedule is attached.", target_type: "program", target_id: 1, created_at: "2026-02-01T10:00:00" },
    { id: 3, created_by: 2, title: "DBMS Assignment Deadline Extended", message: "The deadline for the ER Diagram assignment has been extended to February 18th due to multiple requests.", target_type: "section", target_id: 1, created_at: "2026-02-10T14:00:00" },
    { id: 4, created_by: 1, title: "College Cultural Fest - Expressions 2026", message: "Register now for Expressions 2026! Events include dance, music, drama, and technical competitions. Registration deadline: February 28th.", target_type: "institution", target_id: null, created_at: "2026-02-05T11:00:00" }
  ],

  // Notifications
  notifications: [
    { id: 1, user_id: 3, type: "assignment", title: "New Assignment Posted", message: "A new assignment 'Implement Binary Search Tree' has been posted for Data Structures", data: { assignment_id: 1 }, read_at: null, created_at: "2026-02-01T10:00:00" },
    { id: 2, user_id: 3, type: "exam", title: "Upcoming Exam", message: "IA1 - Data Structures exam is scheduled for February 15, 2026", data: { exam_id: 1 }, read_at: null, created_at: "2026-02-10T09:00:00" },
    { id: 3, user_id: 3, type: "announcement", title: "New Announcement", message: "Check out the details for Expressions 2026 cultural fest", data: { announcement_id: 4 }, read_at: "2026-02-05T12:00:00", created_at: "2026-02-05T11:00:00" },
    { id: 4, user_id: 2, type: "attendance", title: "Pending Attendance", message: "You have 2 sessions with pending attendance for today", data: {}, read_at: null, created_at: "2026-02-06T08:00:00" }
  ],

  // Academic Calendar
  academicCalendar: [
    { id: 1, institution_id: 1, academic_year: "2024-25", semester: "Odd", start_date: "2024-08-01", end_date: "2024-12-15", description: "Odd Semester" },
    { id: 2, institution_id: 1, academic_year: "2024-25", semester: "Even", start_date: "2026-01-15", end_date: "2026-05-31", description: "Even Semester" }
  ],

  // Calendar Events
  calendarEvents: [
    { id: 1, date: "2026-02-06", title: "Classes Begin", type: "event" },
    { id: 2, date: "2026-02-15", title: "IA1 Starts", type: "exam" },
    { id: 3, date: "2026-02-20", title: "IA1 Ends", type: "exam" },
    { id: 4, date: "2026-02-26", title: "Republic Day (Holiday)", type: "holiday" },
    { id: 5, date: "2026-03-10", title: "Mid Semester Exams", type: "exam" },
    { id: 6, date: "2026-03-14", title: "Holi (Holiday)", type: "holiday" },
    { id: 7, date: "2026-03-25", title: "Cultural Fest - Expressions", type: "event" },
    { id: 8, date: "2026-04-14", title: "Ambedkar Jayanti (Holiday)", type: "holiday" },
    { id: 9, date: "2026-05-01", title: "End Semester Exams Begin", type: "exam" },
    { id: 10, date: "2026-05-15", title: "End Semester Exams End", type: "exam" },
    { id: 11, date: "2026-05-31", title: "Semester Ends", type: "event" }
  ],

  // Leave Requests
  leaveRequests: [
    { id: 1, student_id: 3, approved_by: null, from_date: "2026-02-05", to_date: "2026-02-05", reason: "Medical appointment", status: "approved", created_at: "2026-02-03" }
  ],

  // Helper Functions
  getStudentsBySection(sectionId) {
    return this.students.filter(s => s.section_id === sectionId);
  },

  getFacultyByDepartment(departmentId) {
    return this.faculty.filter(f => f.department_id === departmentId);
  },

  getSubjectsByDepartment(departmentId) {
    return this.subjects.filter(s => s.department_id === departmentId);
  },

  getCourseOfferingDetails(coId) {
    const co = this.courseOfferings.find(c => c.id === coId);
    if (!co) return null;
    return {
      ...co,
      subject: this.subjects.find(s => s.id === co.subject_id),
      batch: this.batches.find(b => b.id === co.batch_id),
      section: this.sections.find(s => s.id === co.section_id),
      faculty: this.faculty.find(f => f.id === co.faculty_id)
    };
  },

  getStudentAttendanceSummary(studentId) {
    const studentAttendance = this.attendance.filter(a => a.student_id === studentId);
    const total = studentAttendance.length;
    const present = studentAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
    return {
      total,
      present,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0
    };
  },

  getUnreadNotifications(userId) {
    return this.notifications.filter(n => n.user_id === userId && !n.read_at);
  },

  getDepartmentName(departmentId) {
    const dept = this.departments.find(d => d.id === departmentId);
    return dept ? dept.name : '';
  },

  getProgramName(programId) {
    const prog = this.programs.find(p => p.id === programId);
    return prog ? prog.name : '';
  },

  getBatchInfo(batchId) {
    const batch = this.batches.find(b => b.id === batchId);
    if (!batch) return null;
    const program = this.programs.find(p => p.id === batch.program_id);
    return {
      ...batch,
      program
    };
  }
};

// Export for use in other modules
window.Data = Data;
