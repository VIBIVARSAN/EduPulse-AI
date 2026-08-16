import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquareCheck
} from "lucide-react";

export default function ContactPage() {
  const { faqs, addToast } = useAcademic();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Academic Advising",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Your inquiry has been routed to the Academic Registrar office.", "success");
  };

  return (
    <div className="container" style={{ padding: "2.5rem 1.5rem 4rem 1.5rem" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "2.5rem", textAlign: "center", maxWidth: "720px", margin: "0 auto 2.5rem auto" }}>
        <span className="badge badge-primary text-xs" style={{ marginBottom: "0.5rem" }}>
          STUDENT & FACULTY SUPPORT
        </span>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800" }}>Contact Academic Services</h1>
        <p className="text-sm text-secondary" style={{ marginTop: "0.4rem" }}>
          Have questions regarding curriculum registration, examination dates, financial aid, or AI intelligence tools? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8" style={{ marginBottom: "3rem" }}>
        
        {/* Contact Form */}
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem" }}>
            Submit an Academic Inquiry
          </h3>

          {submitted ? (
            <div style={{
              backgroundColor: "var(--success-light)",
              border: "1px solid var(--success-border)",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <MessageSquareCheck size={40} color="var(--success)" style={{ margin: "0 auto 0.75rem auto" }} />
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success-text)" }}>
                Inquiry Successfully Logged
              </h4>
              <p className="text-xs text-secondary" style={{ marginTop: "0.5rem", lineHeight: 1.5 }}>
                Ticket Ref: #TICK-2026-982. An academic advisor will respond within 24 business hours.
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                style={{ marginTop: "1rem" }}
                onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "Academic Advising", message: "" }); }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. Alex Chen" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Institutional Email</label>
                <input 
                  type="email" 
                  className="input" 
                  placeholder="student@edupulse.edu" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Category</label>
                <select 
                  className="select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Academic Advising">Academic Advising & Course Enrollment</option>
                  <option value="Examinations & Grades">Examinations, Transcripts & Grades</option>
                  <option value="AI Telemetry & Diagnostics">AI Intelligence & Diagnostic Tools</option>
                  <option value="Faculty Support">Faculty Support & Research</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea 
                  className="textarea" 
                  rows="4" 
                  placeholder="Describe your inquiry or request in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary flex items-center justify-center gap-2" style={{ width: "100%" }}>
                <Send size={16} /> Send Academic Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Office Info & Details */}
        <div className="flex flex-col gap-4">
          <div className="card">
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "1rem" }}>
              University Registrar & Advising
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">Campus Address</div>
                  <div className="text-sm font-semibold">Center for Advanced Studies, Building 4, Room 102</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">Registrar Working Hours</div>
                  <div className="text-sm font-semibold">Monday – Friday: 08:30 AM – 05:00 PM EST</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">Telephone Hotline</div>
                  <div className="text-sm font-semibold font-mono">+1 (800) 555-EDU-AI</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">Official Email</div>
                  <div className="text-sm font-semibold font-mono">registrar@edupulse.edu</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: "var(--bg-subtle)" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              24/7 AI Academic Assistant
            </h4>
            <p className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>
              Need instant explanations for course concepts or homework troubleshooting? The AI Study Coach is available around the clock directly inside your Student Dashboard.
            </p>
          </div>
        </div>

      </div>

      {/* FAQs Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <HelpCircle size={20} color="var(--primary)" />
            <span>Frequently Asked Academic Questions</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden"
                }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: isOpen ? "var(--bg-subtle)" : "var(--bg-surface)",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "0.95rem"
                  }}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-light)" }}>
                    <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
