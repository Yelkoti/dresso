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
    }),
  }),
});

export const { useAddShirtMutation } = shirtApiSlice;
