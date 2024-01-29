import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoodsStateType, ProductType, Status } from "./types";
import axios from "axios";

const initialState: GoodsStateType = {
  goodsItems: [],
  status: Status.LOADING, // LOADING | SUCCESS | ERROR
};

export const fetchGoods = createAsyncThunk<
  ProductType[],
  Record<string, string>
>("goods/fetchGoods", async (params) => {
  const { sortBy, order, category, search, currentPage, pageSize } = params;
  const url = new URL("https://65400a5045bedb25bfc19611.mockapi.io/items");
  url.searchParams.append("sortBy", sortBy.replace("-", ""));
  url.searchParams.append("order", order);
  category && url.searchParams.append("category", category);
  search && url.searchParams.append("name", search);
  url.searchParams.append("page", currentPage);
  url.searchParams.append("limit", pageSize);

  const { data } = await axios.get<ProductType[]>(String(url));
  return data;
});

export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setGoodsItems: (state, action) => {
      state.goodsItems = action.payload;
    },
  },
  // extraReducers: {
  //     [fetchGoods.pending]: (state) => {
  //         state.status = "loading"
  //         state.goodsItems = []
  //     },
  //     [fetchGoods.fulfilled]: (state, action) => {
  //         state.goodsItems = action.payload
  //         state.status = "success"
  //     },
  //     [fetchGoods.rejected]: (state) => {
  //         state.status = "error"
  //         state.goodsItems = []
  //     }
  // }
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.goodsItems = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.goodsItems = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchGoods.rejected, (state) => {
        state.goodsItems = [];
        state.status = Status.ERROR;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setGoodsItems } = goodsSlice.actions;

export default goodsSlice.reducer;
