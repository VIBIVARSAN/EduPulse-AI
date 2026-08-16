import React, { useState } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  BrainCircuit,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  Flame,
  Lightbulb,
  Search
} from "lucide-react";

export default function HomePage() {
  const {
    courses,
    users,
    announcements,
    aiInsights,
    navigateTo,
    setSelectedCourseId,
    enrollInCourse,
    currentUser
  } = useAcademic();

  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const tips = [
    {
      title: "Active Recall & Spaced Repetition",
      desc: "Testing yourself 24 hours after a lecture boosts long-term conceptual retention by 68% compared to re-reading.",
      tag: "Cognitive Science"
    },
    {
      title: "Interleaved Problem Solving",
      desc: "Mixing different algorithmic paradigms (e.g. Graph DP vs Divide-and-Conquer) strengthens problem recognition during finals.",
      tag: "Exam Mastery"
    },
    {
      title: "Feynman Technique for Math",
      desc: "Explain complex matrix transformations in plain non-technical language to identify subtle conceptual gaps.",
      tag: "Linear Algebra"
    }
  ];

  const teachers = users.filter(u => u.role === "teacher");

  return (
    <div className="home-page" style={{ display: "flex", flexDirection: "column", gap: "3.5rem", paddingBottom: "4rem" }}>
      
      {/* ===================================================================
          Hero Section
          =================================================================== */}
      <section style={{
        background: "linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-main) 100%)",
        borderBottom: "1px solid var(--border-light)",
        padding: "4rem 0 3rem 0"
      }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 items-center">
            
            {/* Left Hero Copy */}
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: "1rem" }}>
                <span className="badge badge-primary flex items-center gap-1">
                  <Sparkles size={13} /> Next-Gen Academic Intelligence
                </span>
                <span className="text-xs text-muted">Fall 2026 Academic Term</span>
              </div>

              <h1 style={{ fontSize: "2.85rem", lineHeight: 1.15, marginBottom: "1.25rem", letterSpacing: "-0.035em" }}>
                Empowering Education with <span style={{ color: "var(--primary)" }}>Real-Time AI Intelligence</span>
              </h1>

              <p className="text-lg" style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                Unified education management system connecting students, faculty, and administrators. 
                Experience automated early risk detection, intelligent grading, and personalized study roadmaps.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <button 
                  className="btn btn-primary btn-lg flex items-center gap-2"
                  onClick={() => navigateTo("courses")}
                >
                  <BookOpen size={18} />
                  <span>Explore Courses</span>
                  <ArrowRight size={16} />
                </button>
                <button 
                  className="btn btn-secondary btn-lg flex items-center gap-2"
                  onClick={() => {
                    if (currentUser.role === "student") navigateTo("dashboard");
                    else if (currentUser.role === "teacher") navigateTo("teacher-dashboard");
                    else navigateTo("admin-dashboard");
                  }}
                >
                  <BrainCircuit size={18} color="var(--primary)" />
                  <span>Open {currentUser.role === "student" ? "Student" : currentUser.role === "teacher" ? "Faculty" : "Admin"} Portal</span>
                </button>
              </div>

              {/* Key Indicators */}
              <div className="flex items-center gap-6" style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-light)" }}>
                <div>
                  <div className="stat-value">98.4%</div>
                  <div className="text-xs text-muted font-medium">Course Completion Rate</div>
                </div>
                <div style={{ width: "1px", height: "36px", backgroundColor: "var(--border-light)" }}></div>
                <div>
                  <div className="stat-value">1,240+</div>
                  <div className="text-xs text-muted font-medium">Active Students</div>
                </div>
                <div style={{ width: "1px", height: "36px", backgroundColor: "var(--border-light)" }}></div>
                <div>
                  <div className="stat-value">4.9/5.0</div>
                  <div className="text-xs text-muted font-medium">Student Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive AI Telemetry Card */}
            <div>
              <div className="card ai-glow-card" style={{ padding: "1.75rem", boxShadow: "var(--shadow-lg)" }}>
                <div className="card-header" style={{ marginBottom: "1rem" }}>
                  <div className="card-title">
                    <BrainCircuit size={20} color="var(--primary)" />
                    <span>Live Academic Intelligence</span>
                  </div>
                  <span className="badge badge-success text-xs">
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--success)" }}></span>
                    System Active
                  </span>
                </div>

                {/* AI Study Tip Widget */}
                <div style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.2rem",
                  marginBottom: "1.25rem"
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                    <span className="badge badge-accent text-xs flex items-center gap-1">
                      <Lightbulb size={12} /> {tips[activeTipIndex].tag}
                    </span>
                    <div className="flex gap-1">
                      {tips.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setActiveTipIndex(idx)}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: activeTipIndex === idx ? "var(--primary)" : "var(--border-subtle)",
                            cursor: "pointer"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.35rem" }}>
                    {tips[activeTipIndex].title}
                  </h4>
                  <p className="text-sm text-secondary" style={{ lineHeight: 1.5 }}>
                    {tips[activeTipIndex].desc}
                  </p>
                </div>

                {/* Telemetry Stream Preview */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs" style={{ padding: "0.6rem 0.8rem", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={15} color="var(--success)" />
                      <span className="font-semibold">At-Risk Early Detection</span>
                    </div>
                    <span className="badge badge-neutral text-xs">18 flagged for review</span>
                  </div>

                  <div className="flex items-center justify-between text-xs" style={{ padding: "0.6rem 0.8rem", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                    <div className="flex items-center gap-2">
                      <Award size={15} color="var(--primary)" />
                      <span className="font-semibold">AI Automated Rubric Feedback</span>
                    </div>
                    <span className="badge badge-primary text-xs">Active on All Submissions</span>
                  </div>
                </div>

                <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
                  <button 
                    className="btn btn-subtle btn-sm flex items-center justify-center gap-1"
                    style={{ width: "100%" }}
                    onClick={() => navigateTo("dashboard")}
                  >
                    <span>View Student Performance Diagnostic</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          Campus Announcements Ticker
          =================================================================== */}
      <section className="container">
        <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="badge badge-warning flex items-center gap-1 font-mono">
                <Clock size={12} /> ANNOUNCEMENT
              </span>
              <span className="font-bold text-sm">{announcements[0]?.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">{announcements[0]?.date}</span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo("contact")}
              >
                Campus News
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Featured Courses Section
          =================================================================== */}
      <section className="container">
        <div className="flex items-center justify-between" style={{ marginBottom: "1.75rem" }}>
          <div>
            <div className="text-xs font-bold text-primary-color" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ACADEMIC OFFERINGS
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "800", marginTop: "0.25rem" }}>
              Featured Courses & Curriculums
            </h2>
          </div>
          <button 
            className="btn btn-secondary btn-sm flex items-center gap-1"
            onClick={() => navigateTo("courses")}
          >
            <span>View All Courses</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => {
            const isEnrolled = currentUser.enrolledCourseIds?.includes(course.id);
            return (
              <div 
                key={course.id} 
                className="card card-interactive flex flex-col justify-between"
                style={{ padding: 0, overflow: "hidden" }}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  navigateTo("course-detail", course.id);
                }}
              >
                <div style={{ height: "180px", position: "relative", overflow: "hidden" }}>
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "6px"
                  }}>
                    <span className="badge badge-primary">{course.category}</span>
                    <span className="badge badge-neutral">{course.level}</span>
                  </div>
                </div>

                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                      <span className="font-mono text-xs font-semibold text-muted">{course.code}</span>
                      <div className="flex items-center gap-1 text-xs font-semibold">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>{course.rating}</span>
                        <span className="text-muted">({course.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                      {course.title}
                    </h3>

                    <p className="text-xs text-muted" style={{ lineHeight: 1.5, marginBottom: "1rem" }}>
                      {course.description.slice(0, 110)}...
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-muted" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                      <span>Instructor: <strong>{course.instructorName}</strong></span>
                      <span>{course.credits} Credits</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        className="btn btn-secondary btn-sm flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourseId(course.id);
                          navigateTo("course-detail", course.id);
                        }}
                      >
                        Syllabus Details
                      </button>
                      
                      {isEnrolled ? (
                        <span className="badge badge-success text-xs flex items-center justify-center flex-1">
                          <CheckCircle2 size={13} /> Enrolled
                        </span>
                      ) : (
                        <button 
                          className="btn btn-primary btn-sm flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            enrollInCourse(course.id);
                          }}
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          Top Faculty Spotlight
          =================================================================== */}
      <section style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", padding: "3.5rem 0" }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: "680px", margin: "0 auto 2.5rem auto" }}>
            <span className="badge badge-primary text-xs" style={{ marginBottom: "0.5rem" }}>
              DISTINGUISHED FACULTY
            </span>
            <h2 style={{ fontSize: "1.85rem", fontWeight: "800" }}>Learn from World-Class Academic Leaders</h2>
            <p className="text-sm text-secondary" style={{ marginTop: "0.5rem" }}>
              Our faculty members bring decades of industry research, peer-reviewed scientific contributions, and dedicated student mentorship.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="card flex flex-col justify-between" style={{ textAlign: "center", padding: "1.75rem 1.5rem" }}>
                <div>
                  <img 
                    src={teacher.avatar} 
                    alt={teacher.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "0 auto 1rem auto",
                      border: "3px solid var(--primary-light)"
                    }}
                  />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "700" }}>{teacher.name}</h3>
                  <div className="text-xs text-primary-color font-semibold" style={{ marginTop: "2px" }}>
                    {teacher.title}
                  </div>
                  <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                    {teacher.department}
                  </div>

                  <p className="text-xs text-secondary" style={{ marginTop: "0.85rem", lineHeight: 1.5 }}>
                    {teacher.bio}
                  </p>
                </div>

                <div style={{ marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)" }}>
                  <div className="flex items-center justify-between text-xs text-muted font-medium">
                    <span>Office: {teacher.office}</span>
                    <div className="flex items-center gap-1 font-bold text-primary-color">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>{teacher.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Interactive CTA
          =================================================================== */}
      <section className="container">
        <div className="card ai-glow-card" style={{
          padding: "3rem 2rem",
          textAlign: "center",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--primary-subtle)",
          boxShadow: "var(--shadow-md)"
        }}>
          <div style={{ maxWidth: "620px", margin: "0 auto" }}>
            <span className="badge badge-primary text-xs" style={{ marginBottom: "0.75rem" }}>
              ACADEMIC SUCCESS READY
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1rem" }}>
              Experience the Future of Academic Management
            </h2>
            <p className="text-base text-secondary" style={{ lineHeight: 1.6, marginBottom: "1.75rem" }}>
              Seamlessly switch roles, submit assignments, analyze class bell curves, and harness AI telemetry to maximize student potential.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button 
                className="btn btn-primary btn-lg flex items-center gap-2"
                onClick={() => navigateTo("courses")}
              >
                <Search size={18} />
                <span>Search Course Directory</span>
              </button>
              <button 
                className="btn btn-secondary btn-lg flex items-center gap-2"
                onClick={() => navigateTo("dashboard")}
              >
                <GraduationCap size={18} />
                <span>Open Student Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
