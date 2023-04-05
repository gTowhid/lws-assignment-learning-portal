import { apiSlice } from '../api/apiSlice';

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => '/assignmentMark/',
    }),
    getAssignmentMark: builder.query({
      query: (id) => `/assignmentMark/${id}`,
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: '/assignmentMark',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: newAssignmentMark } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignmentMarks',
              undefined,
              (draft) => {
                draft.push(newAssignmentMark);
              }
            )
          );
        } catch {}
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: updatedAssignmentMark } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignmentMarks',
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (assignment) => assignment.id == arg.id
                );
                draft[index] = updatedAssignmentMark;
              }
            )
          );
          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignmentMark',
              arg.id.toString(),
              (draft) => {
                return updatedAssignmentMark;
              }
            )
          );
        } catch {}
      },
    }),
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getAssignmentMarks',
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (assignment) => assignment.id == arg
              );
              draft.splice(index, 1);
            }
          )
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
  useAddAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarksQuery,
  useDeleteAssignmentMarkMutation,
} = assignmentMarksApi;
