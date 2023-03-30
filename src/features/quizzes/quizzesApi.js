import { apiSlice } from '../api/apiSlice';

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => '/quizzes/',
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: '/quizzes',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: newQuiz } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
              draft.push(newQuiz);
            })
          );
        } catch {}
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: updatedQuiz } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
              const index = draft.findIndex((quiz) => quiz.id == arg.id);
              draft[index] = updatedQuiz;
            })
          );
          dispatch(
            apiSlice.util.updateQueryData(
              'getQuiz',
              arg.id.toString(),
              (draft) => {
                return updatedQuiz;
              }
            )
          );
        } catch {}
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
            const index = draft.findIndex((quiz) => quiz.id == arg);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
} = quizzesApi;
