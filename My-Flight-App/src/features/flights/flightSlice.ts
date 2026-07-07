import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "@/types/flight";

export interface FilterState {
  airline: string;
  altitudeRange: [number, number];
  speedRange: [number, number];
}

export interface FlightState {
  selectedFlight: Flight | null;
  searchQuery: string;
  filters: FilterState;
  watchlist: Flight[];
  flightDetailsCache: Record<string, Flight>;
  connectionStatus: "live" | "reconnecting" | "offline";
  boundingBox: [[number, number], [number, number]] | null; // [[west, south], [east, north]]
}

const initialState: FlightState = {
  selectedFlight: null,
  searchQuery: "",
  filters: {
    airline: "",
    altitudeRange: [0, 50000],
    speedRange: [0, 1200],
  },
  watchlist: [],
  flightDetailsCache: {},
  connectionStatus: "offline",
  boundingBox: null,
};
const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setSelectedFlight: (state, action: PayloadAction<Flight | null>) => {
      state.selectedFlight = action.payload;
    },

    clearSelectedFlight: (state) => {
      state.selectedFlight = null;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setConnectionStatus: (
      state,
      action: PayloadAction<"live" | "reconnecting" | "offline">
    ) => {
      state.connectionStatus = action.payload;
    },

    // ===========================
    // AviationStack Cache
    // ===========================

    setFlightDetailsCache: (state, action: PayloadAction<Flight>) => {
      // Defensive guard: protects against corrupted/partial persisted state
      if (!state.flightDetailsCache) {
        state.flightDetailsCache = {};
      }

      state.flightDetailsCache[action.payload.callsign] = {
        ...state.flightDetailsCache[action.payload.callsign],
        ...action.payload,
        cachedAt: Date.now(),
      };
    },

    clearFlightDetailsCache: (state) => {
      state.flightDetailsCache = {};
    },
    setBoundingBox: (
  state,
  action: PayloadAction<[[number, number], [number, number]] | null>
) => {
  state.boundingBox = action.payload;
},

clearBoundingBox: (state) => {
  state.boundingBox = null;
},
  },
});

export const {
  setSelectedFlight,
  clearSelectedFlight,
  setSearchQuery,
  setFilters,
  clearFilters,
  clearBoundingBox,
  setBoundingBox,
  setConnectionStatus,
  setFlightDetailsCache,
  clearFlightDetailsCache,
} = flightSlice.actions;

export default flightSlice.reducer;