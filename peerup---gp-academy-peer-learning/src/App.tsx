import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { ConceptBar } from "./components/layout/ConceptBar";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Pages
import { Home } from "./pages/Home";
import { Join } from "./pages/Join";
import { ProfileSetup } from "./pages/ProfileSetup";
import { ProfileView } from "./pages/ProfileView";
import { Matching } from "./pages/Matching";
import { GroupsList } from "./pages/GroupsList";
import { GroupCanvas } from "./pages/GroupCanvas";
import { TaskDetail } from "./pages/TaskDetail";
import { Community } from "./pages/Community";
import { PostDetail } from "./pages/PostDetail";
import { Sponsors } from "./pages/Sponsors";
import { AiCoach } from "./pages/AiCoach";
import { NotFound } from "./pages/NotFound";

// Route Guard component
const RequireProfile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!state.currentUser) {
      showToast("Create your profile first");
      navigate("/join", { replace: true });
    }
  }, [state.currentUser, navigate, showToast]);

  if (!state.currentUser) {
    return null;
  }

  return <>{children}</>;
};

// Scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
          {/* Required Concept Prototype Bar */}
          <ConceptBar />

          {/* GP Academy Navbar */}
          <Navbar />

          {/* Main Body */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join />} />
              <Route path="/profile/setup" element={<ProfileSetup />} />

              {/* Guarded Routes */}
              <Route
                path="/profile"
                element={
                  <RequireProfile>
                    <ProfileView />
                  </RequireProfile>
                }
              />
              <Route
                path="/matching"
                element={
                  <RequireProfile>
                    <Matching />
                  </RequireProfile>
                }
              />
              <Route
                path="/groups"
                element={
                  <RequireProfile>
                    <GroupsList />
                  </RequireProfile>
                }
              />
              <Route
                path="/groups/:id"
                element={
                  <RequireProfile>
                    <GroupCanvas />
                  </RequireProfile>
                }
              />

              {/* Public / Task / Community / AI Routes */}
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/:id" element={<PostDetail />} />
              <Route path="/ai-coach" element={<AiCoach />} />
              <Route path="/sponsors" element={<Sponsors />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* GP Academy Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
