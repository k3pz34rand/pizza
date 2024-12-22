import { lazy, Suspense } from 'react';

const Basket = lazy(() => import('./Basket'));

export const BasketLazy = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Basket />
    </Suspense>
  );
};
