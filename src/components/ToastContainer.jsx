import React from "react";
import { useAcademic } from "../context/AcademicContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useAcademic();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={18} color="var(--success)" />;
      case "warning":
        return <AlertTriangle size={18} color="var(--warning)" />;
      case "danger":
      case "error":
        return <AlertCircle size={18} color="var(--danger)" />;
      default:
        return <Info size={18} color="var(--primary)" />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" style={{ minWidth: "280px" }}>
          <div style={{ flexShrink: 0, marginTop: "2px" }}>
            {getIcon(toast.type)}
          </div>
          <div style={{ flex: 1 }}>
            <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {toast.message}
            </div>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            style={{ color: "var(--text-muted)", padding: "2px", cursor: "pointer" }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
