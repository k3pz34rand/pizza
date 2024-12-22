import Categories from 'components/Categories/Categories';
import InfinityScroll from 'components/InfinityScroll/InfinityScroll';
import PizzaItems from 'components/PizzaItems/PizzaItems';
import Sort from 'components/Sort/Sort';
import React from 'react';
import { useSelector } from 'react-redux';
import { getQueryParams, updateUrl } from 'shared/func';
import { pizzaSelector } from 'store/pizzas/pizzaSelector';
import { fetchPizzas } from 'store/pizzas/pizzasSlice';
import { searchParamsSelector } from 'store/search/searchSelector';
import { changePage, initParams } from 'store/search/SearchSlice';
import { IntiParams } from 'store/search/searchTypes';
import { useAppDispatch } from 'store/store';
import debounce from 'lodash.debounce';
function HomePage() {
  const { sortParams, search, category: categoryIndex, page } = useSelector(searchParamsSelector);
  const { pizzas, status, isEnd } = useSelector(pizzaSelector);
  const dispatch = useAppDispatch();
  const firstRef = React.useRef(true);
  const onChangePage = React.useCallback(
    debounce(() => dispatch(changePage(page + 1)), 500),
    [page],
  );

  React.useEffect(() => {
    if (firstRef.current) {
      const queryParams: IntiParams = getQueryParams();
      dispatch(initParams(queryParams));
    } else {
      const params = new URLSearchParams();
      search && params.set('search', search);
      categoryIndex && params.set('category', String(categoryIndex));
      sortParams.value && params.set('sortBy', sortParams.value);
      sortParams.order && params.set('order', sortParams.order);
      page && params.set('page', String(page));
      window.history.replaceState({}, '', `?${params.toString()}`);
    }
    firstRef.current = false;
  }, [search, categoryIndex, sortParams, page, dispatch]);

  React.useEffect(() => {
    const url = String(updateUrl(categoryIndex, sortParams, search, page));
    if (!isEnd) {
      dispatch(fetchPizzas({ url, page }));
    }
  }, [dispatch, categoryIndex, sortParams, search, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort sortParams={sortParams} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <InfinityScroll status={status} updatePage={onChangePage} page={page} comparePage={isEnd}>
        <PizzaItems pizzasList={pizzas} isLoading={status === 'loading'} search={search} />
      </InfinityScroll>
    </div>
  );
}

export default HomePage;
