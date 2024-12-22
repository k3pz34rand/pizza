import { BasketSliceInterface } from 'store/basket/basketTypes';

type getData = () => BasketSliceInterface;

export const getDataFromLs: getData = () => {
  const data = localStorage.getItem('pizzasBasket');
  return data ? JSON.parse(data) : [];
};
