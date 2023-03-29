import { useParams } from 'react-router-dom';
import { useGetVideoQuery } from '../features/videos/videosApi';
import EditVideoForm from '../components/EditVideoForm';

export default function EditTaskPage() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && video?.id) {
    content = <EditVideoForm video={video} />;
  }

  console.log(videoId);

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Video
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  );
}
