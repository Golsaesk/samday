import { PayloadAction, } from '@reduxjs/toolkit';
import {
  GeneralState, OpenStatus, DashboardCacheLoadPayload, DashboardCacheItem,
  DashboardSidebarOpenStatusPayload, DashboardSidebarShowFilterPayload,
  DashboardSidebarShowSortPayload, DashboardSidebarFilterCountPayload,
  DashboardCriteriaPayload, DashboardSortPayload, DashboardCriteriaItemPayload,
  DashboardPagingPayload, DashboardCriteriaItemListPayload, Paging,
  RefreshSessionPayload, RefreshCreditPayload, SignInPopupStatusPayload, SignInPopupCallerPayload,
} from '@/modules/general/libraries/general-types';

const getDashboardCacheItemFromStorage = (storageKey: string, userId: number): DashboardCacheItem => {
  try {
    if (userId > 0) {
      const value = localStorage.getItem(`${storageKey}_${userId}`);
      if (value) {
        return JSON.parse(value) as DashboardCacheItem;
      }
    }
  } catch { }

  return {
    userId: userId,
    openStatus: OpenStatus.closed,
    showFilter: false,
    showSort: false,
    filterCount: 0,
    criteria: {},
    paging: {} as Paging,
  } ;
};

const saveDashboardCacheItemInStorage = (storageKey: string, dashboardSidebar: DashboardCacheItem) => {
  if (dashboardSidebar.userId > 0) {
    localStorage.setItem(`${storageKey}_${dashboardSidebar.userId}`, JSON.stringify(dashboardSidebar));
  }
};

export const loadDashboardCacheHelper = (state: GeneralState, action: PayloadAction<DashboardCacheLoadPayload>) => {
  const value = getDashboardCacheItemFromStorage(action.payload.storageKey, action.payload.userId);
  state.dashboardCacheList = Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });
};

export const setDashboardSidebarOpenStatusHelper = (state: GeneralState, action: PayloadAction<DashboardSidebarOpenStatusPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const value: DashboardCacheItem = {
    ...oldValue,
    openStatus: action.payload.openStatus,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardSidebarShowFilterHelper = (state: GeneralState, action: PayloadAction<DashboardSidebarShowFilterPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const value: DashboardCacheItem = {
    ...oldValue,
    showFilter: action.payload.showFilter,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardSidebarShowSortHelper = (state: GeneralState, action: PayloadAction<DashboardSidebarShowSortPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const value: DashboardCacheItem = {
    ...oldValue,
    showSort: action.payload.showSort,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardSidebarFilterCountHelper = (state: GeneralState, action: PayloadAction<DashboardSidebarFilterCountPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const value: DashboardCacheItem = {
    ...oldValue,
    filterCount: action.payload.filterCount,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const getDefaultDashboardCacheItem = (userId: number): DashboardCacheItem => {
  return {
    userId: userId,
    openStatus: OpenStatus.closed,
    showFilter: false,
    showSort: false,
    filterCount: 0,
    criteria: {},
    paging: {} as Paging,
  };
};
export const setDashboardCriteriaHelper = (state: GeneralState, action: PayloadAction<DashboardCriteriaPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  let value: DashboardCacheItem;
  if (oldValue) {
    value = {
      ...oldValue,
      criteria: action.payload.criteria,
    };
  } else {
    value = {
      ...getDefaultDashboardCacheItem(action.payload.userId),
      criteria: action.payload.criteria,
    };
  }

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardSortHelper = (state: GeneralState, action: PayloadAction<DashboardSortPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const value: DashboardCacheItem = {
    ...oldValue,
    criteria: {
      ...oldValue.criteria,
      sorting: action.payload.sorting,
    },
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardCriteriaItemHelper = (state: GeneralState, action: PayloadAction<DashboardCriteriaItemPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const newCriteria = Object.assign({}, oldValue.criteria, { [action.payload.itemName]: action.payload.itemValue, });
  const value: DashboardCacheItem = {
    ...oldValue,
    criteria: newCriteria,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardCriteriaItemListHelper = (state: GeneralState, action: PayloadAction<DashboardCriteriaItemListPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];
  const newCriteria = Object.assign({}, oldValue.criteria, action.payload.values);
  const value: DashboardCacheItem = {
    ...oldValue,
    criteria: newCriteria,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setDashboardPagingHelper = (state: GeneralState, action: PayloadAction<DashboardPagingPayload>) => {
  const oldValue = state.dashboardCacheList[action.payload.storageKey];

  const value: DashboardCacheItem = {
    ...oldValue,
    paging: action.payload.paging,
  };

  state.dashboardCacheList =
    Object.assign({}, state.dashboardCacheList, { [action.payload.storageKey]: value, });

  saveDashboardCacheItemInStorage(action.payload.storageKey, state.dashboardCacheList[action.payload.storageKey]);
};

export const setRefreshSessionHelper = (state: GeneralState, action: PayloadAction<RefreshSessionPayload>) => {
  state.refreshSession = action.payload.refreshSession;
};

export const setRefreshCreditHelper = (state: GeneralState, action: PayloadAction<RefreshCreditPayload>) => {
  state.refreshCredit = action.payload.refreshCredit;
};

export const setSignInPopupStatusHelper = (state: GeneralState, action: PayloadAction<SignInPopupStatusPayload>) => {
  state.signInPopupStatus = action.payload.signInPopupStatus;
};

export const setSignInPopupCallerHelper = (state: GeneralState, action: PayloadAction<SignInPopupCallerPayload>) => {
  state.signInPopupCaller = action.payload.signInPopupCaller;
};