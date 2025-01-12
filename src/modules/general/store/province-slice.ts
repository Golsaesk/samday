import axios from 'axios';
import hash from '@/modules/general/libraries/hash';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { Error, } from '@modules/general/libraries/general-types';
import { initProvinceState, resetHelper, } from './province-helper';
import { parseThunkError, } from '@/modules/general/libraries/utils';
import { getClientIP, } from '@/modules/general/store/api/general-api';
import {
  ProvinceCriteria, ProvinceDetailEntity,
  ProvinceDetailStateItem, ProvinceListEntity,
  ProvinceListStateItem,
} from '@/modules/general/libraries/province-types';
import {
  API_DOMAIN, API_KEY, API_VERSION,
  DEFAULT_LIMIT, GENERAL_ERROR, HTTP_CLIENT_IP_HEADER,
  WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export interface FetchProvinceListProps {
  criteria: ProvinceCriteria;
}

export interface FetchProvinceDetailProps {
  id: string;
}

export const fetchProvinceDetailThunk =
  createAsyncThunk<ProvinceDetailEntity, FetchProvinceDetailProps, { rejectValue: Error }>(
    'province/fetchProvinceDetail',
    async ({ id, }: FetchProvinceDetailProps, thunkApi) => {

      try {
        const url = `${API_DOMAIN}/${API_VERSION}/sitemember/provinces/${id}`;

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
          return result as ProvinceDetailEntity;
        }
      } catch (error: any) {
        return parseThunkError(error, thunkApi);
      }

    }
  );

export const fetchProvinceListThunk =
  createAsyncThunk<ProvinceListEntity, FetchProvinceListProps, { rejectValue: Error }>(
    'province/fetchProvinceList',
    async ({ criteria, }: FetchProvinceListProps, thunkApi) => {

      const {
        limit,
        offset,
        countryId,
        sorting,
        locale,
      } = criteria;

      try {
        const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/provinces?${
          `limit=${limit || DEFAULT_LIMIT}`
        }${(countryId && countryId > 0) ? `&country_id=${countryId}` : ''
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
          return result as ProvinceListEntity;
        }
      } catch (error: any) {
        return parseThunkError(error, thunkApi);
      }

    }
  );

export const provinceSlice = createSlice({
  name: 'province',
  initialState: initProvinceState,
  reducers: { reset: resetHelper, },
  extraReducers(builder) {
    builder.addCase(fetchProvinceDetailThunk.pending, (state, action) => {
      const { id, } = action.meta.arg;

      const newItem: ProvinceDetailStateItem = {
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

    builder.addCase(fetchProvinceDetailThunk.fulfilled,
      (state, action) => {
        const { id, } = action.meta.arg;
        const newItem: ProvinceDetailStateItem = {
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

    builder.addCase(fetchProvinceDetailThunk.rejected,
      (state, action) => {

        const { id, } = action.meta.arg;

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newItem: ProvinceDetailStateItem = {
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

    builder.addCase(fetchProvinceListThunk.pending, (state, action) => {
      const { criteria, } = action.meta.arg;

      const key = hash(criteria);
      const newList: ProvinceListStateItem = {
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

    builder.addCase(fetchProvinceListThunk.fulfilled,
      (state, action) => {
        const { criteria, } = action.meta.arg;
        const key = hash(criteria);

        const newList: ProvinceListStateItem = {
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

    builder.addCase(fetchProvinceListThunk.rejected,
      (state, action) => {
        const { criteria, } = action.meta.arg;
        const key = hash(criteria);

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newList: ProvinceListStateItem = {
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

export const { reset, } = provinceSlice.actions;

export default provinceSlice.reducer;
