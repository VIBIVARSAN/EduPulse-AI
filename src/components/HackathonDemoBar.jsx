import React from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Shield,
  FileText,
  Lock,
  ArrowRight,
  UserCheck
} from "lucide-react";

export default function HackathonDemoBar() {
  const {
    currentView,
    navigateTo,
    switchPersona,
    currentUser,
    users,
    setReportModalStudent,
    isAuthenticated
  } = useAcademic();

  const allStudents = users.filter(u => u.role === "student");

  return (
    <div className="hackathon-tour-bar no-print">
      <div className="container flex items-center justify-between flex-wrap gap-2" style={{ padding: "0 1rem" }}>
        
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="badge badge-primary text-xs flex items-center gap-1 font-mono">
            <Sparkles size={12} /> HACKATHON LIVE DEMO FLOW
          </span>
          <span className="text-xs text-muted" style={{ display: "none" }}>
            Click steps to evaluate end-to-end intelligence:
          </span>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-1 flex-wrap">
          
          <button 
            className={`tour-step-btn ${currentView === "login" ? "active" : ""}`}
            onClick={() => navigateTo("login")}
            title="Step 1: Demo Login Portal"
          >
            <Lock size={12} />
            <span>1. Login Portal</span>
          </button>

          <span className="text-muted" style={{ fontSize: "0.7rem" }}>→</span>

          <button 
            className={`tour-step-btn ${currentView === "dashboard" && currentUser.id === "stu-1" ? "active" : ""}`}
            onClick={() => switchPersona("student")}
            title="Step 2: Student AI Diagnostics & Recommendations"
          >
            <GraduationCap size={12} />
            <span>2. Student AI Intelligence</span>
          </button>

          <span className="text-muted" style={{ fontSize: "0.7rem" }}>→</span>

          <button 
            className={`tour-step-btn ${currentView === "dashboard" && currentUser.id === "stu-2" ? "active" : ""}`}
            onClick={() => switchPersona("student-at-risk")}
            title="Step 2B: At-Risk Student Alert Telemetry"
          >
            <span style={{ color: "var(--danger)", fontWeight: "bold" }}>⚠️</span>
            <span>2B. High-Risk Alert</span>
          </button>

          <span className="text-muted" style={{ fontSize: "0.7rem" }}>→</span>

          <button 
            className={`tour-step-btn ${currentView === "teacher-dashboard" ? "active" : ""}`}
            onClick={() => switchPersona("teacher")}
            title="Step 3: Teacher Attendance & AI Auto-Grading"
          >
            <BookOpen size={12} />
            <span>3. Faculty Desk & Intervention</span>
          </button>

          <span className="text-muted" style={{ fontSize: "0.7rem" }}>→</span>

          <button 
            className={`tour-step-btn ${currentView === "admin-dashboard" ? "active" : ""}`}
            onClick={() => switchPersona("admin")}
            title="Step 4: Institutional Analytics & Risk Matrix"
          >
            <Shield size={12} />
            <span>4. Admin Analytics</span>
          </button>

          <span className="text-muted" style={{ fontSize: "0.7rem" }}>→</span>

          <button 
            className="tour-step-btn"
            onClick={() => setReportModalStudent(allStudents[0])}
            title="Step 5: Printable Academic Audit Report"
          >
            <FileText size={12} />
            <span>5. Official Report</span>
          </button>

        </div>

      </div>
    </div>
  );
}
