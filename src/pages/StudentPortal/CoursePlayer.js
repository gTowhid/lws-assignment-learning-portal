import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import AssignmentModal from '../../components/AssignmentModal';
import { useGetAssignmentsQuery } from '../../features/assignments/assignmentsApi';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from '../../features/videos/videosApi';
import { useGetAssignmentMarksQuery } from '../../features/assignmentMarks/assignmentMarksApi';
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi';
import { useNavigate, useParams } from 'react-router-dom';
import CoursePlayerSidebar from '../../components/CoursePlayerSidebar';

export default function CoursePlayer() {
  const { videoId, studentId: studentIdFromParam } = useParams();
  const [studentId, setStudentId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = JSON.parse(localStorage.auth).user;
    setStudentId(id);

    if (id == 1) navigate('/admin');
    if (id != studentIdFromParam) navigate('/');
  }, [navigate, studentIdFromParam]);

  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
    error: videosError,
  } = useGetVideosQuery();

  const {
    data: selectedVideo,
    isLoading: selectedVideoIsLoading,
    isError: selectedVideoIsError,
  } = useGetVideoQuery(videoId);

  const {
    data: assignments,
    isLoading: assignmentsIsLoading,
    isError: assignmentsIsError,
  } = useGetAssignmentsQuery();

  const {
    data: quizzes,
    isLoading: quizzesIsLoading,
    isError: quizzesIsError,
  } = useGetQuizzesQuery();

  const {
    data: assignmentMarks,
    isLoading: assignmentMarksIsLoading,
    isError: assignmentMarksIsError,
  } = useGetAssignmentMarksQuery();

  const {
    data: quizMarks,
    isLoading: quizMarksIsLoading,
    isError: quizMarksIsError,
  } = useGetQuizMarksQuery();

  // decide on disablity of assignment button
  const decideAssignmentButton = (assignment) => {
    const { id: assignment_id } = assignment;

    if (
      !assignmentMarksIsLoading &&
      !assignmentMarksIsError &&
      assignmentMarks?.length > 0
    ) {
      const cancelSubmission = assignmentMarks.find(
        (assignment) =>
          assignment.assignment_id == assignment_id &&
          assignment.student_id == studentId
      );
      return cancelSubmission ? true : false;
    }
  };

  // decide on disablity of quiz button
  const decideQuizButton = (quiz) => {
    const { id: quiz_id } = quiz;

    if (!quizMarksIsLoading && !quizMarksIsError && quizMarks?.length > 0) {
      const cancelSubmission = quizMarks.find(
        (quiz) => quiz.video_id == quiz_id && quiz.student_id == studentId
      );
      return cancelSubmission ? true : false;
    }
  };

  const [selectedAssignment, setSelectedAssignment] = useState({});
  const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);

  const controlAssignmentModal = (assignment) => {
    setAssignmentModalOpened((prevState) => !prevState);
    setSelectedAssignment(assignment);
  };

  let content = null;
  let assignmentButton = null;
  let quizButton = null;

  if (videosIsLoading) content = <div>Loading...</div>;
  if (!videosIsLoading && videosIsError) content = <div>{videosError}</div>;
  if (!videosIsLoading && !videosIsError && videos?.length === 0)
    content = <div>No Videos Found!</div>;

  if (!videosIsLoading && !videosIsError && videos?.length > 0) {
    content = videos.map((video) => (
      <CoursePlayerSidebar key={video.id} video={video} studentId={studentId} />
    ));
  }

  if (
    !selectedVideoIsLoading &&
    !selectedVideoIsError &&
    !assignmentsIsLoading &&
    !assignmentsIsError &&
    assignments?.length > 0
  ) {
    const selectedAssignment = assignments.find(
      (assignment) => assignment.video_id == selectedVideo.id
    );

    let decision;
    if (selectedAssignment)
      decision = decideAssignmentButton(selectedAssignment);

    assignmentButton = selectedAssignment ? (
      <button
        onClick={() => controlAssignmentModal(selectedAssignment)}
        disabled={decision}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট
      </button>
    ) : null;
  }

  if (
    !selectedVideoIsLoading &&
    !selectedVideoIsError &&
    !quizzesIsLoading &&
    !quizzesIsError &&
    quizzes?.length > 0
  ) {
    const selectedQuiz = quizzes.find(
      (quiz) => quiz.video_id == selectedVideo.id
    );

    let decision;
    if (selectedQuiz) decision = decideQuizButton(selectedQuiz);

    quizButton = selectedQuiz ? (
      <button
        disabled={decision}
        onClick={() => navigate(`/${studentId}/${selectedVideo.id}/quiz`)}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে অংশগ্রহণ করুন
      </button>
    ) : null;
  }

  return (
    <>
      <Navbar />
      <AssignmentModal
        open={assignmentModalOpened}
        control={controlAssignmentModal}
        assignment={selectedAssignment}
      />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={selectedVideo?.url}
                title={selectedVideo?.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {selectedVideo?.title}
                </h1>
                <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on{' '}
                  {new Date(selectedVideo?.createdAt).toLocaleDateString()}
                </h2>

                <div className="flex gap-4">
                  {assignmentButton} {quizButton}
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                  {selectedVideo?.description}
                </p>
              </div>
            </div>
            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
              {content}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
