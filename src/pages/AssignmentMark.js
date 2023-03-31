import { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  useEditAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from '../features/assignmentMarks/assignmentMarksApi';

export default function AssignmentMark() {
  const [marks, setMarks] = useState(0);
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error,
  } = useGetAssignmentMarksQuery();

  const [editAssignmentMark] = useEditAssignmentMarkMutation();

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && assignmentMarks?.length === 0)
    content = <div>No Videos Found!</div>;

  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks.map((assignmentMark) => (
      <tr key={assignmentMark.id}>
        <td className="table-td">{assignmentMark.title}</td>
        <td className="table-td">
          {`${new Date(
            assignmentMark.createdAt
          ).toLocaleDateString()} ${new Date(
            assignmentMark.createdAt
          ).toLocaleTimeString()}`}
        </td>{' '}
        {/* time and date conversion to be made here */}
        <td className="table-td">{assignmentMark.student_name}</td>
        <td className="table-td">{assignmentMark.repo_link}</td>
        <td className="table-td input-mark">
          {assignmentMark.status === 'pending' ? (
            <>
              <input
                max="100"
                value={marks}
                onChange={(e) => setMarks(parseInt(e.target.value))}
              />
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                onClick={(e) =>
                  editAssignmentMark({
                    id: assignmentMark.id,
                    data: {
                      ...assignmentMark,
                      mark: marks,
                      status: 'published',
                    },
                  })
                }
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </>
          ) : (
            assignmentMark.mark
          )}
        </td>
      </tr>
    ));
  }

  const total = assignmentMarks?.length;
  const pending = assignmentMarks?.reduce(
    (total, current) => (current.status === 'pending' ? total + 1 : total),
    0
  );
  const sent = total - pending;

  return (
    <>
      <Navbar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{total}</span>
              </li>
              <li>
                Pending <span>{pending}</span>
              </li>
              <li>
                Mark Sent <span>{sent}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
