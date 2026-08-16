import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_ATTENDANCE,
  INITIAL_EXAMS,
  AI_ACADEMIC_INSIGHTS,
  ANNOUNCEMENTS,
  FAQS
} from "../data/initialData";

const AcademicContext = createContext();

export function AcademicProvider({ children }) {
  // Theme state (persisted)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("edupulse_theme") || "light";
  });

  // Active User / Persona state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("edupulse_users_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USERS;
      }
    }
    return INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem("edupulse_current_user_id") || "stu-1"; // Default Alex Chen (Student)
  });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("edupulse_logged_in");
    return savedAuth === "true";
  });

  // Portal selection state ('student' | 'institutional')
  const [portalTarget, setPortalTarget] = useState("student");

  // Courses state
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("edupulse_courses");
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // Assignments state
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("edupulse_assignments");
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  // Attendance state
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("edupulse_attendance");
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  // Exams & Grades state
  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem("edupulse_exams");
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  // Active view routing ('portal-selection', 'student-login', 'institutional-login', 'home', 'courses', 'course-detail', 'contact', 'dashboard', 'teacher-dashboard', 'admin-dashboard')
  const [currentView, setCurrentView] = useState(() => {
    const savedAuth = localStorage.getItem("edupulse_logged_in") === "true";
    if (!savedAuth) return "portal-selection";
    const savedUserId = localStorage.getItem("edupulse_current_user_id") || "stu-1";
    if (savedUserId === "tea-1") return "teacher-dashboard";
    if (savedUserId === "adm-1") return "admin-dashboard";
    return "dashboard";
  });

  const [selectedCourseId, setSelectedCourseId] = useState("cs-101");
  const [reportModalStudent, setReportModalStudent] = useState(null);
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // AI Academic Tutor Chat state
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Academic Intelligence Advisor. I've analyzed your attendance, recent course benchmarks, and conceptual diagnostics. How can I assist your study plan today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Sync theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("edupulse_theme", theme);
  }, [theme]);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem("edupulse_users_v2", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("edupulse_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("edupulse_assignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("edupulse_attendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("edupulse_exams", JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem("edupulse_current_user_id", currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem("edupulse_logged_in", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Open Portals
  const openStudentPortal = () => {
    setPortalTarget("student");
    setCurrentView("student-login");
  };

  const openInstitutionalPortal = () => {
    setPortalTarget("institutional");
    setCurrentView("institutional-login");
  };

  // Update Display Name (Feature 2)
  const updateCurrentUserName = (newName) => {
    if (!newName || !newName.trim()) {
      addToast("Display name cannot be empty.", "warning");
      return false;
    }
    const trimmedName = newName.trim();
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, name: trimmedName };
      }
      return u;
    }));
    addToast("Profile name updated successfully.", "success");
    return true;
  };

  // Demo Login Handler
  const loginWithPersona = (roleOrId) => {
    setIsAuthenticated(true);
    if (roleOrId === "student" || roleOrId === "stu-1") {
      setCurrentUserId("stu-1");
      setCurrentView("dashboard");
      addToast("Logged into Student Portal as Alex Chen", "success");
    } else if (roleOrId === "student-at-risk" || roleOrId === "stu-2") {
      setCurrentUserId("stu-2");
      setCurrentView("dashboard");
      addToast("Logged into Student Portal as Maya Patel", "warning");
    } else if (roleOrId === "teacher" || roleOrId === "tea-1") {
      setCurrentUserId("tea-1");
      setCurrentView("teacher-dashboard");
      addToast("Logged into Faculty Portal as Dr. Sarah Bennett", "success");
    } else if (roleOrId === "admin" || roleOrId === "adm-1") {
      setCurrentUserId("adm-1");
      setCurrentView("admin-dashboard");
      addToast("Logged into Administrator Portal as Marcus Vance", "success");
    } else {
      const found = users.find(u => u.id === roleOrId);
      if (found) {
        setCurrentUserId(found.id);
        if (found.role === "student") setCurrentView("dashboard");
        else if (found.role === "teacher") setCurrentView("teacher-dashboard");
        else setCurrentView("admin-dashboard");
        addToast(`Signed in as ${found.name}`, "info");
      }
    }
  };

  // Switch persona helper while logged in
  const switchPersona = (target) => {
    setIsAuthenticated(true);
    if (target === "student") {
      setCurrentUserId("stu-1"); // Alex Chen
      setCurrentView("dashboard");
      addToast("Switched account to Student: Alex Chen", "success");
    } else if (target === "student-at-risk") {
      setCurrentUserId("stu-2"); // Maya Patel
      setCurrentView("dashboard");
      addToast("Switched account to Maya Patel", "warning");
    } else if (target === "teacher") {
      setCurrentUserId("tea-1"); // Dr. Sarah Bennett
      setCurrentView("teacher-dashboard");
      addToast("Switched account to Faculty: Dr. Sarah Bennett", "success");
    } else if (target === "admin") {
      setCurrentUserId("adm-1"); // Marcus Vance
      setCurrentView("admin-dashboard");
      addToast("Switched account to Administrator: Marcus Vance", "success");
    } else {
      const found = users.find(u => u.id === target);
      if (found) {
        setCurrentUserId(found.id);
        if (found.role === "student") setCurrentView("dashboard");
        else if (found.role === "teacher") setCurrentView("teacher-dashboard");
        else setCurrentView("admin-dashboard");
        addToast(`Switched account to ${found.name}`, "info");
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView("portal-selection");
    addToast("Signed out successfully. Returned to Portal Selection.", "info");
  };

  // Student Actions
  const enrollInCourse = (courseId) => {
    if (!isAuthenticated || !currentUser || currentUser.role !== "student") {
      addToast("Please sign in to the Student Portal to enroll in courses.", "warning");
      openStudentPortal();
      return false;
    }
    if (currentUser.enrolledCourseIds && currentUser.enrolledCourseIds.includes(courseId)) {
      addToast("You are already enrolled in this course!", "info");
      return false;
    }
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const enrolled = u.enrolledCourseIds || [];
        return { ...u, enrolledCourseIds: [...enrolled, courseId] };
      }
      return u;
    }));
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolledCount: (c.enrolledCount || 0) + 1 };
      }
      return c;
    }));
    addToast(`Successfully enrolled in course! Check your Student Dashboard.`, "success");
    return true;
  };

  const submitAssignment = (assignmentId, content, attachmentName = "submission_file.pdf") => {
    const aiScore = Math.floor(Math.random() * 18) + 82; // 82 to 99
    const aiFeedback = {
      score: aiScore,
      summary: "Comprehensive academic submission demonstrating strong grasp of principles and sound methodology.",
      strengths: ["Clear logical structure and concise documentation", "Correct application of core formulas and edge handling"],
      improvements: ["Provide additional empirical runtime benchmarks under stress testing."]
    };

    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        const existingSubs = asg.submissions || [];
        const filtered = existingSubs.filter(s => s.studentId !== currentUser.id);
        const newSubmission = {
          studentId: currentUser.id,
          studentName: currentUser.name,
          submittedAt: new Date().toISOString(),
          content: content || "Completed theoretical analysis and computational implementation.",
          attachmentName: attachmentName,
          grade: aiScore,
          feedback: `Auto-reviewed by EduPulse AI Rubric: Score ${aiScore}/100. Pending final teacher confirmation.`,
          aiEvaluation: aiFeedback
        };
        return {
          ...asg,
          status: "submitted",
          submissions: [...filtered, newSubmission]
        };
      }
      return asg;
    }));

    addToast("Assignment submitted successfully! AI evaluation report generated.", "success");
  };

  // Teacher Actions
  const markAttendance = (courseId, date, recordMap) => {
    const newRecordList = Object.entries(recordMap).map(([studentId, status]) => {
      const student = users.find(u => u.id === studentId);
      return {
        studentId,
        studentName: student ? student.name : "Student",
        status
      };
    });

    const newAttendanceEntry = {
      id: "att-" + Date.now(),
      courseId,
      date,
      records: newRecordList
    };

    setAttendance(prev => [newAttendanceEntry, ...prev]);
    addToast(`Attendance for ${date} recorded successfully for ${newRecordList.length} students!`, "success");
  };

  const gradeAssignment = (assignmentId, studentId, grade, feedback) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        const updatedSubs = (asg.submissions || []).map(sub => {
          if (sub.studentId === studentId) {
            return {
              ...sub,
              grade: Number(grade),
              feedback: feedback || "Graded by faculty instructor."
            };
          }
          return sub;
        });
        return {
          ...asg,
          status: "graded",
          submissions: updatedSubs
        };
      }
      return asg;
    }));
    addToast(`Grade (${grade} pts) and feedback saved for student.`, "success");
  };

  const createAssignment = (newAsg) => {
    const assignmentObj = {
      id: "asg-" + Date.now(),
      submissions: [],
      status: "pending",
      ...newAsg
    };
    setAssignments(prev => [assignmentObj, ...prev]);
    addToast(`New assignment '${assignmentObj.title}' created and published!`, "success");
  };

  const createExam = (newExam) => {
    const examObj = {
      id: "exam-" + Date.now(),
      gradesRecorded: [],
      ...newExam
    };
    setExams(prev => [examObj, ...prev]);
    addToast(`New examination '${examObj.title}' scheduled!`, "success");
  };

  const recordExamGrade = (examId, studentId, marks, grade) => {
    setExams(prev => prev.map(ex => {
      if (ex.id === examId) {
        const student = users.find(u => u.id === studentId);
        const existingGrades = ex.gradesRecorded || [];
        const filtered = existingGrades.filter(g => g.studentId !== studentId);
        const newRecord = {
          studentId,
          studentName: student ? student.name : "Student",
          marks: Number(marks),
          grade: grade || (marks >= 90 ? "A" : marks >= 80 ? "B" : marks >= 70 ? "C" : "D")
        };
        return {
          ...ex,
          gradesRecorded: [...filtered, newRecord]
        };
      }
      return ex;
    }));
    addToast(`Exam marks recorded successfully.`, "success");
  };

  // Admin Actions (CRUD)
  const addStudent = (studentData) => {
    const newStudent = {
      id: "stu-" + Date.now(),
      role: "student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      gpa: 8.50,
      attendanceRate: 85.0,
      riskLevel: "Low",
      enrolledCourseIds: ["cs-101"],
      ...studentData
    };
    setUsers(prev => [...prev, newStudent]);
    addToast(`Student '${newStudent.name}' registered into institutional database.`, "success");
  };

  const updateStudent = (studentId, updatedData) => {
    setUsers(prev => prev.map(u => u.id === studentId ? { ...u, ...updatedData } : u));
    addToast("Student record updated successfully.", "success");
  };

  const deleteStudent = (studentId) => {
    setUsers(prev => prev.filter(u => u.id !== studentId));
    addToast("Student record removed from registry.", "info");
  };

  const addCourse = (courseData) => {
    const newCourse = {
      id: "crs-" + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      enrolledCount: 0,
      capacity: 60,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      syllabus: [
        { week: "Week 1-4", title: "Core Fundamentals", topics: ["Foundational concepts", "Hands-on laboratory"] },
        { week: "Week 5-8", title: "Advanced Applications", topics: ["Case studies", "Final capstone"] }
      ],
      ...courseData
    };
    setCourses(prev => [...prev, newCourse]);
    addToast(`New course '${newCourse.title}' created and listed!`, "success");
  };

  // AI Chat Tutor interaction
  const sendAiMessage = (userText) => {
    if (!userText.trim()) return;

    const userMsg = {
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const qLower = userText.toLowerCase();
      let reply = "That's a thoughtful academic inquiry. Based on your current curriculum metrics, I recommend reviewing foundational definitions, solving 3 practice problems, and reviewing Dr. Sarah Bennett's lecture slides.";

      if (qLower.includes("avl") || qLower.includes("tree") || qLower.includes("balance")) {
        reply = "For AVL trees, remember the four rotation cases: Left-Left (single right rotation), Right-Right (single left rotation), Left-Right (left rotation on child, then right on node), and Right-Left. Always update heights after pointer rewiring!";
      } else if (qLower.includes("transformer") || qLower.includes("attention") || qLower.includes("deep learning")) {
        reply = "In Scaled Dot-Product Attention: Attention(Q,K,V) = softmax((Q * K^T) / sqrt(d_k)) * V. Scaling by sqrt(d_k) prevents dot-products from growing excessively large in high dimensions, keeping gradients stable in softmax.";
      } else if (qLower.includes("eigen") || qLower.includes("svd") || qLower.includes("linear algebra")) {
        reply = "To compute eigenvalues: solve det(A - λI) = 0 for λ. For Singular Value Decomposition (SVD): A = U * Σ * V^T, where columns of U are eigenvectors of A*A^T and columns of V are eigenvectors of A^T*A. This decomposes any matrix into rotation, scaling, and rotation!";
      } else if (qLower.includes("study plan") || qLower.includes("schedule") || qLower.includes("exam") || qLower.includes("plan")) {
        reply = "Your personalized 3-day recovery roadmap: 1. Dedicate 45 minutes on Wednesday to Linear Algebra Eigenvectors & SVD Module 4. 2. Review the Spark sliding window assignment notes. 3. Complete the interactive practice quiz on your Student Dashboard!";
      } else if (qLower.includes("risk") || qLower.includes("attendance")) {
        reply = `Your overall attendance is currently ${currentUser.attendanceRate}%. ${currentUser.attendanceRate < 75 ? "⚠️ You are below the 75% mandatory threshold. Please schedule a faculty advising session." : "You are currently in compliant academic standing."}`;
      }

      const aiMsg = {
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAiChatMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const navigateTo = (view, courseId = null) => {
    setCurrentView(view);
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const value = {
    theme,
    toggleTheme,
    users,
    currentUser,
    currentUserId,
    isAuthenticated,
    portalTarget,
    setPortalTarget,
    openStudentPortal,
    openInstitutionalPortal,
    loginWithPersona,
    switchPersona,
    logout,
    updateCurrentUserName,
    profileSettingsOpen,
    setProfileSettingsOpen,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    assignments,
    attendance,
    exams,
    currentView,
    setCurrentView,
    navigateTo,
    toasts,
    addToast,
    removeToast,
    reportModalStudent,
    setReportModalStudent,
    enrollInCourse,
    submitAssignment,
    markAttendance,
    gradeAssignment,
    createAssignment,
    createExam,
    recordExamGrade,
    addStudent,
    updateStudent,
    deleteStudent,
    addCourse,
    aiChatMessages,
    sendAiMessage,
    aiInsights: AI_ACADEMIC_INSIGHTS,
    announcements: ANNOUNCEMENTS,
    faqs: FAQS
  };

  return (
    <AcademicContext.Provider value={value}>
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error("useAcademic must be used within an AcademicProvider");
  }
  return context;
}
