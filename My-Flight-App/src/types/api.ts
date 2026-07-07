export interface OpenSkyResponse {
  time: number;
  states: OpenSkyState[] | null;
}

export type OpenSkyState = [
  string, // icao24
  string | null, // callsign
  string, // origin country
  number | null, // time_position
  number, // last_contact
  number | null, // longitude
  number | null, // latitude
  number | null, // baro_altitude
  boolean, // on_ground
  number | null, // velocity
  number | null, // true_track
  number | null, // vertical_rate
  number[] | null, // sensors
  number | null, // geo_altitude
  string | null, // squawk
  boolean, // spi
  number, // position_source
  number | null // category
];