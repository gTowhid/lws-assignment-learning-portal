import { useNavigate, useParams } from 'react-router-dom';
import EditQuizForm from '../../components/EditQuizForm';
import { useGetQuizQuery } from '../../features/quizzes/quizzesApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function EditTaskPage() {
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
