import { createSlice, } from '@reduxjs/toolkit';
import { SignInPopupStatusType, } from '@/modules/general/libraries/constants';
import { GeneralState, DashboardCacheList, } from '@/modules/general/libraries/general-types';
import {
  setDashboardSidebarOpenStatusHelper,
  setDashboardSidebarShowFilterHelper,
  setDashboardSidebarShowSortHelper,
  loadDashboardCacheHelper,
  setDashboardSidebarFilterCountHelper,
  setDashboardCriteriaHelper,
  setDashboardSortHelper,
  setDashboardCriteriaItemHelper,
  setDashboardPagingHelper,
  setDashboardCriteriaItemListHelper,
  setRefreshSessionHelper,
  setRefreshCreditHelper,
  setSignInPopupStatusHelper,
  setSignInPopupCallerHelper,
} from './general-helper';

const initGeneralState: GeneralState = {
  loading: false,
  refreshSession: false,
  refreshCredit: false,
  signInPopupStatus: SignInPopupStatusType.closed,
  signInPopupCaller: '',
  dashboardCacheList: {} as DashboardCacheList,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState: initGeneralState,
  reducers: {
    reset: () => initGeneralState,
    startLoading: (state: GeneralState) => {
      state.loading = true;
    },
    endLoading: (state: GeneralState) => {
      state.loading = false;
    },
    setDashboardSidebarOpenStatus: setDashboardSidebarOpenStatusHelper,
    setDashboardSidebarShowFilter: setDashboardSidebarShowFilterHelper,
    setDashboardSidebarShowSort: setDashboardSidebarShowSortHelper,
    setDashboardSidebarFilterCount: setDashboardSidebarFilterCountHelper,
    setDashboardCriteria: setDashboardCriteriaHelper,
    setDashboardSort: setDashboardSortHelper,
    setDashboardCriteriaItem: setDashboardCriteriaItemHelper,
    setDashboardCriteriaItemList: setDashboardCriteriaItemListHelper,
    setDashboardPaging: setDashboardPagingHelper,
    loadDashboardCache: loadDashboardCacheHelper,
    setRefreshSession: setRefreshSessionHelper,
    setRefreshCredit: setRefreshCreditHelper,
    setSignInPopupStatus: setSignInPopupStatusHelper,
    setSignInPopupCaller: setSignInPopupCallerHelper,
  },
});

export const {
  startLoading,
  endLoading,
  reset,
  setDashboardSidebarOpenStatus,
  setDashboardSidebarShowFilter,
  setDashboardSidebarShowSort,
  setDashboardSidebarFilterCount,
  setDashboardCriteria,
  setDashboardSort,
  setDashboardCriteriaItem,
  setDashboardCriteriaItemList,
  setDashboardPaging,
  loadDashboardCache,
  setRefreshSession,
  setRefreshCredit,
  setSignInPopupStatus,
  setSignInPopupCaller,
} = generalSlice.actions;

export default generalSlice.reducer;
