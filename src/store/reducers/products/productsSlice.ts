import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import productsApi from './../../../api//products';

import {ProductsInterface} from './../../../models'

export interface ProductsState {
    data: ProductsInterface[];
    page: number,
    per_page: number,
    total: number,
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
    data: [],
    page: 1,
    per_page: 5,
    total: 0,
    status: 'idle',
};

export const getAllProductsAsync = createAsyncThunk(
  'products/getAllProducts',
  async ({page, per_page}: {page: number, per_page: number}) => {
   try {
    const response = await productsApi.getProducts({page, per_page});

    return response.data;
   }
   catch(err) {
    throw(err)
   }
  }
);

export const counterSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setPerPage: (state, action) => {
      state.per_page = action.payload
    },
    resetProducts: (state) => {
        state.data = [];
        state.status = 'idle'
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {

        const { data, page, per_page, total } = action.payload;
        
        state.data = data;
        
        state.page = page;

        state.per_page = per_page;

        state.total = total;

        state.status = 'idle';
      })
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setPage, setPerPage, resetProducts } = counterSlice.actions;

export default counterSlice.reducer;
