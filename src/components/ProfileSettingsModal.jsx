import React, { useState, useEffect } from "react";
import { useAcademic } from "../context/AcademicContext";
import { User, X, Check, Shield, GraduationCap, BookOpen } from "lucide-react";

export default function ProfileSettingsModal() {
  const {
    currentUser,
    profileSettingsOpen,
    setProfileSettingsOpen,
    updateCurrentUserName
  } = useAcademic();

  const [displayName, setDisplayName] = useState(currentUser?.name || "");

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.name);
    }
  }, [currentUser, profileSettingsOpen]);

  if (!profileSettingsOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = updateCurrentUserName(displayName);
    if (success) {
      setProfileSettingsOpen(false);
    }
  };

  const getRoleIcon = (role) => {
    if (role === "student") return <GraduationCap size={16} color="var(--primary)" />;
    if (role === "teacher") return <BookOpen size={16} color="var(--accent)" />;
    return <Shield size={16} color="var(--danger)" />;
  };

  return (
    <div className="modal-overlay" onClick={() => setProfileSettingsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <User size={18} />
            </div>
            <div>
              <div className="font-bold text-base">Account Profile Settings</div>
              <div className="text-xs text-muted">Customize your official display name</div>
            </div>
          </div>
          <button 
            className="btn btn-subtle btn-icon" 
            onClick={() => setProfileSettingsOpen(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* User Identification Summary */}
            <div style={{
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              padding: "1rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem"
            }}>
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary)" }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{currentUser.name}</span>
                  <span className="badge badge-neutral text-xs">{currentUser.role.toUpperCase()}</span>
                </div>
                <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                  ID: <span className="font-mono font-bold text-primary-color">{currentUser.studentId || currentUser.teacherId || currentUser.adminId}</span>
                </div>
                <div className="text-xs text-muted">{currentUser.department}</div>
              </div>
            </div>

            {/* Display Name Input */}
            <div className="form-group">
              <label className="form-label">Full Display Name</label>
              <div className="input-with-icon">
                <span className="input-icon-left"><User size={16} /></span>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Enter your name" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <span className="text-xs text-muted" style={{ marginTop: "3px" }}>
                This updates your name in dashboard headers, grades, transcripts, and session logs.
              </span>
            </div>

            {/* Readonly Account Details */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Institutional Email (Registered)</label>
              <input 
                type="text" 
                className="input" 
                value={currentUser.email}
                disabled 
                style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)", cursor: "not-allowed" }}
              />
            </div>

          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setProfileSettingsOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary flex items-center gap-1"
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
