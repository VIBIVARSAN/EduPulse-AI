import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import { X, Lock, Mail, User, Shield, GraduationCap, BookOpen, CheckCircle } from "lucide-react";

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, switchPersona, addToast } = useAcademic();
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Computer Science & AI");

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      if (selectedRole === "student") switchPersona("student");
      else if (selectedRole === "teacher") switchPersona("teacher");
      else switchPersona("admin");
      addToast(`Logged in as ${selectedRole.toUpperCase()}! Welcome to EduPulse AI.`, "success");
    } else {
      // Register simulation
      addToast(`Registration submitted for ${name} (${selectedRole}). Account active!`, "success");
      switchPersona(selectedRole);
    }
    setAuthModalOpen(false);
  };

  const handleQuickLogin = (role) => {
    switchPersona(role);
    setAuthModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Lock size={16} />
            </div>
            <div>
              <div className="font-bold text-base">EduPulse Academic Access</div>
              <div className="text-xs text-muted">Sign in or register for university portal access</div>
            </div>
          </div>
          <button className="btn btn-subtle btn-icon" onClick={() => setAuthModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ padding: "1rem 1.5rem 0.5rem 1.5rem" }}>
          <div className="flex gap-2" style={{ backgroundColor: "var(--bg-subtle)", padding: "0.25rem", borderRadius: "var(--radius-md)" }}>
            <button 
              className={`flex-1 btn btn-sm ${activeTab === "login" ? "btn-primary" : "btn-subtle"}`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 btn btn-sm ${activeTab === "register" ? "btn-primary" : "btn-subtle"}`}
              onClick={() => setActiveTab("register")}
            >
              New Registration
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          {/* Quick Demo Logins Box */}
          <div style={{
            backgroundColor: "var(--primary-light)",
            border: "1px solid var(--primary-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "0.85rem",
            marginBottom: "1.25rem"
          }}>
            <div className="text-xs font-bold" style={{ color: "var(--primary-text)", marginBottom: "0.5rem" }}>
              ⚡ 1-CLICK INSTANT DEMO ACCESS:
            </div>
            <div className="flex gap-2 flex-wrap">
              <button 
                type="button"
                className="btn btn-secondary btn-sm flex items-center gap-1 flex-1"
                onClick={() => handleQuickLogin("student")}
              >
                <GraduationCap size={14} color="var(--primary)" />
                <span>Alex (Student)</span>
              </button>
              <button 
                type="button"
                className="btn btn-secondary btn-sm flex items-center gap-1 flex-1"
                onClick={() => handleQuickLogin("teacher")}
              >
                <BookOpen size={14} color="var(--accent)" />
                <span>Dr. Sarah (Faculty)</span>
              </button>
              <button 
                type="button"
                className="btn btn-secondary btn-sm flex items-center gap-1 flex-1"
                onClick={() => handleQuickLogin("admin")}
              >
                <Shield size={14} color="var(--danger)" />
                <span>Marcus (Admin)</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="form-group">
              <label className="form-label">Select Academic Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`btn btn-sm flex items-center justify-center gap-1 ${selectedRole === "student" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedRole("student")}
                >
                  <GraduationCap size={14} /> Student
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex items-center justify-center gap-1 ${selectedRole === "teacher" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedRole("teacher")}
                >
                  <BookOpen size={14} /> Teacher
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex items-center justify-center gap-1 ${selectedRole === "admin" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedRole("admin")}
                >
                  <Shield size={14} /> Admin
                </button>
              </div>
            </div>

            {activeTab === "register" && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <span className="input-icon-left"><User size={16} /></span>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g. Jordan Lee" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select 
                    className="select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="Computer Science & AI">Computer Science & AI</option>
                    <option value="Data Science & Analytics">Data Science & Analytics</option>
                    <option value="Cyber Security & Networks">Cyber Security & Networks</option>
                    <option value="Mathematics & Physics">Mathematics & Physics</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Institutional Email</label>
              <div className="input-with-icon">
                <span className="input-icon-left"><Mail size={16} /></span>
                <input 
                  type="email" 
                  className="input" 
                  placeholder={selectedRole === "student" ? "student@edupulse.edu" : selectedRole === "teacher" ? "faculty@edupulse.edu" : "admin@edupulse.edu"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <span className="input-icon-left"><Lock size={16} /></span>
                <input 
                  type="password" 
                  className="input" 
                  placeholder="••••••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.75rem" }}>
              {activeTab === "login" ? `Sign In as ${selectedRole.toUpperCase()}` : `Create ${selectedRole.toUpperCase()} Account`}
            </button>
          </form>
        </div>

        <div className="modal-footer">
          <span className="text-xs text-muted">Secured with 256-bit Institutional SAML / SSO Encryption</span>
        </div>
      </div>
    </div>
  );
}
