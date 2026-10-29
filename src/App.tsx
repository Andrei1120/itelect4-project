import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import ClaimsPage from "./pages/ClaimsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="items/:id" element={<ItemDetailPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:code" element={<CourseDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* Public, like login: you cannot be logged in yet. */}
        <Route path="register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}> {/* <-- the guard */}
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="claims" element={<ClaimsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
