export interface AirLabsFlightInfo {
  reg_number?: string;
  airline_iata?: string;
  airline_icao?: string;
  airline_name?: string;

  dep_iata?: string;
  dep_icao?: string;
  dep_name?: string;
  dep_time?: string;

  arr_iata?: string;
  arr_icao?: string;
  arr_name?: string;
  arr_time?: string;

  model?: string;
  manufacturer?: string;

  status?: string;
  delayed?: number | null;
}
export interface AirLabsFlight {
  hex?: string;
  reg_number?: string;
  flag?: string;

  lat: number;
  lng: number;

  alt?: number;
  speed?: number;
  dir?: number;

  flight_icao?: string;
  flight_iata?: string;

  airline_iata?: string;
  airline_icao?: string;

  dep_iata?: string;
  dep_icao?: string;

  arr_iata?: string;
  arr_icao?: string;

  aircraft_icao?: string;

  updated?: number;

  status?: string;

  delayed?: number | null;
}

export interface AirLabsFlightsResponse {
  response: AirLabsFlight[];
}