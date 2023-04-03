import StudentLogin from './pages/StudentLogin';
import StudentRegistration from './pages/StudentRegistration';
import CoursePlayer from './pages/CoursePlayer';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import AdminLogin from './pages/AdminLogin';
import Assignments from './pages/Assignments';
import AssignmentMark from './pages/AssignmentMark';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import Videos from './pages/Videos';
import AddVideo from './pages/AddVideo';
import AddAssignment from './pages/AddAssignment';
import AddQuiz from './pages/AddQuiz';
import EditVideo from './pages/EditVideo';
import EditAssignment from './pages/EditAssignment';
import EditQuiz from './pages/EditQuiz';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuthCheck from './hooks/useAuthCheck';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication...</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        <Route
          path="/:studentId/:videoId/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/:studentId/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/:studentId/:videoId/coursePlayer"
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/assignments"
          element={
            <PrivateRoute>
              <Assignments />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/assignmentMark"
          element={
            <PrivateRoute>
              <AssignmentMark />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateRoute>
              <Videos />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/addVideo"
          element={
            <PrivateRoute>
              <AddVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/addAssignment"
          element={
            <PrivateRoute>
              <AddAssignment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/addQuiz"
          element={
            <PrivateRoute>
              <AddQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/:videoId/editVideo"
          element={
            <PrivateRoute>
              <EditVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/:assignmentId/editAssignment"
          element={
            <PrivateRoute>
              <EditAssignment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/:quizId/editQuiz"
          element={
            <PrivateRoute>
              <EditQuiz />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
