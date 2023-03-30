import { useParams } from 'react-router-dom';
import EditQuizForm from '../components/EditQuizForm';
import { useGetQuizQuery } from '../features/quizzes/quizzesApi';

export default function EditTaskPage() {
  const { quizId } = useParams();
  const { data: quiz, isLoading, isError, error } = useGetQuizQuery(quizId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && quiz?.id) {
    content = <EditQuizForm quiz={quiz} />;
  }

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  );
}
