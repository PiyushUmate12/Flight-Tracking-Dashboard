import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Flight } from "@/types/flight";

export const aviationStackApi = createApi({
  reducerPath: "aviationStackApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  tagTypes: ["FlightDetails"],

  endpoints: (builder) => ({
    getFlightDetails: builder.query<Partial<Flight> | null, string>({
      query: (callsign) =>
        `/flight-details?callsign=${encodeURIComponent(callsign)}`,

      providesTags: (_result, _error, callsign) => [
        {
          type: "FlightDetails",
          id: callsign,
        },
      ],
    }),
  }),
});

export const {
  useGetFlightDetailsQuery,
  useLazyGetFlightDetailsQuery,
} = aviationStackApi;