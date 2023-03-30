import { apiSlice } from '../api/apiSlice';

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => '/assignments/',
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignments',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: newAssignment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignments',
              undefined,
              (draft) => {
                draft.push(newAssignment);
              }
            )
          );
        } catch {}
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic cache update
        try {
          const { data: updatedAssignment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignments',
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (assignment) => assignment.id == arg.id
                );
                draft[index] = updatedAssignment;
              }
            )
          );
          dispatch(
            apiSlice.util.updateQueryData(
              'getAssignment',
              arg.id.toString(),
              (draft) => {
                return updatedAssignment;
              }
            )
          );
        } catch {}
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getAssignments',
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
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
} = assignmentsApi;
