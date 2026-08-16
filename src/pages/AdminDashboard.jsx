import React, { useState, useMemo } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  BarChart3,
  Search,
  Plus,
  Trash2,
  Edit,
  Printer,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building,
  ArrowRight,
  Settings,
  Edit2
} from "lucide-react";

export default function AdminDashboard() {
  const {
    currentUser,
    users,
    courses,
    addStudent,
    updateStudent,
    deleteStudent,
    addCourse,
    setReportModalStudent,
    setProfileSettingsOpen,
    aiInsights,
    addToast
  } = useAcademic();

  const [activeTab, setActiveTab] = useState("analytics"); // 'analytics' | 'students' | 'faculty' | 'courses'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("All");

  // Add Student Modal State
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    email: "",
    studentId: `STU-2026-${Math.floor(Math.random() * 800 + 100)}`,
    department: "Computer Science & AI",
    year: "Year 1 (Freshman)",
    semester: "Semester 1",
    gpa: 8.5,
    attendanceRate: 90.0,
    riskLevel: "Low",
    phone: "+1 (555) 000-0000"
  });

  // Add Course Modal State
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    code: "CS 305",
    title: "",
    category: "Computer Science",
    level: "Intermediate",
    credits: 4,
    instructorName: "Dr. Sarah Bennett",
    capacity: 60,
    schedule: "Mon, Wed 02:00 PM - 03:30 PM",
    room: "Lab 201",
    description: ""
  });

  const allStudents = users.filter((u) => u.role === "student");
  const allTeachers = users.filter((u) => u.role === "teacher");

  const filteredStudents = useMemo(() => {
    return allStudents.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = selectedDeptFilter === "All" || s.department === selectedDeptFilter;
      return matchSearch && matchDept;
    });
  }, [allStudents, searchTerm, selectedDeptFilter]);

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    addStudent(newStudentData);
    setAddStudentOpen(false);
    setNewStudentData({
      name: "",
      email: "",
      studentId: `STU-2026-${Math.floor(Math.random() * 800 + 100)}`,
      department: "Computer Science & AI",
      year: "Year 1 (Freshman)",
      semester: "Semester 1",
      gpa: 8.5,
      attendanceRate: 90.0,
      riskLevel: "Low",
      phone: "+1 (555) 000-0000"
    });
  };

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    addCourse(newCourseData);
    setAddCourseOpen(false);
    setNewCourseData({
      code: "CS 305",
      title: "",
      category: "Computer Science",
      level: "Intermediate",
      credits: 4,
      instructorName: "Dr. Sarah Bennett",
      capacity: 60,
      schedule: "Mon, Wed 02:00 PM - 03:30 PM",
      room: "Lab 201",
      description: ""
    });
  };

  return (
    <div className="container" style={{ padding: "2rem 1.5rem 4rem 1.5rem" }}>
      
      {/* Admin Profile Banner */}
      <div className="card" style={{ padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--danger-light)" }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontSize: "1.65rem", fontWeight: "800" }}>{currentUser.name}</h1>
                <button
                  className="btn btn-subtle btn-sm text-xs flex items-center gap-1"
                  onClick={() => setProfileSettingsOpen(true)}
                  title="Edit Display Name"
                  style={{ padding: "0.2rem 0.5rem" }}
                >
                  <Edit2 size={12} />
                  <span>Edit Name</span>
                </button>
                <span className="badge badge-danger">Administrator</span>
              </div>
              <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                {currentUser.title} • {currentUser.department} • Admin ID: <strong className="font-mono">{currentUser.adminId}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              className="btn btn-secondary btn-sm flex items-center gap-1"
              onClick={() => setProfileSettingsOpen(true)}
            >
              <Settings size={15} />
              <span>Account Settings</span>
            </button>
            <button 
              className="btn btn-primary btn-sm flex items-center gap-1"
              onClick={() => setReportModalStudent(allStudents[0])}
            >
              <Printer size={15} /> Institutional Audit Transcript
            </button>
          </div>
        </div>

        {/* 6 Institutional KPIs (10.0 Scale CGPA) */}
        <div className="grid grid-cols-3 gap-4" style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-light)" }}>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="stat-value">{aiInsights.campusMetrics.totalStudents}</div>
              <div className="stat-label">Total Enrolled Students</div>
              <div className="stat-trend text-primary-color">+8.5% Annual Enrollment Growth</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>
              <Users size={24} />
            </div>
            <div>
              <div className="stat-value">{aiInsights.campusMetrics.totalTeachers}</div>
              <div className="stat-label">Faculty Members</div>
              <div className="stat-trend text-accent-color">1:14 Faculty-to-Student Ratio</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
              <BookOpen size={24} />
            </div>
            <div>
              <div className="stat-value">{courses.length}</div>
              <div className="stat-label">Accredited Courses</div>
              <div className="stat-trend text-success-color">100% University Compliant</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="stat-value">{aiInsights.campusMetrics.averageCampusGPA.toFixed(2)}</div>
              <div className="stat-label">Campus Average CGPA (/10.0)</div>
              <div className="stat-trend text-success-color">Above 8.00 Benchmark</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
              <Building size={24} />
            </div>
            <div>
              <div className="stat-value">{aiInsights.campusMetrics.averageAttendance}%</div>
              <div className="stat-label">Campus Attendance Rate</div>
              <div className="stat-trend text-primary-color">University Average</div>
            </div>
          </div>

          <div className="stat-card" style={{ borderColor: "var(--danger-border)" }}>
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--danger-light)", color: "var(--danger)" }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="stat-value" style={{ color: "var(--danger)" }}>{aiInsights.campusMetrics.atRiskStudentsCount}</div>
              <div className="stat-label">Flagged At-Risk Cases</div>
              <div className="stat-trend text-danger-color">Proactive Advising Assigned</div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-nav">
        <button 
          className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 size={15} /> Institutional Analytics & Reports
        </button>
        <button 
          className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
          onClick={() => setActiveTab("students")}
        >
          <GraduationCap size={15} /> Student Registry ({allStudents.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "faculty" ? "active" : ""}`}
          onClick={() => setActiveTab("faculty")}
        >
          <Users size={15} /> Faculty Directory ({allTeachers.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          <BookOpen size={15} /> Course Catalogs ({courses.length})
        </button>
      </div>

      {/* ===================================================================
          TAB 1: Institutional Analytics & Reports
          =================================================================== */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-2 gap-8">
          
          {/* Department Breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <BarChart3 size={18} color="var(--primary)" />
                <span>Department Performance Comparison</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {aiInsights.campusMetrics.departmentPerformance.map((dept, idx) => (
                <div key={idx} style={{ border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                    <div className="font-bold text-sm">{dept.name}</div>
                    <span className="badge badge-primary text-xs font-mono">{dept.studentCount} Students</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted" style={{ marginBottom: "0.5rem" }}>
                    <div>Avg CGPA: <strong className="text-primary-color">{dept.avgGPA.toFixed(2)} / 10.0</strong></div>
                    <div>Avg Attendance: <strong className="text-success-color">{dept.attendance}%</strong></div>
                  </div>

                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill primary" 
                      style={{ width: `${(dept.avgGPA / 10.0) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Risk Analysis & Telemetry Matrix */}
          <div className="flex flex-col gap-6">
            
            <div className="card ai-glow-card">
              <div className="card-header">
                <div className="card-title">
                  <Sparkles size={18} color="var(--primary)" />
                  <span>Campus-Wide Academic Risk Distribution</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Low Risk / High Standing (&gt;85% Attendance)</span>
                    <span className="font-bold text-success-color">84% (1,041 Students)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill success" style={{ width: "84%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Moderate Risk (75% - 85% Attendance)</span>
                    <span className="font-bold text-warning-color">14.5% (180 Students)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill warning" style={{ width: "14.5%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Critical Risk (&lt;75% Attendance / Drop in Grades)</span>
                    <span className="font-bold text-danger-color">1.5% (19 Students)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill danger" style={{ width: "1.5%" }} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.25rem", padding: "0.75rem", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                <div className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>
                  💡 <strong>Early Intervention Protocol:</strong> Academic advisors have scheduled 1-on-1 counseling sessions for all 19 critical-risk students before the mid-term cutoff.
                </div>
              </div>
            </div>

            {/* Print Institutional Report Action */}
            <div className="card" style={{ backgroundColor: "var(--bg-subtle)" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                Generate Institutional Academic Performance Audit
              </h4>
              <p className="text-xs text-muted" style={{ marginBottom: "1rem", lineHeight: 1.5 }}>
                Compile comprehensive university metrics, CGPA distributions, and academic diagnostics into an official printable document.
              </p>
              <button 
                className="btn btn-primary btn-sm flex items-center gap-1"
                onClick={() => setReportModalStudent(allStudents[0])}
              >
                <Printer size={14} /> Open Audit Document
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ===================================================================
          TAB 2: Student Registry (CRUD)
          =================================================================== */}
      {activeTab === "students" && (
        <div className="card">
          <div className="card-header flex-wrap gap-4">
            <div>
              <div className="card-title">Student Registry & Records</div>
              <div className="text-xs text-muted">Manage active university enrollments, CGPA records, and transcripts</div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div className="input-with-icon" style={{ width: "220px" }}>
                <span className="input-icon-left"><Search size={16} /></span>
                <input 
                  type="text" 
                  className="input input-sm" 
                  placeholder="Search students..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Department Filter */}
              <select 
                className="select" 
                style={{ width: "auto" }}
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Computer Science & AI">Computer Science & AI</option>
                <option value="Data Science & Analytics">Data Science & Analytics</option>
                <option value="Cyber Security & Networks">Cyber Security & Networks</option>
              </select>

              <button 
                className="btn btn-primary btn-sm flex items-center gap-1"
                onClick={() => setAddStudentOpen(true)}
              >
                <Plus size={14} /> Add New Student
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Year / Sem</th>
                  <th>Cumulative CGPA</th>
                  <th>Attendance</th>
                  <th>Standing</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((stu) => (
                  <tr key={stu.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <img 
                          src={stu.avatar} 
                          alt={stu.name} 
                          style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                        />
                        <div>
                          <div className="font-bold text-sm">{stu.name}</div>
                          <div className="text-xs text-muted">{stu.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs font-bold">{stu.studentId}</td>
                    <td className="text-xs">{stu.department}</td>
                    <td className="text-xs">{stu.year}</td>
                    <td className="font-bold">{stu.gpa.toFixed(2)} / 10.0</td>
                    <td>
                      <span className={`badge ${stu.attendanceRate < 75 ? "badge-danger" : "badge-success"} text-xs font-bold`}>
                        {stu.attendanceRate}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${stu.riskLevel === "High" ? "badge-danger" : "badge-success"} text-xs`}>
                        {stu.riskLevel === "High" ? "At-Risk" : "Good Standing"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button 
                          className="btn btn-subtle btn-sm text-xs"
                          onClick={() => setReportModalStudent(stu)}
                          title="View Official Transcript"
                        >
                          Transcript
                        </button>
                        <button 
                          className="btn btn-subtle btn-icon"
                          style={{ color: "var(--danger)" }}
                          onClick={() => deleteStudent(stu.id)}
                          title="Delete Student Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 3: Faculty Directory
          =================================================================== */}
      {activeTab === "faculty" && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Faculty Members & Course Allocation</div>
            <span className="badge badge-accent text-xs">{allTeachers.length} Professors Listed</span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {allTeachers.map((tea) => (
              <div key={tea.id} style={{ border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                <div className="flex items-center gap-3" style={{ marginBottom: "0.75rem" }}>
                  <img 
                    src={tea.avatar} 
                    alt={tea.name} 
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div className="font-bold text-sm">{tea.name}</div>
                    <div className="text-xs text-primary-color font-semibold">{tea.title}</div>
                    <div className="text-xs text-muted">{tea.department}</div>
                  </div>
                </div>

                <div className="text-xs text-muted" style={{ marginBottom: "0.75rem" }}>
                  Office: <strong>{tea.office}</strong> • Rating: <strong>{tea.rating}/5.0</strong>
                </div>

                <div className="flex items-center gap-2">
                  <span className="badge badge-neutral text-xs">
                    {tea.coursesTaught?.length || 1} Active Courses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 4: Course Catalogs (CRUD)
          =================================================================== */}
      {activeTab === "courses" && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Accredited Academic Courses</div>
              <div className="text-xs text-muted">Create and manage university courses, credits, and venue allocations</div>
            </div>
            <button 
              className="btn btn-primary btn-sm flex items-center gap-1"
              onClick={() => setAddCourseOpen(true)}
            >
              <Plus size={14} /> Add New Course
            </button>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Credits</th>
                  <th>Instructor</th>
                  <th>Enrolled</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td className="font-mono font-bold text-primary-color">{c.code}</td>
                    <td className="font-semibold">{c.title}</td>
                    <td><span className="badge badge-neutral text-xs">{c.category}</span></td>
                    <td>{c.credits} Credits</td>
                    <td>{c.instructorName}</td>
                    <td>{c.enrolledCount} / {c.capacity}</td>
                    <td className="text-xs text-muted">{c.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================
          Add Student Modal
          =================================================================== */}
      {addStudentOpen && (
        <div className="modal-overlay" onClick={() => setAddStudentOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="font-bold text-base">Register New University Student</div>
              <button className="btn btn-subtle btn-icon" onClick={() => setAddStudentOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAddStudentSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="e.g. Rachel Adams" 
                    value={newStudentData.name}
                    onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="input" 
                    placeholder="rachel.adams@edupulse.edu" 
                    value={newStudentData.email}
                    onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select 
                      className="select"
                      value={newStudentData.department}
                      onChange={(e) => setNewStudentData({ ...newStudentData, department: e.target.value })}
                    >
                      <option value="Computer Science & AI">Computer Science & AI</option>
                      <option value="Data Science & Analytics">Data Science & Analytics</option>
                      <option value="Cyber Security & Networks">Cyber Security & Networks</option>
                      <option value="Mathematics & Physics">Mathematics & Physics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year of Study</label>
                    <select 
                      className="select"
                      value={newStudentData.year}
                      onChange={(e) => setNewStudentData({ ...newStudentData, year: e.target.value })}
                    >
                      <option value="Year 1 (Freshman)">Year 1 (Freshman)</option>
                      <option value="Year 2 (Sophomore)">Year 2 (Sophomore)</option>
                      <option value="Year 3 (Junior)">Year 3 (Junior)</option>
                      <option value="Year 4 (Senior)">Year 4 (Senior)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Initial Cumulative CGPA (Scale 0.0 - 10.0)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0"
                      max="10"
                      className="input" 
                      value={newStudentData.gpa}
                      onChange={(e) => setNewStudentData({ ...newStudentData, gpa: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Initial Attendance (%)</label>
                    <input 
                      type="number" 
                      className="input" 
                      value={newStudentData.attendanceRate}
                      onChange={(e) => setNewStudentData({ ...newStudentData, attendanceRate: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddStudentOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          Add Course Modal
          =================================================================== */}
      {addCourseOpen && (
        <div className="modal-overlay" onClick={() => setAddCourseOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="font-bold text-base">Create Accredited Course</div>
              <button className="btn btn-subtle btn-icon" onClick={() => setAddCourseOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAddCourseSubmit}>
              <div className="modal-body">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Course Code</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={newCourseData.code}
                      onChange={(e) => setNewCourseData({ ...newCourseData, code: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Discipline / Category</label>
                    <select 
                      className="select"
                      value={newCourseData.category}
                      onChange={(e) => setNewCourseData({ ...newCourseData, category: e.target.value })}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Cyber Security">Cyber Security</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="e.g. Distributed Consensus & Blockchain Protocols" 
                    value={newCourseData.title}
                    onChange={(e) => setNewCourseData({ ...newCourseData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Scope</label>
                  <textarea 
                    className="textarea" 
                    rows="3" 
                    placeholder="Provide overview of topics, practical labs, and evaluation milestones..."
                    value={newCourseData.description}
                    onChange={(e) => setNewCourseData({ ...newCourseData, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Credits</label>
                    <input 
                      type="number" 
                      className="input" 
                      value={newCourseData.credits}
                      onChange={(e) => setNewCourseData({ ...newCourseData, credits: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input 
                      type="number" 
                      className="input" 
                      value={newCourseData.capacity}
                      onChange={(e) => setNewCourseData({ ...newCourseData, capacity: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Level</label>
                    <select 
                      className="select"
                      value={newCourseData.level}
                      onChange={(e) => setNewCourseData({ ...newCourseData, level: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddCourseOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Course to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
