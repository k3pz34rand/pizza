import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import stl from './pizza.module.scss';
import { addPizza } from '../../store/basket/basketSlice';
import { useAppDispatch } from '../../store/store';
const pizzaTypes = { 0: 'тонкое', 1: 'традиционное' };
interface PizzaInterface {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}
function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState<PizzaInterface>();
  const [sizePizza, setSizePizza] = useState(0);
  const [typePizza, settypePizza] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchPizza() {
      try {
        console.log(typeof id);
        const { data } = await axios.get(
          `https://6735e1005995834c8a947889.mockapi.io/pizzas/${id}`,
        );
        console.log(data);
        setPizza(data);
      } catch (error) {
        alert(error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) return <div>Загрузка...</div>;
  return (
    <div className={stl.pizza_container}>
      <h1>{pizza.title}</h1>
      <p className={stl.pizza_p}>{pizza.description}</p>
      <h3>{pizza.price} р.</h3>
      <img src={pizza.imageUrl} alt={`${pizza.title} pizza`} />
      <div className="pizza-block__selector pizzaSizeContainer">
        <ul>
          {pizza.types.map((type, index) => {
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
          {pizza.sizes.map((size, index) => {
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
      <div className={stl.btn_container}>
        <div
          className={stl.btn}
          onClick={() => {
            dispatch(
              addPizza({
                id: pizza.id,
                title: pizza.title,
                image: pizza.imageUrl,
                size: sizePizza,
                type: typePizza,
                price: pizza.price,
                count: 0,
              }),
            );
          }}>
          {' '}
          добавить в корзину
        </div>
        <Link className={stl.btn} to="/">
          назад
        </Link>
      </div>
    </div>
  );
}

export default Pizza;
