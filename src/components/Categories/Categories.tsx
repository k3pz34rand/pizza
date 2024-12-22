import React from 'react';
import { useSelector } from 'react-redux';
import { searchParamsSelector } from '../../store/search/searchSelector';
import { useAppDispatch } from '../../store/store';
import { changeIsEnd } from '../../store/pizzas/pizzasSlice';
import { changeCategory } from '../../store/search/SearchSlice';

function Categories() {
  const { category: activeCategory } = useSelector(searchParamsSelector);
  const dispatch = useAppDispatch();

  const categoryList = ['все', 'мясные', 'вегетарианская', 'гриль', 'острые', 'закрытые'];
  const handleChangeCategory = React.useCallback((index: number) => {
    dispatch(changeCategory(index));
    dispatch(changeIsEnd(false));
  }, []);
  return (
    <div className="categories">
      <ul>
        {categoryList.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => handleChangeCategory(index)}
              className={activeCategory === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
const MemoizedCategory = React.memo(Categories);

export default MemoizedCategory;
