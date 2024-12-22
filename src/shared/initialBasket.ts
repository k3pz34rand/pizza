import { Key_LS, BasketSliceInterface } from '../store/basket/basketTypes';

export const initialBasketLS = () => {
  const pizzas = localStorage.getItem(Key_LS.PIZZA_LIST);
  const count = localStorage.getItem(Key_LS.TOTAL_COUNT);
  const price = localStorage.getItem(Key_LS.TOTAL_PRICE);
  const pizzasList = pizzas ? JSON.parse(pizzas) : [];
  const totalCount = count ? Number(count) : 0;
  const totalPrice = count ? Number(price) : 0;
  return {
    pizzasList,
    totalCount,
    totalPrice,
  } as BasketSliceInterface;
};
