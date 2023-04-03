import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth?.accessToken && auth?.user ? true : false;

  return !isLoggedIn ? (
    children
  ) : (
    <Navigate to={`/${auth.user.id}/1/coursePlayer`} />
  );
}
