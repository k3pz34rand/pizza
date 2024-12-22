import { pizzaItem } from 'store/pizzas/pizzasTypes';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import { PizzaSkeletonItems } from './PizzaSkeletonItems';

type PizzaItemsProps = { pizzasList: pizzaItem[]; isLoading: boolean; search: string };
function PizzaItems({ pizzasList, isLoading, search }: PizzaItemsProps) {
  if (isLoading && pizzasList.length === 0) {
    return <PizzaSkeletonItems />;
  }

  if (!Array.isArray(pizzasList)) {
    return <div>По запросу {search} пицц не найдено</div>;
  }

  return (
    <div className="content__wrapper">
      <div className="content__items">
        {pizzasList.map((pizza) => {
          return <PizzaBlock {...pizza} key={pizza.id} />;
        })}
      </div>
    </div>
  );
}

export default PizzaItems;
