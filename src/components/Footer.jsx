import React from "react";
import { GraduationCap, ShieldCheck, Award, Heart, BookOpen } from "lucide-react";
import { useAcademic } from "../context/AcademicContext";

export default function Footer() {
  const { navigateTo } = useAcademic();

  return (
    <footer style={{
      backgroundColor: "var(--bg-surface)",
      borderTop: "1px solid var(--border-light)",
      marginTop: "auto",
      padding: "3rem 0 2rem 0"
    }}>
      <div className="container">
        <div className="grid grid-cols-4 gap-8" style={{ marginBottom: "2.5rem" }}>
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: "1rem" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <GraduationCap size={20} />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: "800", letterSpacing: "-0.03em" }}>
                EduPulse <span style={{ color: "var(--primary)" }}>AI</span>
              </span>
            </div>
            <p className="text-sm text-muted" style={{ lineHeight: 1.6 }}>
              Next-generation institutional education management platform powering real-time academic intelligence, automated early intervention, and dynamic student learning pathways.
            </p>
            <div className="flex items-center gap-2" style={{ marginTop: "1rem" }}>
              <span className="badge badge-success text-xs">
                <ShieldCheck size={12} /> ABET & ISO 9001 Certified
              </span>
            </div>
          </div>

          {/* Academic Portals */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>Academic Portals</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <button 
                  onClick={() => navigateTo("dashboard")}
                  className="text-sm text-secondary hover-primary"
                  style={{ textAlign: "left" }}
                >
                  Student Dashboard & AI Coach
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("teacher-dashboard")}
                  className="text-sm text-secondary hover-primary"
                  style={{ textAlign: "left" }}
                >
                  Faculty Attendance & Grading Desk
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("admin-dashboard")}
                  className="text-sm text-secondary hover-primary"
                  style={{ textAlign: "left" }}
                >
                  Executive Administration & Analytics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("courses")}
                  className="text-sm text-secondary hover-primary"
                  style={{ textAlign: "left" }}
                >
                  Course Catalog & Curriculums
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Intelligence */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>AI Capabilities</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li className="text-sm text-muted">Predictive At-Risk Student Detection</li>
              <li className="text-sm text-muted">Automated Assignment Rubric Feedback</li>
              <li className="text-sm text-muted">Attendance Threshold Telemetry</li>
              <li className="text-sm text-muted">Personalized Study Roadmap Generation</li>
              <li className="text-sm text-muted">Institutional Grade Bell Curve Analysis</li>
            </ul>
          </div>

          {/* Support & Institutional Office */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>Registrar Office</h4>
            <p className="text-sm text-muted" style={{ marginBottom: "0.5rem" }}>
              Campus Center, Building 4<br />
              Mon – Fri: 08:30 AM – 05:00 PM EST
            </p>
            <p className="text-sm text-muted font-mono" style={{ marginBottom: "1rem" }}>
              registrar@edupulse.edu<br />
              +1 (800) 555-EDU-AI
            </p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo("contact")}
            >
              Contact Academic Support
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border-light)",
          paddingTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} EduPulse AI Academic Systems. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Privacy Policy</span>
            <span>Academic Integrity Guidelines</span>
            <span>Accessibility (WCAG 2.1 AA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
