import { apiSlice } from '../api/apiSlice';

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => '/quizMark/',
    }),
    getQuizMark: builder.query({
      query: (id) => `/quizMark/${id}`,
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: '/quizMark',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: newQuizMark } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getQuizMarks',
              undefined,
              (draft) => {
                draft.push(newQuizMark);
              }
            )
          );
        } catch {}
      },
    }),
    editQuizMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: updatedQuizMark } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getQuizMarks',
              undefined,
              (draft) => {
                const index = draft.findIndex((quiz) => quiz.id == arg.id);
                draft[index] = updatedQuizMark;
              }
            )
          );
          dispatch(
            apiSlice.util.updateQueryData(
              'getQuizMark',
              arg.id.toString(),
              (draft) => {
                return updatedQuizMark;
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useAddQuizMarkMutation,
  useEditQuizMarkMutation,
  useGetQuizMarkQuery,
  useGetQuizMarksQuery,
} = quizMarkApi;
