import { apiSlice } from '../api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
    /*  getUser: builder.query({
      query: (id) => `/users/${id}`,
    }), */
    /* addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: newVideo } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
              draft.push(newVideo);
            })
          );
        } catch {}
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: updatedVideo } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
              const index = draft.findIndex((video) => video.id == arg.id);
              draft[index] = updatedVideo;
            })
          );
          dispatch(
            apiSlice.util.updateQueryData(
              'getVideo',
              arg.id.toString(),
              (draft) => {
                return updatedVideo;
              }
            )
          );
        } catch {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
            const index = draft.findIndex((video) => video.id == arg);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }), */
  }),
});

export const { /* useGetUserQuery, */ useGetUsersQuery } = usersApi;
