import { useParams } from 'react-router-dom';
import EditAssignmentForm from '../components/EditAssignmentForm';
import { useGetAssignmentQuery } from '../features/assignments/assignmentsApi';

export default function EditTaskPage() {
  const { assignmentId } = useParams();
  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentQuery(assignmentId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && assignment?.id) {
    content = <EditAssignmentForm assignment={assignment} />;
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
