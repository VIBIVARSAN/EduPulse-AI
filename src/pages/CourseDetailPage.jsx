import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  User,
  Sparkles,
  Award,
  FileCheck,
  ChevronRight
} from "lucide-react";

export default function CourseDetailPage() {
  const {
    courses,
    selectedCourseId,
    users,
    navigateTo,
    enrollInCourse,
    currentUser
  } = useAcademic();

  const [activeTab, setActiveTab] = useState("syllabus"); // 'overview' | 'syllabus' | 'instructor' | 'schedule'

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const instructor = users.find((u) => u.id === course.instructorId) || users.find(u => u.name === course.instructorName);
  const isEnrolled = currentUser.enrolledCourseIds?.includes(course.id);

  return (
    <div className="container" style={{ padding: "2.5rem 1.5rem 4rem 1.5rem" }}>
      
      {/* Back Button */}
      <button 
        className="btn btn-subtle btn-sm flex items-center gap-1"
        style={{ marginBottom: "1.5rem" }}
        onClick={() => navigateTo("courses")}
      >
        <ArrowLeft size={16} /> Back to Course Directory
      </button>

      {/* Hero Header Card */}
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div className="grid grid-cols-3 gap-8 items-center">
          
          {/* Main Info */}
          <div style={{ gridColumn: "span 2" }}>
            <div className="flex items-center gap-2" style={{ marginBottom: "0.75rem" }}>
              <span className="badge badge-primary font-mono">{course.code}</span>
              <span className="badge badge-neutral">{course.category}</span>
              <span className="badge badge-neutral">{course.level}</span>
            </div>

            <h1 style={{ fontSize: "2.2rem", fontWeight: "800", lineHeight: 1.2, marginBottom: "1rem" }}>
              {course.title}
            </h1>

            <p className="text-base text-secondary" style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {course.description}
            </p>

            <div className="flex items-center gap-6 flex-wrap text-sm text-muted">
              <div className="flex items-center gap-1">
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <strong style={{ color: "var(--text-primary)" }}>{course.rating}</strong>
                <span>({course.reviewsCount} reviews)</span>
              </div>
              <div>•</div>
              <div><strong>{course.credits}</strong> Academic Credits</div>
              <div>•</div>
              <div><strong>{course.enrolledCount}</strong> Students Enrolled</div>
            </div>
          </div>

          {/* Right Action / Enrollment Card */}
          <div style={{
            backgroundColor: "var(--bg-subtle)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem"
          }}>
            <img 
              src={course.image} 
              alt={course.title} 
              style={{ width: "100%", height: "140px", borderRadius: "var(--radius-sm)", objectFit: "cover", marginBottom: "1rem" }}
            />
            
            <div className="flex items-center justify-between text-xs text-muted" style={{ marginBottom: "0.5rem" }}>
              <span>Class Capacity</span>
              <span>{course.enrolledCount} / {course.capacity} filled</span>
            </div>
            <div className="progress-bar-track" style={{ marginBottom: "1.25rem" }}>
              <div 
                className="progress-bar-fill primary" 
                style={{ width: `${Math.min(100, (course.enrolledCount / course.capacity) * 100)}%` }}
              />
            </div>

            {isEnrolled ? (
              <div className="flex flex-col gap-2">
                <span className="badge badge-success text-sm flex items-center justify-center" style={{ padding: "0.6rem" }}>
                  <CheckCircle2 size={16} /> Enrolled in Course
                </span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => navigateTo("dashboard")}
                >
                  Open in Student Dashboard
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.75rem" }}
                onClick={() => enrollInCourse(course.id)}
              >
                Enroll in Course
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav">
        <button 
          className={`tab-btn ${activeTab === "syllabus" ? "active" : ""}`}
          onClick={() => setActiveTab("syllabus")}
        >
          Curriculum Syllabus
        </button>
        <button 
          className={`tab-btn ${activeTab === "instructor" ? "active" : ""}`}
          onClick={() => setActiveTab("instructor")}
        >
          Faculty Instructor
        </button>
        <button 
          className={`tab-btn ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule & Logistics
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "syllabus" && (
        <div className="flex flex-col gap-4">
          <div className="card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.25rem" }}>
              Structured Weekly Curriculum & Modules
            </h3>

            <div className="flex flex-col gap-4">
              {course.syllabus?.map((mod, idx) => (
                <div 
                  key={idx} 
                  style={{
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem",
                    backgroundColor: "var(--bg-surface)"
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                    <span className="badge badge-primary font-mono text-xs">{mod.week}</span>
                    <span className="text-xs text-muted">Module {idx + 1}</span>
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                    {mod.title}
                  </h4>
                  <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {mod.topics.map((t, tIdx) => (
                      <li key={tIdx} className="text-sm text-secondary">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites Box */}
          <div className="card">
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.75rem" }}>
              Academic Prerequisites
            </h4>
            <div className="flex gap-2 flex-wrap">
              {course.prerequisites?.map((pre, pIdx) => (
                <span key={pIdx} className="badge badge-neutral text-xs flex items-center gap-1">
                  <FileCheck size={13} /> {pre}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "instructor" && (
        <div className="card">
          <div className="flex items-start gap-6 flex-wrap">
            <img 
              src={instructor?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
              alt={course.instructorName} 
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary-light)" }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>{course.instructorName}</h3>
                  <div className="text-sm text-primary-color font-semibold">{instructor?.title || "Academic Faculty"}</div>
                  <div className="text-xs text-muted">{instructor?.department || "Department of Computer Science"}</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-primary-color">
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span>{instructor?.rating || 4.9}</span>
                </div>
              </div>

              <p className="text-sm text-secondary" style={{ marginTop: "1rem", lineHeight: 1.6 }}>
                {instructor?.bio || "Dedicated faculty researcher passionate about mentoring students in core foundational disciplines."}
              </p>

              <div className="grid grid-cols-2 gap-4" style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border-light)" }}>
                <div>
                  <div className="text-xs text-muted">Office Location</div>
                  <div className="text-sm font-semibold">{instructor?.office || "Engineering Hall 402"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Office Hours</div>
                  <div className="text-sm font-semibold">{instructor?.officeHours || "Mon / Wed 2:00 PM - 4:00 PM"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "schedule" && (
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.25rem" }}>
            Lecture Schedule & Room Allocations
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div style={{ padding: "1rem", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
              <div className="flex items-center gap-2 text-primary-color" style={{ marginBottom: "0.25rem" }}>
                <Clock size={16} />
                <span className="font-semibold text-xs">Lecture Timings</span>
              </div>
              <div className="font-bold text-sm">{course.schedule}</div>
            </div>

            <div style={{ padding: "1rem", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
              <div className="flex items-center gap-2 text-primary-color" style={{ marginBottom: "0.25rem" }}>
                <MapPin size={16} />
                <span className="font-semibold text-xs">Assigned Venue</span>
              </div>
              <div className="font-bold text-sm">{course.room}</div>
            </div>

            <div style={{ padding: "1rem", backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
              <div className="flex items-center gap-2 text-primary-color" style={{ marginBottom: "0.25rem" }}>
                <Calendar size={16} />
                <span className="font-semibold text-xs">Semester Duration</span>
              </div>
              <div className="font-bold text-sm">Fall 2026 (16 Weeks)</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
