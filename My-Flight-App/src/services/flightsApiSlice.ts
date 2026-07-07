import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const flightsApi = createApi({
  reducerPath: "flightsApi",

  baseQuery: fetchBaseQuery({
   baseUrl: "/api",
  }),

  endpoints: (builder) => ({
   getLiveFlights: builder.query({
  query: () => "/flights",
}),
  }),
});

export const { useGetLiveFlightsQuery } = flightsApi;