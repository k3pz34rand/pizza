import { lazy, Suspense } from 'react';

const Pizza = lazy(() => import('./Pizza'));

export const PizzaLazy = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Pizza />
    </Suspense>
  );
};
