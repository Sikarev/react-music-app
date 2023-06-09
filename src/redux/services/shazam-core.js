import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/octet-stream');
      headers.set('X-RapidAPI-Key', '57c0501466msh9011bd0e2ea7edep18deddjsne7c9b9840a2d');
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');

      return headers;
    },
  }),
  endpoints: (build) => ({
    getTopCharts: build.query({ query: () => '/v1/charts/world' }),
    getSongsByGenre: build.query({ query: (genre) => `/v1/charts/genre-world?genre_code=${genre}` }),
    getSongDetails: build.query({ query: (songId) => `/v1/tracks/details?track_id=${songId}` }),
    getSongsRelated: build.query({ query: (songId) => `/v1/tracks/related?track_id=${songId}` }),
    getArtistDetails: build.query({ query: (artistId) => `/v2/artists/details?artist_id=${artistId}` }),
    getSongsByCountry: build.query({ query: (countryCode) => `/v1/charts/country?country_code=${countryCode}` }),
    getSongsBySearch: build.query({ query: (searchTerm) => `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongsRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
