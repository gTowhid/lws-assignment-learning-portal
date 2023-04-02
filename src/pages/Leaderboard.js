import Navbar from '../components/Navbar';
import { useGetUsersQuery } from '../features/users/userApi';
import { useGetAssignmentMarksQuery } from '../features/assignmentMarks/assignmentMarksApi';
import { useGetQuizMarksQuery } from '../features/quizMark/quizMarkApi';

export default function Leaderboard() {
  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
  } = useGetUsersQuery();

  const {
    data: assignmentMarks,
    isLoading: assignmentMarksIsLoading,
    isError: assignmentMarksIsError,
  } = useGetAssignmentMarksQuery();

  const {
    data: quizMarks,
    isLoading: quizMarksIsLoading,
    isError: quizMarksIsError,
  } = useGetQuizMarksQuery();

  const { id: loggedInId } = JSON.parse(localStorage.auth).user;

  let content = null;
  let prevTotal = 999999999;
  let rank = 0;
  
  let heroName = '';
  let heroAssignmentResult = 0;
  let heroQuizResult = 0;
  let heroRank = 0;

  if (!assignmentMarksIsLoading && !assignmentMarksIsError && !quizMarksIsLoading && !quizMarksIsError && !usersIsLoading && !usersIsError && users.length > 0) {
    const userList = users.map((user) => {
      let assignmentResult = 0;
      let quizResult = 0;
      let total = 0;
      assignmentResult = assignmentMarks?.reduce(
        (total, current) =>
          current.student_id === user.id ? total + current.mark : total,
        0
      );
      quizResult = quizMarks?.reduce(
        (total, current) =>
          current.student_id === user.id ? total + current.mark : total,
        0
      );
      total = assignmentResult + quizResult;
      
      return (user.role === 'admin' ? {key: user.id} : {
        key: user.id,
        name: user.name,
        assignmentResult,
        quizResult,
        total,
      })
    });

    userList.sort((a, b) => b?.total - a?.total);

    content = userList.slice(0, 20).map((user) => {
      if(user.total < prevTotal) {
        rank++;
        prevTotal = user.total;
      }

      if (user.key === loggedInId) {
        heroName = user.name;
        heroAssignmentResult = user.assignmentResult;
        heroQuizResult = user.quizResult;
        heroRank = rank;
      }

      return (user.name &&
        <tr key={user.id} className="border-b border-slate-600/50">
          <td className="table-td text-center">{rank}</td>
          <td className="table-td text-center">{user.name}</td>
          <td className="table-td text-center">{user.quizResult}</td>
          <td className="table-td text-center">{user.assignmentResult}</td>
          <td className="table-td text-center">
            {user.total}
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">{heroRank}</td>
                  <td className="table-td text-center font-bold">{heroName}</td>
                  <td className="table-td text-center font-bold">{heroQuizResult}</td>
                  <td className="table-td text-center font-bold">{heroAssignmentResult}</td>
                  <td className="table-td text-center font-bold">{heroAssignmentResult + heroQuizResult}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {content}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
