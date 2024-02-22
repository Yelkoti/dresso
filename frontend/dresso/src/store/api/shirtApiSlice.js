import { apiSlice } from "./apiSlice";
import { SHIRTS_URL } from "../../constants";

export const shirtApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShirt: builder.mutation({
      query: (data) => ({
        url: SHIRTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shirt"],
    }),
    getShirts: builder.query({
      query: () => ({
        url: SHIRTS_URL,
      }),
      providesTags: ["Shirt"],
      keepUnusedDataFor: 5,
    }),
    getShirtDetails: builder.query({
      query: (shirtId) => ({
        url: `${SHIRTS_URL}/${shirtId}`,
      }),
      providesTags: ["Shirt"],
      keepUnusedDataFor: 5,
    }),
    updateShirt: builder.mutation({
      query: (data) => ({
        url: `${SHIRTS_URL}/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Shirt"],
    }),
  }),
});

export const {
  useAddShirtMutation,
  useGetShirtsQuery,
  useUpdateShirtMutation,
  useGetShirtDetailsQuery,
} = shirtApiSlice;
