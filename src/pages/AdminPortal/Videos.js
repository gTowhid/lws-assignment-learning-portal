import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import {
  useDeleteVideoMutation,
  useGetVideosQuery,
} from '../../features/videos/videosApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userLoggedOut } from '../../features/auth/authSlice';
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from '../../features/assignments/assignmentsApi';
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from '../../features/quizzes/quizzesApi';
import {
  useDeleteAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from '../../features/assignmentMarks/assignmentMarksApi';
import {
  useDeleteQuizMarkMutation,
  useGetQuizMarksQuery,
} from '../../features/quizMark/quizMarkApi';

export default function Videos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { role } = JSON.parse(localStorage.auth).user;

    if (role !== 'admin') {
      navigate('/admin');

      dispatch(userLoggedOut());
      window.localStorage.clear();
    }
  }, [dispatch, navigate]);

  const { data: videos, isLoading, isError, error } = useGetVideosQuery();
  const [deleteVideo] = useDeleteVideoMutation();

  const { data: assignments } = useGetAssignmentsQuery();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const { data: quizzes } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  const { data: assignmentMarks } = useGetAssignmentMarksQuery();
  const [deleteAssignmentMark] = useDeleteAssignmentMarkMutation();

  const { data: quizMarks } = useGetQuizMarksQuery();
  const [deleteQuizMark] = useDeleteQuizMarkMutation();

  const handleDelete = (video) => {
    deleteVideo(video.id);

    const concernedAssignments = assignments?.filter(
      (assignment) => assignment.video_title === video.title
    );
    concernedAssignments.forEach((assignment) =>
      deleteAssignment(assignment.id)
    );

    const concernedAssignmentsIds = concernedAssignments.map((assignment) => {
      return assignment.id;
    });

    const concernedQuizzes = quizzes?.filter(
      (quiz) => quiz.video_title === video.title
    );
    concernedQuizzes.forEach((quiz) => deleteQuiz(quiz.id));

    const concernedQuizMarks = quizMarks?.filter(
      (quizMark) => quizMark.video_title === video.title
    );
    concernedQuizMarks.forEach((quizMark) => deleteQuizMark(quizMark.id));

    const concernedAssignmentMarks = assignmentMarks?.filter((assignmentMark) =>
      concernedAssignmentsIds.includes(assignmentMark.assignment_id)
    );
    concernedAssignmentMarks.forEach((assignmentMark) =>
      deleteAssignmentMark(assignmentMark.id)
    );
  };

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && videos?.length === 0)
    content = <div>No Videos Found!</div>;

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <tr key={video.id}>
        <td className="table-td">{video.title}</td>
        <td className="table-td">{video.description.substring(0, 50)}</td>
        <td className="table-td flex gap-x-2">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
            onClick={() => handleDelete(video)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
            onClick={() => navigate(`/admin/${video.id}/editVideo`)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <Navbar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={(e) => navigate('/admin/addVideo')}
                className="btn ml-auto"
              >
                Add Video
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
