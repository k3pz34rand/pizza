import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/SearchSlice';
import basketReducer from './basket/basketSlice';
import pizzasReducer from './pizzas/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    searchParams: searchReducer,
    basket: basketReducer,
    pizzas: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
