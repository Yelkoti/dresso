import { apiSlice } from "./apiSlice";
import { PANTS_URL } from "../../constants";

export const pantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPant: builder.mutation({
      query: (data) => ({
        url: PANTS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getPants: builder.query({
      query: () => ({
        url: PANTS_URL,
      }),
      providesTags: ["Pant"],
      keepUnusedDataFor: 5,
    }),
    getPantDetails: builder.query({
      query: (pantId) => ({
        url: `${PANTS_URL}/${pantId}`,
      }),
      providesTags: ["Pant"],
      keepUnusedDataFor: 5,
    }),
    updatePant: builder.mutation({
      query: (data) => ({
        url: `${PANTS_URL}/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Pant"],
    }),
    deletePant: builder.mutation({
      query: (pantId) => ({
        url: `${PANTS_URL}/${pantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pant"],
    }),
  }),
});

export const {
  useAddPantMutation,
  useGetPantsQuery,
  useGetPantDetailsQuery,
  useUpdatePantMutation,
  useDeletePantMutation,
} = pantApiSlice;
