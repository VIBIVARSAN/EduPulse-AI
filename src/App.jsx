import React from "react";
import { AcademicProvider, useAcademic } from "./context/AcademicContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";
import AuthModal from "./components/AuthModal";
import ReportModal from "./components/ReportModal";
import ProfileSettingsModal from "./components/ProfileSettingsModal";

import PortalSelectionPage from "./pages/PortalSelectionPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ContactPage from "./pages/ContactPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function MainApp() {
  const { currentView, isAuthenticated, currentUser } = useAcademic();

  const renderView = () => {
    switch (currentView) {
      case "portal-selection":
        return <PortalSelectionPage />;
      case "login":
      case "student-login":
      case "institutional-login":
        return <LoginPage />;
      case "home":
        return <HomePage />;
      case "courses":
        return <CoursesPage />;
      case "course-detail":
        return <CourseDetailPage />;
      case "contact":
        return <ContactPage />;
      case "dashboard":
        return <StudentDashboard />;
      case "teacher-dashboard":
        return <TeacherDashboard />;
      case "admin-dashboard":
        return <AdminDashboard />;
      default:
        if (isAuthenticated) {
          if (currentUser.role === "student") return <StudentDashboard />;
          if (currentUser.role === "teacher") return <TeacherDashboard />;
          return <AdminDashboard />;
        }
        return <PortalSelectionPage />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {renderView()}
      </main>
      <Footer />
      <ToastContainer />
      <AuthModal />
      <ReportModal />
      <ProfileSettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <AcademicProvider>
      <MainApp />
    </AcademicProvider>
  );
}
