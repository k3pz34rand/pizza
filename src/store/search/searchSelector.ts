import { RootState } from '../store';

export const searchParamsSelector = (state: RootState) => state.searchParams;
export const searchSelector = (state: RootState) => state.searchParams.search;
