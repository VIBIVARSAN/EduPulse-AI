import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  Plus,
  Edit,
  Send,
  Award,
  Check,
  X,
  TrendingUp,
  BarChart3,
  Mail,
  HelpCircle,
  ArrowRight,
  Settings,
  Edit2
} from "lucide-react";

export default function TeacherDashboard() {
  const {
    currentUser,
    courses,
    users,
    assignments,
    attendance,
    exams,
    markAttendance,
    gradeAssignment,
    createAssignment,
    createExam,
    recordExamGrade,
    setReportModalStudent,
    setProfileSettingsOpen,
    addToast
  } = useAcademic();

  const [activeTab, setActiveTab] = useState("at-risk"); // 'at-risk' | 'attendance' | 'assignments' | 'exams'
  
  // Attendance Register State
  const taughtCourses = courses.filter((c) => currentUser.coursesTaught?.includes(c.id)) || [courses[0]];
  const [selectedCourseId, setSelectedCourseId] = useState(taughtCourses[0]?.id || "cs-101");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);
  
  const allStudents = users.filter((u) => u.role === "student");
  const enrolledStudents = allStudents.filter((s) => s.enrolledCourseIds?.includes(selectedCourseId));

  const [attendanceStatusMap, setAttendanceStatusMap] = useState(() => {
    const map = {};
    allStudents.forEach((s) => {
      map[s.id] = "Present";
    });
    return map;
  });

  // New Assignment Modal
  const [createAsgOpen, setCreateAsgOpen] = useState(false);
  const [newAsgData, setNewAsgData] = useState({
    title: "",
    courseId: selectedCourseId,
    description: "",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    totalPoints: 100
  });

  // Grading Modal / State
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [gradingItem, setGradingItem] = useState(null); // { assignment, submission }
  const [gradeInput, setGradeInput] = useState(90);
  const [feedbackInput, setFeedbackInput] = useState("");

  // Exam Marks Input State
  const [selectedExamId, setSelectedExamId] = useState(exams[0]?.id || "exam-1");
  const [marksStudentId, setMarksStudentId] = useState(allStudents[0]?.id || "stu-1");
  const [marksInput, setMarksInput] = useState(85);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  const handleMarkAllPresent = () => {
    const updated = { ...attendanceStatusMap };
    enrolledStudents.forEach((s) => {
      updated[s.id] = "Present";
    });
    setAttendanceStatusMap(updated);
    addToast("All students marked as Present for today's register.", "info");
  };

  const toggleStudentStatus = (studentId) => {
    const current = attendanceStatusMap[studentId] || "Present";
    const next = current === "Present" ? "Absent" : current === "Absent" ? "Late" : "Present";
    setAttendanceStatusMap({ ...attendanceStatusMap, [studentId]: next });
  };

  const handleSaveAttendance = () => {
    markAttendance(selectedCourseId, attendanceDate, attendanceStatusMap);
  };

  const handleCreateAssignmentSubmit = (e) => {
    e.preventDefault();
    const courseObj = courses.find((c) => c.id === newAsgData.courseId);
    createAssignment({
      courseId: newAsgData.courseId,
      courseCode: courseObj ? courseObj.code : "CS 101",
      courseTitle: courseObj ? courseObj.title : "Course",
      title: newAsgData.title,
      description: newAsgData.description,
      dueDate: newAsgData.dueDate + "T23:59:59",
      totalPoints: Number(newAsgData.totalPoints)
    });
    setCreateAsgOpen(false);
    setNewAsgData({
      title: "",
      courseId: selectedCourseId,
      description: "",
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      totalPoints: 100
    });
  };

  const handleOpenGrading = (asg, sub) => {
    setGradingItem({ assignment: asg, submission: sub });
    setGradeInput(sub.grade || 90);
    setFeedbackInput(sub.feedback || "Well structured submission. Meets all course criteria.");
    setGradingModalOpen(true);
  };

  const handleApplyAiFeedback = () => {
    if (!gradingItem?.submission?.aiEvaluation) {
      setGradeInput(94);
      setFeedbackInput("AI Suggested: Solid architectural implementation with optimal asymptotic runtime complexity. Clear edge-case coverage.");
    } else {
      const ai = gradingItem.submission.aiEvaluation;
      setGradeInput(ai.score);
      setFeedbackInput(`AI Evaluation (${ai.score}/100): ${ai.summary} Strengths: ${ai.strengths.join(", ")}.`);
    }
    addToast("Applied AI grading recommendation and rubric remarks.", "info");
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!gradingItem) return;
    gradeAssignment(gradingItem.assignment.id, gradingItem.submission.studentId, gradeInput, feedbackInput);
    setGradingModalOpen(false);
  };

  const handleSaveExamMark = (e) => {
    e.preventDefault();
    recordExamGrade(selectedExamId, marksStudentId, marksInput);
  };

  // Identify at-risk students for teacher
  const atRiskStudents = allStudents.filter(s => s.riskLevel === "High" || s.attendanceRate < 75);

  return (
    <div className="container" style={{ padding: "2rem 1.5rem 4rem 1.5rem" }}>
      
      {/* Teacher Profile Banner */}
      <div className="card" style={{ padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--accent-light)" }}
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
                <span className="badge badge-accent">Faculty Member</span>
              </div>
              <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                {currentUser.title} • {currentUser.department} • Office: <strong>{currentUser.office}</strong>
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
            <span className="badge badge-primary text-xs">
              {taughtCourses.length} Active Courses Assigned
            </span>
          </div>
        </div>

        {/* 4 Stat KPI Cards */}
        <div className="grid grid-cols-4 gap-4" style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-light)" }}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
              <Users size={24} />
            </div>
            <div>
              <div className="stat-value">{allStudents.length}</div>
              <div className="stat-label">Total Enrolled Students</div>
              <div className="stat-trend text-primary-color">Across 2 Class Sections</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--success-light)", color: "var(--success)" }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="stat-value">91.4%</div>
              <div className="stat-label">Class Attendance Average</div>
              <div className="stat-trend text-success-color">Above 85% Target</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--warning-light)", color: "var(--warning)" }}>
              <FileText size={24} />
            </div>
            <div>
              <div className="stat-value">
                {assignments.flatMap(a => a.submissions || []).filter(s => s.grade === null).length}
              </div>
              <div className="stat-label">Pending Grading</div>
              <div className="stat-trend text-warning-color">AI Assistant Ready</div>
            </div>
          </div>

          <div className="stat-card" style={{ borderColor: atRiskStudents.length > 0 ? "var(--danger-border)" : "var(--border-light)" }}>
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--danger-light)", color: "var(--danger)" }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="stat-value" style={{ color: "var(--danger)" }}>{atRiskStudents.length}</div>
              <div className="stat-label">At-Risk Students</div>
              <div className="stat-trend text-danger-color">Advising Intervention Recommended</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-nav">
        <button 
          className={`tab-btn ${activeTab === "at-risk" ? "active" : ""}`}
          onClick={() => setActiveTab("at-risk")}
        >
          <AlertTriangle size={15} color="var(--danger)" /> At-Risk Students & Interventions ({atRiskStudents.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          <Calendar size={15} /> Daily Attendance Register
        </button>
        <button 
          className={`tab-btn ${activeTab === "assignments" ? "active" : ""}`}
          onClick={() => setActiveTab("assignments")}
        >
          <FileText size={15} /> Assignment Controller & AI Grading
        </button>
        <button 
          className={`tab-btn ${activeTab === "exams" ? "active" : ""}`}
          onClick={() => setActiveTab("exams")}
        >
          <Award size={15} /> Examination Marks & Bell Curve
        </button>
      </div>

      {/* ===================================================================
          TAB 1: PROMINENT AT-RISK STUDENTS SECTION
          =================================================================== */}
      {activeTab === "at-risk" && (
        <div className="flex flex-col gap-6">
          
          <div className="card risk-card-high" style={{ padding: "1.75rem" }}>
            <div className="card-header" style={{ borderBottomColor: "var(--danger-border)" }}>
              <div className="flex items-center gap-2">
                <AlertTriangle size={22} color="var(--danger)" />
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--danger-text)" }}>
                    AI Early Risk Detection & Faculty Intervention Queue
                  </h3>
                  <p className="text-xs text-secondary" style={{ marginTop: "2px" }}>
                    The following students have triggered automated early-warning alerts due to attendance &lt; 75% or declining coursework performance.
                  </p>
                </div>
              </div>
              <span className="badge badge-danger text-xs font-mono font-bold">
                {atRiskStudents.length} CASES FLAGGED
              </span>
            </div>

            {/* At Risk Student Grid */}
            <div className="grid grid-cols-2 gap-4">
              {atRiskStudents.map((stu) => (
                <div 
                  key={stu.id}
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1.5px solid var(--danger-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                      <div className="flex items-center gap-3">
                        <img 
                          src={stu.avatar} 
                          alt={stu.name} 
                          style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--danger)" }}
                        />
                        <div>
                          <div className="font-bold text-sm">{stu.name}</div>
                          <div className="text-xs text-muted font-mono">{stu.studentId} • {stu.department}</div>
                        </div>
                      </div>
                      <span className="badge badge-danger text-xs font-bold font-mono">
                        HIGH RISK
                      </span>
                    </div>

                    {/* Reasons Box with 10.0 scale CGPA */}
                    <div style={{ backgroundColor: "var(--danger-light)", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", margin: "0.75rem 0", fontSize: "0.8rem" }}>
                      <div style={{ color: "var(--danger-text)", fontWeight: "bold" }}>
                        ⚠️ Telemetry Warning Factors:
                      </div>
                      <div className="text-xs" style={{ color: "var(--danger-text)", marginTop: "2px" }}>
                        • Attendance: <strong>{stu.attendanceRate}%</strong> (Breaches mandatory 75% minimum threshold)<br />
                        • Current Cumulative CGPA: <strong>{stu.gpa.toFixed(2)} / 10.0</strong><br />
                        • Conceptual Diagnostic: Needs reinforcement in Linear Algebra (Eigenvalues & SVD)
                      </div>
                    </div>

                    <div className="text-xs text-secondary" style={{ marginBottom: "0.75rem" }}>
                      <strong>AI Recommendation:</strong> Schedule 1-on-1 faculty counseling session, assign remedial practice problem sets, and notify academic mentor.
                    </div>
                  </div>

                  {/* Teacher Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    <button 
                      className="btn btn-danger btn-sm flex-1 text-xs"
                      onClick={() => {
                        addToast(`Academic warning notice and remedial study plan sent to ${stu.name}.`, "success");
                      }}
                    >
                      <Mail size={13} /> Send Warning Notice
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm flex-1 text-xs"
                      onClick={() => {
                        addToast(`1-on-1 Advising session scheduled with ${stu.name} for Wednesday 2:30 PM.`, "info");
                      }}
                    >
                      Schedule 1-on-1
                    </button>
                    <button 
                      className="btn btn-subtle btn-sm text-xs"
                      onClick={() => setReportModalStudent(stu)}
                      title="View Official Transcript"
                    >
                      Transcript
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Normal Standing Students Summary */}
          <div className="card">
            <div className="card-header">
              <div className="card-title text-sm">
                <CheckCircle2 size={16} color="var(--success)" />
                <span>Students in Good Academic Standing</span>
              </div>
              <span className="badge badge-success text-xs font-mono">
                {allStudents.length - atRiskStudents.length} Students Compliant
              </span>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Attendance</th>
                    <th>Current CGPA</th>
                    <th>Academic Standing</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allStudents.filter(s => s.riskLevel !== "High" && s.attendanceRate >= 75).map(stu => (
                    <tr key={stu.id}>
                      <td className="font-bold">{stu.name}</td>
                      <td className="font-mono text-xs">{stu.studentId}</td>
                      <td>
                        <span className="badge badge-success text-xs font-bold">{stu.attendanceRate}%</span>
                      </td>
                      <td className="font-bold">{stu.gpa.toFixed(2)} / 10.0</td>
                      <td>
                        <span className="badge badge-success text-xs">Good Standing</span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-subtle btn-sm text-xs"
                          onClick={() => setReportModalStudent(stu)}
                        >
                          Transcript
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================
          TAB 2: Daily Attendance Register
          =================================================================== */}
      {activeTab === "attendance" && (
        <div className="card">
          <div className="card-header flex-wrap gap-4">
            <div>
              <div className="card-title">Class Attendance Register</div>
              <div className="text-xs text-muted">Select course and date to record daily student presence</div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Course Selector */}
              <select 
                className="select" 
                style={{ width: "auto", minWidth: "180px" }}
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {taughtCourses.map(c => (
                  <option key={c.id} value={c.id}>{c.code}: {c.title}</option>
                ))}
              </select>

              {/* Date Selector */}
              <input 
                type="date" 
                className="input" 
                style={{ width: "auto" }}
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />

              <button className="btn btn-secondary btn-sm" onClick={handleMarkAllPresent}>
                Mark All Present
              </button>

              <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={handleSaveAttendance}>
                <Check size={14} /> Submit Register
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Department</th>
                  <th>Attendance Rate</th>
                  <th>Today's Status</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {enrolledStudents.map((stu) => {
                  const currentStatus = attendanceStatusMap[stu.id] || "Present";
                  return (
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
                      <td className="font-mono text-xs">{stu.studentId}</td>
                      <td className="text-xs">{stu.department}</td>
                      <td>
                        <span className={`badge ${stu.attendanceRate < 75 ? "badge-danger" : "badge-success"} text-xs`}>
                          {stu.attendanceRate}%
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStudentStatus(stu.id)}
                          className={`badge ${
                            currentStatus === "Present" ? "badge-success" :
                            currentStatus === "Late" ? "badge-warning" : "badge-danger"
                          }`}
                          style={{ cursor: "pointer", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                          title="Click to toggle Present / Absent / Late"
                        >
                          {currentStatus} (Click to toggle)
                        </button>
                      </td>
                      <td>
                        <button 
                          className="btn btn-subtle btn-sm text-xs"
                          onClick={() => setReportModalStudent(stu)}
                        >
                          View Transcript
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 3: Assignment Controller & AI Grading
          =================================================================== */}
      {activeTab === "assignments" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Faculty Assignment Management</h3>
              <p className="text-xs text-muted">Create assignments and evaluate student submissions with AI rubric assistance</p>
            </div>
            <button 
              className="btn btn-primary btn-sm flex items-center gap-1"
              onClick={() => setCreateAsgOpen(true)}
            >
              <Plus size={15} /> Create New Assignment
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {assignments.map((asg) => {
              const subs = asg.submissions || [];
              return (
                <div key={asg.id} className="card">
                  <div className="flex items-start justify-between flex-wrap gap-2" style={{ marginBottom: "1rem" }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-primary font-mono text-xs">{asg.courseCode}</span>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}>{asg.title}</h4>
                      </div>
                      <p className="text-xs text-secondary" style={{ marginTop: "4px" }}>
                        {asg.description}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted">
                      <div>Due: {new Date(asg.dueDate).toLocaleDateString()}</div>
                      <div className="font-bold text-sm text-primary-color">{asg.totalPoints} Points</div>
                    </div>
                  </div>

                  {/* Submissions List for this assignment */}
                  <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    <div className="text-xs font-bold text-muted" style={{ marginBottom: "0.5rem" }}>
                      STUDENT SUBMISSIONS ({subs.length})
                    </div>

                    {subs.length === 0 ? (
                      <div className="text-xs text-muted" style={{ padding: "0.5rem 0" }}>
                        No submissions uploaded yet by enrolled students.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {subs.map((sub, sIdx) => (
                          <div 
                            key={sIdx}
                            style={{
                              border: "1px solid var(--border-light)",
                              borderRadius: "var(--radius-sm)",
                              padding: "0.75rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              backgroundColor: "var(--bg-subtle)"
                            }}
                          >
                            <div>
                              <div className="font-bold text-sm">{sub.studentName}</div>
                              <div className="text-xs text-muted">
                                File: <span className="font-mono">{sub.attachmentName}</span> • Submitted: {new Date(sub.submittedAt).toLocaleString()}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {sub.grade !== null ? (
                                <span className="badge badge-success text-xs font-bold">
                                  Graded: {sub.grade}/{asg.totalPoints}
                                </span>
                              ) : (
                                <span className="badge badge-warning text-xs">Pending Review</span>
                              )}

                              <button 
                                className="btn btn-secondary btn-sm flex items-center gap-1"
                                onClick={() => handleOpenGrading(asg, sub)}
                              >
                                <Sparkles size={13} color="var(--primary)" />
                                <span>{sub.grade !== null ? "Edit Grade / Feedback" : "Grade with AI"}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 4: Examination Marks & Bell Curve
          =================================================================== */}
      {activeTab === "exams" && (
        <div className="grid grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Exam Record Controller */}
          <div style={{ gridColumn: "span 2" }}>
            <div className="card" style={{ marginBottom: "1.5rem" }}>
              <div className="card-header">
                <div className="card-title">Record Student Exam Marks</div>
              </div>

              <form onSubmit={handleSaveExamMark} className="grid grid-cols-3 gap-3 items-end">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Select Exam</label>
                  <select 
                    className="select"
                    value={selectedExamId}
                    onChange={(e) => setSelectedExamId(e.target.value)}
                  >
                    {exams.map(ex => (
                      <option key={ex.id} value={ex.id}>{ex.courseCode}: {ex.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Student</label>
                  <select 
                    className="select"
                    value={marksStudentId}
                    onChange={(e) => setMarksStudentId(e.target.value)}
                  >
                    {allStudents.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.studentId})</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <div className="form-group flex-1" style={{ marginBottom: 0 }}>
                    <label className="form-label">Marks (out of {selectedExam.totalMarks})</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="0"
                      max={selectedExam.totalMarks}
                      value={marksInput}
                      onChange={(e) => setMarksInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ height: "42px", alignSelf: "flex-end" }}>
                    Save Mark
                  </button>
                </div>
              </form>
            </div>

            {/* Current Recorded Exam Marks Table */}
            <div className="card">
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>
                Recorded Results for {selectedExam.title}
              </h4>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Score</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedExam.gradesRecorded || []).map((rec, rIdx) => (
                      <tr key={rIdx}>
                        <td className="font-bold">{rec.studentName}</td>
                        <td className="font-mono">{rec.marks} / {selectedExam.totalMarks}</td>
                        <td>
                          <span className={`badge ${rec.marks >= 80 ? "badge-success" : rec.marks >= 60 ? "badge-warning" : "badge-danger"} text-xs font-bold`}>
                            {rec.grade}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-neutral text-xs">Official Record</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Col: Bell Curve & Statistical Distribution */}
          <div>
            <div className="card ai-glow-card">
              <div className="card-header">
                <div className="card-title text-sm">
                  <BarChart3 size={16} color="var(--primary)" />
                  <span>Grade Distribution Curve</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Outstanding / A (90-100 pts)</span>
                    <span className="font-bold">50% (2 Students)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill success" style={{ width: "50%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Excellent / B (80-89 pts)</span>
                    <span className="font-bold">25% (1 Student)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill primary" style={{ width: "25%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Good / C (70-79 pts)</span>
                    <span className="font-bold">25% (1 Student)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill warning" style={{ width: "25%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs" style={{ marginBottom: "4px" }}>
                    <span>Below Standard (&lt;70 pts)</span>
                    <span className="font-bold">0% (0 Students)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill danger" style={{ width: "0%" }} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.25rem", padding: "0.75rem", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                <div className="text-xs text-muted">Class Statistics:</div>
                <div className="text-xs font-semibold" style={{ marginTop: "2px" }}>
                  Mean: <strong>85.4 pts</strong> • Median: <strong>91 pts</strong> • Std Dev: <strong>8.2</strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================
          Create Assignment Modal
          =================================================================== */}
      {createAsgOpen && (
        <div className="modal-overlay" onClick={() => setCreateAsgOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="font-bold text-base">Create New Course Assignment</div>
              <button className="btn btn-subtle btn-icon" onClick={() => setCreateAsgOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateAssignmentSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Course</label>
                  <select 
                    className="select"
                    value={newAsgData.courseId}
                    onChange={(e) => setNewAsgData({ ...newAsgData, courseId: e.target.value })}
                  >
                    {taughtCourses.map(c => (
                      <option key={c.id} value={c.id}>{c.code}: {c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Assignment Title</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="e.g. Lab 4: Graph Search Algorithms" 
                    value={newAsgData.title}
                    onChange={(e) => setNewAsgData({ ...newAsgData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Instructions & Rubric Criteria</label>
                  <textarea 
                    className="textarea" 
                    rows="3" 
                    placeholder="Specify project requirements, input/output formats, and grading criteria..."
                    value={newAsgData.description}
                    onChange={(e) => setNewAsgData({ ...newAsgData, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input 
                      type="date" 
                      className="input" 
                      value={newAsgData.dueDate}
                      onChange={(e) => setNewAsgData({ ...newAsgData, dueDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Total Points</label>
                    <input 
                      type="number" 
                      className="input" 
                      value={newAsgData.totalPoints}
                      onChange={(e) => setNewAsgData({ ...newAsgData, totalPoints: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setCreateAsgOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          Grading Modal with AI Feedback Assistant
          =================================================================== */}
      {gradingModalOpen && gradingItem && (
        <div className="modal-overlay" onClick={() => setGradingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="font-bold text-base">Grade Submission: {gradingItem.submission.studentName}</div>
                <div className="text-xs text-muted">{gradingItem.assignment.title}</div>
              </div>
              <button className="btn btn-subtle btn-icon" onClick={() => setGradingModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveGrade}>
              <div className="modal-body">
                
                {/* Student's Submission Preview */}
                <div style={{ backgroundColor: "var(--bg-subtle)", padding: "0.85rem", borderRadius: "var(--radius-sm)", marginBottom: "1rem" }}>
                  <div className="text-xs font-bold text-muted" style={{ marginBottom: "2px" }}>STUDENT'S SUBMITTED NOTES:</div>
                  <p className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>
                    {gradingItem.submission.content || "No textual notes provided."}
                  </p>
                  <div className="text-xs text-muted font-mono" style={{ marginTop: "4px" }}>
                    Attached file: {gradingItem.submission.attachmentName}
                  </div>
                </div>

                {/* 1-Click AI Auto-Grading Assistant */}
                <div style={{
                  backgroundColor: "var(--primary-light)",
                  border: "1px solid var(--primary-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.85rem",
                  marginBottom: "1.25rem"
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary-color">
                      <Sparkles size={14} /> AI Rubric Auto-Grading Assistant
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm text-xs"
                      onClick={handleApplyAiFeedback}
                    >
                      Apply AI Recommendation
                    </button>
                  </div>
                  <div className="text-xs" style={{ color: "var(--primary-text)" }}>
                    Calculates conceptual correctness, complexity efficiency, and generates structured feedback automatically.
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Grade Score (out of {gradingItem.assignment.totalPoints})</label>
                  <input 
                    type="number" 
                    className="input" 
                    min="0" 
                    max={gradingItem.assignment.totalPoints}
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Faculty Feedback & Remarks</label>
                  <textarea 
                    className="textarea" 
                    rows="3" 
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setGradingModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save & Publish Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
