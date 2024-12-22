import { pizzasUrl } from './consts';
import axios from 'axios';
export function updateUrl(
  category = 0,
  sortParams = { value: 'raiting', order: 'desc' },
  title = '',
  page = 1,
  pageLimit = 8,
  urlPath = pizzasUrl,
) {
  const url = new URL(urlPath);
  title !== '' && url.searchParams.append('title', title);
  if (category !== 0) {
    url.searchParams.append('category', String(category));
  }
  url.searchParams.append('page', String(page));
  url.searchParams.append('limit', String(pageLimit));
  url.searchParams.append('sortBy', sortParams.value);
  url.searchParams.append('order', sortParams.order);
  return String(url);
}

export const fetchData = async (
  categoryIndex,
  sortParams,
  search,
  page,
  limitPage,
  lastPage,
  loading,
  setLoading,
  setLastPage,
  setPizzas,
) => {
  if (lastPage) return; // Если запрос уже выполняется, ничего не делаем
  if (loading) return; // Если запрос уже выполняется, ничего не делаем
  setLoading(true);
  const pizzaURL = updateUrl(categoryIndex, sortParams, search, page, limitPage);
  try {
    const response = await axios.get(pizzaURL);
    const data = await response.data;
    if (data.length === 0) {
      setLastPage(true);
    }
    if (page > 1) {
      setPizzas((prev) => [...prev, ...data]);
    } else {
      setPizzas(data);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    setLoading(false);
  }
};

export function filtredFunc(pizzasList, action) {
  const pizzaIndex = pizzasList.findIndex((pizzaItem) => {
    return (
      pizzaItem.id === action.payload.id &&
      pizzaItem.type === action.payload.type &&
      pizzaItem.size === action.payload.size
    );
  });
  return pizzaIndex;
}

export function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  //@ts-ignore
  for (const [key, value] of urlParams.entries()) {
    params[key] = decodeURIComponent(value); // Декодируем значение параметра
  }

  return params;
}
