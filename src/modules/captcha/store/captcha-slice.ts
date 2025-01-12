import axios from 'axios';
import { PaletteMode, } from '@mui/material';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { initCaptchaState, resetHelper, } from './captcha-helper';
import { Error, } from '@modules/general/libraries/general-types';
import { parseThunkError, } from '@/modules/general/libraries/utils';
import { getClientIP, } from '@/modules/general/store/api/general-api';
import { CaptchaDetailEntity, CaptchaStateDetailItem, } from '@/modules/captcha/libraries/captcha-types';
import {
  API_DOMAIN, API_KEY, API_VERSION, GENERAL_ERROR,
  HTTP_CLIENT_IP_HEADER, WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export interface FetchCaptchaDetailProps {
  id: string;
  mode: PaletteMode;
}

export const fetchCaptchaDetailThunk = createAsyncThunk<
CaptchaDetailEntity,
FetchCaptchaDetailProps,
{ rejectValue: Error;
}
>(
  'captcha/fetchCaptchaDetail',
  async ({
    id, mode,
  }: FetchCaptchaDetailProps, thunkApi) => {

    try {
      const url = `${API_DOMAIN}/${API_VERSION}/general/${WEBSITE_DEFAULT_LOCALE}/captcha/${id}`;

      const captchaParams = {
        code_length: 4,
        image_template: 0,
        Image_Options: {
          width: 100,
          height: 50,
          font_wrap: 1,
          background_noise: 1,
          line_noise: 1,
          distortion_factor: 0,
          background_color_hex: mode === 'dark' ? '#222' : '#fff',
          font_color_hex: mode === 'dark' ? '#fff' : '#000',
          font_family_names: [
            'tahoma',
          ],
        },
        letter_drawing_case_mode: 1,
        is_case_sensitive: false,
      };
      const clientIP: string = await getClientIP();
      const response = await axios.post<any>(url, JSON.stringify(captchaParams), {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
        },
      });

      if (response.data) {
        const result = response.data;
        return result as CaptchaDetailEntity;
      }
    } catch (error: any) {
      return parseThunkError(error, thunkApi);
    }
  }
);

export const captchaSlice = createSlice({
  name: 'captcha',
  initialState: initCaptchaState,
  reducers: { reset: resetHelper, },
  extraReducers(builder) {
    builder.addCase(fetchCaptchaDetailThunk.pending, (state, action) => {
      const { id, } = action.meta.arg;

      const newItem: CaptchaStateDetailItem = {
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

    builder.addCase(fetchCaptchaDetailThunk.fulfilled,
      (state, action) => {
        const { id, } = action.meta.arg;
        const newItem: CaptchaStateDetailItem = {
          item: action.payload.data,
          id,
          pending: false,
          error: null,
        };

        let result = { ...state.detail, };
        if (state.detail[id]) {
          result[id] = newItem;
        } else {
          result = {
            ...state.detail,
            ...{ [id]: newItem, },
          };
        }

        state.detail = result;
      });

    builder.addCase(fetchCaptchaDetailThunk.rejected,
      (state, action) => {

        const { id, } = action.meta.arg;

        const error = action.payload ? action.payload : GENERAL_ERROR;
        const newItem: CaptchaStateDetailItem = {
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
  },
});

export const { reset, } = captchaSlice.actions;

export default captchaSlice.reducer;
