import React from 'react';
import { addPizza } from '../../store/basket/basketSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { pizzaItem } from 'store/pizzas/pizzasTypes';

const pizzaTypes = { 0: 'тонкое', 1: 'традиционное' };

function PizzaBlock({ imageUrl, title, price, sizes, types, id }: pizzaItem) {
  const [pizzaCount, setPizzaCount] = React.useState(0);
  const [sizePizza, setSizePizza] = React.useState(0);
  const [typePizza, settypePizza] = React.useState(0);
  const dispatch = useAppDispatch();

  const handleAddPizza = React.useCallback(() => {
    dispatch(
      addPizza({
        id,
        title,
        type: typePizza,
        size: sizePizza,
        price,
        image: imageUrl,
        count: pizzaCount,
      }),
    );
  }, [typePizza, sizePizza]);

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={`${imageUrl}`} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => {
            return (
              <li
                key={index}
                className={typePizza === index ? 'active' : ''}
                onClick={() => settypePizza(index)}>
                {pizzaTypes[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                className={sizePizza === index ? 'active' : ''}
                onClick={() => setSizePizza(index)}>
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom" onClick={() => setPizzaCount(pizzaCount + 1)}>
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={handleAddPizza} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"></path>
          </svg>
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
