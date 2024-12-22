import { Key_LS, BasketSliceInterface } from '../store/basket/basketTypes';

export const updateLS = ({ pizzasList, totalCount, totalPrice }: BasketSliceInterface) => {
  localStorage.setItem(Key_LS.PIZZA_LIST, JSON.stringify(pizzasList));
  localStorage.setItem(Key_LS.TOTAL_COUNT, JSON.stringify(totalCount));
  localStorage.setItem(Key_LS.TOTAL_PRICE, JSON.stringify(totalPrice));
};
