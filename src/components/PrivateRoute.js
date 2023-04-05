import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth?.accessToken && auth?.user ? true : false;

  return isLoggedIn ? children : <Navigate to="/" />;
}
