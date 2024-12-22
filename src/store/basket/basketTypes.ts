export enum Key_LS {
  PIZZA_LIST = 'pizzasList',
  TOTAL_COUNT = 'totalCount',
  TOTAL_PRICE = 'totalPrice',
}

export type pizzaItem = {
  id: string;
  title: string;
  image: string;
  size: number;
  type: number;
  price: number;
  count: number;
};

export type PayloadInterface = {
  id: string;
  size: number;
  type: number;
};
export interface BasketSliceInterface {
  pizzasList: pizzaItem[];
  totalCount: number;
  totalPrice: number;
}
