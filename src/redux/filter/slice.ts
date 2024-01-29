import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortObjType, SortType } from "./types";

const initialState: SortType = {
  searchValue: "",
  categoryId: 0,
  sortObj: {
    name: "По популярности",
    sortType: "price",
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<SortObjType>) => {
      state.sortObj = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<SortType>) => {
      state.sortObj = action.payload.sortObj;
      state.searchValue = action.payload.searchValue;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSelectedSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
