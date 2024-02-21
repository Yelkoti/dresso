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
    }),
    updateShirts: builder.mutation({
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
  useUpdateShirtsMutation,
} = shirtApiSlice;
