import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filtredFunc } from '../../shared/func';
import { updateLS } from '../../shared/updateLS';
import { initialBasketLS } from '../../shared/initialBasket';
import { BasketSliceInterface, PayloadInterface, pizzaItem } from './basketTypes';

const initialState: BasketSliceInterface = initialBasketLS();

export const basketSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<pizzaItem>) => {
      const pizzaIndex = filtredFunc(state.pizzasList, action);
      if (pizzaIndex !== -1) {
        state.pizzasList = state.pizzasList.map((pizzaItem, index) => {
          if (index === pizzaIndex) {
            return { ...pizzaItem, count: pizzaItem.count + 1 };
          }
          return pizzaItem;
        });
      } else {
        state.pizzasList.push({ ...action.payload, count: 1 });
      }
      state.totalCount = state.pizzasList.reduce((sum, pizza) => sum + pizza.count, 0);
      state.totalPrice = state.pizzasList.reduce(
        (sum, pizza) => sum + pizza.price * pizza.count,
        0,
      );
      updateLS(state);
    },
    deletePizza: (state, action: PayloadAction<PayloadInterface>) => {
      const deletepizza = filtredFunc(state.pizzasList, action);
      state.pizzasList.splice(deletepizza, 1);
      state.totalCount = state.pizzasList.reduce((sum, pizza) => sum + pizza.count, 0);
      state.totalPrice = state.pizzasList.reduce(
        (sum, pizza) => sum + pizza.price * pizza.count,
        0,
      );
      updateLS(state);
    },
    decPizza: (state, action: PayloadAction<PayloadInterface>) => {
      const pizzaIndex = filtredFunc(state.pizzasList, action);
      if (pizzaIndex !== -1) {
        state.pizzasList = state.pizzasList.map((pizzaItem, index) => {
          if (index === pizzaIndex) {
            return { ...pizzaItem, count: pizzaItem.count - 1 };
          }
          return pizzaItem;
        });
      }
      state.totalCount = state.pizzasList.reduce((sum, pizza) => sum + pizza.count, 0);
      state.totalPrice = state.pizzasList.reduce(
        (sum, pizza) => sum + pizza.price * pizza.count,
        0,
      );
      updateLS(state);
    },
    clearBasket: (state) => {
      state.pizzasList = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      localStorage.clear();
    },
  },
});

export const { addPizza, deletePizza, clearBasket, decPizza } = basketSlice.actions;

export default basketSlice.reducer;
