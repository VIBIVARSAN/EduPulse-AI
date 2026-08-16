import React, { useState, useMemo } from "react";
import { useAcademic } from "../context/AcademicContext";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  BookOpen,
  User,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  GraduationCap
} from "lucide-react";

export default function CoursesPage() {
  const {
    courses,
    navigateTo,
    setSelectedCourseId,
    enrollInCourse,
    currentUser
  } = useAcademic();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  const categories = ["All", "Computer Science", "Artificial Intelligence", "Data Science", "Mathematics", "Cyber Security"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
      const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="container" style={{ padding: "2.5rem 1.5rem 4rem 1.5rem" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="flex items-center gap-2" style={{ marginBottom: "0.4rem" }}>
          <span className="badge badge-primary text-xs">OFFICIAL CURRICULUM</span>
          <span className="text-xs text-muted">{courses.length} Accredited Academic Offerings</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800" }}>University Course Directory</h1>
        <p className="text-sm text-secondary" style={{ marginTop: "0.35rem" }}>
          Explore theoretical foundations, computational labs, and industry capstone modules. Filter by discipline and level.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "2rem" }}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          
          {/* Search Box */}
          <div className="input-with-icon flex-1" style={{ minWidth: "260px" }}>
            <span className="input-icon-left"><Search size={18} /></span>
            <input 
              type="text" 
              className="input" 
              placeholder="Search by course code, title, topic, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Controls: View Mode */}
          <div className="flex items-center gap-2">
            <button 
              className={`btn btn-sm btn-icon ${viewMode === "grid" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button 
              className={`btn btn-sm btn-icon ${viewMode === "list" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category & Level Filter Chips */}
        <div style={{ borderTop: "1px solid var(--border-light)", marginTop: "1rem", paddingTop: "1rem" }}>
          <div className="flex items-center gap-4 flex-wrap">
            
            {/* Category Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted flex items-center gap-1">
                <Filter size={13} /> Discipline:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`badge ${selectedCategory === cat ? "badge-primary" : "badge-neutral"}`}
                  style={{ cursor: "pointer", padding: "0.35rem 0.75rem" }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level Chips */}
            <div className="flex items-center gap-2 flex-wrap" style={{ marginLeft: "auto" }}>
              <span className="text-xs font-semibold text-muted">Level:</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  className={`badge ${selectedLevel === lvl ? "badge-accent" : "badge-neutral"}`}
                  style={{ cursor: "pointer", padding: "0.35rem 0.75rem" }}
                  onClick={() => setSelectedLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Courses Output */}
      {filteredCourses.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
          <BookOpen size={42} color="var(--text-muted)" style={{ margin: "0 auto 1rem auto" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>No Courses Found</h3>
          <p className="text-sm text-muted" style={{ marginTop: "0.5rem" }}>
            No courses match your query "{searchTerm}". Try clearing active filters.
          </p>
          <button 
            className="btn btn-secondary btn-sm"
            style={{ marginTop: "1rem" }}
            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setSelectedLevel("All"); }}
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
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
                      {course.description}
                    </p>
                  </div>

                  <div>
                    {/* Capacity Indicator */}
                    <div style={{ marginBottom: "0.75rem" }}>
                      <div className="flex justify-between text-xs text-muted" style={{ marginBottom: "4px" }}>
                        <span>Capacity: {course.enrolledCount} / {course.capacity}</span>
                        <span>{Math.round((course.enrolledCount / course.capacity) * 100)}% Full</span>
                      </div>
                      <div className="progress-bar-track">
                        <div 
                          className="progress-bar-fill primary" 
                          style={{ width: `${Math.min(100, (course.enrolledCount / course.capacity) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                      <span>Faculty: <strong>{course.instructorName}</strong></span>
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
      ) : (
        /* List View */
        <div className="flex flex-col gap-4">
          {filteredCourses.map((course) => {
            const isEnrolled = currentUser.enrolledCourseIds?.includes(course.id);
            return (
              <div 
                key={course.id} 
                className="card card-interactive flex items-center justify-between gap-6 flex-wrap"
                style={{ padding: "1.25rem" }}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  navigateTo("course-detail", course.id);
                }}
              >
                <div className="flex items-center gap-4 flex-1" style={{ minWidth: "300px" }}>
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    style={{ width: "90px", height: "70px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                  />
                  <div>
                    <div className="flex items-center gap-2" style={{ marginBottom: "2px" }}>
                      <span className="font-mono text-xs font-bold text-primary-color">{course.code}</span>
                      <span className="badge badge-neutral text-xs">{course.category}</span>
                      <span className="badge badge-neutral text-xs">{course.level}</span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>{course.title}</h3>
                    <div className="text-xs text-muted" style={{ marginTop: "2px" }}>
                      Instructor: {course.instructorName} • {course.credits} Credits • Room: {course.room}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div style={{ textAlign: "right" }}>
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>{course.rating}</span>
                      <span className="text-muted">({course.reviewsCount})</span>
                    </div>
                    <div className="text-xs text-muted" style={{ marginTop: "2px" }}>{course.enrolledCount} enrolled</div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourseId(course.id);
                        navigateTo("course-detail", course.id);
                      }}
                    >
                      Details
                    </button>
                    {isEnrolled ? (
                      <span className="badge badge-success text-xs flex items-center">
                        <CheckCircle2 size={13} /> Enrolled
                      </span>
                    ) : (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          enrollInCourse(course.id);
                        }}
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
