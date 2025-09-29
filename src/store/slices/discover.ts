import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { TMDB_V3_API_KEY } from "src/constant";
import { MEDIA_TYPE, PaginatedMovieResult } from "src/types/Common";
import { MovieDetail } from "src/types/Movie";
import { tmdbApi } from "./apiSlice";

const initialState: Record<string, Record<string, PaginatedMovieResult>> = {};
export const initialItemState: PaginatedMovieResult = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setNextPage: (state, action) => {
      const { mediaType, itemKey } = action.payload;
      state[mediaType][itemKey].page += 1;
    },
    initiateItem: (state, action) => {
      const { mediaType, itemKey } = action.payload;
      if (!state[mediaType]) {
        state[mediaType] = {};
      }
      if (!state[mediaType][itemKey]) {
        state[mediaType][itemKey] = initialItemState;
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(
        extendedApi.endpoints.getVideosByMediaTypeAndCustomGenre.matchFulfilled,
        extendedApi.endpoints.getVideosByMediaTypeAndGenreId.matchFulfilled
      ),
      (state, action) => {
        const {
          page,
          results,
          total_pages,
          total_results,
          mediaType,
          itemKey,
        } = action.payload;
        state[mediaType][itemKey].page = page;
        state[mediaType][itemKey].results.push(...results);
        state[mediaType][itemKey].total_pages = total_pages;
        state[mediaType][itemKey].total_results = total_results;
      }
    );
  },
});

export const { setNextPage, initiateItem } = discoverSlice.actions;
export default discoverSlice.reducer;

const extendedApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getVideosByMediaTypeAndGenreId: build.query<
      PaginatedMovieResult & {
        mediaType: MEDIA_TYPE;
        itemKey: number | string;
      },
      { mediaType: MEDIA_TYPE; genreId: number; page: number }
    >({
      query: ({ mediaType, genreId, page }) => ({
        url: `/discover/${mediaType}`,
        params: { api_key: TMDB_V3_API_KEY, with_genres: genreId, page },
      }),
      transformResponse: (
        response: PaginatedMovieResult,
        _,
        { mediaType, genreId }
      ) => ({
        ...response,
        mediaType,
        itemKey: genreId,
      }),
    }),
    getVideosByMediaTypeAndCustomGenre: build.query<
      PaginatedMovieResult & {
        mediaType: MEDIA_TYPE;
        itemKey: number | string;
      },
      { mediaType: MEDIA_TYPE; apiString: string; page: number; includeAdult?: boolean }
    >({
      query: ({ mediaType, apiString, page, includeAdult = false }) => ({
        url: `/${mediaType}/${apiString}`,
        params: { 
          api_key: TMDB_V3_API_KEY, 
          page,
          include_adult: includeAdult
        },
      }),
      transformResponse: (
        response: PaginatedMovieResult,
        _,
        { mediaType, apiString }
      ) => {
        return {
          ...response,
          mediaType,
          itemKey: apiString,
        };
      },
    }),
    getAppendedVideos: build.query<
      MovieDetail,
      { mediaType: MEDIA_TYPE; id: number }
    >({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}`,
        params: { api_key: TMDB_V3_API_KEY, append_to_response: "videos" },
      }),
    }),
    getSimilarVideos: build.query<
      PaginatedMovieResult,
      { mediaType: MEDIA_TYPE; id: number }
    >({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}/similar`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),
    getVideosByLanguage: build.query<
      PaginatedMovieResult & {
        mediaType: MEDIA_TYPE;
        itemKey: string;
      },
      { mediaType: MEDIA_TYPE; language: string; page: number; includeAdult?: boolean }
    >({
      query: ({ mediaType, language, page, includeAdult = false }) => ({
        url: `/discover/${mediaType}`,
        params: { 
          api_key: TMDB_V3_API_KEY, 
          with_original_language: language, 
          page,
          sort_by: 'popularity.desc',
          include_adult: includeAdult
        },
      }),
      transformResponse: (
        response: PaginatedMovieResult,
        _,
        { mediaType, language }
      ) => ({
        ...response,
        mediaType,
        itemKey: language,
      }),
    }),
  }),
});

export const {
  useGetVideosByMediaTypeAndGenreIdQuery,
  useLazyGetVideosByMediaTypeAndGenreIdQuery,
  useGetVideosByMediaTypeAndCustomGenreQuery,
  useLazyGetVideosByMediaTypeAndCustomGenreQuery,
  useGetAppendedVideosQuery,
  useLazyGetAppendedVideosQuery,
  useGetSimilarVideosQuery,
  useLazyGetSimilarVideosQuery,
  useGetVideosByLanguageQuery,
  useLazyGetVideosByLanguageQuery,
} = extendedApi;
