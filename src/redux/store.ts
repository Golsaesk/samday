import { configureStore, } from '@reduxjs/toolkit';
import { setupListeners, } from '@reduxjs/toolkit/query';
import newsReducer from '@modules/news/store/news-slice';
import cityReducer from '@modules/general/store/city-slice';
import generalReducer from '@modules/general/store/general-slice';
import captchaReducer from '@modules/captcha/store/captcha-slice';
import provinceReducer from '@modules/general/store/province-slice';

export const store = configureStore({
  reducer: {
    provinceReducer,
    generalReducer,
    cityReducer,
    captchaReducer,
    newsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
