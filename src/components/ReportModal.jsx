import React from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  GraduationCap,
  Printer,
  X,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function ReportModal() {
  const {
    reportModalStudent,
    setReportModalStudent,
    courses,
    assignments,
    exams,
    aiInsights
  } = useAcademic();

  if (!reportModalStudent) return null;

  const student = reportModalStudent;
  const studentCourses = courses.filter(c => student.enrolledCourseIds?.includes(c.id));
  
  // Calculate student assignments
  const studentAssignments = assignments.map(asg => {
    const sub = asg.submissions?.find(s => s.studentId === student.id);
    return {
      title: asg.title,
      course: asg.courseCode,
      status: sub ? (sub.grade !== null ? "Graded" : "Submitted") : "Pending",
      grade: sub?.grade || "-",
      feedback: sub?.feedback || "No feedback yet"
    };
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={() => setReportModalStudent(null)}>
      <div 
        className="modal-content modal-content-lg printable-report-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0 }}
      >
        {/* Actions Bar (hidden on print) */}
        <div className="modal-header no-print">
          <div className="flex items-center gap-2">
            <FileText size={20} color="var(--primary)" />
            <div>
              <div className="font-bold text-base">Institutional Academic Audit & Performance Report</div>
              <div className="text-xs text-muted">Official Grade Record & AI Diagnostics</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={handlePrint}>
              <Printer size={15} /> Print / Save PDF
            </button>
            <button className="btn btn-subtle btn-icon" onClick={() => setReportModalStudent(null)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Official Document Body */}
        <div style={{ padding: "2rem", backgroundColor: "#ffffff", color: "#0f172a" }}>
          
          {/* Institutional Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #0f172a",
            paddingBottom: "1.25rem",
            marginBottom: "1.5rem"
          }}>
            <div className="flex items-center gap-3">
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <GraduationCap size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                  EDUPULSE ACADEMY OF ADVANCED SCIENCES
                </h2>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>
                  Office of Academic Records & AI Diagnostic Intelligence • Report Ref: EP-REP-{student.studentId}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{
                display: "inline-block",
                padding: "0.3rem 0.8rem",
                backgroundColor: "#f1f5f9",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: "700"
              }}>
                OFFICIAL TRANSCRIPT
              </span>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>

          {/* Student Information Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            backgroundColor: "#f8fafc",
            padding: "1rem",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            marginBottom: "1.5rem"
          }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Student Name</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>{student.name}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Student ID</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "700", fontFamily: "monospace", color: "#0f172a" }}>{student.studentId}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Department / Degree</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>{student.department}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Academic Standing</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "700", color: student.riskLevel === "High" ? "#dc2626" : "#059669" }}>
                {student.riskLevel === "High" ? "Needs Intervention" : "Good Standing"}
              </div>
            </div>
          </div>

          {/* Key Academic Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Cumulative CGPA</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#2563eb" }}>{student.gpa.toFixed(2)} / 10.00</div>
              <div style={{ fontSize: "0.7rem", color: "#059669" }}>
                {student.gpa >= 8.5 ? "First Class with Distinction" : "First Class"}
              </div>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Attendance Rate</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: student.attendanceRate < 75 ? "#dc2626" : "#059669" }}>
                {student.attendanceRate}%
              </div>
              <div style={{ fontSize: "0.7rem", color: student.attendanceRate < 75 ? "#dc2626" : "#64748b" }}>
                {student.attendanceRate < 75 ? "Warning: Below 75% Min" : "Compliant"}
              </div>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>AI Risk Classification</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: student.riskLevel === "High" ? "#dc2626" : "#059669" }}>
                {student.riskLevel} Risk
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Academic Advisory Diagnostic</div>
            </div>
          </div>

          {/* Enrolled Courses & Grades Table */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a" }}>
              Course Enrollment & Grade Records
            </h4>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                  <th style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>Course Code</th>
                  <th style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>Course Title</th>
                  <th style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>Credits</th>
                  <th style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>Instructor</th>
                  <th style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>Midterm / Exam Score</th>
                </tr>
              </thead>
              <tbody>
                {studentCourses.map(c => {
                  const examRec = exams.find(e => e.courseId === c.id)?.gradesRecorded?.find(g => g.studentId === student.id);
                  return (
                    <tr key={c.id}>
                      <td style={{ padding: "0.6rem", border: "1px solid #e2e8f0", fontFamily: "monospace", fontWeight: "600" }}>{c.code}</td>
                      <td style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>{c.title}</td>
                      <td style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>{c.credits}</td>
                      <td style={{ padding: "0.6rem", border: "1px solid #e2e8f0" }}>{c.instructorName}</td>
                      <td style={{ padding: "0.6rem", border: "1px solid #e2e8f0", fontWeight: "700" }}>
                        {examRec ? `${examRec.marks} pts (${examRec.grade})` : "Pending Evaluation"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* AI Intelligence Diagnostics & Weak Areas */}
          <div style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "6px",
            padding: "1rem",
            marginBottom: "1.5rem"
          }}>
            <div className="flex items-center gap-2" style={{ marginBottom: "0.5rem" }}>
              <Sparkles size={16} color="#2563eb" />
              <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1e40af" }}>
                AI Academic Diagnostic & Recommendations
              </span>
            </div>
            <div style={{ fontSize: "0.825rem", color: "#1e3a8a", lineHeight: 1.5 }}>
              • <strong>Identified Strengths:</strong> Exceptional algorithmic efficiency and dynamic programming modeling. Consistently scores above 90th percentile in practical coding tasks.
            </div>
            <div style={{ fontSize: "0.825rem", color: "#1e3a8a", lineHeight: 1.5, marginTop: "0.3rem" }}>
              • <strong>Identified Weak Topics:</strong> Linear Algebra (Eigenvalues & SVD decomposition). Recommended to complete 3 targeted problem sets before final exams.
            </div>
            <div style={{ fontSize: "0.825rem", color: "#1e3a8a", lineHeight: 1.5, marginTop: "0.3rem" }}>
              • <strong>Action Plan:</strong> Maintain regular attendance above 85% across all labs and engage with Dr. Sarah Bennett during scheduled office hours.
            </div>
          </div>

          {/* Signatures & Seal */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px dashed #cbd5e1"
          }}>
            <div>
              <div style={{ width: "160px", borderBottom: "1px solid #0f172a", marginBottom: "0.3rem" }}></div>
              <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0f172a" }}>Dr. Sarah Bennett</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Academic Department Chair</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                display: "inline-block",
                border: "2px solid #2563eb",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                padding: "8px",
                color: "#2563eb",
                fontSize: "0.6rem",
                fontWeight: "800",
                textTransform: "uppercase"
              }}>
                <div style={{ marginTop: "10px" }}>OFFICIAL</div>
                <div>SEAL</div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ width: "160px", borderBottom: "1px solid #0f172a", marginBottom: "0.3rem", marginLeft: "auto" }}></div>
              <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0f172a" }}>Marcus Vance</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>University Registrar</div>
            </div>
          </div>
        </div>

        {/* Modal Footer (hidden on print) */}
        <div className="modal-footer no-print">
          <button className="btn btn-secondary" onClick={() => setReportModalStudent(null)}>
            Close
          </button>
          <button className="btn btn-primary flex items-center gap-1" onClick={handlePrint}>
            <Printer size={15} /> Print Report
          </button>
        </div>
      </div>
    </div>
  );
}
