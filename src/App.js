import StudentLogin from './pages/StudentLogin';
import StudentRegistration from './pages/StudentRegistration';
import CoursePlayer from './pages/CoursePlayer';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import AdminLogin from './pages/AdminLogin';
import Assignment from './pages/Assignment';
import AssignmentMark from './pages/AssignmentMark';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import Videos from './pages/Videos';
import AddVideo from './pages/AddVideo';
import EditVideo from './pages/EditVideo';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/registration" element={<StudentRegistration />} />
        <Route path="/:studentId/:videoId/quiz" element={<Quiz />} />
        <Route path="/:studentId/leaderboard" element={<Leaderboard />} />
        <Route
          path="/:studentId/:videoId/coursePlayer"
          element={<CoursePlayer />}
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/assignment" element={<Assignment />} />
        <Route path="/admin/assignmentMark" element={<AssignmentMark />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/quizzes" element={<Quizzes />} />
        <Route path="/admin/videos" element={<Videos />} />
        <Route path="/admin/addVideo" element={<AddVideo />} />
        <Route path="/admin/:videoId/editVideo" element={<EditVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
