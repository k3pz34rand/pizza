import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzas, pizzaItem, PizzasSliceInterface } from './pizzasTypes';

export const fetchPizzas = createAsyncThunk<pizzaItem[], FetchPizzas>(
  'pizzas/fetchPizzas',
  //@ts-ignore
  async ({ url, page }) => {
    const { data } = await axios.get(url);
    return data;
  },
);
const initialState: PizzasSliceInterface = {
  pizzas: [],
  status: 'loading',
  isEnd: false,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    changeIsEnd: (state, action: PayloadAction<boolean>) => {
      state.isEnd = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      const { page } = action.meta.arg;
      state.status = 'success';
      if (action.payload.length === 0) {
        state.isEnd = true;
      } else {
        state.isEnd = false;
      }

      if (page === 1) {
        state.pizzas = [...action.payload];
      } else {
        state.pizzas = [...state.pizzas, ...action.payload];
      }
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { changeIsEnd } = pizzasSlice.actions;

export default pizzasSlice.reducer;
