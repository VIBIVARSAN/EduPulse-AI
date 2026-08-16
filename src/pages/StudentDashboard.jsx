import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  TrendingUp,
  Award,
  Send,
  Upload,
  BarChart3,
  BrainCircuit,
  Lightbulb,
  Printer,
  Check,
  HelpCircle,
  Play,
  ArrowRight,
  ShieldCheck,
  Info,
  Settings,
  Edit2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function StudentDashboard() {
  const {
    currentUser,
    courses,
    assignments,
    attendance,
    exams,
    aiInsights,
    submitAssignment,
    setReportModalStudent,
    aiChatMessages,
    sendAiMessage,
    navigateTo,
    setSelectedCourseId,
    setProfileSettingsOpen,
    addToast
  } = useAcademic();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'courses' | 'assignments' | 'attendance' | 'exams' | 'ai-intelligence'
  
  // Assignment submission modal state
  const [submittingAsg, setSubmittingAsg] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFileName, setSubmissionFileName] = useState("my_solution_v1.zip");

  // Quiz state
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // AI Chat input
  const [chatInput, setChatInput] = useState("");

  const enrolledCourses = courses.filter((c) => currentUser.enrolledCourseIds?.includes(c.id));
  
  const studentAssignments = assignments.map((asg) => {
    const sub = asg.submissions?.find((s) => s.studentId === currentUser.id);
    return {
      ...asg,
      studentSubmission: sub || null
    };
  });

  const studentAttendanceRecords = attendance.flatMap((att) => {
    const rec = att.records?.find((r) => r.studentId === currentUser.id);
    if (!rec) return [];
    const course = courses.find((c) => c.id === att.courseId);
    return [{
      id: att.id,
      date: att.date,
      courseCode: course ? course.code : "CS 101",
      courseTitle: course ? course.title : "Course",
      status: rec.status
    }];
  });

  // Calculate dynamic risk level
  const isHighRisk = currentUser.riskLevel === "High" || currentUser.attendanceRate < 75;
  const isModerateRisk = !isHighRisk && (currentUser.gpa < 7.5 || currentUser.attendanceRate < 80);
  const riskLabel = isHighRisk ? "HIGH RISK" : isModerateRisk ? "MODERATE RISK" : "LOW RISK";

  const quizQuestions = [
    {
      id: 1,
      course: "CS 101",
      question: "What is the worst-case time complexity of searching in an AVL Tree?",
      options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
      correct: 1,
      explanation: "AVL trees are height-balanced with balance factor in {-1, 0, 1}, ensuring max height <= 1.44 * log2(N)."
    },
    {
      id: 2,
      course: "CS 204",
      question: "In Transformer models, what is the formula for Scaled Dot-Product Attention?",
      options: [
        "Softmax(Q * K^T / sqrt(d_k)) * V",
        "Sigmoid(Q * K + V)",
        "ReLU(Q * K^T) * V",
        "Tanh(Q / K) * V"
      ],
      correct: 0,
      explanation: "Attention(Q,K,V) = Softmax(QK^T / sqrt(d_k)) * V, where scaling by sqrt(d_k) prevents vanishing gradients in softmax."
    },
    {
      id: 3,
      course: "MA 202",
      question: "Which of the following is true for a real symmetric matrix?",
      options: [
        "All eigenvalues are purely imaginary",
        "It can always be orthogonally diagonalized",
        "Determinant is always zero",
        "It cannot have orthonormal eigenvectors"
      ],
      correct: 1,
      explanation: "By the Spectral Theorem, any real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors."
    }
  ];

  const handleQuizAnswer = (optionIdx) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(optionIdx);
  };

  const submitQuizQuestion = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === quizQuestions[activeQuizQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (activeQuizQuestion < quizQuestions.length - 1) {
      setActiveQuizQuestion(prev => prev + 1);
      setSelectedQuizOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!submittingAsg) return;
    submitAssignment(submittingAsg.id, submissionText, submissionFileName);
    setSubmittingAsg(null);
    setSubmissionText("");
    confetti({ particleCount: 80, spread: 60 });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendAiMessage(chatInput);
    setChatInput("");
  };

  const startAiStudyPlan = () => {
    setActiveTab("ai-intelligence");
    sendAiMessage("Please generate a personalized 3-day recovery study plan for my weak areas in Linear Algebra (Eigenvalues & SVD).");
    addToast("AI Study Plan generated! Check your AI Academic Intelligence conversation.", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1.5rem 4rem 1.5rem" }}>
      
      {/* ===================================================================
          Student Profile Header Banner
          =================================================================== */}
      <div className="card" style={{ padding: "1.75rem 2rem", marginBottom: "1.75rem" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                objectFit: "cover",
                border: isHighRisk ? "3px solid var(--danger)" : "3px solid var(--primary-light)"
              }}
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
                <span className={`badge ${isHighRisk ? "badge-danger" : "badge-primary"}`}>
                  {currentUser.year}
                </span>
                {isHighRisk && (
                  <span className="badge badge-danger flex items-center gap-1 font-mono">
                    <AlertTriangle size={11} /> ACADEMIC NOTICE
                  </span>
                )}
              </div>
              <div className="text-xs text-muted" style={{ marginTop: "3px" }}>
                Student ID: <span className="font-mono font-bold text-primary-color">{currentUser.studentId}</span> • {currentUser.department} • Academic Advisor: <strong>{currentUser.advisor}</strong>
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
              onClick={() => setReportModalStudent(currentUser)}
            >
              <Printer size={15} />
              <span>Official Academic Transcript</span>
            </button>
          </div>

        </div>

        {/* 4 Core KPI Cards (10.0 Scale CGPA) */}
        <div className="grid grid-cols-4 gap-4" style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-light)" }}>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
              <Award size={24} />
            </div>
            <div>
              <div className="stat-value">{currentUser.gpa.toFixed(2)}</div>
              <div className="stat-label">Cumulative CGPA (/10.0)</div>
              <div className="stat-trend text-success-color">
                <TrendingUp size={12} /> {currentUser.gpa >= 8.5 ? "First Class with Distinction" : "First Class"}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: isHighRisk ? "var(--danger-light)" : "var(--success-light)", color: isHighRisk ? "var(--danger)" : "var(--success)" }}>
              <Clock size={24} />
            </div>
            <div>
              <div className="stat-value" style={{ color: isHighRisk ? "var(--danger)" : "inherit" }}>
                {currentUser.attendanceRate}%
              </div>
              <div className="stat-label">Overall Attendance</div>
              <div className="stat-trend" style={{ color: isHighRisk ? "var(--danger)" : "var(--success)" }}>
                {isHighRisk ? "⚠️ Below 75% Mandatory Cutoff" : "✓ Examination Compliant"}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>
              <BookOpen size={24} />
            </div>
            <div>
              <div className="stat-value">{enrolledCourses.length}</div>
              <div className="stat-label">Enrolled Courses</div>
              <div className="stat-trend text-primary-color">
                14 Credits In Progress
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "var(--warning-light)", color: "var(--warning)" }}>
              <FileText size={24} />
            </div>
            <div>
              <div className="stat-value">{studentAssignments.filter(a => !a.studentSubmission).length}</div>
              <div className="stat-label">Pending Submissions</div>
              <div className="stat-trend text-warning-color">
                Next Due: in 4 days
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===================================================================
          PROMINENT SECTION: AI Academic Intelligence & Early Risk Detection
          =================================================================== */}
      <section style={{ marginBottom: "2rem" }}>
        <div className={`card ${isHighRisk ? "risk-card-high" : "risk-card-low"}`} style={{ padding: "1.75rem" }}>
          
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-light)" }}>
            <div className="flex items-center gap-2">
              <BrainCircuit size={22} color={isHighRisk ? "var(--danger)" : "var(--primary)"} />
              <div>
                <div className="font-extrabold text-base" style={{ letterSpacing: "-0.02em" }}>
                  AI Academic Intelligence & Early Risk Detection
                </div>
                <div className="text-xs text-muted">
                  Automated analytics aggregating attendance, assignment scoring patterns, and conceptual quiz diagnostics
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`badge ${isHighRisk ? "badge-danger" : "badge-success"} font-mono text-xs font-bold`}>
                {riskLabel}
              </span>
              <span className="badge badge-neutral text-xs font-mono">
                <Info size={11} /> AI Academic Intelligence System
              </span>
            </div>
          </div>

          {/* Body: Risk Telemetry Breakdown & Weak Subject Identification */}
          <div className="grid grid-cols-3 gap-6 items-center">
            
            {/* Telemetry Metrics */}
            <div style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              padding: "1rem"
            }}>
              <div className="text-xs font-bold text-muted" style={{ marginBottom: "0.5rem" }}>
                ACADEMIC PERFORMANCE METRICS
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center">
                  <span>Class Attendance:</span>
                  <strong style={{ color: currentUser.attendanceRate < 75 ? "var(--danger)" : "var(--success)" }}>
                    {currentUser.attendanceRate}% {currentUser.attendanceRate < 75 ? "(Warning: <75%)" : "(Safe)"}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current CGPA:</span>
                  <strong>{currentUser.gpa.toFixed(2)} / 10.0</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Missing Assignments:</span>
                  <strong style={{ color: isHighRisk ? "var(--danger)" : "inherit" }}>
                    {isHighRisk ? "2 Overdue" : "0 Missing"}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Quiz Accuracy:</span>
                  <strong>{isHighRisk ? "66.7%" : "95.0%"}</strong>
                </div>
              </div>
            </div>

            {/* Weak Topic & AI Personalized Recommendation */}
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <span className="badge badge-warning text-xs font-semibold" style={{ marginBottom: "0.25rem" }}>
                  <Lightbulb size={12} /> Weak Topic Detected: Linear Algebra & Optimization — Module 4 (Eigenvalues & SVD)
                </span>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", marginTop: "4px" }}>
                  {isHighRisk ? (
                    "⚠️ Urgent Action Required: Your attendance has dropped to 71%, and coursework trajectory shows declining comprehension in Linear Algebra."
                  ) : (
                    `💡 Recommendation: Your current CGPA is strong (${currentUser.gpa.toFixed(2)}/10.0). To secure an Outstanding (O) grade, revise Singular Value Decomposition & Orthogonal Projections.`
                  )}
                </p>
                <p className="text-xs text-muted" style={{ marginTop: "4px", lineHeight: 1.5 }}>
                  AI Suggestion: Complete 3 targeted matrix diagonalization problems and review Prof. Alan Turing's recorded lecture before the midterm exam.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: "1rem" }}>
                <button 
                  className="btn btn-primary btn-sm flex items-center gap-1"
                  onClick={startAiStudyPlan}
                >
                  <Sparkles size={14} />
                  <span>Start AI Study Plan</span>
                  <ArrowRight size={14} />
                </button>
                <button 
                  className="btn btn-secondary btn-sm flex items-center gap-1"
                  onClick={() => setActiveTab("exams")}
                >
                  <BrainCircuit size={14} />
                  <span>Practice Concept Quiz</span>
                </button>
                <button 
                  className="btn btn-subtle btn-sm flex items-center gap-1"
                  onClick={() => setReportModalStudent(currentUser)}
                >
                  <FileText size={14} />
                  <span>Audit Transcript</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="tab-nav">
        <button 
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview & Schedule
        </button>
        <button 
          className={`tab-btn ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          My Courses ({enrolledCourses.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "assignments" ? "active" : ""}`}
          onClick={() => setActiveTab("assignments")}
        >
          Assignments & AI Rubrics
        </button>
        <button 
          className={`tab-btn ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance Monitor
        </button>
        <button 
          className={`tab-btn ${activeTab === "exams" ? "active" : ""}`}
          onClick={() => setActiveTab("exams")}
        >
          Interactive Quizzes & Exams
        </button>
        <button 
          className={`tab-btn ${activeTab === "ai-intelligence" ? "active" : ""}`}
          onClick={() => setActiveTab("ai-intelligence")}
        >
          <Sparkles size={14} color="var(--primary)" /> AI Academic Intelligence Advisor
        </button>
      </div>

      {/* ===================================================================
          TAB 1: Overview & Today's Schedule
          =================================================================== */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Active Classes & Next Deadlines */}
          <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Enrolled Courses Quick View */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <BookOpen size={18} color="var(--primary)" />
                  <span>Enrolled Courses</span>
                </div>
                <button className="btn btn-subtle btn-sm" onClick={() => setActiveTab("courses")}>
                  View All
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {enrolledCourses.map((c) => (
                  <div 
                    key={c.id}
                    style={{
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "var(--bg-surface)"
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary-color">{c.code}</span>
                        <span className="font-bold text-sm">{c.title}</span>
                      </div>
                      <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                        Instructor: {c.instructorName} • {c.schedule} • Room: {c.room}
                      </div>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        navigateTo("course-detail", c.id);
                      }}
                    >
                      Syllabus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Assignment Deadlines */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileText size={18} color="var(--primary)" />
                  <span>Upcoming Assignments</span>
                </div>
                <button className="btn btn-subtle btn-sm" onClick={() => setActiveTab("assignments")}>
                  Assignment Hub
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {studentAssignments.slice(0, 3).map((asg) => (
                  <div 
                    key={asg.id}
                    style={{
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-muted">{asg.courseCode}</span>
                        <span className="font-semibold text-sm">{asg.title}</span>
                      </div>
                      <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                        Due Date: {new Date(asg.dueDate).toLocaleDateString()} • {asg.totalPoints} Points
                      </div>
                    </div>

                    {asg.studentSubmission ? (
                      <span className="badge badge-success text-xs flex items-center gap-1">
                        <CheckCircle2 size={13} /> {asg.studentSubmission.grade !== null ? `Graded: ${asg.studentSubmission.grade}/100` : "Submitted"}
                      </span>
                    ) : (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setSubmittingAsg(asg)}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: AI Cognitive Recommendations & Daily Schedule */}
          <div className="flex flex-col gap-4">
            
            {/* AI Academic Snapshot Card */}
            <div className="card ai-glow-card">
              <div className="card-header" style={{ marginBottom: "0.75rem" }}>
                <div className="card-title text-sm">
                  <BrainCircuit size={16} color="var(--primary)" />
                  <span>AI Academic Advisory</span>
                </div>
              </div>

              <div className="text-xs text-secondary" style={{ lineHeight: 1.6, marginBottom: "1rem" }}>
                🎯 <strong>Priority Focus:</strong> Linear Algebra (SVD & Orthogonal Projections) has a diagnostic score of 72%. Dedicate 45 minutes to active problem sets this evening to protect your {currentUser.gpa.toFixed(2)} CGPA.
              </div>

              <button 
                className="btn btn-primary btn-sm flex items-center justify-center gap-1"
                style={{ width: "100%" }}
                onClick={() => setActiveTab("ai-intelligence")}
              >
                <Sparkles size={14} /> Open AI Academic Advisor
              </button>
            </div>

            {/* Quick Transcript Download */}
            <div className="card" style={{ backgroundColor: "var(--bg-subtle)" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                Official Academic Records
              </h4>
              <p className="text-xs text-muted" style={{ marginBottom: "1rem", lineHeight: 1.5 }}>
                Generate or print an official, watermarked university transcript with 10.0 scale CGPA breakdown and course records.
              </p>
              <button 
                className="btn btn-secondary btn-sm flex items-center justify-center gap-1"
                style={{ width: "100%" }}
                onClick={() => setReportModalStudent(currentUser)}
              >
                <Printer size={14} /> Generate Official Transcript
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ===================================================================
          TAB 2: My Courses
          =================================================================== */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="card flex flex-col justify-between" style={{ padding: "1.5rem" }}>
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: "0.75rem" }}>
                  <span className="badge badge-primary font-mono">{course.code}</span>
                  <span className="text-xs text-muted">{course.credits} Credits</span>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  {course.title}
                </h3>

                <p className="text-xs text-muted" style={{ lineHeight: 1.5, marginBottom: "1rem" }}>
                  {course.description}
                </p>

                <div className="text-xs text-secondary font-medium" style={{ marginBottom: "0.75rem" }}>
                  Instructor: <strong>{course.instructorName}</strong> • Room: {course.room}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-muted" style={{ marginBottom: "4px" }}>
                  <span>Syllabus Completion</span>
                  <span>65% Completed</span>
                </div>
                <div className="progress-bar-track" style={{ marginBottom: "1rem" }}>
                  <div className="progress-bar-fill primary" style={{ width: "65%" }} />
                </div>

                <div className="flex gap-2">
                  <button 
                    className="btn btn-secondary btn-sm flex-1"
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      navigateTo("course-detail", course.id);
                    }}
                  >
                    View Syllabus
                  </button>
                  <button 
                    className="btn btn-primary btn-sm flex-1"
                    onClick={() => setActiveTab("assignments")}
                  >
                    Assignments
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================
          TAB 3: Assignments & AI Rubric Evaluation
          =================================================================== */}
      {activeTab === "assignments" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Course Assignments & AI Evaluations</h3>
            <span className="badge badge-primary text-xs">
              {studentAssignments.length} Assignments Active
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {studentAssignments.map((asg) => {
              const sub = asg.studentSubmission;
              return (
                <div key={asg.id} className="card" style={{ padding: "1.5rem" }}>
                  <div className="flex items-start justify-between flex-wrap gap-3" style={{ marginBottom: "0.75rem" }}>
                    <div>
                      <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
                        <span className="badge badge-neutral font-mono text-xs">{asg.courseCode}</span>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}>{asg.title}</h4>
                      </div>
                      <p className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>
                        {asg.description}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div className="text-xs text-muted">Due: {new Date(asg.dueDate).toLocaleDateString()}</div>
                      <div className="font-bold text-sm" style={{ marginTop: "2px" }}>{asg.totalPoints} Points</div>
                    </div>
                  </div>

                  {/* Submission Status or AI Feedback */}
                  {sub ? (
                    <div style={{
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      padding: "1rem",
                      marginTop: "1rem"
                    }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} color="var(--success)" />
                          <span className="font-bold text-sm">Submission Evaluated</span>
                          <span className="text-xs text-muted font-mono">({sub.attachmentName})</span>
                        </div>
                        <span className="badge badge-success text-sm font-bold">
                          Score: {sub.grade}/100
                        </span>
                      </div>

                      <p className="text-xs text-secondary" style={{ marginBottom: "0.5rem" }}>
                        <strong>Student Notes:</strong> {sub.content}
                      </p>

                      {sub.aiEvaluation && (
                        <div style={{
                          backgroundColor: "var(--primary-light)",
                          border: "1px solid var(--primary-subtle)",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.75rem",
                          marginTop: "0.5rem"
                        }}>
                          <div className="flex items-center gap-1 text-xs font-bold text-primary-color" style={{ marginBottom: "0.25rem" }}>
                            <Sparkles size={13} /> AI Rubric Assessment:
                          </div>
                          <p className="text-xs" style={{ color: "var(--primary-text)", lineHeight: 1.5 }}>
                            {sub.aiEvaluation.summary}
                          </p>
                          <div className="text-xs" style={{ marginTop: "0.35rem", color: "var(--primary-text)" }}>
                            • <strong>Strengths:</strong> {sub.aiEvaluation.strengths.join(", ")}
                          </div>
                          <div className="text-xs" style={{ marginTop: "0.2rem", color: "var(--primary-text)" }}>
                            • <strong>Suggestions:</strong> {sub.aiEvaluation.improvements.join(", ")}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between" style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)" }}>
                      <span className="badge badge-warning text-xs">Submission Pending</span>
                      <button 
                        className="btn btn-primary btn-sm flex items-center gap-1"
                        onClick={() => setSubmittingAsg(asg)}
                      >
                        <Upload size={14} /> Submit Solution & Get AI Feedback
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 4: Attendance Monitor
          =================================================================== */}
      {activeTab === "attendance" && (
        <div className="flex flex-col gap-6">
          <div className="card">
            <div className="flex items-center justify-between" style={{ marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Subject-wise Attendance Tracker</h3>
                <p className="text-xs text-muted" style={{ marginTop: "2px" }}>
                  Institutional minimum requirement: 75.0% for examination clearance
                </p>
              </div>
              <div className="text-right">
                <span className="stat-value">{currentUser.attendanceRate}%</span>
                <div className="text-xs text-muted">Overall Average</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {enrolledCourses.map((course) => {
                const rate = course.id === "ma-202" && isHighRisk ? 68.0 : course.id === "ma-202" ? 72.0 : 92.5;
                const isBelow = rate < 75.0;
                return (
                  <div key={course.id} style={{ border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                      <div>
                        <span className="font-mono text-xs font-bold text-primary-color">{course.code}</span>
                        <span className="font-bold text-sm" style={{ marginLeft: "0.5rem" }}>{course.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm" style={{ color: isBelow ? "var(--danger)" : "var(--success)" }}>
                          {rate}%
                        </span>
                        {isBelow && (
                          <span className="badge badge-danger text-xs flex items-center gap-1">
                            <AlertTriangle size={12} /> Low Attendance
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="progress-bar-track">
                      <div 
                        className={`progress-bar-fill ${isBelow ? "danger" : "success"}`}
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Attendance Log */}
          <div className="card">
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>
              Recent Attendance Register Logs
            </h4>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAttendanceRecords.map((rec, idx) => (
                    <tr key={idx}>
                      <td className="font-mono text-xs">{rec.date}</td>
                      <td className="font-mono font-bold text-xs">{rec.courseCode}</td>
                      <td>{rec.courseTitle}</td>
                      <td>
                        <span className={`badge ${rec.status === "Present" ? "badge-success" : rec.status === "Late" ? "badge-warning" : "badge-danger"} text-xs`}>
                          {rec.status}
                        </span>
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
          TAB 5: Interactive Quizzes & Exams
          =================================================================== */}
      {activeTab === "exams" && (
        <div className="grid grid-cols-2 gap-8">
          
          {/* Left: Interactive Quiz Simulator */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <BrainCircuit size={18} color="var(--primary)" />
                <span>Interactive Concept Check Quiz</span>
              </div>
              <span className="badge badge-accent text-xs">Question {activeQuizQuestion + 1} of {quizQuestions.length}</span>
            </div>

            {quizFinished ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <Award size={48} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
                <h3 style={{ fontSize: "1.4rem", fontWeight: "800" }}>Quiz Completed!</h3>
                <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)", marginTop: "0.5rem" }}>
                  {quizScore} / {quizQuestions.length} Correct
                </div>
                <p className="text-xs text-muted" style={{ marginTop: "0.5rem" }}>
                  Your score has been logged to your AI Knowledge Mastery profile.
                </p>
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "1.25rem" }}
                  onClick={() => {
                    setActiveQuizQuestion(0);
                    setSelectedQuizOption(null);
                    setQuizSubmitted(false);
                    setQuizScore(0);
                    setQuizFinished(false);
                  }}
                >
                  Retake Practice Quiz
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2" style={{ marginBottom: "0.75rem" }}>
                  <span className="badge badge-neutral text-xs font-mono">{quizQuestions[activeQuizQuestion].course}</span>
                </div>

                <h4 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "1.25rem", lineHeight: 1.4 }}>
                  {quizQuestions[activeQuizQuestion].question}
                </h4>

                <div className="flex flex-col gap-2" style={{ marginBottom: "1.5rem" }}>
                  {quizQuestions[activeQuizQuestion].options.map((opt, idx) => {
                    let btnClass = "btn-secondary";
                    if (selectedQuizOption === idx) {
                      btnClass = "btn-primary";
                    }
                    if (quizSubmitted) {
                      if (idx === quizQuestions[activeQuizQuestion].correct) {
                        btnClass = "btn-success";
                      } else if (selectedQuizOption === idx) {
                        btnClass = "btn-danger";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        className={`btn ${btnClass} text-sm`}
                        style={{ textAlign: "left", justifyContent: "flex-start", padding: "0.75rem 1rem" }}
                        onClick={() => handleQuizAnswer(idx)}
                      >
                        <span className="font-mono font-bold" style={{ marginRight: "0.5rem" }}>{String.fromCharCode(65 + idx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div style={{
                    backgroundColor: "var(--bg-subtle)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem",
                    marginBottom: "1rem"
                  }}>
                    <div className="text-xs font-bold" style={{ marginBottom: "0.25rem" }}>Conceptual Explanation:</div>
                    <p className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>
                      {quizQuestions[activeQuizQuestion].explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {!quizSubmitted ? (
                    <button 
                      className="btn btn-primary btn-sm"
                      disabled={selectedQuizOption === null}
                      onClick={submitQuizQuestion}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={nextQuizQuestion}
                    >
                      {activeQuizQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Exam Schedules & Marks History */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Calendar size={18} color="var(--primary)" />
                <span>Scheduled Examinations & Grade History</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {exams.map((exam) => {
                const gradeRec = exam.gradesRecorded?.find(g => g.studentId === currentUser.id);
                return (
                  <div key={exam.id} style={{ border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.35rem" }}>
                      <span className="font-mono text-xs font-bold text-primary-color">{exam.courseCode}</span>
                      <span className="text-xs text-muted font-mono">{exam.date}</span>
                    </div>
                    <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.35rem" }}>
                      {exam.title}
                    </h4>
                    <div className="text-xs text-muted" style={{ marginBottom: "0.5rem" }}>
                      Time: {exam.time} • Weightage: {exam.weightage} • Total Marks: {exam.totalMarks}
                    </div>

                    <div className="flex items-center justify-between" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.5rem" }}>
                      <span className="text-xs font-semibold">Recorded Result:</span>
                      {gradeRec ? (
                        <span className="badge badge-success text-xs font-bold">
                          {gradeRec.marks} / {exam.totalMarks} ({gradeRec.grade})
                        </span>
                      ) : (
                        <span className="badge badge-neutral text-xs">Upcoming</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================
          TAB 6: AI Academic Intelligence & Live Study Advisor
          =================================================================== */}
      {activeTab === "ai-intelligence" && (
        <div className="grid grid-cols-2 gap-8">
          
          {/* Left: Mastery Breakdown & Weak Topic Diagnostics */}
          <div className="flex flex-col gap-6">
            
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <BrainCircuit size={18} color="var(--primary)" />
                  <span>Subject Mastery Diagnostics</span>
                </div>
                <span className="badge badge-primary text-xs">
                  {isHighRisk ? "74% Overall Mastery" : "92% Overall Mastery"}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold" style={{ marginBottom: "4px" }}>
                    <span>Data Structures (CS 101)</span>
                    <span className="text-success-color font-bold">{isHighRisk ? "80% (Proficient)" : "95% (Mastered)"}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill success" style={{ width: isHighRisk ? "80%" : "95%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold" style={{ marginBottom: "4px" }}>
                    <span>Machine Learning (CS 204)</span>
                    <span className="text-primary-color font-bold">{isHighRisk ? "75% (Moderate)" : "91% (Strong)"}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill primary" style={{ width: isHighRisk ? "75%" : "91%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold" style={{ marginBottom: "4px" }}>
                    <span>Big Data Systems (DS 301)</span>
                    <span className="text-primary-color font-bold">{isHighRisk ? "72% (Needs Attention)" : "92% (Strong)"}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill primary" style={{ width: isHighRisk ? "72%" : "92%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold" style={{ marginBottom: "4px" }}>
                    <span>Linear Algebra & Optimization (MA 202)</span>
                    <span className="text-warning-color font-bold">{isHighRisk ? "61% (Critical Review)" : "72% (Needs Revision)"}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill warning" style={{ width: isHighRisk ? "61%" : "72%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Weak Topic Identified & Actionable Recovery Plan */}
            <div className="card" style={{ backgroundColor: "var(--warning-light)", border: "1px solid var(--warning-border)" }}>
              <div className="flex items-center gap-2" style={{ marginBottom: "0.5rem" }}>
                <Lightbulb size={18} color="var(--warning-text)" />
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--warning-text)" }}>
                  Identified Weak Topic: Eigenvalues & SVD Decomposition
                </h4>
              </div>
              <p className="text-xs" style={{ color: "var(--warning-text)", lineHeight: 1.6 }}>
                Based on your recent problem set submissions, you scored lower on singular value low-rank approximations.
              </p>
              <div className="text-xs font-semibold" style={{ color: "var(--warning-text)", marginTop: "0.5rem" }}>
                AI Recommendation: Review Prof. Alan Turing's Week 5 lecture recording and practice 3 matrix diagonalization problems before the midterm.
              </div>
            </div>

          </div>

          {/* Right: Live Interactive AI Study Advisor Chat */}
          <div className="card flex flex-col justify-between" style={{ minHeight: "520px" }}>
            <div className="card-header">
              <div className="card-title">
                <Sparkles size={18} color="var(--primary)" />
                <span>AI Academic Study Advisor</span>
              </div>
              <span className="badge badge-success text-xs">Active 24/7</span>
            </div>

            {/* Chat message thread */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", padding: "0.5rem 0", maxHeight: "360px" }}>
              {aiChatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start"
                  }}
                >
                  <div 
                    style={{
                      maxWidth: "85%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: msg.sender === "user" ? "var(--primary)" : "var(--bg-subtle)",
                      color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                      fontSize: "0.85rem",
                      lineHeight: 1.5
                    }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-muted" style={{ marginTop: "2px", fontSize: "0.7rem" }}>
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex gap-1 flex-wrap" style={{ margin: "0.5rem 0" }}>
              <button 
                type="button" 
                className="badge badge-neutral text-xs" 
                style={{ cursor: "pointer" }}
                onClick={() => sendAiMessage("Explain AVL tree rotations simply.")}
              >
                💡 Explain AVL tree rotations
              </button>
              <button 
                type="button" 
                className="badge badge-neutral text-xs" 
                style={{ cursor: "pointer" }}
                onClick={() => sendAiMessage("How does Transformer attention work?")}
              >
                💡 Transformer Attention formula
              </button>
              <button 
                type="button" 
                className="badge badge-neutral text-xs" 
                style={{ cursor: "pointer" }}
                onClick={() => sendAiMessage("Generate a 3-day recovery study plan for me.")}
              >
                💡 3-Day Study Plan
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="flex gap-2" style={{ marginTop: "0.5rem" }}>
              <input 
                type="text" 
                className="input" 
                placeholder="Ask any academic or study question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-icon">
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* ===================================================================
          Assignment Submission Modal
          =================================================================== */}
      {submittingAsg && (
        <div className="modal-overlay" onClick={() => setSubmittingAsg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="font-bold text-base">Submit Solution: {submittingAsg.title}</div>
                <div className="text-xs text-muted">{submittingAsg.courseCode} • Due: {new Date(submittingAsg.dueDate).toLocaleDateString()}</div>
              </div>
              <button className="btn btn-subtle btn-icon" onClick={() => setSubmittingAsg(null)}>✕</button>
            </div>

            <form onSubmit={handleAssignmentSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Submission Notes / Code Explanation</label>
                  <textarea 
                    className="textarea" 
                    rows="4" 
                    placeholder="Describe your implementation approach, time complexity, and test results..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Attached Archive / Source File</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      className="input flex-1" 
                      value={submissionFileName}
                      onChange={(e) => setSubmissionFileName(e.target.value)}
                    />
                    <span className="badge badge-success text-xs">Ready</span>
                  </div>
                </div>

                <div style={{ backgroundColor: "var(--primary-light)", padding: "0.75rem", borderRadius: "var(--radius-sm)" }}>
                  <div className="flex items-center gap-1 text-xs font-bold text-primary-color">
                    <Sparkles size={13} /> Instant AI Rubric Evaluation
                  </div>
                  <div className="text-xs" style={{ color: "var(--primary-text)", marginTop: "2px" }}>
                    Submitting will immediately generate a constructive rubric score and improvement notes.
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSubmittingAsg(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex items-center gap-1">
                  <Upload size={14} /> Submit & Generate AI Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
