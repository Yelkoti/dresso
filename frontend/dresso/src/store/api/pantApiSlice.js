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
  }),
});

export const { useAddPantMutation } = pantApiSlice;
