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
      totalMark: parseInt(totalMark),
      mark: 0,
      repo_link: repo,
      status: 'pending',
    });
    control(assignment);
  };

  return (
    open && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '50%',
            backgroundColor: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '5px solid black',
            zIndex: '500',
            borderRadius: '10px',
          }}
          className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Submit Assignment
          </h2>
          <h4 style={{ textAlign: 'center' }}>for {title}</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
            id="IconChangeColor"
            onClick={control}
            style={{
              position: 'absolute',
              zIndex: '501',
              right: '-20px',
              top: '55px',
              transform: 'translate(0, -180%) scale(0.7)',
              cursor: 'pointer',
            }}
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              id="mainIconPathAttribute"
              stroke-width="0"
              stroke="#ff0000"
            ></path>
          </svg>
          <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="link" className="sr-only">
                  Repo Link
                </label>
                <input
                  id="link"
                  style={{ color: 'black' }}
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
      </div>
    )
  );
}
