import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortList } from '../../shared/consts';
import { IntiParams, SearchSliceInterface, SortInterface } from '../search/searchTypes';

const initialState: SearchSliceInterface = {
  search: '',
  category: 0,
  sortParams: { name: 'популярности', value: 'raiting', order: 'desc' },
  page: 1,
  limit: 8,
};

export const searchSlice = createSlice({
  name: 'seacrh',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    resetSearch: (state) => {
      state.search = '';
      state.page = 1;
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
      state.page = 1;
    },
    changeSort: (state, action: PayloadAction<SortInterface>) => {
      state.sortParams = action.payload;
      state.page = 1;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeLimitPage: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    initParams: (state, action: PayloadAction<IntiParams>) => {
      const { order, sortBy, category, search, page } = action.payload;
      const objState = {
        search,
        page: Number(page) || 1,
        category: Number(category) || 0,
        sortParams:
          sortList.filter((s) => s.value === sortBy && s.order === order)[0] || state.sortParams,
      };

      state = Object.assign(state, objState);
    },
  },
});

export const {
  changeSearch,
  resetSearch,
  changeCategory,
  changeSort,
  changePage,
  changeLimitPage,
  initParams,
} = searchSlice.actions;

export default searchSlice.reducer;
