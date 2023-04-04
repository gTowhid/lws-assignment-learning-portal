import StudentLogin from './pages/StudentPortal/StudentLogin';
import StudentRegistration from './pages/StudentPortal/StudentRegistration';
import CoursePlayer from './pages/StudentPortal/CoursePlayer';
import Quiz from './pages/StudentPortal/Quiz';
import Leaderboard from './pages/StudentPortal/Leaderboard';
import AdminLogin from './pages/AdminPortal/AdminLogin';
import Assignments from './pages/AdminPortal/Assignments';
import AssignmentMark from './pages/AdminPortal/AssignmentMark';
import Dashboard from './pages/AdminPortal/Dashboard';
import Quizzes from './pages/AdminPortal/Quizzes';
import Videos from './pages/AdminPortal/Videos';
import AddVideo from './pages/AdminPortal/AddVideo';
import AddAssignment from './pages/AdminPortal/AddAssignment';
import AddQuiz from './pages/AdminPortal/AddQuiz';
import EditVideo from './pages/AdminPortal/EditVideo';
import EditAssignment from './pages/AdminPortal/EditAssignment';
import EditQuiz from './pages/AdminPortal/EditQuiz';
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

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/assignments" element={<Assignments />} />
        <Route path="/admin/assignmentMark" element={<AssignmentMark />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/quizzes" element={<Quizzes />} />
        <Route path="/admin/videos" element={<Videos />} />
        <Route path="/admin/addVideo" element={<AddVideo />} />
        <Route path="/admin/addAssignment" element={<AddAssignment />} />
        <Route path="/admin/addQuiz" element={<AddQuiz />} />
        <Route path="/admin/:videoId/editVideo" element={<EditVideo />} />
        <Route
          path="/admin/:assignmentId/editAssignment"
          element={<EditAssignment />}
        />
        <Route path="/admin/:quizId/editQuiz" element={<EditQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
