import React, { useState, useEffect } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  GraduationCap,
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Shield,
  BookOpen,
  User,
  CheckCircle2,
  Compass
} from "lucide-react";

export default function LoginPage() {
  const {
    portalTarget,
    setPortalTarget,
    loginWithPersona,
    setCurrentView,
    navigateTo,
    addToast
  } = useAcademic();

  // Selected sub-role for institutional portal ('teacher' | 'admin')
  const [selectedInstRole, setSelectedInstRole] = useState("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const isStudentPortal = portalTarget === "student";

  useEffect(() => {
    if (isStudentPortal) {
      setEmail("alex.chen@edupulse.edu");
    } else {
      if (selectedInstRole === "teacher") {
        setEmail("sarah.bennett@edupulse.edu");
      } else {
        setEmail("marcus.vance@edupulse.edu");
      }
    }
  }, [portalTarget, selectedInstRole]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Please enter your registered institutional email or ID.");
      return;
    }
    setErrorMessage("");

    if (isStudentPortal) {
      const emailLower = email.toLowerCase();
      if (emailLower.includes("maya") || emailLower.includes("patel") || emailLower.includes("risk")) {
        loginWithPersona("student-at-risk");
      } else {
        loginWithPersona("student");
      }
    } else {
      if (selectedInstRole === "teacher") {
        loginWithPersona("teacher");
      } else {
        loginWithPersona("admin");
      }
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem 1.5rem",
      background: "radial-gradient(circle at top, var(--primary-light) 0%, var(--bg-main) 70%)"
    }}>
      <div style={{ width: "100%", maxWidth: "540px" }}>
        
        {/* Back to Portal Selection */}
        <button 
          className="btn btn-subtle btn-sm flex items-center gap-2"
          style={{ marginBottom: "1.5rem" }}
          onClick={() => setCurrentView("portal-selection")}
        >
          <ArrowLeft size={16} />
          <span>Back to Portal Selection</span>
        </button>

        {/* Login Card */}
        <div className="card" style={{ padding: "2.25rem 2rem", boxShadow: "var(--shadow-lg)" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-md)",
              backgroundColor: isStudentPortal ? "var(--primary)" : "var(--accent)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto",
              boxShadow: isStudentPortal ? "0 4px 12px rgba(37, 99, 235, 0.3)" : "0 4px 12px rgba(79, 70, 229, 0.3)"
            }}>
              {isStudentPortal ? <GraduationCap size={26} /> : <Building2 size={26} />}
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
              {isStudentPortal ? "Student Portal Login" : "Faculty & Administration Login"}
            </h2>
            
            <p className="text-xs text-muted" style={{ marginTop: "4px" }}>
              {isStudentPortal 
                ? "Enter your student credentials to access your courses, attendance, and grades."
                : "Secure institutional single sign-on access for faculty and university administrators."}
            </p>
          </div>

          {/* Institutional Role Selector (Only if on Institutional Portal) */}
          {!isStudentPortal && (
            <div style={{ marginBottom: "1.5rem" }}>
              <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                Select Institutional Role
              </label>
              <div className="grid grid-cols-2 gap-2" style={{ backgroundColor: "var(--bg-subtle)", padding: "0.25rem", borderRadius: "var(--radius-md)" }}>
                <button
                  type="button"
                  className={`btn btn-sm flex items-center justify-center gap-1 ${selectedInstRole === "teacher" ? "btn-primary" : "btn-subtle"}`}
                  onClick={() => setSelectedInstRole("teacher")}
                >
                  <BookOpen size={14} /> Faculty Portal
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex items-center justify-center gap-1 ${selectedInstRole === "admin" ? "btn-primary" : "btn-subtle"}`}
                  onClick={() => setSelectedInstRole("admin")}
                >
                  <Shield size={14} /> Administrator Portal
                </button>
              </div>
            </div>
          )}

          {/* Error Message if any */}
          {errorMessage && (
            <div style={{
              backgroundColor: "var(--danger-light)",
              border: "1px solid var(--danger-border)",
              borderRadius: "var(--radius-sm)",
              padding: "0.65rem 0.85rem",
              fontSize: "0.8rem",
              color: "var(--danger-text)",
              marginBottom: "1rem"
            }}>
              {errorMessage}
            </div>
          )}

          {/* Standard Credentials Form */}
          <form onSubmit={handleManualSubmit}>
            
            {/* Email / Username */}
            <div className="form-group">
              <label className="form-label">
                {isStudentPortal ? "Student ID or Email" : "Institutional Email / Faculty ID"}
              </label>
              <div className="input-with-icon">
                <span className="input-icon-left"><Mail size={16} /></span>
                <input 
                  type="text" 
                  className="input"
                  placeholder={isStudentPortal ? "e.g. STU-2026-084 or alex.chen@edupulse.edu" : "e.g. faculty@edupulse.edu"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password with Show/Hide toggle */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon" style={{ position: "relative" }}>
                <span className="input-icon-left"><Lock size={16} /></span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "2.5rem" }}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                  }}
                  title={showPassword ? "Hide Password" : "Show Password"}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between" style={{ margin: "0.75rem 0 1.25rem 0" }}>
              <label className="flex items-center gap-2 text-xs text-secondary" style={{ cursor: "pointer", userSelect: "none" }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button 
                type="button" 
                className="text-xs text-primary-color font-semibold"
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setForgotPasswordModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.75rem", fontSize: "0.95rem" }}
            >
              Sign In to {isStudentPortal ? "Student Portal" : selectedInstRole === "teacher" ? "Faculty Portal" : "Administrator Portal"}
            </button>
          </form>

          {/* Clearly Labeled Prototype Demo Access Button */}
          <div style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border-light)",
            textAlign: "center"
          }}>
            <div className="text-xs text-muted" style={{ marginBottom: "0.6rem" }}>
              INSTITUTIONAL PROTOTYPE ACCESS
            </div>

            {isStudentPortal ? (
              <div className="flex flex-col gap-2">
                <button 
                  type="button"
                  className="btn btn-secondary btn-sm flex items-center justify-center gap-2"
                  style={{ width: "100%" }}
                  onClick={() => loginWithPersona("student")}
                >
                  <GraduationCap size={15} color="var(--primary)" />
                  <span>Use Demo Student Account (Alex Chen)</span>
                </button>
                <button 
                  type="button"
                  className="btn btn-subtle btn-sm text-xs text-muted"
                  onClick={() => loginWithPersona("student-at-risk")}
                >
                  Use Demo Student Account (Maya Patel — At-Risk Case)
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {selectedInstRole === "teacher" ? (
                  <button 
                    type="button"
                    className="btn btn-secondary btn-sm flex items-center justify-center gap-2"
                    style={{ width: "100%" }}
                    onClick={() => loginWithPersona("teacher")}
                  >
                    <BookOpen size={15} color="var(--accent)" />
                    <span>Use Demo Faculty Account (Dr. Sarah Bennett)</span>
                  </button>
                ) : (
                  <button 
                    type="button"
                    className="btn btn-secondary btn-sm flex items-center justify-center gap-2"
                    style={{ width: "100%" }}
                    onClick={() => loginWithPersona("admin")}
                  >
                    <Shield size={15} color="var(--danger)" />
                    <span>Use Demo Administrator Account (Marcus Vance)</span>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="modal-overlay" onClick={() => setForgotPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
            <div className="modal-header">
              <div className="font-bold text-base">Reset Institutional Password</div>
              <button className="btn btn-subtle btn-icon" onClick={() => setForgotPasswordModal(false)}>✕</button>
            </div>
            <div className="modal-body text-center">
              <Mail size={36} color="var(--primary)" style={{ margin: "0 auto 0.75rem auto" }} />
              <h4 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Password Recovery</h4>
              <p className="text-xs text-secondary" style={{ marginTop: "0.5rem", lineHeight: 1.5 }}>
                For this university prototype, accounts use instant demo authentication. You can sign in using the "Use Demo Account" option.
              </p>
              <button 
                className="btn btn-primary btn-sm" 
                style={{ marginTop: "1.25rem", width: "100%" }}
                onClick={() => setForgotPasswordModal(false)}
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
