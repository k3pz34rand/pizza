export interface FetchPizzas {
  url: string;
  page: number;
}

type Size = 26 | 30 | 40;
type type = 0 | 1;

export type pizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: type[];
  sizes: Size[];
  price: number;
  category: number;
  raiting: number;
  description: string;
};

export interface PizzasSliceInterface {
  pizzas: pizzaItem[];
  status: 'loading' | 'success' | 'error';
  isEnd: boolean;
}
