import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airportApi = createApi({
  reducerPath: "airportApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAirportName: builder.query<{ name: string | null }, string>({
      query: (code) => `/airport?code=${encodeURIComponent(code)}`,
    }),
  }),
});

export const { useGetAirportNameQuery } = airportApi;