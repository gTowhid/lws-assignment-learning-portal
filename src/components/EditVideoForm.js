import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEditVideoMutation } from '../features/videos/videosApi';

export default function EditVideoForm({ video }) {
  const {
    title: oldTitle,
    description: oldDescription,
    url: oldUrl,
    views: oldViews,
    duration: oldDuration,
    // createdAt: oldCreatedAt,
    id,
  } = video;

  const navigate = useNavigate();
  const [editVideo, { isLoading, error }] = useEditVideoMutation();

  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [url, setUrl] = useState(oldUrl);
  const [views, setViews] = useState(oldViews);
  const [duration, setDuration] = useState(oldDuration);
  // const [createdAt, setCreatedAt] = useState(oldCreatedAt);

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id,
      data: { title, description, url, views, duration /* createdAt */ },
    });

    navigate('/admin/videos');
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="name"
            autocomplete="name"
            required
            className="login-input rounded-t-md"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label for="description" className="sr-only">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="description"
            autocomplete="description"
            required
            className="login-input"
            placeholder="Video Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label for="url" className="sr-only">
            Url
          </label>
          <input
            id="url"
            name="url"
            type="url"
            autocomplete="url"
            required
            className="login-input"
            placeholder="Video Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label for="Views" className="sr-only">
            Views
          </label>
          <input
            id="views"
            name="views"
            type="text"
            autocomplete="views"
            required
            className="login-input rounded-b-md"
            placeholder="Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>
        <div>
          <label for="Duration" className="sr-only">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="name"
            autocomplete="duration"
            required
            className="login-input rounded-b-md"
            placeholder="Video Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Edit Video
        </button>
      </div>
      {<div style={{ color: 'white' }}>{error !== '' && error}</div>}
    </form>
  );
}
