import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  GraduationCap,
  BookOpen,
  Users,
  LayoutDashboard,
  Shield,
  Sun,
  Moon,
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  LogIn,
  AlertTriangle,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    currentUser,
    switchPersona,
    currentView,
    navigateTo,
    isAuthenticated,
    logout,
    setProfileSettingsOpen,
    announcements
  } = useAcademic();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleBadge = (role, riskLevel) => {
    if (role === "student") {
      return (
        <span className={`badge ${riskLevel === "High" ? "badge-danger" : "badge-primary"}`}>
          {riskLevel === "High" ? "Student (At-Risk)" : "Student"}
        </span>
      );
    }
    if (role === "teacher") {
      return <span className="badge badge-accent">Faculty</span>;
    }
    if (role === "admin") {
      return <span className="badge badge-danger">Administrator</span>;
    }
    return <span className="badge badge-neutral">Guest</span>;
  };

  return (
    <header className="navbar no-print" style={{
      position: "sticky",
      top: 0,
      zIndex: 900,
      backgroundColor: "var(--bg-surface)",
      borderBottom: "1px solid var(--border-light)",
      boxShadow: "var(--shadow-xs)"
    }}>
      <div className="container flex items-center justify-between" style={{ height: "72px" }}>
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            if (isAuthenticated) {
              if (currentUser.role === "student") navigateTo("dashboard");
              else if (currentUser.role === "teacher") navigateTo("teacher-dashboard");
              else navigateTo("admin-dashboard");
            } else {
              navigateTo("portal-selection");
            }
            setMobileMenuOpen(false);
          }}
          style={{ userSelect: "none" }}
        >
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)"
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: "1.25rem", fontWeight: "800", letterSpacing: "-0.03em" }}>
                EduPulse
              </span>
              <span style={{ 
                color: "var(--primary)", 
                fontSize: "0.75rem", 
                fontWeight: "700", 
                backgroundColor: "var(--primary-light)",
                padding: "0.15rem 0.4rem",
                borderRadius: "var(--radius-sm)",
                letterSpacing: "0.02em"
              }}>
                AI
              </span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: "500", marginTop: "-2px" }}>
              Education Management Portal
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <button 
                className={`tab-btn ${currentView === "dashboard" || currentView === "teacher-dashboard" || currentView === "admin-dashboard" ? "active" : ""}`}
                onClick={() => {
                  if (currentUser.role === "student") navigateTo("dashboard");
                  else if (currentUser.role === "teacher") navigateTo("teacher-dashboard");
                  else navigateTo("admin-dashboard");
                }}
              >
                Dashboard
              </button>
              <button 
                className={`tab-btn ${currentView === "courses" || currentView === "course-detail" ? "active" : ""}`}
                onClick={() => navigateTo("courses")}
              >
                Courses Catalog
              </button>
              <button 
                className={`tab-btn ${currentView === "contact" ? "active" : ""}`}
                onClick={() => navigateTo("contact")}
              >
                Academic Support
              </button>
            </>
          ) : (
            <>
              <button 
                className={`tab-btn ${currentView === "portal-selection" ? "active" : ""}`}
                onClick={() => navigateTo("portal-selection")}
              >
                Portal Selection
              </button>
              <button 
                className={`tab-btn ${currentView === "home" ? "active" : ""}`}
                onClick={() => navigateTo("home")}
              >
                About EduPulse
              </button>
              <button 
                className={`tab-btn ${currentView === "courses" ? "active" : ""}`}
                onClick={() => navigateTo("courses")}
              >
                Courses
              </button>
              <button 
                className={`tab-btn ${currentView === "contact" ? "active" : ""}`}
                onClick={() => navigateTo("contact")}
              >
                Contact & Support
              </button>
            </>
          )}
        </nav>

        {/* Right Section: User Profile & Account Settings, Notifications, Theme Toggle */}
        <div className="flex items-center gap-3">
          
          {isAuthenticated ? (
            <>
              {/* User Profile Button with Dropdown */}
              <div style={{ position: "relative" }}>
                <button 
                  className="btn btn-secondary btn-sm flex items-center gap-2"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    border: "1px solid var(--border-subtle)",
                    padding: "0.35rem 0.75rem"
                  }}
                  aria-label="User account menu"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div className="flex flex-col text-left" style={{ lineHeight: 1.15 }}>
                    <span className="font-bold text-xs">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-muted" style={{ fontSize: "0.68rem" }}>
                      {currentUser.role === "student" ? `CGPA: ${currentUser.gpa.toFixed(2)}` : currentUser.role === "teacher" ? "Faculty" : "Admin"} ▾
                    </span>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div 
                    className="card"
                    style={{
                      position: "absolute",
                      top: "120%",
                      right: 0,
                      width: "290px",
                      padding: "0.75rem",
                      zIndex: 999,
                      boxShadow: "var(--shadow-xl)"
                    }}
                  >
                    {/* User Header */}
                    <div style={{ padding: "0.5rem", borderBottom: "1px solid var(--border-light)", marginBottom: "0.5rem" }}>
                      <div className="text-xs text-muted font-semibold">SIGNED IN USER</div>
                      <div className="font-bold text-sm" style={{ marginTop: "2px" }}>{currentUser.name}</div>
                      <div className="flex items-center gap-2" style={{ marginTop: "4px" }}>
                        {getRoleBadge(currentUser.role, currentUser.riskLevel)}
                        <span className="text-xs text-muted font-mono">{currentUser.studentId || currentUser.teacherId || currentUser.adminId}</span>
                      </div>
                    </div>

                    {/* Account Settings / Profile Action (Feature 2) */}
                    <div style={{ marginBottom: "0.5rem" }}>
                      <button 
                        className="tab-btn flex items-center gap-2"
                        style={{ width: "100%", textAlign: "left", padding: "0.6rem 0.5rem" }}
                        onClick={() => {
                          setProfileSettingsOpen(true);
                          setUserDropdownOpen(false);
                        }}
                      >
                        <Settings size={15} color="var(--primary)" />
                        <div>
                          <div className="font-semibold text-xs">Account / Profile Settings</div>
                          <div className="text-xs text-muted">Change your display name</div>
                        </div>
                      </button>
                    </div>

                    {/* Switch Account */}
                    <div className="text-xs text-muted font-semibold" style={{ padding: "0.25rem 0.5rem" }}>
                      SWITCH ACCOUNT
                    </div>

                    <div className="flex flex-col gap-1" style={{ marginTop: "0.25rem" }}>
                      <button 
                        className="tab-btn flex items-center justify-between"
                        style={{ width: "100%", textAlign: "left", padding: "0.45rem 0.5rem" }}
                        onClick={() => { switchPersona("student"); setUserDropdownOpen(false); }}
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap size={15} color="var(--primary)" />
                          <span className="font-semibold text-xs">Alex Chen</span>
                        </div>
                        <span className="badge badge-primary text-xs">Student</span>
                      </button>

                      <button 
                        className="tab-btn flex items-center justify-between"
                        style={{ width: "100%", textAlign: "left", padding: "0.45rem 0.5rem" }}
                        onClick={() => { switchPersona("teacher"); setUserDropdownOpen(false); }}
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen size={15} color="var(--accent)" />
                          <span className="font-semibold text-xs">Dr. Sarah Bennett</span>
                        </div>
                        <span className="badge badge-accent text-xs">Faculty</span>
                      </button>

                      <button 
                        className="tab-btn flex items-center justify-between"
                        style={{ width: "100%", textAlign: "left", padding: "0.45rem 0.5rem" }}
                        onClick={() => { switchPersona("admin"); setUserDropdownOpen(false); }}
                      >
                        <div className="flex items-center gap-2">
                          <Shield size={15} color="var(--danger)" />
                          <span className="font-semibold text-xs">Marcus Vance</span>
                        </div>
                        <span className="badge badge-danger text-xs">Admin</span>
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div style={{ borderTop: "1px solid var(--border-light)", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
                      <button 
                        className="btn btn-subtle btn-sm flex items-center justify-center gap-2 text-danger-color"
                        style={{ width: "100%" }}
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button 
              className="btn btn-primary btn-sm flex items-center gap-1"
              onClick={() => navigateTo("portal-selection")}
            >
              <LogIn size={15} />
              <span>Portal Sign In</span>
            </button>
          )}

          {/* Notifications Trigger */}
          <div style={{ position: "relative" }}>
            <button 
              className="btn btn-subtle btn-icon"
              onClick={() => setNotificationOpen(!notificationOpen)}
              title="University Announcements"
              aria-label="Announcements"
            >
              <Bell size={18} />
            </button>

            {notificationOpen && (
              <div 
                className="card"
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  width: "320px",
                  padding: "1rem",
                  zIndex: 999,
                  boxShadow: "var(--shadow-lg)"
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "0.75rem" }}>
                  <span className="font-bold text-sm">Academic Announcements</span>
                  <span className="badge badge-primary text-xs">{announcements.length} New</span>
                </div>
                <div className="flex flex-col gap-2" style={{ maxHeight: "280px", overflowY: "auto" }}>
                  {announcements.map(ann => (
                    <div key={ann.id} style={{ padding: "0.5rem", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-sm)" }}>
                      <div className="font-semibold text-xs">{ann.title}</div>
                      <div className="text-xs text-muted" style={{ marginTop: "2px" }}>{ann.date} • {ann.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher Toggle */}
          <button 
            className="btn btn-subtle btn-icon"
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
            aria-label="Toggle light and dark theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            className="btn btn-subtle btn-icon mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drop drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-surface)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}
        >
          {isAuthenticated ? (
            <>
              <button 
                className={`tab-btn ${currentView === "dashboard" ? "active" : ""}`}
                onClick={() => { navigateTo("dashboard"); setMobileMenuOpen(false); }}
              >
                Student Portal
              </button>
              <button 
                className={`tab-btn ${currentView === "courses" ? "active" : ""}`}
                onClick={() => { navigateTo("courses"); setMobileMenuOpen(false); }}
              >
                Courses Catalog
              </button>
              <button 
                className="tab-btn"
                onClick={() => { setProfileSettingsOpen(true); setMobileMenuOpen(false); }}
              >
                Profile / Settings
              </button>
              <button 
                className="tab-btn text-danger-color"
                onClick={() => { logout(); setMobileMenuOpen(false); }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button 
                className="tab-btn"
                onClick={() => { navigateTo("portal-selection"); setMobileMenuOpen(false); }}
              >
                Portal Selection
              </button>
              <button 
                className="tab-btn"
                onClick={() => { navigateTo("courses"); setMobileMenuOpen(false); }}
              >
                Courses
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
