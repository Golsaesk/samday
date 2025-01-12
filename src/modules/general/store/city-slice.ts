import axios from 'axios';
import hash from '@/modules/general/libraries/hash';
import { initCityState, resetHelper, } from './city-helper';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { Error, } from '@modules/general/libraries/general-types';
import { parseThunkError, } from '@/modules/general/libraries/utils';
import { getClientIP, } from '@/modules/general/store/api/general-api';
import {
  CityCriteria, CityDetailEntity,
  CityDetailStateItem, CityListEntity,
  CityListStateItem,
} from '@/modules/general/libraries/city-types';
import {
  API_DOMAIN, API_KEY, API_VERSION,
  DEFAULT_LIMIT, GENERAL_ERROR,
  HTTP_CLIENT_IP_HEADER, WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export interface FetchCityListProps {
  criteria: CityCriteria;
}

export interface FetchCityDetailProps {
  id: string;
}

export const fetchCityDetailThunk =
  createAsyncThunk<CityDetailEntity, FetchCityDetailProps, { rejectValue: Error }>(
    'city/fetchCityDetail',
    async ({ id, }: FetchCityDetailProps, thunkApi) => {

      try {
        const url = `${API_DOMAIN}/${API_VERSION}/sitemember/cities/${id}`;

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
          return result as CityDetailEntity;
        }
      } catch (error: any) {
        return parseThunkError(error, thunkApi);
      }

    }
  );

export const fetchCityListThunk =
  createAsyncThunk<CityListEntity, FetchCityListProps, { rejectValue: Error }>(
    'city/fetchCityList',
    async ({ criteria, }: FetchCityListProps, thunkApi) => {

      const {
        limit,
        offset,
        provinceId,
        sorting,
        locale,
      } = criteria;

      try {
        const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/cities?rankings=1,2${
          `&limit=${limit || DEFAULT_LIMIT}`
        }${(provinceId && provinceId > 0) ? `&province_id=${provinceId}` : ''
        }${(sorting && sorting.length)
          ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
          : ''
        }${`&offset=${offset || 0}`}`;

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
          return result as CityListEntity;
        }
      } catch (error: any) {
        return parseThunkError(error, thunkApi);
      }

    }
  );

export const citySlice = createSlice({
  name: 'city',
  initialState: initCityState,
  reducers: { reset: resetHelper, },
  extraReducers(builder) {
    builder.addCase(fetchCityDetailThunk.pending, (state, action) => {
      const { id, } = action.meta.arg;

      const newItem: CityDetailStateItem = {
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

    builder.addCase(fetchCityDetailThunk.fulfilled,
      (state, action) => {
        const { id, } = action.meta.arg;
        const newItem: CityDetailStateItem = {
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

    builder.addCase(fetchCityDetailThunk.rejected,
      (state, action) => {

        const { id, } = action.meta.arg;

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newItem: CityDetailStateItem = {
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

    builder.addCase(fetchCityListThunk.pending, (state, action) => {
      const { criteria, } = action.meta.arg;

      const key = hash(criteria);
      const newList: CityListStateItem = {
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

    builder.addCase(fetchCityListThunk.fulfilled,
      (state, action) => {
        const { criteria, } = action.meta.arg;
        const key = hash(criteria);

        const newList: CityListStateItem = {
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

    builder.addCase(fetchCityListThunk.rejected,
      (state, action) => {
        const { criteria, } = action.meta.arg;
        const key = hash(criteria);

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newList: CityListStateItem = {
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

export const { reset, } = citySlice.actions;

export default citySlice.reducer;
