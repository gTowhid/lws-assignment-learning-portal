import logo from '../../assets/image/learningportal.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetVideoQuery } from '../../features/videos/videosApi';
import EditVideoForm from '../../components/EditVideoForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function EditVideo() {
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

  const { videoId } = useParams();
  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && video?.id) {
    content = <EditVideoForm video={video} />;
  }

  return (
    <div style={{minWidth: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="container relative">
      <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Video
          </h2>
        </div>
        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </div>
    </div>
  );
}
