import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGetVideoQuery } from '../features/videos/videosApi';
import { useGetQuizzesQuery } from '../features/quizzes/quizzesApi';

export default function Quiz() {
  const { studentId, videoId } = useParams();

  const {
    data: video,
    isLoading: videoIsLoading,
    isError: videoIsError,
  } = useGetVideoQuery(videoId);

  const {
    data: quizzes,
    isLoading: quizzesIsLoading,
    isError: quizzesIsError,
  } = useGetQuizzesQuery();

  const handleChange = (checked, quizNumber, option) => {
    console.log({ checked, quizNumber, option });
  };

  let content = null;
  if (
    !videoIsLoading &&
    !videoIsError &&
    !quizzesIsLoading &&
    !quizzesIsError &&
    quizzes.length > 0
  ) {
    const concernedQuizes = quizzes.filter(
      (quiz) => quiz.video_id === video.id
    );

    content = concernedQuizes.map((quiz, index) => (
      <div key={quiz.id} className="quiz">
        <h4 className="question">
          Quiz {index + 1} - {quiz.question}
        </h4>
        <form className="quizOptions">
          {/* <!-- Option 1 --> */}
          <label for={`option1_q${index + 1}`}>
            <input
              type="checkbox"
              id={`option1_q${index + 1}`}
              onChange={(e) =>
                handleChange(e.target.checked, index, quiz.options[0])
              }
            />
            {quiz.options[0].option}
          </label>

          {/* <!-- Option 2 --> */}
          <label for={`option2_q${index + 1}`}>
            <input
              type="checkbox"
              id={`option2_q${index + 1}`}
              onChange={(e) =>
                handleChange(e.target.checked, index, quiz.options[1])
              }
            />
            {quiz.options[1].option}
          </label>

          {/* <!-- Option 3 --> */}
          <label for={`option3_q${index + 1}`}>
            <input
              type="checkbox"
              id={`option3_q${index + 1}`}
              onChange={(e) =>
                handleChange(e.target.checked, index, quiz.options[2])
              }
            />
            {quiz.options[2].option}
          </label>

          {/* <!-- Option 4 --> */}
          <label for={`option4_q${index + 1}`}>
            <input
              type="checkbox"
              id={`option4_q${index + 1}`}
              onChange={(e) =>
                handleChange(e.target.checked, index, quiz.options[3])
              }
            />
            {quiz.options[3].option}
          </label>
        </form>
      </div>
    ));
  }

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{video?.title}"</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8">{content}</div>

          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95">
            Submit
          </button>
        </div>
      </section>
    </>
  );
}
