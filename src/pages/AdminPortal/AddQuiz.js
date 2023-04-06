import logo from '../../assets/image/learningportal.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetVideosQuery } from '../../features/videos/videosApi';
import { useAddQuizMutation } from '../../features/quizzes/quizzesApi';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function AddQuiz() {
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

  const {
    data: videos,
    isLoading: videoIsLoading,
    isError: videoIsError,
  } = useGetVideosQuery();

  const [addQuiz, { isLoading, error }] = useAddQuizMutation();

  const [question, setQuestion] = useState('');
  const [video, setVideo] = useState({});

  const [options1, setOptions1] = useState({});
  const [options2, setOptions2] = useState({});
  const [options3, setOptions3] = useState({});
  const [options4, setOptions4] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    addQuiz({
      question,
      options: [options1, options2, options3, options4],
      video_id: video.id,
      video_title: video.title,
    });

    navigate('/admin/quizzes');
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Add New Quiz
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="title" className="sr-only">
                Title
              </label>
              <input
                id="question"
                name="question"
                type="text"
                autocomplete="question"
                required
                className="login-input rounded-t-md"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
                  color: 'gray',
                  width: '100%',
                  backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
                  height: '40px',
                  fontSize: '0.875rem',
                  padding: '10px',
                }}
                onChange={(e) =>
                  setVideo(
                    videos.find((video) => video.title === e.target.value)
                  )
                }
              >
                <option value="" hidden selected>
                  Select Associated Video
                </option>
                {!videoIsLoading &&
                  !videoIsError &&
                  videos.map((video) => (
                    <option key={video.id}>{video.title}</option>
                  ))}
              </select>
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
              }}
              onChange={(e) =>
                setOptions1((prev) => ({
                  id: 1,
                  option:
                    e.target.type === 'text' ? e.target.value : prev.option,
                  isCorrect:
                    e.target.type === 'checkbox' && e.target.checked
                      ? true
                      : false,
                }))
              }
            >
              <label for="Marks" className="sr-only">
                Options 1
              </label>
              <input
                id="options"
                name="options 1"
                type="text"
                autocomplete="options 1"
                required
                className="login-input rounded-b-md"
                placeholder="Option 1 (select checkbox if true)"
              />
              <input type="checkbox" />
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
              }}
              onChange={(e) =>
                setOptions2((prev) => ({
                  id: 2,
                  option:
                    e.target.type === 'text' ? e.target.value : prev.option,
                  isCorrect:
                    e.target.type === 'checkbox' && e.target.checked
                      ? true
                      : false,
                }))
              }
            >
              <label for="Marks" className="sr-only">
                Options 2
              </label>
              <input
                id="options"
                name="options 2"
                type="text"
                autocomplete="options 2"
                required
                className="login-input rounded-b-md"
                placeholder="Option 2 (select checkbox if true)"
              />
              <input type="checkbox" />
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
              }}
              onChange={(e) =>
                setOptions3((prev) => ({
                  id: 3,
                  option:
                    e.target.type === 'text' ? e.target.value : prev.option,
                  isCorrect:
                    e.target.type === 'checkbox' && e.target.checked
                      ? true
                      : false,
                }))
              }
            >
              <label for="Marks" className="sr-only">
                Options 3
              </label>
              <input
                id="options"
                name="options 3"
                type="text"
                autocomplete="options 3"
                required
                className="login-input rounded-b-md"
                placeholder="Option 3 (select checkbox if true)"
              />
              <input type="checkbox" />
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
              }}
              onChange={(e) =>
                setOptions4((prev) => ({
                  id: 4,
                  option:
                    e.target.type === 'text' ? e.target.value : prev.option,
                  isCorrect:
                    e.target.type === 'checkbox' && e.target.checked
                      ? true
                      : false,
                }))
              }
            >
              <label for="Marks" className="sr-only">
                Options 4
              </label>
              <input
                id="options"
                name="options 4"
                type="text"
                autocomplete="options 4"
                required
                className="login-input rounded-b-md"
                placeholder="Option 4 (select checkbox if true)"
              />
              <input type="checkbox" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add Quiz
            </button>
          </div>
          {<div style={{ color: 'white' }}>{error !== '' && error}</div>}
        </form>
      </div>
    </section>
  );
}
