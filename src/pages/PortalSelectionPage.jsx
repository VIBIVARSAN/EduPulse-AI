import React from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Compass
} from "lucide-react";

export default function PortalSelectionPage() {
  const { openStudentPortal, openInstitutionalPortal, navigateTo } = useAcademic();

  return (
    <div style={{
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem 4rem 1.5rem",
      background: "radial-gradient(circle at top, var(--primary-light) 0%, var(--bg-main) 75%)"
    }}>
      <div style={{ width: "100%", maxWidth: "1040px" }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: "1rem" }}>
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)"
            }}>
              <GraduationCap size={30} />
            </div>
            <div style={{ textAlign: "left" }}>
              <h1 style={{ fontSize: "2.1rem", fontWeight: "800", letterSpacing: "-0.03em", margin: 0, lineHeight: 1.1 }}>
                Welcome to EduPulse <span style={{ color: "var(--primary)" }}>AI</span>
              </h1>
              <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>
                NEXT-GENERATION UNIVERSITY EDUCATION MANAGEMENT SYSTEM
              </div>
            </div>
          </div>
          
          <p style={{
            fontSize: "1.15rem",
            color: "var(--text-secondary)",
            fontWeight: "500",
            maxWidth: "600px",
            margin: "0 auto",
            letterSpacing: "-0.01em"
          }}>
            Intelligent Education. Personalized Growth.
          </p>
        </div>

        {/* Two Primary Portal Cards */}
        <div className="grid grid-cols-2 gap-8 items-stretch" style={{ marginBottom: "2.5rem" }}>
          
          {/* ===================================================================
              CARD 1: Student Portal
              =================================================================== */}
          <div 
            className="card card-interactive flex flex-col justify-between"
            style={{
              padding: "2.25rem 2rem",
              border: "1.5px solid var(--border-light)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "var(--shadow-md)"
            }}
            onClick={openStudentPortal}
          >
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <GraduationCap size={30} />
                </div>
                <span className="badge badge-primary font-mono text-xs">STUDENT ACCESS</span>
              </div>

              <h2 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                Student Portal
              </h2>

              <p className="text-sm text-secondary" style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Access courses, attendance, assignments, exams and AI-powered academic guidance.
              </p>

              <div className="flex flex-col gap-2" style={{ marginBottom: "1.5rem" }}>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--success)" />
                  <span>Enrolled Courses & Weekly Lecture Schedules</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--success)" />
                  <span>Assignment Submissions with Instant AI Rubric Feedback</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--success)" />
                  <span>Attendance Tracking with Mandatory Threshold Alerts</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--success)" />
                  <span>10.0 Scale CGPA & Official Academic Transcripts</span>
                </div>
              </div>
            </div>

            <div>
              <button 
                className="btn btn-primary btn-lg flex items-center justify-center gap-2"
                style={{ width: "100%", padding: "0.9rem 1.5rem", fontSize: "1rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                  openStudentPortal();
                }}
              >
                <span>Enter Student Portal</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* ===================================================================
              CARD 2: Admin / Faculty Portal
              =================================================================== */}
          <div 
            className="card card-interactive flex flex-col justify-between"
            style={{
              padding: "2.25rem 2rem",
              border: "1.5px solid var(--border-light)",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "var(--shadow-md)"
            }}
            onClick={openInstitutionalPortal}
          >
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--accent-light)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Building2 size={30} />
                </div>
                <span className="badge badge-accent font-mono text-xs">INSTITUTIONAL ACCESS</span>
              </div>

              <h2 style={{ fontSize: "1.6rem", fontWeight: "800", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                Admin / Faculty Portal
              </h2>

              <p className="text-sm text-secondary" style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Manage students, faculty, attendance, assessments and institutional analytics.
              </p>

              <div className="flex flex-col gap-2" style={{ marginBottom: "1.5rem" }}>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--accent)" />
                  <span>Faculty Daily Attendance Registers & Course Desks</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--accent)" />
                  <span>Assignment Controller & 1-Click AI Auto-Grading</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--accent)" />
                  <span>At-Risk Student Monitoring Matrix & Interventions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={14} color="var(--accent)" />
                  <span>Campus-wide Comparative Analytics & Audit Reports</span>
                </div>
              </div>
            </div>

            <div>
              <button 
                className="btn btn-secondary btn-lg flex items-center justify-center gap-2"
                style={{
                  width: "100%",
                  padding: "0.9rem 1.5rem",
                  fontSize: "1rem",
                  borderColor: "var(--accent)",
                  color: "var(--accent-text)"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  openInstitutionalPortal();
                }}
              >
                <span>Enter Admin / Faculty Portal</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Public Browsing Footer Bar */}
        <div style={{
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Compass size={16} color="var(--primary)" />
            <span>Prospective students and public visitors can explore accredited courses freely.</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-subtle btn-sm text-xs"
              onClick={() => navigateTo("home")}
            >
              Public Home Page
            </button>
            <button 
              className="btn btn-subtle btn-sm text-xs"
              onClick={() => navigateTo("courses")}
            >
              Course Directory
            </button>
            <button 
              className="btn btn-subtle btn-sm text-xs"
              onClick={() => navigateTo("contact")}
            >
              Contact & FAQ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
