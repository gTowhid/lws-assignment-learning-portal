import { useState } from 'react';
import Navbar from '../components/Navbar';
import AssignmentModal from '../components/AssignmentModal';
import { useGetAssignmentsQuery } from '../features/assignments/assignmentsApi';
import { useGetQuizzesQuery } from '../features/quizzes/quizzesApi';
import { useGetVideosQuery } from '../features/videos/videosApi';
import { useGetAssignmentMarksQuery } from '../features/assignmentMarks/assignmentMarksApi';

export default function CoursePlayer() {
  const {
    data: videos,
    isLoading: videosIsLoading,
    isError: videosIsError,
    error: videosError,
  } = useGetVideosQuery();

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
    isLoading,
    isError,
  } = useGetAssignmentMarksQuery();

  // decide on showing of assignment button
  const decideAssignmentButton = (assignment) => {
    const { id: student_id } = JSON.parse(localStorage.auth).user;
    const { id: assignment_id } = assignment;

    if (!isLoading && !isError && assignmentMarks?.length > 0) {
      const cancelSubmission = assignmentMarks.find(
        (assignment) =>
          assignment.assignment_id === assignment_id &&
          assignment.student_id === student_id
      );
      return cancelSubmission ? true : false;
    }
  };

  const [selectedVideo, setSelectedVideo] = useState({});
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
      <div
        key={video.id}
        className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3"
        onClick={() => setSelectedVideo(video)}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
        <div clas="flex flex-col w-full">
          <button>
            <p className="text-slate-50 text-sm font-medium">{video.title}</p>
          </button>
          <div>
            <span className="text-gray-400 text-xs mt-1">{`${video.duration} Mins`}</span>
            <span className="text-gray-400 text-xs mt-1"> | </span>
            <span className="text-gray-400 text-xs mt-1">{`${video.views} views`}</span>
          </div>
        </div>
      </div>
    ));
  }

  if (!assignmentsIsLoading && !assignmentsIsError && assignments?.length > 0) {
    const selectedAssignment = assignments.find(
      (assignment) => assignment.video_id === selectedVideo?.id
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

  if (!quizzesIsLoading && !quizzesIsError && quizzes?.length > 0) {
    const selectedQuiz = quizzes.find(
      (quiz) => quiz.video_id === selectedVideo?.id
    );

    // onclick e modal open hobe jekhaney ei pura quiz ta (selectedQuiz) diye dite hobe
    quizButton = selectedQuiz ? (
      <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
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
                src={selectedVideo.url}
                title={selectedVideo.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {selectedVideo.title}
                </h1>
                <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on{' '}
                  {new Date(selectedVideo.createdAt).toLocaleDateString()}
                </h2>

                <div className="flex gap-4">
                  {assignmentButton} {quizButton}
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                  {selectedVideo.description}
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
