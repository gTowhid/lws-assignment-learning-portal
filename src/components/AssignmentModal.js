import { useAddAssignmentMarkMutation } from '../features/assignmentMarks/assignmentMarksApi';
import { useState } from 'react';

export default function Modal({ open, control, assignment }) {
  const { id: student_id, name: student_name } = JSON.parse(
    localStorage.auth
  ).user;

  const [addAssignmentMark, { isLoading, isError, error }] =
    useAddAssignmentMarkMutation();

  const { id: assignment_id, title, totalMark } = assignment;

  const [repo, setRepo] = useState('');

  var currentDate = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignmentMark({
      student_id,
      student_name,
      assignment_id,
      title,
      createdAt: currentDate.toISOString(),
      totalMark,
      mark: 0,
      repo_link: repo,
      status: 'pending',
    });
    control(assignment);
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Submit Assignment
          </h2>
          <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="link" className="sr-only">
                  Repo Link
                </label>
                <input
                  id="link"
                  name="link"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Repo Link"
                  onChange={(e) => setRepo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Submit Assignment
              </button>
            </div>

            {isError && <div>{error}</div>}
          </form>
        </div>
      </>
    )
  );
}
