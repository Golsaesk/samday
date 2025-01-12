import axios from 'axios';
import hash from '@/modules/general/libraries/hash';
import { initNewsState, resetHelper, } from './news-helper';
import { Error, } from '@modules/general/libraries/general-types';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { getNewsDetailUrl, getNewsListUrl, } from './api/news-api';
import { parseThunkError, } from '@/modules/general/libraries/utils';
import { getClientIP, } from '@/modules/general/store/api/general-api';
import {
  NewsCriteria, NewsDetailEntity, NewsDetailStateItem,
  NewsListEntity, NewsListStateItem,
} from '@/modules/news/libraries/news-types';
import {
  API_KEY, GENERAL_ERROR, HTTP_CLIENT_IP_HEADER,
} from '@/modules/general/libraries/constants';

export interface FetchNewsListProps {
  criteria: NewsCriteria;
}

export interface FetchNewsDetailProps {
  id: number;
}

export const fetchNewsDetailThunk =
  createAsyncThunk<NewsDetailEntity, FetchNewsDetailProps, { rejectValue: Error }>(
    'news/fetchNewsDetail',
    async ({ id, }: FetchNewsDetailProps, thunkApi) => {

      try {
        const url = getNewsDetailUrl(id);

        const clientIP: string = await getClientIP();
        const response = await axios.get<any>(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
          },
        });

        if (response.data) {
          const result = response.data;
          return result as NewsDetailEntity;
        }
      } catch (error: any) {
        return parseThunkError(error, thunkApi);
      }

    }
  );

export const fetchNewsListThunk =
  createAsyncThunk<NewsListEntity, FetchNewsListProps, { rejectValue: Error }>(
    'news/fetchNewsList',
    async ({ criteria, }: FetchNewsListProps, thunkApi) => {

      try {
        const url = getNewsListUrl(criteria);

        const clientIP: string = await getClientIP();
        const response = await axios.get<any>(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
          },
        });

        if (response.data) {
          const result = response.data;
          return result as NewsListEntity;
        }
      } catch (error: any) {

        return parseThunkError(error, thunkApi);
      }

    }
  );

export const newsSlice = createSlice({
  name: 'news',
  initialState: initNewsState,
  reducers: { reset: resetHelper, },
  extraReducers(builder) {
    builder.addCase(fetchNewsDetailThunk.pending, (state, action) => {
      const { id, } = action.meta.arg;

      const newItem: NewsDetailStateItem = {
        item: null,
        id,
        error: null,
        pending: true,
      };

      let result = { ...state.detail, };
      if (state.detail[id]) {
        result[id].pending = true;
      } else {
        result = {
          ...state.detail,
          ...{ [id]: newItem, },
        };
      }

      state.detail = result;
    });

    builder.addCase(fetchNewsDetailThunk.fulfilled,
      (state, action) => {
        const { id, } = action.meta.arg;
        const newItem: NewsDetailStateItem = {
          item: action.payload.data,
          id,
          pending: false,
          error: null,
        };

        let detailResult = { ...state.detail, };
        if (state.detail[id]) {
          detailResult[id] = newItem;
        } else {
          detailResult = {
            ...state.detail,
            ...{ [id]: newItem, },
          };
        }

        state.detail = detailResult;
      });

    builder.addCase(fetchNewsDetailThunk.rejected,
      (state, action) => {

        const { id, } = action.meta.arg;

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newItem: NewsDetailStateItem = {
          item: null,
          id,
          error: error,
          pending: false,
        };

        let result = { ...state.detail, };
        if (state.detail[id]) {
          result[id].pending = true;
        } else {
          result = {
            ...state.detail,
            ...{ [id]: newItem, },
          };
        }

        state.detail = result;
      });

    builder.addCase(fetchNewsListThunk.pending, (state, action) => {
      const { criteria, } = action.meta.arg;

      const key = hash(criteria);
      const newList: NewsListStateItem = {
        items: [],
        paging: {
          offset: criteria.offset,
          limit: criteria.limit,
          total: 0,
          returned: 0,
          has_more: false,
        },
        sorting: [],
        criteria,
        error: null,
        pending: true,
      };

      let pendingResult = { ...state.list, };
      if (state.list[key]) {
        pendingResult[key].pending = true;
      } else {
        pendingResult = {
          ...state.list,
          ...{ [`${key}`]: newList, },
        };
      }

      state.list = pendingResult;
    });

    builder.addCase(fetchNewsListThunk.fulfilled,
      (state, action) => {
        const { criteria, } = action.meta.arg;
        const key = hash(criteria);

        const newList: NewsListStateItem = {
          items: action.payload.data,
          paging: action.payload.paging,
          sorting: action.payload.sorting,
          criteria,
          pending: false,
          error: null,
        };

        let result = { ...state.list, };
        if (state.list[key]) {
          result[key] = newList;
        } else {
          result = {
            ...state.list,
            ...{ [`${key}`]: newList, },
          };
        }

        state.list = result;
      });

    builder.addCase(fetchNewsListThunk.rejected,
      (state, action) => {
        const { criteria, } = action.meta.arg;
        const key = hash(criteria);

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newList: NewsListStateItem = {
          items: [],
          paging: {
            offset: criteria.offset,
            limit: criteria.limit,
            total: 0,
            returned: 0,
            has_more: false,
          },
          sorting: [],
          criteria,
          error,
          pending: false,
        };

        let errorResult = { ...state.list, };
        if (state.list[key]) {
          errorResult[key].error = error;
        } else {
          errorResult = {
            ...state.list,
            ...{ [`${key}`]: newList, },
          };
        }
        state.list = errorResult;
      });
  },
});

export const { reset, } = newsSlice.actions;

export default newsSlice.reducer;
