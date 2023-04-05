import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEditAssignmentMutation } from '../features/assignments/assignmentsApi';
import { useGetVideosQuery } from '../features/videos/videosApi';
import logo from '../assets/image/learningportal.svg';
import {
  useEditAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from '../features/assignmentMarks/assignmentMarksApi';

export default function EditVideoForm({ assignment }) {
  const {
    title: oldTitle,
    video_id: oldVideo_id,
    video_title: oldVideo_title,
    totalMark: oldTotalMark,
    id,
  } = assignment;

  const {
    data: videos,
    isLoading: videoIsLoading,
    isError: videoIsError,
  } = useGetVideosQuery();

  let oldVideo;
  if (!videoIsLoading && !videoIsError) {
    oldVideo = videos.find(
      (video) => video.id === oldVideo_id && video.title === oldVideo_title
    );
  } else oldVideo = {};

  const navigate = useNavigate();
  const [editAssignment, { isLoading, error }] = useEditAssignmentMutation();

  const { data: assignmentMarks } = useGetAssignmentMarksQuery();
  const [editAssignmentMark] = useEditAssignmentMarkMutation();
  const concernedAssignmentMarks = assignmentMarks?.filter(
    (assignmentMark) => assignmentMark.title === oldTitle
  );

  const [title, setTitle] = useState(oldTitle);
  const [video, setVideo] = useState(oldVideo);
  const [totalMark, setTotalMark] = useState(oldTotalMark);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAssignment({
      id,
      data: {
        title,
        totalMark: parseInt(totalMark),
        video_id: video.id,
        video_title: video.title,
      },
    });

    concernedAssignmentMarks.forEach((assignmentMark) =>
      editAssignmentMark({
        id: assignmentMark.id,
        data: {
          ...assignmentMark,
          title,
          totalMark: parseInt(totalMark),
        },
      })
    );

    navigate('/admin/assignments');
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Assignment
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="name"
                autocomplete="name"
                required
                className="login-input rounded-t-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label for="video" className="sr-only">
                Associated Video
              </label>
              <select
                name="associatedVideo"
                required
                style={{
                  color: 'white',
                  width: '100%',
                  backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
                  height: '40px',
                  fontSize: '0.875rem',
                }}
                onChange={(e) =>
                  setVideo(
                    videos.find((video) => video.title === e.target.value)
                  )
                }
              >
                {!videoIsLoading &&
                  !videoIsError &&
                  videos.map((video) => (
                    <option
                      key={video.id}
                      selected={
                        video.title === oldVideo_title ? 'selected' : null
                      }
                    >
                      {video.title}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label for="Marks" className="sr-only">
                Total Marks
              </label>
              <input
                id="marks"
                name="marks"
                type="number"
                autocomplete="marks"
                required
                className="login-input rounded-b-md"
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Update Assignment
            </button>
          </div>
          {<div style={{ color: 'white' }}>{error !== '' && error}</div>}
        </form>
      </div>
    </section>
  );
}
