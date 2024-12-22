import PizzaSkeleton from '../PizzaBlock/PizzaSkeleton';

export function PizzaSkeletonItems() {
  return [...new Array(10)].map((_, index) => {
    return <PizzaSkeleton key={index} />;
  });
}
